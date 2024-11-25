import axios from "axios";
import settings from "../utils/settings";

const EndpointsCatalog = {
    getProducts: () => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/product`)
             .then(response => response.data),

    getDetails: (id: string | undefined) => 
        axios.get(`${settings.API_BASE_URL_GUITAR_SHOP}/product/${id}`)
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
    ApiTestErrors: EndpointsTestErrors
}

export default APIs;