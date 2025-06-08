// Load inventory counts on page load
async function loadTicketInventory() {
  const cities = ['New York', 'Paris', 'San Francisco'];

  for (const city of cities) {
    try {
      const res = await fetch(`/api/available?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      const elementId = `${city.toLowerCase().replace(/ /g, '-')}-tickets`;
      const element = document.getElementById(elementId);

      if (element) {
        element.textContent = `${data.total_available} tickets left`;
      }
    } catch (error) {
      console.error(`Failed to load inventory for ${city}:`, error);
    }
  }
}

// Trigger when modal "Buy Tickets" button is clicked
document.querySelector('#buy-tickets').addEventListener('click', async () => {
  const quantity = parseInt(document.querySelectorAll('.modal-input')[0].value);
  const email = document.querySelectorAll('.modal-input')[1].value;
  const city = 'New York'; // Replace later if dynamic modal is added

  const res = await fetch('/api/buy-ticket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city, email, quantity })
  });

  const data = await res.json();
  if (data.success) {
    alert('Ticket purchased!');
    loadTicketInventory(); // Refresh inventory
  } else {
    alert(data.error || 'Something went wrong.');
  }
});

// Call once on initial page load
loadTicketInventory();
