
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Product } from "../../app/models/Product";


export default function Catalog(){
    const [products, setProduct] = useState<Product[]>([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/v1/product")
      .then(response => response.json())
      .then(jsonResponse => setProduct(jsonResponse));
    }, []);

    return (
        <>
            <h2>Catalog</h2>
            <ProductList products={products} />
        </>
    )
}