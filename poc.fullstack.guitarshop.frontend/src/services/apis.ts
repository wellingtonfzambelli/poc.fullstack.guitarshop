import axios, { AxiosError, AxiosResponse } from "axios";
import settings from "../utils/settings";
import { toast } from "react-toastify";

axios.interceptors.response.use(async response =>{
    return response;
}, (error: AxiosError) => {
    
    const {data, status} = error.response as AxiosResponse;

    switch(status){
        case 400:
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
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
    ApiTestErrors: EndpointsTestErrors
}

export default APIs;