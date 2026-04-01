// whatsapp-inventory.js

// Function to integrate WhatsApp button
function createWhatsAppButton(message) {
    const whatsappIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 2.417.71 4.676 1.93 6.551l-1.11 4.337c-.025.095-.004.196.052.278.057.082.148.135.247.159.1.024.203.004.288-.055l4.371-1.109c1.862 1.167 4.079 1.878 6.546 1.878 6.627 0 12-5.373 12-12s-5.373-12-12-12zm0 22c-2.091 0-4.086-.538-5.751-1.496l-.574-.318-1.665 4.161 3.557-.912c1.313.545 2.754.837 4.153.837 5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10c0 4.418 2.604 8.208 6.397 9.701l-1.899-7.071c-1.435-.273-2.47-1.781-2.47-2.714s1.206-2.175 2.936-2.175c1.029 0 2.4.847 3.057 2.109.661 1.296 1.124 2.892 1.555 4.035l1.535-.47c-.624-1.364-1.217-2.83-1.754-4.133-.208-.475-1.515-2.315-2.707-2.315-2.147 0-4.094 1.442-4.094 4.026 0 3 .768 4.375 1.951 5.52l-1.182-4.042c-.386-.828-.082-2.133.935-2.133 1.232 0 2.92 1.129 3.453 2.719s1.563 2.807 2.665 3.128l.56-.114c-.284-.578-.527-1.174-.763-1.747.977-.228 1.551-.262 1.551-1.057 0-.464-.301-.509-.778-.766l-.625.188c-.152-.555-.318-1.113-.493-1.707-.493-.486-1.132-.871-1.828-.871-1.203 0-2.267.75-2.267 2.122 0 1.243.75 2.209 1.565 2.209.246 0 .459-.035.678-.075.31-1.136.634-2.323 1.174-3.375 1.131 1.025 2.101 2.056 2.943 3.121.923 1.086 2.172 1.076 2.568 1.076v.003c3.556 0 4.811-4.372 4.811-6.54 0-.925-.254-1.75-.693-2.487-.328-.597-.799-.953-1.518-1.168l.516-.23c.897-.873 1.865-2.754 1.865-4.54 0-2.571-1.653-4.573-4.616-4.573z" fill="currentColor"/>
    </svg>`;

    const button = `
        <a href="https://wa.me/?text=${encodeURIComponent(message)}" target="_blank">
            <div style="display: flex; align-items: center; background-color: #25D366; color: white; padding: 10px; border-radius: 5px;">
                ${whatsappIcon}
                <span style="margin-left: 8px;">Send via WhatsApp</span>
            </div>
        </a>
    `;

    document.body.innerHTML += button;
}

// Function to manage inventory and retrieve data from Google Sheets
async function manageInventory() {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/YOUR_RANGE?key=YOUR_API_KEY');
    const data = await response.json();
    // Implement your inventory management logic using data here.
    console.log(data);
}

// Call the functions
window.onload = () => {
    createWhatsAppButton("Check out our inventory!");
    manageInventory();
};
