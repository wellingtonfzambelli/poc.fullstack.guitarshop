
import { useEffect} from "react";
import ProductList from "../../components/catalog/ProductList";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductPaginationParams } from "../../redux/catalog/catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "../../components/catalog/ProductSearchFilter";
import RadioButtonSearch from "../../components/catalog/RadioButtonSearch";
import CheckBoxFilter from "../../components/catalog/CheckBoxFilter";
import AppPagination from "../../components/catalog/AppPagination";
import Loader from "../../components/loading/Loader";

const sortOptions =[
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]

export default function CatalogPage(){
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded, brands, types, productPaginationParams, paginationMetaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(!productsLoaded)
        dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if(!filtersLoaded)
            dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded])

    if(!filtersLoaded) 
        return <Loader message='Loading products...' />;    

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch></ProductSearch>
                </Paper>

                <Paper sx={{mb:2, p: 2}}>
                    <RadioButtonSearch 
                        selectedValue={productPaginationParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductPaginationParams({orderBy: e.target.value}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p:2}}>
                    <CheckBoxFilter 
                        items={brands}
                        checked={productPaginationParams.brands}
                        onChange={(items: string[]) => dispatch(setProductPaginationParams({brands: items }))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p:2}}>
                    <CheckBoxFilter 
                        items={types}
                        checked={productPaginationParams.types}
                        onChange={(items: string[]) => dispatch(setProductPaginationParams({types: items }))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb:2}}>
                {
                    paginationMetaData && 
                    <AppPagination 
                        paginationMetaData={paginationMetaData}
                        onPageChange={(page: number) => dispatch(setProductPaginationParams({pageNumber: page}))}
                    />
                }
            </Grid>
        </Grid>
    )
}