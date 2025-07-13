import React, { useEffect, useState } from 'react';
import '../styles/slider.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const slides = [
  {
    name: 'Disaster Response',
    img: 'https://www.istockphoto.com/photo/mutating-virus-variant-gm1356114754-430371031',
    des: 'People in grief being supported. Disasterio brings hope and help.',
    info: 'We provide coordination, logistics, and real-time support to victims of disasters.'
  },
  {
    name: 'Emergency Rescue',
    img: 'https://i.ibb.co/jrRb11q/img2.jpg',
    des: 'Swift emergency actions in times of crisis.',
    info: 'Our emergency module ensures rapid alerts, stakeholder coordination, and SOPs execution.'
  },
  {
    name: 'Our Mission',
    img: 'https://i.ibb.co/qCkd9jS/img1.jpg',
    des: 'Goal: Empower communities through disaster resilience.',
    info: 'Disasterio enables data-driven disaster risk reduction strategies for regions worldwide.'
  },
  {
    name: 'What We Offer',
    img: 'https://i.ibb.co/NSwVv8D/img3.jpg',
    des: 'Dashboards, Plans, Alerts, Resources & more.',
    info: 'We combine tech, data, and response planning into one platform.'
  },
  {
    name: 'Need Help? We Got You.',
    img: 'https://i.ibb.co/RNkk6L0/img6.jpg',
    des: 'Real-time support is just one click away.',
    info: 'Whether you’re a citizen or an official, Disasterio connects you to help instantly.'
  },
];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');

    const handleNext = () => {
      const items = document.querySelectorAll('.item');
      document.querySelector('.slide').appendChild(items[0]);
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setShowDialog(false);
    };

    const handlePrev = () => {
      const items = document.querySelectorAll('.item');
      document.querySelector('.slide').prepend(items[items.length - 1]);
      setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setShowDialog(false);
    };

    next.addEventListener('click', handleNext);
    prev.addEventListener('click', handlePrev);

    return () => {
      next.removeEventListener('click', handleNext);
      prev.removeEventListener('click', handlePrev);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="slide">
        {slides.map((slide, i) => (
          <div
            className="item"
            key={i}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="content">
              <div className="name">{slide.name}</div>
              <div className="des">{slide.des}</div>
              <button onClick={() => setShowDialog(!showDialog)}>See More</button>
              {showDialog && i === activeIndex && (
                <div className="dialog-box">
                  <p>{slide.info}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="button">
        <button className="prev"><FaArrowLeft /></button>
        <button className="next"><FaArrowRight /></button>
      </div>
    </div>
  );
};

export default ImageSlider;
