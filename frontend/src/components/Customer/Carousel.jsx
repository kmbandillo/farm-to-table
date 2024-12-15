import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const navigate = useNavigate();

    const handleStorePage = () => {
        navigate("/customer/storepage");
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 2 ? 1 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 1 ? images.length - 2 : prevIndex - 1
        );
    };

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // 3000ms = 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [currentIndex]); // Re-run the effect whenever the currentIndex changes

    return (
        <div>
            <div className="relative w-full max-w-4xl mx-80">
                <div className="absolute backdrop-blur-lg bg-white/65 shadow-2xl h-[450px] w-[350px] -left-40 top-5 transform z-10 p-5 pt-10">
                    <p className="font-medium text-5xl mt-3">
                        <b>High-Quality Produce Just For You</b>
                    </p>
                    <p className="mt-10 mb-10">
                        Discover the freshest, highest-quality produce straight
                        from local farms to your table. Experience the
                        difference of AgriLink freshness today!
                    </p>
                    <button
                        onClick={handleStorePage}
                        className="bg-[#75B27C] w-full rounded-sm h-10 text-white"
                    >
                        Shop Now
                    </button>
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute right-0 top-4 transform z-10 bg-green-950 p-3 rounded-full shadow-md hover:shadow-lg"
                >
                    <GrPrevious className="text-lg" color="white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute -right-12 top-4 transform z-10 bg-green-950 p-3 rounded-full shadow-md hover:shadow-lg"
                >
                    <GrNext className="text-lg" color="white" />
                </button>

                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-[500px] relative bg-center bg-cover ml-10"
                            style={{ backgroundImage: `url(${src})` }}
                        ></div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                                currentIndex === index
                                    ? "bg-green-500"
                                    : "bg-white"
                            }`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}