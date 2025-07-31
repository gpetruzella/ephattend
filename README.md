# QR Attendance Scanner

A minimalist, local-first Progressive Web App (PWA) for college instructors to take attendance in large classrooms using QR code scanning. Students scan their QR codes, and attendance data is stored locally for easy CSV export.

## ✨ Features

- **QR Code Scanning**: Uses device camera to scan student QR codes
- **Local-First Data**: All attendance records stored locally in browser
- **Multi-Day Tracking**: Automatically organizes attendance by date
- **CSV Export**: Export all attendance data to CSV format
- **Offline Capable**: Works completely offline after installation
- **Cross-Platform**: Runs on iOS, Android, and desktop browsers
- **No Backend Required**: Pure client-side application

## 🎯 Why PWA?

This app is built as a Progressive Web App to solve a critical limitation: mobile browsers block camera access for HTML files opened via `file://` protocol. By converting to a PWA, we maintain the local-first philosophy while ensuring reliable camera access on all devices.

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Enable GitHub Pages in repository Settings
3. Visit your GitHub Pages URL on mobile device
4. Tap "Install App" when prompted
5. Grant camera permissions when requested

### Option 2: Local Development
```bash
# Clone the repository
git clone [repository-url]
cd qr-attendance-scanner

# Serve locally (Python example)
python -m http.server 8000

# Visit http://localhost:8000
# Install as PWA when prompted
```

### Option 3: Any Web Server
Upload all files to any web hosting service and visit the URL.

## 📱 Installation & Usage

### Installation
1. **Visit the app URL** in your mobile browser
2. **Install prompt appears** - tap "Install App" 
3. **Grant camera permission** when requested
4. **App installs** to your home screen like a native app

### Daily Usage
1. **Open the installed app** (works offline!)
2. **Tap "Start Scanning"**
3. **Point camera at student QR codes**
4. **Students are automatically logged** with timestamp
5. **Tap "Stop Scanning"** when finished
6. **Export CSV** when needed

### Managing Data
- **View past days**: Use date selector dropdown
- **Remove individual entries**: Tap "Remove" next to any student
- **Clear specific day**: Use "Clear Attendance for This Day"
- **Export all data**: "Export All Attendance (CSV)" button
- **Reset everything**: "Clear All Saved Data" (use carefully!)

## 📁 File Structure

```
├── index.html          # Main application file
├── manifest.json       # PWA configuration
├── sw.js              # Service worker for PWA functionality
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
└── README.md          # This file
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5/CSS3/JavaScript**: Core web technologies
- **jsQR Library**: QR code scanning functionality
- **Web APIs**: Camera access, localStorage, Service Workers
- **PWA Standards**: Web App Manifest, Service Worker

### Browser Support
- **Mobile**: iOS Safari 11.3+, Chrome Android 67+
- **Desktop**: Chrome 67+, Firefox 63+, Safari 11.1+
- **Camera**: Requires HTTPS or localhost for camera access

### Data Storage
- **Local Storage**: All data stored in browser's localStorage
- **Format**: JSON structure organized by date
- **Privacy**: No data leaves the device unless exported
- **Persistence**: Data survives browser restarts and app updates

### PWA Features
- **Installable**: Add to home screen functionality
- **Offline**: Full functionality without internet
- **Native Feel**: Standalone display mode
- **Auto-Update**: Updates when files change on server

## 🔒 Privacy & Security

- **Local-Only**: All attendance data stays on the device
- **No Tracking**: No analytics or external connections
- **HTTPS Required**: Camera access requires secure connection
- **User Control**: Users can export or delete all data anytime

## 🧪 Testing

### Manual Testing Checklist
- [ ] PWA installs correctly on iOS/Android
- [ ] Camera access works after installation  
- [ ] QR codes scan and register attendance
- [ ] Data persists across app restarts
- [ ] CSV export downloads correctly
- [ ] Multiple days of data handled properly
- [ ] Remove/clear functions work as expected
- [ ] Offline functionality works

### QR Code Testing
Generate test QR codes containing simple student IDs:
- `STUDENT001`
- `STUDENT002` 
- `STUDENT003`

## 🎨 Customization

### Styling
Modify CSS in `index.html` to match your institution's branding.

### Icons
Replace `icon-192.png` and `icon-512.png` with your custom icons.

### App Name
Update the `name` field in `manifest.json` to customize the app name.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for detail.

## 🙋‍♂️ Support

For questions or issues:
1. Check existing [Issues](../../issues)
2. Create a new issue with detailed description
3. Include device/browser information for bug reports

## 🎓 Use Cases

Perfect for:
- **Large lecture halls** with 100+ students
- **Lab sessions** requiring attendance tracking  
- **Conferences** and events
- **Any situation** requiring quick, contactless check-in

---

**Built with ❤️ for educators who value simplicity and privacy.**
