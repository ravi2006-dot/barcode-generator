const bwipjs = require('bwip-js');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Generate a barcode and save it as an image with custom colors
function generateBarcode(text, format, filename) {
    bwipjs.toBuffer(
        {
            bcid: format,          // Barcode format (e.g., 'code128', 'ean13', 'upc')
            text: text,            // Text or number to encode
            scale: 3,              // Scale factor
            height: 10,            // Bar height
            includetext: true,     // Include human-readable text
            textxalign: 'center',  // Align text to center
            backgroundcolor: '#ffffff', // Background color (white)
            color: '#000000',        // Barcode line color (black)
        },
        (err, png) => {
            if (err) {
                console.error('⚠️ Error generating barcode:', err.message);
                return;
            }

            // Save the barcode as an image
            fs.writeFileSync(filename, png);
            console.log(`✅ Barcode saved as ${filename}`);
        }
    );
}

// Display the CLI menu
function displayMenu() {
    console.log('\n--- Barcode Generator CLI App ---');
    console.log('1. Generate a barcode');
    console.log('2. Exit');
    rl.question('Choose an option: ', handleMenu);
}

// Handle menu options
function handleMenu(option) {
    switch (option) {
        case '1':
            rl.question('Enter the text or number for the barcode: ', (text) => {
                rl.question('Enter the barcode format (e.g., code128, ean13, upc): ', (format) => {
                    rl.question('Enter the output file name (e.g., barcode.png): ', (filename) => {
                        generateBarcode(text, format, filename);
                        displayMenu();
                    });
                });
            });
            break;
        case '2':
            console.log('Goodbye! 🖨️');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please try again.');
            displayMenu();
    }
}

// Start the app
displayMenu();
