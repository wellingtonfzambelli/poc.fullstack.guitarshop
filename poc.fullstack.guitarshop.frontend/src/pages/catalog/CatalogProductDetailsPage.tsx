import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/Product";
import APIs from "../../services/apis";
import settings from "../../utils/settings";
import NotFoundErrorPage from "../error/NotFoundErrorPage";
import Loader from "../../app/layout/Loader";
import { useBasketContext } from "../../context/BasketProvider";
import { LoadingButton } from "@mui/lab";

export default function CatalogProductDetailsPage() {
    const {basket, setBasket, removeItem} = useBasketContext();
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() =>{
        if(item) {
            setQuantity(item.quantity);
        }

        APIs.ApiCatalog.getDetails(id)
            .then(response => setProduct(response))
            .finally(() => setLoading(false));
    }, [id, item])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);

        if(value > 0)
            setQuantity(value);
    }

    function handleUpdateCart() {
        setSubmitting(true);

        if(!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            APIs.ApiBasket.addProduct(product?.id!, updateQuantity)
                .then(basket => setBasket(basket))
                .finally(() => setSubmitting(false))
        }else{
            const updatedQuantity = item.quantity - quantity;
            APIs.ApiBasket.removeProduct(product?.id!, updatedQuantity)
                .then(() => removeItem(product?.id, updatedQuantity))
                .finally(() => setSubmitting(false))
        }
    }

    if(loading) return <Loader message='Loading product' />

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
                            loading={submitting}
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