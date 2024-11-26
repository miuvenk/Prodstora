import { ChevronRightIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "@remix-run/react";
import { Product } from "~/types/productTypes";
import { calculateOriginalPrice, formatCurrency } from "~/utils/utils";

interface ProductCardProps {
    product: Product;
}

export default function HorizontalProductCard({ product }: ProductCardProps) {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/productDetail/${product.code}`); 
    };

    return (
        <div className="bg-white dark:bg-gray-800 relative
                        flex flex-col justify-center items-center
                        p-6 cursor-pointer 
                        rounded-lg shadow-md hover:shadow-3xl dark:hover:shadow-blue-500/50 hover:scale-110	
                        transition-shadow duration-300 overflow-hidden"
            onClick={handleNavigate}
        >

            <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                %{product.dropRatio}
            </div>
            <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 p-4"
            />
            <div className="p-4 flex flex-col justify-center">
                <h3 className="text-lg h-12 w-48 font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                <div>
                    <p className="text-gray-500 dark:text-gray-100 mt-2 line-through">{formatCurrency(calculateOriginalPrice(product.price, product.dropRatio))}</p>
                    <p className="text-blue-500 dark:text-blue-400 mt-2 font-bold text-2xl">
                        <span>{formatCurrency(product.price).split(",")[0]}</span>
                        <span className="text-lg text-blue-500 dark:text-blue-400">,{formatCurrency(product.price).split(",")[1]}</span>
                    </p>
                </div>

                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-100 mt-4">
                    <ShoppingBagIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <p className="text-sm">{product.countOfPrices} satıcı</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-100 mt-2">
                    <UserGroupIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <p className="text-sm">{product.followCount}+ takipçi</p>
                    </div>
                </div>
        </div>
    );
}