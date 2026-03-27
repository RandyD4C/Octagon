export default function PageHeader({ title, subtitle }) {
  return (
    <div className="w-full text-center bg-white py-3 mb-2">
      <h1 className="text-[34px] sm:text-5xl font-extrabold text-brand text-[#4877BE]">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}