const sharp = require("sharp");
const glob = require("glob");
const fs = require("node:fs").promises;
const path = require("node:path");
const fsSync = require("node:fs");

const inputDir = "public/images/posts";
const outputDir = "public/images/posts";

async function optimizeImages() {
  console.log("Starting image optimization process");
  console.log(`Input directory: ${inputDir}`);
  console.log(`Output directory: ${outputDir}`);

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Get all image files
  const files = glob.sync(`${inputDir}/**/*.{jpg,jpeg,png}`);
  console.log(`Found ${files.length} images to process`);

  // Organize files by directory
  const filesByDir = {};

  // Group files by directory
  for (const file of files) {
    const dirPath = path.dirname(file);
    if (!filesByDir[dirPath]) {
      filesByDir[dirPath] = [];
    }
    filesByDir[dirPath].push(file);
  }

  // Process each directory separately for proper sequential numbering
  for (const dirPath in filesByDir) {
    const dirFiles = filesByDir[dirPath];
    const folderName = path.basename(dirPath);
    console.log(
      `Processing directory: ${dirPath} with ${dirFiles.length} files`,
    );

    // Track which files already match the pattern
    const existingNumbers = new Set();
    const needsRenameFiles = [];

    // First pass: identify existing pattern-matching files
    for (const file of dirFiles) {
      const ext = path.extname(file);
      const baseFileName = path.basename(file, ext);
      const regex = new RegExp(`^${folderName}-(\\d+)$`);
      const match = baseFileName.match(regex);

      if (match) {
        const num = Number.parseInt(match[1], 10);
        existingNumbers.add(num);
        console.log(
          `File ${baseFileName} already follows naming pattern with number ${num}`,
        );
      } else {
        needsRenameFiles.push(file);
      }
    }

    // Second pass: process files that need renaming with sequential numbers
    let nextNumber = 1;
    for (const file of needsRenameFiles) {
      // Find next available number
      while (existingNumbers.has(nextNumber)) {
        nextNumber++;
      }

      const ext = path.extname(file);
      const baseFileName = path.basename(file, ext);
      const newBaseName = `${folderName}-${nextNumber}`;

      console.log(`Renaming file: ${baseFileName} to ${newBaseName}`);
      existingNumbers.add(nextNumber);
      nextNumber++;

      // Create WebP file with new name
      const webpOutputPath = path.resolve(dirPath, `${newBaseName}.webp`);
      console.log(`WebP output path: ${webpOutputPath}`);

      try {
        // Process the image
        await sharp(file)
          .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpOutputPath);

        // Verify file exists and has content
        const stats = await fs.stat(webpOutputPath);
        console.log(
          `WebP file created: ${webpOutputPath}, Size: ${stats.size} bytes`,
        );

        if (stats.size > 0) {
          console.log(`Successfully created WebP file: ${webpOutputPath}`);
          console.log(
            `File was renamed from ${baseFileName} to ${newBaseName}`,
          );

          // Only delete original after confirming the new file exists
          await fs.unlink(file);
          console.log(`Deleted original: ${file}`);
        } else {
          console.error(
            `WebP file was created but has zero size: ${webpOutputPath}`,
          );
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }

    // Third pass: Process files that already match the pattern
    for (const file of dirFiles) {
      const ext = path.extname(file);
      const baseFileName = path.basename(file, ext);
      const regex = new RegExp(`^${folderName}-(\\d+)$`);
      const match = baseFileName.match(regex);

      if (!match) continue; // Skip files that we already processed in previous loop

      // Create WebP file with same name
      const webpOutputPath = path.resolve(dirPath, `${baseFileName}.webp`);
      console.log(
        `WebP output path for existing pattern file: ${webpOutputPath}`,
      );

      try {
        // Process the image
        await sharp(file)
          .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpOutputPath);

        // Verify file exists and has content
        const stats = await fs.stat(webpOutputPath);
        console.log(
          `WebP file created: ${webpOutputPath}, Size: ${stats.size} bytes`,
        );

        if (stats.size > 0) {
          console.log(`Successfully created WebP file: ${webpOutputPath}`);

          // Only delete original after confirming the new file exists
          await fs.unlink(file);
          console.log(`Deleted original: ${file}`);
        } else {
          console.error(
            `WebP file was created but has zero size: ${webpOutputPath}`,
          );
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }
}

optimizeImages()
  .then(() => console.log("Image optimization complete!"))
  .catch((err) => console.error("Error in optimization process:", err));
