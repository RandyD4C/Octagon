import { useState, useEffect, useRef } from "react"
import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import ContactList from "../components/contact/ContactList"
import Address from "../components/contact/Address"
import styles from "../styles/contact.module.css"
import mammoth from "mammoth"
import parse from "html-react-parser"
import ReCAPTCHA from "react-google-recaptcha"

export default function Contact() {
    // ==========================================
    // 1. STATE & REFS
    // ==========================================
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    // File upload specific states
    const [files, setFiles] = useState([])
    const [activeFileIndex, setActiveFileIndex] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [wordHtml, setWordHtml] = useState("")
    const [isWordLoading, setIsWordLoading] = useState(false)

    // UI Feedback & Validation states
    const [isSending, setIsSending] = useState(false)
    const [errors, setErrors] = useState({})

    // Auth / Security
    const [captchaToken, setCaptchaToken] = useState(null)
    const recaptchaRef = useRef(null)

    // ==========================================
    // 2. HELPER FUNCTIONS
    // ==========================================
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const convertWordToHtml = async (file) => {
        setIsWordLoading(true);
        setWordHtml("");
        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setWordHtml(result.value);
        } catch (error) {
            console.error("Error converting Word to HTML:", error);
            setWordHtml("<p style='color:red'>Error rendering Word document. Please try again.</p>");
        } finally {
            setIsWordLoading(false);
        }
    };

    // ==========================================
    // 3. USE-EFFECTS
    // ==========================================
    // Trigger Word Document conversion when a user previews a .doc/.docx file
    useEffect(() => {
        if (showModal && activeFileIndex !== null && files[activeFileIndex]) {
            const activeFile = files[activeFileIndex];
            if (activeFile.isWord) {
                convertWordToHtml(activeFile.file);
            }
        }
    }, [showModal, activeFileIndex]);

    // ==========================================
    // 4. EVENT HANDLERS
    // ==========================================
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            const newFiles = [...files];
            let currentTotalSize = files.reduce((sum, f) => sum + f.file.size, 0);
            const sizeLimit = 5 * 1024 * 1024; // 5MB total

            let addedCount = 0;
            let sizeExceeded = false;

            for (const file of selectedFiles) {
                if (currentTotalSize + file.size <= sizeLimit) {
                    // Create preview URL if it's an image or PDF
                    const isImage = file.type.startsWith('image/');
                    const isPdf = file.type === 'application/pdf';
                    const isWord = file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.type.includes('word');
                    const previewUrl = (isImage || isPdf) ? URL.createObjectURL(file) : null;

                    newFiles.push({ file, previewUrl, isWord, isPdf, id: Math.random().toString(36).substr(2, 9) });
                    currentTotalSize += file.size;
                    addedCount++;
                } else {
                    sizeExceeded = true;
                }
            }

            if (sizeExceeded) {
                setErrors((prev) => ({ ...prev, file: "Total file size must be under 5MB." }));
            } else {
                clearError("file");
            }

            if (addedCount > 0) {
                setFiles(newFiles);
            }
        }
        // Reset input so the same file can be selected again if removed
        e.target.value = null;
    };

    const removeFile = (index, e) => {
        if (e) e.stopPropagation();
        const newFiles = [...files];
        const removed = newFiles.splice(index, 1)[0];
        if (removed.previewUrl) {
            URL.revokeObjectURL(removed.previewUrl);
        }
        setFiles(newFiles);
        if (activeFileIndex === index) {
            setShowModal(false);
            setActiveFileIndex(null);
        } else if (activeFileIndex > index) {
            setActiveFileIndex(activeFileIndex - 1);
        }
    };

    // ==========================================
    // 5. FORM SUBMISSION LOGIC
    // ==========================================
    const handleSend = async () => {
        const newErrors = {}

        if (!name.trim()) newErrors.name = "Please enter your name."
        if (!email.trim()) newErrors.email = "Please enter your email."
        else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address."
        if (!subject.trim()) newErrors.subject = "Please enter a subject."
        if (!message.trim()) newErrors.message = "Please enter a message."
        if (!captchaToken) newErrors.captcha = "Please complete the CAPTCHA."

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        setIsSending(true);

        try {
            let attachments = [];
            for (const item of files) {
                const base64Data = await fileToBase64(item.file);
                const content = base64Data.split(',')[1];
                attachments.push({
                    filename: item.file.name,
                    content: content,
                    encoding: 'base64'
                });
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message, attachments, captchaToken }),
            });

            if (response.ok) {
                alert('Email sent successfully!');
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setFiles([]);
                setCaptchaToken(null);
                if (recaptchaRef.current) recaptchaRef.current.reset();
            } else {
                const data = await response.json();
                alert(`Error sending email: ${data.message || 'Unknown error'}`);
                if (recaptchaRef.current) recaptchaRef.current.reset();
                setCaptchaToken(null);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending email.');
            if (recaptchaRef.current) recaptchaRef.current.reset();
            setCaptchaToken(null);
        } finally {
            setIsSending(false);
        }
    }

    const clearError = (field) => {
        if (errors[field]) {
            setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })
        }
    }

    // ==========================================
    // 6. RENDER (PAGE UI)
    // ==========================================
    return (
        <div className="w-full">
            <PageHeader title="Contact Us" />
            <div className={styles.contactPage}>
                <div className={`${styles.animateIn} ${styles.delay1}`}>
                </div>

                {/* --- Section: Contact List Cards --- */}
                <div className={`${styles.animateIn} ${styles.delay2}`}>
                    <ContactList contacts={siteConfig.contacts} />
                </div>

                {/* --- Section: Main Contact Form --- */}
                <div className={`${styles.formCard} ${styles.animateIn} ${styles.delay3}`}>
                    <h2 className={styles.formCardTitle}>Leave a message</h2>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formRow}>
                            <div className={styles.field}>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder={errors.name || "Name"}
                                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); clearError("name") }}
                                />
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder={errors.email || "Email"}
                                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); clearError("email") }}
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Subject</label>
                            <input
                                type="text"
                                placeholder={errors.subject || "How can we help?"}
                                className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
                                value={subject}
                                onChange={(e) => { setSubject(e.target.value); clearError("subject") }}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Message</label>
                            <div className={styles.messageWrapper}>
                                <textarea
                                    rows="6"
                                    placeholder={errors.message || "Your message here..."}
                                    className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value); clearError("message") }}
                                ></textarea>
                                <div className={styles.textareaTools}>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className={styles.hiddenFileInput}
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="file-upload" className={styles.attachIconBtn} title="Attach files">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                    </label>
                                    <span className={styles.attachmentLabel}>File attachment (max size 5MB)</span>
                                </div>

                                {files.length > 0 && (
                                    <div className={styles.previewsContainer}>
                                        {files.map((item, index) => (
                                            <div key={item.id} className={styles.tinyPreview} onClick={() => { setActiveFileIndex(index); setShowModal(true); }}>
                                                {item.isWord ? (
                                                    <div className={styles.tinyWordIcon}>
                                                        DOC
                                                    </div>
                                                ) : item.isPdf ? (
                                                    <div className={styles.tinyPdfIcon}>
                                                        PDF
                                                    </div>
                                                ) : item.previewUrl && item.file.type.startsWith('image/') ? (
                                                    <img src={item.previewUrl} alt="Preview" className={styles.tinyImage} />
                                                ) : (
                                                    <div className={styles.tinyFileIcon}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                                    </div>
                                                )}
                                                <span className={styles.tinyFileName}>{item.file.name}</span>
                                                <button type="button" className={styles.tinyRemoveBtn} onClick={(e) => removeFile(index, e)}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.file && <span className={styles.errorMsg}>{errors.file}</span>}
                        </div>

                        <div className={styles.field} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div className={styles.captchaWrapper}>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    onChange={(token) => { setCaptchaToken(token); clearError("captcha") }}
                                />
                            </div>
                            {errors.captcha && <span className={styles.errorMsg}>{errors.captcha}</span>}
                        </div>

                        <button
                            type="button"
                            className={styles.submitBtn}
                            onClick={handleSend}
                            disabled={isSending}
                        >
                            {isSending ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                {/* Modal Preview */}
                {showModal && activeFileIndex !== null && files[activeFileIndex] && (
                    <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeModal} onClick={() => setShowModal(false)}>&times;</button>
                            <div className={styles.modalHeader}>
                                <h3>File Preview</h3>
                                <p>{files[activeFileIndex].file.name} ({(files[activeFileIndex].file.size / 1024).toFixed(1)} KB)</p>
                            </div>
                            <div className={styles.modalBody}>
                                {files[activeFileIndex].isWord ? (
                                    <div className={styles.wordRenderWrapper}>
                                        {isWordLoading ? (
                                            <div className={styles.wordLoading}>
                                                <div className={styles.spinner}></div>
                                                <p>Rendering document...</p>
                                            </div>
                                        ) : (
                                            <div className={styles.wordRenderContent}>
                                                {parse(wordHtml)}
                                            </div>
                                        )}
                                    </div>
                                ) : files[activeFileIndex].previewUrl ? (
                                    files[activeFileIndex].file.type.startsWith('image/') ? (
                                        <img src={files[activeFileIndex].previewUrl} alt="Full Preview" className={styles.fullPreviewImage} />
                                    ) : files[activeFileIndex].file.type === 'application/pdf' ? (
                                        <iframe
                                            src={`${files[activeFileIndex].previewUrl}#toolbar=0`}
                                            className={styles.fullPreviewPdf}
                                            title="PDF Preview"
                                        />
                                    ) : (
                                        <div className={styles.noPreview}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                            <p>No preview available for this file type.</p>
                                        </div>
                                    )
                                ) : (
                                    <div className={styles.noPreview}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                        <p>No visual preview available for this file type.</p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.modalRemoveBtn} onClick={(e) => removeFile(activeFileIndex, e)}>Remove File</button>
                                <button className={styles.modalCloseBtn} onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* --- Section: Full Width Interactive Map --- */}
            <div className={`w-full px-4 md:px-8 lg:px-12 pb-12 ${styles.animateIn} ${styles.delay4}`}>
                <Address address={siteConfig.company_address} />
            </div>
        </div>
    )
}



// const to = "james.koay@octagon-mold.com"
// const body = `From: ${name}\nEmail: ${email}\n\n${message}`
// const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
// window.open(gmailUrl, "_blank")

// Frontend only
// console.log("Form submitted locally:", { name, email, subject, message });
// alert("Thank you for your message! This form is currently in demo mode.");
