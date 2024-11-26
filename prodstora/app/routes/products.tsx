import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import VerticalProductCard from "../components/products/VerticalProductCard";
import HorizontalProductCarousel from "~/components/products/HorizontalProductCarousel";
import { LoaderData, Product } from "~/types/productTypes";

export const loader = async (): Promise<LoaderData> => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/page.json");
    const data = await response.json();
    return data;
};

export default function Products() {
    const initialData = useLoaderData<LoaderData>();
    const [products, setProducts] = useState<Product[]>(initialData.productList || []);
    const [horizontalProducts, setHorizontalProducts] = useState<Product[]>(
        initialData.horizontalProductList || []
    );
    const [nextUrl, setNextUrl] = useState<string | null>(initialData.nextUrl);
    const [loading, setLoading] = useState(false);

    const fetchNextPage = async () => {
        if (loading || !nextUrl) return;

        setLoading(true);
        try {
            const response = await fetch(nextUrl);
            const data: LoaderData = await response.json();

            setProducts((prev) => [...prev, ...data.productList]);
            setNextUrl(data.nextUrl);
        } catch (error) {
            console.error("Error fetching next page:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading, nextUrl]);


    return (
        <div className="container mx-auto p-2 max-w-3xl">

            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-sm mt-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <Link to="/products" className="hover:text-blue-500 hover:underline">
                    Tüm Ürünler
                </Link>
                </div>
            </div>

            <HorizontalProductCarousel products={horizontalProducts} />

            <div className="grid sm:grid-cols-1 md:max-2xl:grid-cols-2 gap-8">
                {products.map((product) => (
                    <VerticalProductCard key={product.code} product={product} />
                ))}
            </div>

            {loading && (
                <div className="w-full text-center py-4">
                    <p>Loading...</p>
                </div>
            )}

            {!nextUrl && !loading && (
                <p className="text-center text-gray-500 dark:text-gray-300 mt-8">Tüm ürünler yüklendi.</p>
            )}
        </div>
    );
}
