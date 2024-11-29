import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../../models/Product';
import { Avatar, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import settings from '../../utils/settings';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addBasketItemAsync } from '../../redux/basketSlice';

interface Props{
    product: Product;
}

export default function ProductCard({product}: Props){
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader 
                avatar={<Avatar sx={{bgcolor: 'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>} 
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
            />

            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.ligtht' }}
                image={`${settings.PATH_IMAGES_PRODUCTS}${product.pictureUrl}`}
                title={product.name}
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    $ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>

            <CardActions>
                <LoadingButton
                    loading={status.includes('pendingAddItem'+product.id)}  
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small"
                >
                        Add to cart
                </LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    );
}