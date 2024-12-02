import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../app/router/Routes";
import { PaginatedResponse } from "../models/Pagination";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.withCredentials = true;

axios.interceptors.response.use(async response =>{
    
    if(import.meta.env.DEV){
        await sleep();
    }

    const pagination = response.headers['pagination'];
    
    if(pagination){
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
    }

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
    getProducts: (params?: URLSearchParams) => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/product`, {params})
             .then(response => response.data),

    getDetails: (id: string | undefined) => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/product/${id}`)
             .then(response => response.data),

    fetchFilters: () =>
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/product/filters`)
             .then(response => response.data),
}

const EndpointsBasket = {
    getBasket: () =>
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/basket`)
             .then(response => response.data),
    
    addProduct: (productId: string, quantity: number = 1) =>
        axios.post(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/basket?productId=${productId}&quantity=${quantity}`, {})
             .then(response => {
                toast.success('Product added to the basket');
                return response.data
             }),

    removeProduct: (productId: string, quantity: number = 1) =>
        axios.delete(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/basket?productId=${productId}&quantity=${quantity}`)
             .then(response => {
                 toast.success('Product removed from the basket');
                 return response.data
             })
}

const EndpointsTestErrors = {
    getBadRequest: () => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/mockerror/bad-request`)
             .then(response => response.data),             
    
    getUnauthorized: () => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/mockerror/unauthorized`)
             .then(response => response.data),             

    getNotFound: () => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/mockerror/not-found`)
             .then(response => response.data),            

    getServerError: () => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/mockerror/server-error`)
             .then(response => response.data),

    getValidationError: () => 
        axios.get(`${import.meta.env.VITE_API_BASE_URL_GUITAR_SHOP}/mockerror/validation-error`)
             .then(response => response.data)
}

const APIs = {
    ApiCatalog: EndpointsCatalog,
    ApiBasket: EndpointsBasket,
    ApiTestErrors: EndpointsTestErrors
}

export default APIs;