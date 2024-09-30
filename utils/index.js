// Function to fetch JSON and create table
async function createTableFromJSON() {
  try {
    // Fetch the JSON file
    const response = await fetch("utils/output.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text(); // Get the response as text first

    let data;
    try {
      data = JSON.parse(text); // Try to parse the text as JSON
    } catch (e) {
      console.error("JSON Parse Error:", e);
      console.log("Received data:", text);
      throw new Error("Failed to parse JSON");
    }

    // Get the table body
    const tableBody = document.getElementById("tableBody");

    // Create a row for each item in the JSON
    data.forEach((item, index) => {
      // Create a new row
      if (item.fondecyt == "True") {
        console.log(item.fondecyt);
        const row = tableBody.insertRow();
        row.style.backgroundColor = "lightblue";
      } else {
        console.log(item.fondecyt);
      }
      const row = tableBody.insertRow();

      // Insert cells for each property
      const authorCell = row.insertCell();
      authorCell.textContent = item.author;
      authorCell.style.backgroundColor =
        item.fondecyt == "True" ? "lightblue" : "";

      const yearCell = row.insertCell();
      yearCell.textContent = item.year;
      yearCell.style.backgroundColor =
        item.fondecyt == "True" ? "lightblue" : "";

      const titleCell = row.insertCell();
      titleCell.textContent = item.title;
      titleCell.style.backgroundColor =
        item.fondecyt == "True" ? "lightblue" : "";

      const keywordsCell = row.insertCell();
      keywordsCell.textContent = item.keywords;
      keywordsCell.style.backgroundColor =
        item.fondecyt == "True" ? "lightblue" : "";

      const linkCell = row.insertCell();
      linkCell.innerHTML = `<a href="${item.link}" target="_blank"> <i class="fa-solid fa-link"></i> </a>`;
      linkCell.style.backgroundColor =
        item.fondecyt == "True" ? "lightblue" : "";

      const textCell = row.insertCell();
      textCell.innerHTML = `<a href="utils/texto.html?id=${index}"><i class="fa-solid fa-book"></i></a>`;
      textCell.style.backgroundColor =
        item.fondecyt == "True" ? "lightblue" : "";
    });

    // Store the data in localStorage for the text.html page to access
    localStorage.setItem("paperData", JSON.stringify(data));
  } catch (error) {
    console.error("Error:", error);
    document.body.innerHTML += `<p>Error loading data: ${error.message}</p>`;
  }
}

// Call the function when the page loads
window.onload = createTableFromJSON;
