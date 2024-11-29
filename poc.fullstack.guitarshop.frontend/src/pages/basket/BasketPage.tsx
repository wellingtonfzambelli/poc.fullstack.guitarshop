import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import settings from "../../utils/settings";
import BasketSummary from "../../components/basket/BasketSummary";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LoadingButton } from "@mui/lab";
import { removeBasketItemAsync, addBasketItemAsync } from "../../redux/basketSlice";

export default function BasketPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    if(!basket) 
        return <Typography variant="h3">Your basket is empty</Typography>

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
                                <Link href={`/catalog/${item.productId}`}>
                                    <img src={`${settings.PATH_IMAGES_PRODUCTS}${item.pictureUrl}`} alt={item.name} style={{height:50, marginRight:20}} />
                                    <span>{item.name}</span>
                                </Link>
                            </Box>
                        </TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton 
                                loading={status === ('pendingRemoveItem' + item.productId + 'remove')} 
                                onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'remove'}))} 
                                color='error'
                            >
                                <Remove />
                            </LoadingButton>

                            {item.quantity}

                            <LoadingButton 
                                loading={status === ('pendingAddItem' + item.productId)} 
                                onClick={() => dispatch(addBasketItemAsync({productId: item.productId, quantity: item.quantity}))} 
                                color='secondary'
                            >
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status === ('pendingRemoveItem' + item.productId + 'delete')} 
                                onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'delete'}))} 
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
                    <Link href="/checkout">
                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                        >
                            Checkout
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}