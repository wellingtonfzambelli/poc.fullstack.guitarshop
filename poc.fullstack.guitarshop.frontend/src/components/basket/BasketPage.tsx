import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useBasketContext } from "../../context/BasketProvider";
import settings from "../../utils/settings";
import { useState } from "react";
import APIs from "../../services/apis";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const {basket, setBasket, removeItem} = useBasketContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: string, name: string) {
        setStatus({loading: true, name: name});

        APIs.ApiBasket.addProduct(productId)
            .then(basket => setBasket(basket))
            .finally(() => setStatus({loading: false, name: ''}))
    }

    function handleRemoveItem(productId: string, quantity = 1, name: string) {
        setStatus({loading: true, name: name});

        APIs.ApiBasket.removeProduct(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .finally(() => setStatus({loading: false, name: ''}))
    }

    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {basket.items.map(item => (
                    <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img src={`${settings.PATH_IMAGES_PRODUCTS}${item.pictureUrl}`} alt={item.name} style={{height:50, marginRight:20}} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton 
                                loading={status.loading && status.name === 'remove' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, 1, 'remove' + item.productId)} 
                                color='error'
                            >
                                <Remove />
                            </LoadingButton>

                            {item.quantity}

                            <LoadingButton 
                                loading={status.loading && status.name === 'add' + item.productId} 
                                onClick={() => handleAddItem(item.productId, 'add' + item.productId)} 
                                color='secondary'
                            >
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status.loading && status.name === 'delete' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, item.quantity, 'delete' + item.productId)} 
                                color="error"
                            >
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                </Grid>
            </Grid>
        </>
    )
}