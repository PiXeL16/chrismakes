const sharp = require("sharp");
const glob = require("glob");
const fs = require("fs").promises;
const path = require("path");

const inputDir = "public/images/posts";
const outputDir = "public/images/posts";

async function optimizeImages() {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Get all image files
  const files = glob.sync(`${inputDir}/**/*.{jpg,jpeg,png}`);

  for (const file of files) {
    const outputPath = file.replace(inputDir, outputDir);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    try {
      await sharp(file)
        .resize(1920, 1080, { fit: "inside", withoutEnlargement: true }) // Resize if larger than 1920x1080
        .webp({ quality: 80 }) // Convert to WebP with 80% quality
        .toFile(outputPath.replace(/\.[^.]+$/, ".webp"));

      console.log(`Optimized: ${file} -> ${outputPath}`);

      // Delete the original file
      await fs.unlink(file);
    } catch (error) {
      console.error(`Error optimizing ${file}:`, error);
    }
  }
}

optimizeImages().then(() => console.log("Image optimization complete!"));
