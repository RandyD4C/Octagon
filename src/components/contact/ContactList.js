import { cleanPhoneNumber } from "../../utils/formatters"
import styles from "../../styles/contact.module.css"

export default function ContactList({ contacts }) {
    const whatsapp_link = "https://wa.me/";

    return (
        <div className={styles.list}>
            {contacts.map((user) => (
                <div key={user.name} className={styles.card}>
                    <div className={styles.cardContent}>
                        <a href={`${whatsapp_link + cleanPhoneNumber(user.phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.cardName}>{user.name}</a>
                        <p className={styles.cardDetail}>{user.position}</p>
                        <p className={styles.cardDetail}><strong>Phone:</strong> {user.phone}</p>
                        <p className={styles.cardDetail}><strong>Email:</strong> {user.email}</p>
                    </div>
                    <a href={`${whatsapp_link + cleanPhoneNumber(user.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardWhatsapp}>
                        <img
                            src="../../icon/whatsapp.webp"
                            alt={`Chat with ${user.name} on WhatsApp`}
                            className={styles.cardWhatsappImg}
                        />
                    </a>
                </div>
            ))}
        </div>
    )
}
