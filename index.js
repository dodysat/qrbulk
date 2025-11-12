const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const QRCode = require("qrcode");
const archiver = require("archiver");

const INPUT_CSV = process.env.INPUT_CSV || "/app/input/sample.csv";
const OUTPUT_DIR = "/app/output";
const QR_DIR = "/app/qrcodes";
const ZIP_FILE = path.join(OUTPUT_DIR, "qrcodes.zip");

// Ensure directories exist
if (!fs.existsSync(QR_DIR)) {
  fs.mkdirSync(QR_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log("🚀 QR Code Bulk Generator Started");
console.log(`📄 Reading CSV from: ${INPUT_CSV}`);

const qrPromises = [];

fs.createReadStream(INPUT_CSV)
  .pipe(csv())
  .on("data", (row) => {
    const content = row.content || row.Content;
    const filename =
      row.filename || row.Filename || row["file name"] || row["File Name"];

    if (!content || !filename) {
      console.warn("⚠️  Skipping row - missing content or filename:", row);
      return;
    }

    const outputPath = path.join(QR_DIR, filename);

    console.log(
      `📝 Processing: ${filename} -> ${content.substring(0, 50)}${
        content.length > 50 ? "..." : ""
      }`
    );

    const promise = QRCode.toFile(outputPath, content, {
      errorCorrectionLevel: "H",
      type: "png",
      quality: 0.95,
      margin: 1,
      width: 500,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    qrPromises.push(promise);
  })
  .on("end", async () => {
    console.log("\n⏳ Waiting for all QR codes to be generated...");

    try {
      await Promise.all(qrPromises);
      console.log(`✅ Generated ${qrPromises.length} QR codes successfully!`);

      // Create zip file
      console.log("\n📦 Creating ZIP archive...");
      await createZipArchive();

      console.log(`\n✨ Done! ZIP file created at: ${ZIP_FILE}`);
      console.log("🎉 All QR codes have been generated and zipped!");
    } catch (error) {
      console.error("❌ Error generating QR codes:", error);
      process.exit(1);
    }
  })
  .on("error", (error) => {
    console.error("❌ Error reading CSV:", error);
    process.exit(1);
  });

function createZipArchive() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(ZIP_FILE);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Maximum compression
    });

    output.on("close", () => {
      const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`📦 ZIP archive created: ${sizeInMB} MB`);
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(QR_DIR, false);
    archive.finalize();
  });
}
