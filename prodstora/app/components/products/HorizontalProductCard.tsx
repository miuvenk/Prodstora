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
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-32 sm:h-48 md:h-56 lg:h-64"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white
        hover:text-blue-500 dark:hover:text-blue-400 hover:underline cursor-pointer"
        onClick={handleNavigate}>
          {product.name}
        </h3>

        <div className="flex flex-row items-center gap-8">
          <div>
            <p className="text-gray-500 dark:text-gray-100 mt-2 line-through">{formatCurrency(calculateOriginalPrice(product.price, product.dropRatio))}</p>
            <p className="text-blue-500 dark:text-blue-400 mt-2 font-bold text-2xl">
              <span>{formatCurrency(product.price).split(",")[0]}</span>
              <span className="text-lg text-blue-500 dark:text-blue-400">,{formatCurrency(product.price).split(",")[1]}</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-14 h-14 max-sm:w-8 max-sm:h-8 bg-red-500 rounded-full animate-pulsate">
            <p className="text-white text-2xl max-sm:text-sm font-bold"> %{product.dropRatio}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-500 cursor-pointer dark:text-gray-100 mt-8 
        hover:text-blue-500 dark:hover:text-blue-500 hover:underline">
          <ShoppingBagIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <p className="text-sm">{product.countOfPrices} satıcı</p>
          <ChevronRightIcon className="w-5 h-5"/>
        </div>
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-100 mt-2">
          <UserGroupIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <p className="text-sm">{product.followCount}+ takipçi</p>
        </div>
      </div>
    </div>
  );
}