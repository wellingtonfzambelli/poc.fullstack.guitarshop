import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import settings from "../../utils/settings";
import NotFoundErrorPage from "../error/NotFoundErrorPage";
import Loader from "../../components/loading/Loader";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchProductAsync, productSelectors } from "../../redux/catalog/catalogSlice";
import { addBasketItemAsync, removeBasketItemAsync } from "../../redux/basketSlice";

export default function CatalogProductDetailsPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() =>{
        if(item)
            setQuantity(item.quantity);

        if(!product)
            dispatch(fetchProductAsync(id!))

    }, [id, item, dispatch, product])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);

        if(value >= 0)
            setQuantity(value);
    }

    function handleUpdateCart() {
        if(!product)
            return;

        if(!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id, quantity: updateQuantity}))
        }else{
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id, quantity: updatedQuantity}))
        }
    }

    if(productStatus.includes('pending')) 
        return <Loader message='Loading product...' />

    if(!product) return <NotFoundErrorPage />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={`${settings.PATH_IMAGES_PRODUCTS}${product.pictureUrl}`} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color='secondary'>$ {product.price.toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleInputChange}
                            variant="outlined" 
                            type='number'
                            label='Quantity in Basket'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to basket'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}