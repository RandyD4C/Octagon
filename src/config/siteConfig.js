const is_dev = process.env.NODE_ENV === "development";

const SITE_CONFIG = {
  company_name: "Octagon Precision Mold",
  company_address: "No 2, Lebuh Mayang Pasir, Bayan Baru 11950, Pulau Pinang, MALAYSIA",
  tagline:
    "20 years of brand focus — empowering intelligent mold strategic service providers, serving 60+ countries and 20,000 customers worldwide.",
  contacts: {
    tim: {
      email: "tim@octagon-mold.com",
      phone: "+60 10-566 7991",
      position: "Managing Director",
    },
    james: {
      email: "james.koay@octagon-mold.com",
      phone: "+6016 420 5848",
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