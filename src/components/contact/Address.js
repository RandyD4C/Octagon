export default function Address(address) {
    const map_source = `https://www.google.com/maps/embed/v1/place?q=place_id:ElcyLCBMZWJ1aHJheWEgTWF5YW5nIFBhc2lyLCBCYW5kYXIgQmF5YW4gQmFydSwgMTE5MDAgQmF5YW4gTGVwYXMsIFB1bGF1IFBpbmFuZywgTWFsYXlzaWEiMBIuChQKEgk3zIaSbsBKMBHxsggAPPq0oxACKhQKEgmdA58obMBKMBFZUk6eFlaXIw&key=${process.env.GOOGLE_MAP_API}`;

    return (
        <div className='mt-4 bg-white p-4 border rounded'>
            <p>
                <strong>Address:</strong> {address.address}
            </p>

            {/* Google Map Embed */}
            <div className="mt-6 border rounded-lg overflow-hidden shadow-sm">
                <iframe width="100%"
                    height="400"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={map_source}>
                </iframe>
            </div>
        </div>
    ) 
}