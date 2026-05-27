//your JS code here. If required.

// Grab the table body element
const outputTableBody = document.getElementById("output");

// 1️⃣ Requirement: Add the initial "Loading..." row spanning 2 columns
const loadingRow = document.createElement("tr");
loadingRow.id = "loading";
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
outputTableBody.appendChild(loadingRow);

// 2️⃣ Requirement: Create a function that returns a promise resolving after a random time (1 to 3 seconds)
function createRandomPromise(promiseName) {
  const randomTime = Math.random() * 2 + 1; // Generates a number between 1 and 3
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: promiseName,
        time: randomTime
      });
    }, randomTime * 1000); // setTimeout expects milliseconds
  });
}

// Instantiate the 3 promises
const promise1 = createRandomPromise("Promise 1");
const promise2 = createRandomPromise("Promise 2");
const promise3 = createRandomPromise("Promise 3");

// Record the start time right before executing Promise.all
const startTime = performance.now();

// 3️⃣ & 4️⃣ Requirement: Wait for all promises, remove loading, and populate table
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // Calculate total time taken (time elapsed since promises started)
    const endTime = performance.now();
    const totalTimeTaken = (endTime - startTime) / 1000; // Convert to seconds

    // Remove the loading row
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.remove();
    }

    // Populate the table with individual promise results
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.name}</td>
        <td>${result.time.toFixed(3)}</td>
      `;
      outputTableBody.appendChild(row);
    });

    // Add the final "Total" row
    const totalRow = document.createElement("tr");
    totalRow.className = "table-active fw-bold"; // Optional Bootstrap styling for emphasis
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTimeTaken.toFixed(3)}</td>
    `;
    outputTableBody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error("Something went wrong resolving the promises:", error);
  });