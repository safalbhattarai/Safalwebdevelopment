import React, { useState, useEffect } from 'react';
import "../css/carousel.css";

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Slide every 2 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []); // Empty dependency array to run effect only once

    return (
        <div className="carousel-container">
            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <div className="carousel">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={index === currentImageIndex ? 'active' : 'inactive'} // Apply inactive class to non-active images
                    />
                ))}
            </div>
            <button className="next" onClick={nextSlide}>&#10095;</button>
            <div className="dots">
                {images.map((_image, index) => (
                    <span key={index} className={index === currentImageIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
