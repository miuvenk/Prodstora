import { StarIcon } from "@heroicons/react/16/solid";
import { ComparisonTableProps } from "~/types/productTypes";
import { formatCurrency, translateTime } from "~/utils/utils";


const ComparisonTable: React.FC<ComparisonTableProps> = ({ currentProduct, comparisonProduct }) => {
    if (!comparisonProduct) {
        return <p className="text-gray-500">Lütfen bir model seçin.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table
                className="w-full border-collapse border border-gray-300
        bg-white dark:bg-gray-800
        p-8 rounded-lg shadow-md overflow-hidden mt-4
        table-fixed"
            >
                <thead>
                    <tr>
                        <th className="hidden md:table-cell bg-gray-100 dark:bg-gray-900 w-1/4 border border-gray-300 p-4 text-gray-500 dark:text-gray-300 text-sm">
                            Özellik
                        </th>
                        <th className="bg-gray-100 dark:bg-gray-900 w-3/8 border border-gray-300 p-4 text-gray-600 dark:text-gray-200 text-sm">
                            <div className="flex flex-col items-center">
                                <span>{currentProduct.productName}</span>
                                {currentProduct.badge && (
                                    <p className="bg-yellow-100 text-gray-500 p-1 text-xs w-fit rounded-lg inline-block mt-2">
                                        {currentProduct.badge}
                                    </p>
                                )}
                            </div>
                        </th>
                        <th className="bg-gray-100 dark:bg-gray-900 w-3/8 border border-gray-300 p-4 text-gray-600 dark:text-gray-200 text-sm">
                            <div className="flex flex-col items-center">
                                <span>{comparisonProduct.productName}</span>
                                {comparisonProduct.badge && (
                                    <p className="bg-yellow-100 text-gray-500 p-1 text-xs w-fit rounded-lg inline-block mt-2">
                                        {comparisonProduct.badge}
                                    </p>
                                )}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="hidden md:table-cell border border-gray-300 p-2 text-gray-400 dark:text-gray-300 text-center text-sm">
                            Fiyat
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${currentProduct.price < comparisonProduct.price
                                    ? "bg-green-100 text-green-700 font-bold"
                                    : "text-gray-600 dark:text-gray-200"
                                }`}
                        >
                            {formatCurrency(currentProduct.price)}
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${comparisonProduct.price < currentProduct.price
                                    ? "bg-green-100 text-green-700 font-bold"
                                    : "text-gray-600 dark:text-gray-200"
                                }`}
                        >
                            {formatCurrency(comparisonProduct.price)}
                        </td>
                    </tr>

                    <tr>
                        <td className="hidden md:table-cell border border-gray-300 p-2 text-gray-400 dark:text-gray-300 text-center text-sm">
                            Kargo
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${currentProduct.freeShipping
                                    ? "text-green-500 font-semibold"
                                    : "text-red-500 font-medium"
                                }`}
                        >
                            {currentProduct.freeShipping ? "Ücretsiz" : "Ücretli"}
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${comparisonProduct.freeShipping
                                    ? "text-green-500 font-semibold"
                                    : "text-red-500 font-medium"
                                }`}
                        >
                            {comparisonProduct.freeShipping ? "Ücretsiz" : "Ücretli"}
                        </td>
                    </tr>

                    <tr>
                        <td className="hidden md:table-cell border border-gray-300 p-2 text-gray-400 dark:text-gray-300 text-center text-sm">
                            Değerlendirme
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${currentProduct.rating > comparisonProduct.rating
                                    ? "bg-yellow-100 text-yellow-700 font-bold"
                                    : "text-gray-600"
                                }`}
                        >
                            <div className="flex justify-center items-center gap-1">
                                {[...Array(Math.round(currentProduct.rating))].map((_, idx) => (
                                    <StarIcon key={idx} className="w-4 h-4 text-yellow-500" />
                                ))}
                            </div>
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${comparisonProduct.rating > currentProduct.rating
                                    ? "bg-yellow-100 text-yellow-700 font-bold"
                                    : "text-gray-600"
                                }`}
                        >
                            <div className="flex justify-center items-center gap-1">
                                {[...Array(Math.round(comparisonProduct.rating))].map((_, idx) => (
                                    <StarIcon key={idx} className="w-4 h-4 text-yellow-500" />
                                ))}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="hidden md:table-cell border border-gray-300 p-2 text-gray-400 dark:text-gray-300 text-center text-sm">
                            Son Güncelleme
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-sm text-gray-600 dark:text-gray-200">
                            {translateTime(currentProduct.lastUpdate)}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-sm text-gray-600 dark:text-gray-200">
                            {translateTime(comparisonProduct.lastUpdate)}
                        </td>
                    </tr>

                    <tr>
                        <td className="hidden md:table-cell border border-gray-300 p-2 text-gray-400 dark:text-gray-300 text-center text-sm">
                            Kapasite Seçenekleri
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-sm text-gray-600 dark:text-gray-200">
                            {currentProduct.storageOptions.join(", ")}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-sm text-gray-600 dark:text-gray-200">
                            {comparisonProduct.storageOptions.join(", ")}
                        </td>
                    </tr>

                    <tr>
                        <td className="hidden md:table-cell border border-gray-300 p-2 text-gray-400 dark:text-gray-300 text-center text-sm">
                            Satıcı Sayısı
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${currentProduct.countOfPrices > comparisonProduct.countOfPrices
                                    ? "bg-green-100 font-semibold text-gray-600 dark:text-gray-600"
                                    : "text-gray-600 dark:text-gray-200"
                                }`}
                        >
                            {currentProduct.countOfPrices} satıcı
                        </td>
                        <td
                            className={`border border-gray-300 p-2 text-center text-sm ${comparisonProduct.countOfPrices > currentProduct.countOfPrices
                                    ? "bg-green-100 font-semibold text-gray-600 dark:text-gray-600"
                                    : "text-gray-600 dark:text-gray-200"
                                }`}
                        >
                            {comparisonProduct.countOfPrices} satıcı
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


export default ComparisonTable;