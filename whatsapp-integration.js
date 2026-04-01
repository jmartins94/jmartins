// whatsapp-integration.js

// This file handles the integration of a WhatsApp button and manages inventory using data from Google Sheets.

// Function to send a message via WhatsApp
function sendWhatsAppMessage(phoneNumber, message) {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Function to fetch inventory data from Google Sheets
async function fetchInventoryData(sheetId, range) {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=YOUR_API_KEY`);
    const data = await response.json();
    return data.values;
}

// Example usage
const phoneNumber = '1234567890';
const message = 'Hello, this is a test message!';
sendWhatsAppMessage(phoneNumber, message);

// Call to fetch inventory data
fetchInventoryData('YOUR_SHEET_ID', 'Sheet1!A1:D10').then(data => {
    console.log(data);
});