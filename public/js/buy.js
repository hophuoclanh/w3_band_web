let selectedCity = "";
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.buy').forEach(button => {
  button.addEventListener('click', (e) => {
    selectedCity = e.target.closest('div').querySelector('.place').innerText.trim();
    modal.style.display = 'flex';
  });
});

// Bấm nút "PAY"
document.getElementById('buy-tickets').addEventListener('click', async () => {
  const quantity = parseInt(document.getElementById('ticket-quantity').value);
  const email = document.getElementById('ticket-email').value;

  if (!selectedCity || !email || !quantity || quantity <= 0) {
    alert("Please fill in all required and valid information.");
    return;
  }

  try {
    const res = await fetch('/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: selectedCity, email, quantity })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Tickets purchased successfully!");
      modal.style.display = 'none';
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    alert("System error. Please try again later.");
    console.error(err);
  }
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
