
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import APIs from "../../services/apis";
import Loader from "../../app/layout/Loader";
import ProductList from "../../components/catalog/ProductList";


export default function CatalogPage(){
    const [products, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      APIs.ApiCatalog.getProducts()
        .then(response => setProduct(response))
        .finally(() => setLoading(false));
    }, []);

    if(loading) return <Loader message='Loading products...' />;    

    return (
        <>
            <h2>Catalog</h2>
            <ProductList products={products} />
        </>
    )
}