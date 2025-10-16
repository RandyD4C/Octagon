export default function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-brand">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}