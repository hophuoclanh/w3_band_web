import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/img/la.jpg',
    title: 'Los Angeles',
    subtitle: 'We had the best time playing at Venice Beach!',
  },
  {
    src: '/img/ny.jpg',
    title: 'New York',
    subtitle: 'The atmosphere in New York is lorem ipsum.',
  },
  {
    src: '/img/chicago.jpg',
    title: 'Chicago',
    subtitle: "Thank you, Chicago - A night we won't forget",
  },
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="slider">
      <div className="slideshow-container">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`mySlides fade`}
            style={{ display: i === index ? 'block' : 'none' }}
          >
            <img
              src={slide.src}
              style={{ width: '100%', objectFit: 'cover' }}
              alt={slide.title}
            />
            <div className="content">
              <div className="text">{slide.title}</div>
              <div className="subtext">{slide.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}