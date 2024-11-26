import React, { useEffect, useState } from "react";
import HorizontalProductCard from "./HorizontalProductCard";
import { Product } from "~/types/productTypes";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

interface HorizontalProductCarouselProps {
    products: Product[];
  }
  
export default function HorizontalProductCarousel({ products }: HorizontalProductCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); 
    }, 10000); 

    return () => clearInterval(timer);
  }, [products.length]); 

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goNextSlide = () => {
    if(currentIndex !== products.length-1)
        setCurrentIndex((prevIndex) => (prevIndex + 1));
  }

  const goPrevSlide = () => {
    if(currentIndex !== 0)
        setCurrentIndex((prevIndex) => (prevIndex - 1));
  }

  return (
    <div className="p-8 max-sm:p-2 my-8
            bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      

      <div className="flex flex-row justify-between items-center ">
        <div 
            className="p-2 rounded-full hover:shadow-lg hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            onClick={goPrevSlide}
        >
            <ChevronLeftIcon 
                className="w-6 h-6 text-gray-500 hover:text-blue-400"
            />
        </div>

        <div>
            <div className="flex overflow-x-auto gap-4 py-4 justify-center">
                {products.map((product, index) => (
                <div
                    key={product.code}
                    className={`${
                    index === currentIndex ? "block" : "hidden"
                    }`} 
                >
                    <HorizontalProductCard product={product} />
                </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {products.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-blue-500 dark:bg-blue-500" : "bg-gray-400 dark:bg-gray-300"
                    }`}
                />
                ))}
            </div>
        </div>
        
        <div 
            className="p-2 rounded-full hover:shadow-lg hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            onClick={goNextSlide}
        >
            <ChevronRightIcon 
                className="w-6 h-6 text-gray-500 hover:text-blue-400"
            />
        </div>
      </div>
    </div>
  );
};