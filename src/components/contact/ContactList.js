import { capitalize, cleanPhoneNumber } from "../../utils/formatters"

export default function ContactList({ contacts }) {
    const content_style = "text-sm text-gray-600 mt-1",
        whatsapp_link = "https://wa.me/";
    
    return (
        <div className="grid gap-4">
            {Object.entries(contacts).map((user) => (
                <div key={user[0]} className="block p-4 rounded-lg border">
                    <a href={`${whatsapp_link + cleanPhoneNumber(user[1].phone)}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="float-right mt-9">
                        <img src="../../icon/whatsapp.png" className="w-10 h-10 rounded-full object-cover" />
                    </a>
                    <h2 className="text-lg font-semibold text-brand">{capitalize(user[0])}</h2>
                    <p className={content_style}>{user[1].position}</p>
                    <p className={content_style}><strong>Phone:</strong> {user[1].phone}</p>
                    <p className={content_style}><strong>Email:</strong> {user[1].email}</p>
                </div>
            ))}
        </div>
    )
}
