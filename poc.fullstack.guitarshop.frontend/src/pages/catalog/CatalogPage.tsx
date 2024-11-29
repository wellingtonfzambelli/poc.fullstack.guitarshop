
import { useEffect} from "react";
import Loader from "../../components/loading/Loader";
import ProductList from "../../components/catalog/ProductList";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "../../redux/catalogSlice";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";

const sortOptions =[
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]

export default function CatalogPage(){
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, brands, types} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(!productsLoaded)
        dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if(!filtersLoaded)
            dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded])

    if(status.includes('pending')) 
        return <Loader message='Loading products...' />;    

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <TextField 
                        label='Search products'
                        variant='outlined'
                        fullWidth
                    />
                </Paper>

                <Paper sx={{mb:2, p: 2}}>
                    <FormControl component='fieldset'>
                        <RadioGroup>
                            { sortOptions.map(({value, label}) =>(
                                <FormControlLabel value={value} control={<Radio />} label={label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>

                <Paper sx={{mb: 2, p:2}}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                        ))}
                    </FormGroup>
                </Paper>

                <Paper sx={{mb: 2, p:2}}>
                    <FormGroup>
                        {types.map(type => (
                            <FormControlLabel control={<Checkbox />} label={type} key={type} />
                        ))}
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={9}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination
                        color="secondary"
                        size='large'
                        count={10}
                        page={2}
                    >
                    </Pagination>
                </Box>
            </Grid>
        </Grid>
    )
}