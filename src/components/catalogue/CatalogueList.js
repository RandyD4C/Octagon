export default function CatalogueList({ catalogues }) {
    return (
        <div className="grid gap-4">
            {catalogues.map((item) => (
                <a
                key={item.id}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border hover:bg-gray-100 transition"
                >
                <h2 className="text-lg font-semibold text-brand">{item.name}</h2>
                {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
                </a>
            ))}
        </div>
    )
}
