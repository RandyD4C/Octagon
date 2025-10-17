import { capitalize } from "../../utils/formatters"

export default function ContactList({ contacts }) {
    const content_style = "text-sm text-gray-600 mt-1";
    
    return (
        <div className="grid gap-4">
            {Object.entries(contacts).map((user) => (
                <div key={user[0]} className="block p-4 rounded-lg border">
                    <h2 className="text-lg font-semibold text-brand">{capitalize(user[0])}</h2>
                    <p className={content_style}>{user[1].position}</p>
                    <p className={content_style}><strong>Phone:</strong> {user[1].phone}</p>
                    <p className={content_style}><strong>Email:</strong> {user[1].email}</p>
                </div>
            ))}
        </div>
    )
}
