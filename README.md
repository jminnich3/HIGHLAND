# Highland Cattle Calculator - PHP Version

A web-based genetic calculator for Highland cattle color prediction and breeding outcomes.

## 🚀 Quick Start

### Running the PHP Development Server

```bash
cd /Users/joshuaminnich/Library/CloudStorage/OneDrive-Personal/Creatures/repos/HIGHLAND
php -S localhost:8000
```

Then open your browser to: **http://localhost:8000**

### Stopping the Server

```bash
# If running in foreground: Press Ctrl+C

# If running in background:
pkill -f "php -S localhost:8000"
```

## 📁 Project Structure

```
HIGHLAND/
├── index.php                   # Color Calculator (main page)
├── breeding-calculator.php     # Breeding Calculator (redirects to HTML)
├── breeding-calculator.html    # Breeding Calculator (original)
├── highland-calculator.html    # Original color calculator (backup)
│
├── includes/                   # PHP includes
│   ├── config.php             # Configuration & helper functions
│   ├── header.php             # HTML head & common CSS
│   ├── nav.php                # Navigation menu
│   ├── breed-tabs.php         # Breed selection tabs
│   ├── footer.php             # Closing HTML tags
│   └── calculator-styles.php  # Calculator-specific CSS
│
├── js/                        # JavaScript files
│   └── highland-calculator.js # Color calculator logic
│
├── images/                    # Cattle images & breed calculators
│   ├── HighlandsFinal/       # Highland cattle SVGs
│   ├── WhitePark/            # White Park calculators
│   ├── Shorthorn/            # Shorthorn calculators
│   ├── Hereford/             # Hereford calculators
│   └── ... (other image folders)
│
└── backgrounds/               # Background images
    └── Background1.png
```

## 🔧 Features

- **Modular PHP Structure**: Reusable includes for header, nav, and footer
- **Multiple Breeds**: Highland, White Park, Shorthorn, and Hereford cattle
- **Color Calculator**: Interactive genetic allele selection
- **Breeding Calculator**: Offspring probability predictions
- **Responsive Design**: Works on desktop and mobile

## 🧬 How It Works

The calculators use Mendelian genetics to predict coat colors based on:
- **MC1R (Extension)**: Controls black vs red pigment
- **PMEL (Dilution)**: Lightens coat color
- **ASIP (Agouti)**: Controls color patterns (brindle, points)

## 🛠️ Development

### Requirements
- PHP 8.0 or higher (PHP 8.2.29 currently running)
- Modern web browser

### File Types
- `.php` - PHP server-rendered pages
- `.html` - Static pages for other breeds
- `.js` - Client-side calculator logic
- `.svg` - Cattle illustrations

## 📝 Notes

- The breeding calculator currently redirects to the HTML version
- All breed navigation links updated to use PHP files
- Original HTML files preserved as backups

## 🔗 Navigation

- **Color Calculator**: `/index.php`
- **Breeding Calculator**: `/breeding-calculator.php`
- **Other Breeds**: Located in `/images/` subdirectories

---

Built with PHP, JavaScript, and cattle genetics! 🐄
