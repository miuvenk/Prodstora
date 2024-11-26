
import { ChevronRightIcon, ShoppingBagIcon, StarIcon } from "@heroicons/react/16/solid";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { useState } from "react";
import ComparisonTable from "~/components/comparison/ComparisonTable";
import { Product, ProductDetail } from "~/types/productTypes";
import { formatCurrency, translateTime } from "~/utils/utils";

export const loader: LoaderFunction = async ({ params }) => {
  const { productId } = params;

  const response = await fetch(process.env.REACT_APP_API_URL + `/product${productId}.json`);
  if (!response.ok) {
    throw new Response("Product not found", { status: 404 });
  }
  const product: ProductDetail = await response.json();


  const productListResponse = await fetch(process.env.REACT_APP_API_URL + "/page.json");
  const data = await productListResponse.json();
  const productList = data.productList;

  return { productList, product };
};

export default function ProductDetailPage() {

  const { productList, product } = useLoaderData<{
    productList: Product[];
    product: ProductDetail;
  }>();

  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const [comparisonModel, setComparisonModel] = useState<ProductDetail | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = parseInt(event.target.value, 10);
    setSelectedCode(code);
    await getComparisonModel(code)

  };

  const getComparisonModel = async (selectedCode: number) => {
    try {
      const response = await fetch(`https://mock.akakce.dev/product${selectedCode}.json`);
      const data: ProductDetail = await response.json();
      setComparisonModel(data);
    } catch (error) {
      console.error("Seçilen model için veri çekilemedi:", error);
    }
  };

  return (
    <div className="min-h-screen container mx-auto p-2 max-w-4xl">

      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-sm mt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
          <Link to="/products" className="hover:text-blue-500 hover:underline">
            Tüm Ürünler
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
          <span className="font-semibold text-gray-800 dark:text-white">{product.productName}</span>
        </div>
      </div>

      <div className="relative bg-white dark:bg-gray-800 relative
    flex flex-col justify-center items-center p-8 
    rounded-lg shadow-md overflow-hidden mt-4">

        {product.freeShipping && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold rounded-full p-2 shadow-md animate-gradientGlow">
            <div className="mt-2 mb-2">
              <span className="block text-center">Ücretsiz</span>
              <span className="block text-center">Kargo!</span>
            </div>
          </div>
        )}

        <div className="flex flex-row max-sm:flex-col md:max-2xl:flex-row justify-center items-center sm:space-x-8">
          <img className="h-56 sm:h-56 md:h-64 lg:max-2xl:h-80 m-2 w-auto" src={product.imageUrl} alt={product.productName} />


          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{product.productName}</h3>
            <p className="bg-yellow-100 text-gray-500 p-1 text-xs w-fit rounded-lg inline-block mt-2">{product.badge}</p>

            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                i < product.rating ? (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ) : (
                  <StarIcon key={i} className="h-5 w-5 text-gray-200" />
                )
              ))}
            </div>
            <p className="text-blue-500 dark:text-blue-400 mt-2 font-bold text-2xl">
              <span>{formatCurrency(product.price).split(",")[0]}</span>
              <span className="text-lg text-blue-500 dark:text-blue-400">,{formatCurrency(product.price).split(",")[1]}</span>
            </p>

            <p className="text-gray-500 dark:text-gray-100 mt-4 text-sm">Kapasite Seçenekleri</p>
            <div className="flex space-x-2 mt-1">
              {product.storageOptions.map((option) => (
                <button
                  key={option}
                  className="p-2 bg-gray-200 
                  dark:bg-gray-700 rounded-lg
                  text-gray-800 dark:text-white 
                  hover:bg-blue-500 hover:text-white
                  dark:hover:bg-blue-500 dark:hover:text-white
                  ">
                  {option}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-100 mt-8 cursor-pointer 
            dark:text-gray-100 mt-8 hover:text-blue-500 dark:hover:text-blue-500 hover:underline">
              <ShoppingBagIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <p className="text-sm">{product.countOfPrices} satıcı</p>
              <ChevronRightIcon className="w-5 h-5"/>
            </div>
          </div>
        </div>

        <p className="text-gray-400 dark:text-gray-400 text-xs mt-2 absolute bottom-1 w-full text-center">
          Son Güncelleme: {translateTime(product.lastUpdate)}
        </p>
      </div>


      <div className="p-2 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg mt-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 text-center">
          Karşılaştırma Yap
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
          Hangi modeli alacağınıza karar veremediyseniz, buradan diğer modellerle karşılaştırabilirsiniz.
        </p>
        <div className="flex justify-center">
          <select
            className="block w-full max-w-xs px-4 py-2
      bg-white dark:bg-gray-700
      text-gray-500 dark:text-gray-300
      border border-gray-300 dark:border-gray-600
      rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCode || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Model seçin
            </option>
            {productList.map((model) => (
              <option key={model.code} value={model.code}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCode &&
        <div>
          <ComparisonTable
            currentProduct={product}
            comparisonProduct={comparisonModel}
          />
        </div>
      }
    </div>
  );
}