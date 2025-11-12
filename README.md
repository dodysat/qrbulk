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

## Docker Hub 🐳

This project includes automatic Docker Hub publishing via GitHub Actions.

### Using Pre-built Image from Docker Hub

```bash
# Pull the latest image
docker pull YOUR_DOCKERHUB_USERNAME/qr-bulk-generator:latest

# Run it
docker run --rm \
  -v $(pwd)/sample.csv:/app/input/sample.csv:ro \
  -v $(pwd)/output:/app/output \
  YOUR_DOCKERHUB_USERNAME/qr-bulk-generator:latest
```

### Setting Up GitHub Actions for Docker Hub

To enable automatic publishing to Docker Hub:

1. **Create a Docker Hub Access Token**:
   - Go to [Docker Hub](https://hub.docker.com/)
   - Navigate to Account Settings → Security → New Access Token
   - Create a token with Read & Write permissions
   - Copy the token (you won't see it again!)

2. **Add GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Click "New repository secret" and add:
     - Name: `DOCKERHUB_USERNAME` | Value: Your Docker Hub username
     - Name: `DOCKERHUB_TOKEN` | Value: Your Docker Hub access token

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Docker Hub publishing"
   git push origin main
   ```

4. **Automatic Publishing**:
   - On push to `main`/`master`: Publishes with `latest` tag
   - On version tags (e.g., `v1.0.0`): Publishes with version tags
   - The workflow builds for both `linux/amd64` and `linux/arm64` platforms

### Creating Version Releases

```bash
# Tag a new version
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will automatically publish to Docker Hub with tags:
- `v1.0.0`
- `1.0.0`
- `1.0`
- `1`
- `latest`

## License

MIT License - Feel free to use and modify!

---

Made with ❤️ for bulk QR code generation

