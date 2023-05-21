import React, { useState, useEffect } from 'react';
import './styles/Slideshow.css';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';

const Slideshow = () => {
  const images = [image1, image2, image3, image4];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change images every 5 seconds

    return () => clearInterval(timer); // Clean up interval on unmount
  }, [images.length]);

  return <img className="slideshow" src={images[index]} alt="couple"/>;
};

export default Slideshow;
