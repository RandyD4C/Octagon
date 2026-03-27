import { capitalize, cleanPhoneNumber } from "../../utils/formatters"
import styles from "../../styles/contact.module.css"

export default function ContactList({ contacts }) {
    const whatsapp_link = "https://wa.me/";

    return (
        <div className={styles.list}>
            {Object.entries(contacts).map((user) => (
                <div key={user[0]} className={styles.card}>
                    <div className={styles.cardContent}>
                        <a href={`${whatsapp_link + cleanPhoneNumber(user[1].phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.cardName}>{capitalize(user[0])}</a>
                        <p className={styles.cardDetail}>{user[1].position}</p>
                        <p className={styles.cardDetail}><strong>Phone:</strong> {user[1].phone}</p>
                        <p className={styles.cardDetail}><strong>Email:</strong> {user[1].email}</p>
                    </div>
                    <a href={`${whatsapp_link + cleanPhoneNumber(user[1].phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardWhatsapp}>
                        <img src="../../icon/whatsapp.png" className={styles.cardWhatsappImg} />
                    </a>
                </div>
            ))}
        </div>
    )
}
