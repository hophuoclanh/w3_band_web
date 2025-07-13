import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <div id="main">
        <div id="header">
          <ul id="home-item">
            <li><a href="#slider">Home</a></li>
          </ul>

          <div id="hamburger">&#9776;</div>

          <ul id="nav">
            <li><a href="#about-section">Band</a></li>
            <li><a href="#ticket-section">Tour</a></li>
            <li><a href="#contact-section">Contact</a></li>
            <li className="has-subnav">
              <a href="">
                More
                <img src="/svg/dropdown-svgrepo-com-white.svg" className="icon default" alt="dropdown white" />
                <img src="/svg/dropdown-svgrepo-com-black.svg" className="icon hover" alt="dropdown black" />
              </a>
              <ul className="subnav">
                <li><a href="">Merchandise</a></li>
                <li><a href="">Extras</a></li>
                <li><a href="">Media</a></li>
              </ul>
            </li>
          </ul>
          <div id="search">
            <a href="">
              <img src="/svg/find-svgrepo-com.svg" alt="Search Icon" />
            </a>
          </div>
        </div>

        <div id="slider">
          <div className="slideshow-container">
            <div className="mySlides fade">
              <img src="/img/la.jpg" style={{ width: '100%', objectFit: 'cover' }} alt="LA" />
              <div className="content">
                <div className="text">Los Angeles</div>
                <div className="subtext">We had the best time playing at Venice Beach!</div>
              </div>
            </div>

            <div className="mySlides fade">
              <img src="/img/ny.jpg" style={{ width: '100%', objectFit: 'cover' }} alt="NY" />
              <div className="content">
                <div className="text">New York</div>
                <div className="subtext">The atmosphere in New York is lorem ipsum.</div>
              </div>
            </div>

            <div className="mySlides fade">
              <img src="/img/chicago.jpg" style={{ width: '100%', objectFit: 'cover' }} alt="Chicago" />
              <div className="content">
                <div className="text">Chicago</div>
                <div className="subtext">Thank you, Chicago - A night we won't forget</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <div id="about-section">
          <div className="content-section">
            <div className="header">THE BAND</div>
            <div className="subtext">We love music</div>
            <div className="text-description">
              We have created a fictional band website.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
          </div>
          <div className="images">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="image" key={i}>
                <p>Name</p>
                <img src="/img/img_bandmember.jpg" alt="Band Member" />
              </div>
            ))}
          </div>
        </div>

        <div id="ticket-section">
          <div className="content-section">
            <div className="header">TOUR DATES</div>
            <div className="subtext">Remember to book your tickets!</div>
          </div>
          <div className="ticket-list">
            <ul>
              <li>September <span className="sold">Sold out</span></li>
              <li>October <span className="sold">Sold out</span></li>
              <li>November <span className="quantity">3</span></li>
            </ul>
          </div>
          <div className="place-list">
            {[
              { name: 'New York', date: 'Fri 27 Nov 2016', img: '/img/newyork.jpg' },
              { name: 'Paris', date: 'Sat 28 Nov 2016', img: '/img/paris.jpg' },
              { name: 'San Francisco', date: 'Sun 29 Nov 2016', img: '/img/sanfran.jpg' }
            ].map((place, i) => (
              <div key={i}>
                <img src={place.img} alt={place.name} />
                <div className="content">
                  <span className="place"> {place.name} </span>
                  <span className="date"> {place.date} </span>
                  <span className="desc">Praesent tincidunt sed tellus ut rutrum sed vitae justo.</span>
                </div>
                <span className="buy"> Buy Tickets </span>
              </div>
            ))}
          </div>
        </div>

        <div id="contact-section">
          <div className="content-section">
            <div className="header">CONTACT</div>
            <div className="subtext">Fan? Drop a note!</div>
          </div>
          <div className="form">
            <div className="info">
              <ul>
                <li><img src="/svg/location-pin-svgrepo-com.svg" alt="location" />Chicago, US</li>
                <li><img src="/svg/phone-svgrepo-com.svg" alt="phone" />Phone: +00 151515</li>
                <li><img src="/svg/mail-svgrepo-com.svg" alt="email" />Email: mail@mail.com</li>
              </ul>
            </div>
            <div className="form-container">
              <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="14c8b97d-cb60-407d-90b2-46929098b0df" />
                <div className="row">
                  <input name="name" type="text" placeholder="Name" required />
                  <input name="email" type="email" placeholder="Email" required />
                </div>
                <textarea name="message" placeholder="Message" required></textarea>
                <button type="submit">SEND</button>
              </form>
            </div>
          </div>
        </div>

        <div className="image-section">
          <img src="/img/map.jpg" alt="map" />
        </div>

        <div id="footer"></div>
      </div>

      <div className="modal">
        <div className="modal-container">
          <header className="modal-header">
            <img src="/svg/luggage-14-svgrepo-com.svg" alt="Icon" />
            <span>Tickets</span>
            <div className="modal-close">
              <img src="/svg/close-svgrepo-com-white.svg" alt="Close" className="icon default" />
              <img src="/svg/close-svgrepo-com-black.svg" alt="Close" className="icon hover" />
            </div>
          </header>
          <div className="modal-body">
            <label className="modal-label">
              <img src="/svg/cart-svgrepo-com.svg" alt="Luggage" />
              Tickets, $15 per person
            </label>
            <input type="number" className="modal-input" id="ticket-quantity" placeholder="How many?" required />

            <label className="modal-label">
              <img src="/svg/account-svgrepo-com.svg" alt="Account" />
              Send to
            </label>
            <input type="email" className="modal-input" id="ticket-email" placeholder="Enter email" required />

            <div id="buy-tickets">
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

      {/* Scripts */}
      <Script src="/js/slideshow.js" strategy="afterInteractive" />
      <Script src="/js/buy.js" strategy="afterInteractive" />
      <Script strategy="afterInteractive">{`
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        hamburger?.addEventListener('click', () => {
          nav.classList.toggle('show');
        });
        const navLinks = nav?.querySelectorAll('a');
        navLinks?.forEach(link => {
          link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
              nav.classList.remove('show');
            }
          });
        });
      `}</Script>
    </>
  );
}

