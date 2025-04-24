// In-memory array to store vehicle data
let vehicles = [];

// Function to render the vehicle list
function renderVehicleList() {
  const vehicleList = document.getElementById('vehicle-list');
  vehicleList.innerHTML = '';  // Clear the list

  // Display each vehicle in the list
  vehicles.forEach((vehicle, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Vehicle ID: ${index + 1}</strong><br>
      Name: ${vehicle.name} <br>
      Type: ${vehicle.type} <br>
      Price: $${vehicle.price_per_day} per day <br>
      <button onclick="deleteVehicle(${index})">Delete</button>
    `;
    vehicleList.appendChild(li);
  });
}

// Function to add a vehicle
document.getElementById('add-vehicle-form').addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent the default form submission
  
  const name = document.getElementById('vehicle-name').value.trim();
  const type = document.getElementById('vehicle-type').value.trim();
  const price = document.getElementById('vehicle-price').value.trim();

  // Check if all fields are filled and price is a valid number
  if (!name || !type || !price || isNaN(price)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Add the new vehicle to the vehicles array
  vehicles.push({
    name: name,
    type: type,
    price_per_day: parseFloat(price),
  });

  // Clear the form fields
  document.getElementById('vehicle-name').value = '';
  document.getElementById('vehicle-type').value = '';
  document.getElementById('vehicle-price').value = '';

  // Re-render the list
  renderVehicleList();
});

// Function to delete a vehicle
function deleteVehicle(vehicleId) {
  // Remove the vehicle from the array
  vehicles.splice(vehicleId, 1);
  renderVehicleList();  // Re-render the list after deletion
}

// Function to delete a vehicle based on ID from the form
document.getElementById('delete-vehicle-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const vehicleIdInput = document.getElementById('delete-vehicle-id').value.trim();

  // Check if the input is a valid number
  const vehicleId = parseInt(vehicleIdInput, 10) - 1;  // Convert to zero-based index

  // Check if the vehicle ID is valid
  if (isNaN(vehicleId) || vehicleId < 0 || vehicleId >= vehicles.length) {
    alert("Invalid Vehicle ID.");
    return;
  }

  // Remove the vehicle from the array
  vehicles.splice(vehicleId, 1);  // Remove the vehicle from the array
  renderVehicleList();  // Re-render the list
  alert("Vehicle deleted successfully.");

  // Clear the input field
  document.getElementById('delete-vehicle-id').value = '';
}

// Initial render of the vehicle list when the page is loaded
renderVehicleList();
