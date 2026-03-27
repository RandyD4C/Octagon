const is_dev = process.env.NODE_ENV === "development";

const SITE_CONFIG = {
  company_name: "Octagon Precision Mold",
  company_address: "No 2, Lebuh Mayang Pasir, Bayan Baru 11950, Pulau Pinang, MALAYSIA",
  tagline:
    "20 years of brand focus — empowering intelligent mold strategic service providers, serving 60+ countries and 20,000 customers worldwide.",
  about: {
    paragraphs: [
      "Malaysia Octagon Precision Mold (M) SDN. BHD. specializes in manufacturing mold-related equipment and custom non-standard mould parts. With 225 skilled designers and quality inspectors, we form a strong technical and management team.",
      "Equipped with advanced precision machining and inspection systems, we achieve tolerances up to ±0.002 mm and mirror surface finishes of Ra0.05-Ra0.2. We are committed to delivering high-quality, cost-effective products with reliable lead times — ensuring customer satisfaction through precision and professionalism."
    ]
  },
  contacts: {
    james: {
      email: "james.koay@octagon-mold.com",
      phone: "+60 16-420 5848",
      position: "Sales Manager",
    },
    randy: {
      email: "sales@octagon-mold.com",
      phone: "+60 17-415 2563",
      position: "Sales Engineer",
    }
  },
  brand_color: "#154A9A",
  site_url: "https://octagon-catalogue.vercel.app", // update after deploy
  is_dev,
}

export default SITE_CONFIG