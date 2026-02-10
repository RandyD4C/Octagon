export default function PageHeader({ title, subtitle }) {
  return (
    <div className="w-full text-center mb-8 sticky top-[64px] z-40 bg-white py-3">
      <h1 className="text-4xl font-extrabold text-brand text-[#4877BE]">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}