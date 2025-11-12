# QR Code Bulk Generator 📦

Generate QR codes in bulk from a CSV file, automatically zipped and ready to download!

## Features ✨

- 🚀 Fast bulk QR code generation
- 📦 Automatic ZIP compression
- 🐳 Docker-ready (no setup needed)
- 📊 CSV input support
- 🎨 High-quality PNG output (500x500px)
- ⚡ Easy one-command execution

## Quick Start 🏃

### Using Docker Compose (Recommended)

1. **Prepare your CSV file** (or use the provided `sample.csv`):
   ```csv
   content,filename
   https://example.com,example.png
   Your text here,myqr.png
   ```

2. **Run the generator**:
   ```bash
   docker-compose up --build
   ```

3. **Get your files**:
   - Find the ZIP file in `./output/qrcodes.zip`
   - Extract and use your QR codes!

### Using Docker Run

```bash
# Build the image
docker build -t qr-bulk-generator .

# Run with your CSV
docker run --rm \
  -v $(pwd)/sample.csv:/app/input/sample.csv:ro \
  -v $(pwd)/output:/app/output \
  qr-bulk-generator
```

### Using Node.js Directly

```bash
# Install dependencies
npm install

# Run the generator
npm start
```

## CSV Format 📋

Your CSV file should have two columns:

| Column Name | Description |
|------------|-------------|
| `content` | The text/URL to encode in the QR code |
| `filename` | The output filename (e.g., `myqr.png`) |

**Example CSV:**
```csv
content,filename
https://example.com/user1,user1-qr.png
https://example.com/user2,user2-qr.png
Contact: John Doe,contact-john.png
```

**Supported column name variations:**
- `content`, `Content`
- `filename`, `Filename`, `file name`, `File Name`

## Output 📤

- Individual QR codes are generated as PNG files
- All files are automatically compressed into `qrcodes.zip`
- The ZIP file is placed in the `./output` directory
- QR codes are 500x500px with high error correction

## Configuration ⚙️

You can customize the QR code generation by editing `index.js`:

```javascript
QRCode.toFile(outputPath, content, {
  errorCorrectionLevel: 'H',  // L, M, Q, H
  type: 'png',
  quality: 0.95,
  margin: 1,                   // White border size
  width: 500,                  // Image width in pixels
  color: {
    dark: '#000000',           // QR code color
    light: '#FFFFFF'           // Background color
  }
});
```

## Troubleshooting 🔧

### Permission Issues
```bash
chmod 755 output
```

### Custom CSV Location
```bash
docker run --rm \
  -v $(pwd)/my-custom.csv:/app/input/sample.csv:ro \
  -v $(pwd)/output:/app/output \
  qr-bulk-generator
```

### Check Logs
```bash
docker-compose logs -f
```

## Project Structure 📁

```
qrbulk/
├── index.js              # Main application
├── package.json          # Node.js dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── sample.csv            # Example CSV file
├── output/               # Generated ZIP files (created automatically)
└── README.md            # This file
```

## Dependencies 📚

- **qrcode** - QR code generation
- **csv-parser** - CSV file parsing
- **archiver** - ZIP compression
- **Node.js 18+** - Runtime environment

## License

MIT License - Feel free to use and modify!

---

Made with ❤️ for bulk QR code generation

