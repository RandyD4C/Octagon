export default function PageHeader({ title, subtitle, headingLevel = 1 }) {
  const Heading = headingLevel === 2 ? "h2" : "h1"

  return (
    <div className="w-full text-center bg-white py-3 mb-2">
      <Heading className="text-[34px] sm:text-5xl font-extrabold text-brand text-[#4877BE]">{title}</Heading>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}
