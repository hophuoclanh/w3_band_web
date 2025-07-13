import { useState, useEffect } from 'react';

export default function TicketModal({ city, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const qty = parseInt(quantity);

    if (!email || !qty || qty <= 0) {
      alert("Please fill in all required and valid information.");
      return;
    }

    try {
      const res = await fetch('/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, email, quantity: qty })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Tickets purchased successfully!');
        onSuccess?.(); // callback to close modal or reset
        onClose();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('System error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-container">
        <header className="modal-header">
          <img src="/svg/luggage-14-svgrepo-com.svg" alt="Icon" />
          <span>Tickets</span>
          <div className="modal-close" onClick={onClose}>
            <img src="/svg/close-svgrepo-com-white.svg" alt="Close" className="icon default" />
            <img src="/svg/close-svgrepo-com-black.svg" alt="Close" className="icon hover" />
          </div>
        </header>

        <div className="modal-body">
          <label className="modal-label">
            <img src="/svg/cart-svgrepo-com.svg" alt="Luggage" />
            Tickets, $15 per person
          </label>
          <input
            type="number"
            className="modal-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="How many?"
            required
          />

          <label className="modal-label">
            <img src="/svg/account-svgrepo-com.svg" alt="Account" />
            Send to
          </label>
          <input
            type="email"
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <div id="buy-tickets" onClick={handleSubmit}>
            PAY
            <img src="/svg/tick-svgrepo-com-white.svg" alt="Tick" className="icon default" />
            <img src="/svg/tick-svgrepo-com-black.svg" alt="Tick" className="icon hover" />
          </div>

          <footer className="modal-footer">
            <p className="modal-help">
              Need <a href="">help?</a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
