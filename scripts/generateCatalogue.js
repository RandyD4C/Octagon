import fs from "fs";
import path from "path";

// 📁 output file path
const output_dir = path.join(process.cwd(), "public/data");
const output_file = path.join(output_dir, "_local_catalogues.json");
const number_of_entries = 10;

// 🧩 helper functions
const randomString = (length = 8) =>
  Math.random().toString(36).substring(2, 2 + length);

const categories = ["Mold Components", "Fasteners", "Magnets", "Pneumatics", "Inserts"];

// Generate dummy catalogue entries
const generateCatalogue = (count = 10) => {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      id,
      name: `Product ${id} - ${randomString(5).toUpperCase()}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category,
      file: "/catalogues/insert-nuts.pdf",
    };
  });
};

// Generate JSON
const catalogue_data = generateCatalogue(number_of_entries);

// Ensure output directory exists
if (!fs.existsSync(output_dir)) {
  fs.mkdirSync(output_dir);
}

// Write JSON file
fs.writeFileSync(output_file, JSON.stringify(catalogue_data, null, 2), "utf-8");

console.log(`✅ Generated ${catalogue_data.length} fake catalogue entries at:`);
console.log(`📄 ${output_file}`);
