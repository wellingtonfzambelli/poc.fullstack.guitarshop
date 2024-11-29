
import { useEffect} from "react";
import Loader from "../../components/loading/Loader";
import ProductList from "../../components/catalog/ProductList";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchProductsAsync, productSelectors } from "../../redux/catalogSlice";


export default function CatalogPage(){
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(!productsLoaded)
        dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    if(status.includes('pending')) 
        return <Loader message='Loading products...' />;    

    return (
        <>
            <h2>Catalog</h2>
            <ProductList products={products} />
        </>
    )
}