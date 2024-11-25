
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Product } from "../../models/Product";
import APIs from "../../services/apis";


export default function CatalogPage(){
    const [products, setProduct] = useState<Product[]>([]);

    useEffect(() => {
      APIs.ApiCatalog.getProducts().then(response => setProduct(response));
    }, []);

    return (
        <>
            <h2>Catalog</h2>
            <ProductList products={products} />
        </>
    )
}