# EphAttend: QR Attendance Scanner & Generator

A complete, minimalist attendance solution for college instructors. Generate QR codes for your students directly from Canvas, then use the scanner app to take attendance in large classrooms. Everything runs locally with full privacy protection.

## 📦 **Complete Solution Includes:**
- **🎯 QR Code Generator**: Extract students from Canvas and create printable QR codes  
- **📱 Attendance Scanner**: PWA for scanning QR codes and tracking attendance
- **📊 Data Export**: Local CSV export with full attendance history

## ✨ Features

### 🎯 QR Code Generator
- **Canvas Integration**: Extract students directly from Canvas People page
- **One-Click Generation**: Bookmarklet runs on any Canvas course
- **Print-Ready Output**: Clean 2×6 grid layout for easy distribution

### 📱 Attendance Scanner  
- **QR Code Scanning**: Uses device camera to scan student QR codes
- **Local-First Data**: All attendance records stored locally in browser
- **Multi-Day Tracking**: Automatically organizes attendance by date
- **CSV Export**: Export all attendance data to CSV format
- **Offline Capable**: Works completely offline after installation
- **Cross-Platform**: Runs on iOS, Android, and desktop browsers
- **No Backend Required**: Pure client-side application

## 🔄 Complete Workflow

```
📚 Canvas People Page 
    ↓ (run bookmarklet)
🎯 QR Code Generator → Extract Students → Generate PDF
    ↓ (print & distribute)
👥 Students Receive QR Codes
    ↓ (bring to class)
📱 Attendance Scanner → Scan QR Codes → Track Attendance  
    ↓ (export data)
📊 CSV Attendance Reports
```

## 🎯 Why PWA?

This app is built as a Progressive Web App to solve a critical limitation: mobile browsers block camera access for HTML files opened via `file://` protocol. By converting to a PWA, we maintain the local-first philosophy while ensuring reliable camera access on all devices.

## 🚀 Quick Start

### Step 1: Generate QR Codes for Students
1. **Visit the QR Generator page**: `gpetruzella.github.io/ephattend-qr`
2. **Drag the bookmarklet button** to your browser's bookmarks bar
3. **Navigate to your Canvas course People page** and ensure all student names are loaded
4. **Click the bookmarklet** to extract students and generate QR codes
5. **Print the PDF** and distribute QR codes to students

### Step 2: Install the Attendance Scanner
1. **For Attendance Scanning**: Visit `gpetruzella.github.io/ephattend` and install as PWA if desired
2. **Grant camera permission** when requested

### Daily Usage
1. **Open the installed app** (works offline!)
2. **Tap "Start Scanning"**
3. **Students show QR codes** to camera
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
├── index.html              # Main attendance scanner PWA
├── manifest.json           # PWA configuration  
├── sw.js                   # Service worker for PWA functionality
├── icon-192.png           # App icon (192x192)
├── icon-512.png           # App icon (512x512)
└── README.md              # This file
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
- **Privacy**: No data leaves the device unless exported
- **Persistence**: Data survives browser restarts and app updates

### PWA Features
- **Installable**: Add to home screen functionality
- **Offline**: Full functionality without internet
- **Native Feel**: Standalone display mode

## 🔒 Privacy & Security

- **Local-Only**: All attendance data stays on the device
- **No Tracking**: No analytics or external connections
- **HTTPS Required**: Camera access requires secure connection
- **User Control**: Faculty can export or delete all data anytime

## 🔧 Troubleshooting

### QR Generator Issues
**No students found on Canvas:**
- Ensure you're on the Canvas "People" page (not Grades or Modules)
- Scroll down to load all students (Canvas lazy-loads)
- Try switching to "All" or "Students" view if available
- Refresh the Canvas page and try again

**QR codes don't generate:**
- Check that pop-ups are allowed for Canvas domain
- Try running on desktop Chrome or Firefox
- Ensure stable internet connection for QR image generation

### Attendance Scanner Issues

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions or issues:
1. Check existing [Issues](../../issues)
2. Create a new issue with detailed description
3. Include device/browser information for bug reports

## 🎓 Use Cases

Perfect for:
- **Large lecture halls** with 100+ students
- **Canvas-integrated courses** (automatic student extraction)
- **Lab sessions** requiring attendance tracking  
- **Conferences** and events with registration lists
- **Any situation** requiring quick, contactless check-in with pre-distributed QR codes

The **two-app system** provides end-to-end attendance management:
- **Semester start**: Generate QR codes once from Canvas
- **Every class**: Quick scanning with mobile device  
- **Grade reporting**: Export CSV data anytime

---

**Built with ❤️ for educators who value simplicity, privacy, and seamless Canvas integration.**
