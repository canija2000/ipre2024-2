// Function to fetch JSON and create table
async function createTableFromJSON() {
    try {
        // Fetch the JSON file
        const response = await fetch('utils/output.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text(); // Get the response as text first
        
        let data;
        try {
            data = JSON.parse(text); // Try to parse the text as JSON
        } catch (e) {
            console.error('JSON Parse Error:', e);
            console.log('Received data:', text);
            throw new Error('Failed to parse JSON');
        }

        // Get the table body
        const tableBody = document.getElementById('tableBody');

        // Create a row for each item in the JSON
        data.forEach((item, index) => {
            const row = tableBody.insertRow();

            // Insert cells for each property
            
            const yearCell = row.insertCell();
            yearCell.textContent = item.year;

            const titleCell = row.insertCell();
            titleCell.textContent = item.title;

            const keywordsCell = row.insertCell();
            keywordsCell.textContent = item.keywords;

            const linkCell = row.insertCell();
            linkCell.innerHTML = `<a href="${item.link}" target="_blank"> Link Paper </a>`;

            const textCell = row.insertCell();
            textCell.innerHTML = `<a href="utils/texto.html?id=${index}">Go to text</a>`;
        });

        // Store the data in localStorage for the text.html page to access
        localStorage.setItem('paperData', JSON.stringify(data));
    } catch (error) {
        console.error('Error:', error);
        document.body.innerHTML += `<p>Error loading data: ${error.message}</p>`;
    }
}

// Call the function when the page loads
window.onload = createTableFromJSON;
