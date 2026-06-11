import styles from "../../styles/contact.module.css"

export default function Address(address) {
    const map_source = `https://www.google.com/maps/embed/v1/place?q=place_id:ElcyLCBMZWJ1aHJheWEgTWF5YW5nIFBhc2lyLCBCYW5kYXIgQmF5YW4gQmFydSwgMTE5MDAgQmF5YW4gTGVwYXMsIFB1bGF1IFBpbmFuZywgTWFsYXlzaWEiMBIuChQKEgk3zIaSbsBKMBHxsggAPPq0oxACKhQKEgmdA58obMBKMBFZUk6eFlaXIw&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`;

    return (
        <div className={styles.addressSection}>
            <p>
                <strong>Address:</strong> {address.address}
            </p>

            {/* Google Map Embed */}
            <div className={styles.addressMap}>
                <iframe width="100%"
                    height="500"
                    title="Octagon Precision Mold location map"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={map_source}>
                </iframe>
            </div>
        </div>
    )
}
