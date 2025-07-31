/* Canvas QR Generator Script */
/* This script is loaded by the bookmarklet to generate QR codes from Canvas People page */

window.generateCanvasQR = function() {
    // Prevent multiple instances
    if (document.getElementById('qr-generator-overlay')) {
        return;
    }

    // Load required libraries
    const libs = [
        'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    ];

    let loadedCount = 0;

    function loadLib(src, callback) {
        // Check if library is already loaded
        if ((src.includes('qrcode') && window.QRCode) || 
            (src.includes('jspdf') && window.jspdf)) {
            loadedCount++;
            if (loadedCount === libs.length) callback();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === libs.length) callback();
        };
        script.onerror = () => {
            console.error('Failed to load:', src);
            showStatus('Failed to load required libraries. Please try again.', 'error');
        };
        document.head.appendChild(script);
    }

    function loadAllLibs(callback) {
        libs.forEach(lib => loadLib(lib, callback));
    }

    // Create overlay UI
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'qr-generator-overlay';
        overlay.innerHTML = `
            <div style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif;'>
                <div style='background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;'>
                    <h2 style='margin-top: 0; color: #333; text-align: center;'>📋 Canvas Students Found</h2>
                    <div id='student-list' style='max-height: 300px; overflow-y: auto; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px; padding: 15px; background: #f8f9fa;'></div>
                    <div style='text-align: center; margin: 20px 0;'>
                        <button id='generate-qr-btn' style='background: #28a745; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px;'>📄 Generate QR Codes PDF</button>
                        <button id='close-overlay-btn' style='background: #6c757d; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;'>❌ Cancel</button>
                    </div>
                    <div id='status' style='margin-top: 15px; text-align: center; color: #666; min-height: 20px;'></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // Extract student data from Canvas
    function extractStudents() {
        const students = [];
        
        // Try different Canvas layouts - these selectors work with most Canvas versions
        const selectors = [
            // New Canvas interface
            '[data-testid*="user"] a[href*="/users/"]',
            'tr[data-testid*="user"] td a[href*="/users/"]',
            
            // Classic Canvas interface  
            '.roster_user_name a[href*="/users/"]',
            '.student_roster .student .name a[href*="/users/"]',
            
            // Generic fallbacks
            'a[href*="/users/"][href*="/courses/"]',
            '.user_name a[href*="/users/"]'
        ];
        
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`Found ${elements.length} students using selector: ${selector}`);
                
                elements.forEach(el => {
                    const name = el.textContent.trim();
                    const href = el.href;
                    const idMatch = href.match(/users\/(\d+)/);
                    const id = idMatch ? idMatch[1] : '';
                    
                    // Filter out obviously non-student entries
                    if (name && id && name.length > 2 && name.length < 100 && 
                        !name.toLowerCase().includes('test user') &&
                        !students.find(s => s.id === id)) {
                        students.push({
                            name: name,
                            id: id,
                            displayText: `${name} (${id})`
                        });
                    }
                });
                break; // Use the first selector that finds students
            }
        }
        
        // Remove duplicates and sort by name
        const uniqueStudents = students.filter((student, index, self) => 
            index === self.findIndex(s => s.id === student.id)
        ).sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`Extracted ${uniqueStudents.length} unique students`);
        return uniqueStudents;
    }

    // Show status message
    function showStatus(message, type = 'info') {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            const colors = {
                info: '#007bff',
                success: '#28a745', 
                error: '#dc3545',
                warning: '#ffc107'
            };
            statusEl.innerHTML = `<div style="color: ${colors[type]}; font-weight: bold;">${message}</div>`;
        }
    }

    // Generate PDF with QR codes
    async function generateQRPDF(students) {
        showStatus('🔄 Generating QR codes...', 'info');
        
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            
            // PDF layout settings
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;
            const qrSize = 40;
            const cols = 2;
            const rows = 6;
            const cellWidth = (pageWidth - margin * 2) / cols;
            const cellHeight = (pageHeight - margin * 2) / rows;
            
            let currentRow = 0;
            let currentCol = 0;
            
            // Add title to first page
            pdf.setFontSize(16);
            pdf.text('Student QR Codes', pageWidth / 2, 15, { align: 'center' });
            pdf.setFontSize(10);
            pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 25, { align: 'center' });
            
            for (let i = 0; i < students.length; i++) {
                const student = students[i];
                showStatus(`🔄 Processing ${i + 1}/${students.length}: ${student.name}`, 'info');
                
                // Generate QR code
                const canvas = document.createElement('canvas');
                await QRCode.toCanvas(canvas, student.displayText, { 
                    width: 200, 
                    margin: 1,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                const qrDataUrl = canvas.toDataURL();
                
                // Calculate position
                const x = margin + currentCol * cellWidth;
                const y = margin + 35 + currentRow * cellHeight;
                
                // Add QR code
                pdf.addImage(qrDataUrl, 'PNG', x + (cellWidth - qrSize) / 2, y, qrSize, qrSize);
                
                // Add student info
                pdf.setFontSize(9);
                const textY = y + qrSize + 8;
                pdf.text(student.name, x + cellWidth / 2, textY, { 
                    align: 'center', 
                    maxWidth: cellWidth - 5 
                });
                pdf.text(`ID: ${student.id}`, x + cellWidth / 2, textY + 7, { 
                    align: 'center', 
                    maxWidth: cellWidth - 5 
                });
                
                // Move to next position
                currentCol++;
                if (currentCol >= cols) {
                    currentCol = 0;
                    currentRow++;
                    if (currentRow >= rows) {
                        currentRow = 0;
                        pdf.addPage();
                        pdf.setFontSize(16);
                        pdf.text('Student QR Codes (continued)', pageWidth / 2, 15, { align: 'center' });
                    }
                }
            }
            
            // Generate filename from page title or use default
            const courseName = document.title.split(' - ')[0] || document.title.split(':')[0] || 'Course';
            const cleanName = courseName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
            const fileName = `${cleanName}_QR_Codes_${new Date().toISOString().split('T')[0]}.pdf`;
            
            // Save PDF
            pdf.save(fileName);
            
            showStatus(`✅ Success! Generated ${students.length} QR codes in PDF`, 'success');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            showStatus('❌ Error generating PDF. Please try again.', 'error');
        }
    }

    // Main execution
    console.log('Canvas QR Generator: Starting...');
    createOverlay();
    
    const students = extractStudents();
    
    if (students.length === 0) {
        document.getElementById('student-list').innerHTML = `
            <div style="color: #dc3545; text-align: center; padding: 20px;">
                <h4>⚠️ No students found</h4>
                <p>Make sure you're on the Canvas <strong>People</strong> page and students are visible.</p>
                <p><small>Try scrolling down to load all students, then run the bookmarklet again.</small></p>
            </div>
        `;
        document.getElementById('generate-qr-btn').disabled = true;
        document.getElementById('generate-qr-btn').style.opacity = '0.5';
        return;
    }
    
    // Display found students
    const listEl = document.getElementById('student-list');
    listEl.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <strong style="color: #28a745;">✅ Found ${students.length} students</strong>
        </div>
        <div style="max-height: 200px; overflow-y: auto;">
            ${students.map(s => `
                <div style='padding: 8px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;'>
                    <span>${s.name}</span>
                    <small style="color: #666;">ID: ${s.id}</small>
                </div>
            `).join('')}
        </div>
    `;
    
    // Event listeners
    document.getElementById('close-overlay-btn').onclick = () => {
        document.body.removeChild(document.getElementById('qr-generator-overlay'));
    };
    
    document.getElementById('generate-qr-btn').onclick = () => {
        loadAllLibs(() => generateQRPDF(students));
    };
    
    console.log(`Canvas QR Generator: Ready with ${students.length} students`);
};