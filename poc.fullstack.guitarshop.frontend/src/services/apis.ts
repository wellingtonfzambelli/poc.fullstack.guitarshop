import axios, { AxiosError, AxiosResponse } from "axios";
import settings from "../utils/settings";
import { toast } from "react-toastify";
import { router } from "../app/router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.withCredentials = true;

axios.interceptors.response.use(async response =>{
    await sleep();
    return response;
}, (error: AxiosError) => {
    
    const {data, status} = error.response as AxiosResponse;

    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }

            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }

    console.log(error.response);
    return Promise.reject(error.response);
})

const EndpointsCatalog = {
    getProducts: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/product`)
             .then(response => response.data),

    getDetails: (id: string | undefined) => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/product/${id}`)
             .then(response => response.data)
}

const EndpointsBasket = {
    getBasket: () =>
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/basket`)
             .then(response => response.data),
    
    addProduct: (productId: string, quantity: number = 1) =>
        axios.post(`${settings.API_BASE_URL_GUITAR_SHOP}/basket?productId=${productId}&quantity=${quantity}`, {})
             .then(response => response.data),

    removeProduct: (productId: string, quantity: number = 1) =>
        axios.delete(`${settings.API_BASE_URL_GUITAR_SHOP}/basket?productId=${productId}&quantity=${quantity}`)
             .then(response => response.data),             
}

const EndpointsTestErrors = {
    getBadRequest: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/mockerror/bad-request`)
             .then(response => response.data),             
    
    getUnauthorized: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/mockerror/unauthorized`)
             .then(response => response.data),             

    getNotFound: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/mockerror/not-found`)
             .then(response => response.data),            

    getServerError: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/mockerror/server-error`)
             .then(response => response.data),

    getValidationError: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/mockerror/validation-error`)
             .then(response => response.data)
}

const APIs = {
    ApiCatalog: EndpointsCatalog,
    ApiBasket: EndpointsBasket,
    ApiTestErrors: EndpointsTestErrors
}

export default APIs;