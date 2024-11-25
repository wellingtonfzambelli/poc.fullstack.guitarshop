
import { Container, ButtonGroup, Button } from "@mui/material";
import APIs from "../../services/apis";
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorPage(){
    return (        
        <Container>
            <h2>Error for testing purposes</h2>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getBadRequest()}>Bad Request</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getNotFound()}>Test Not Found</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getServerError()}>Test Server Error</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getUnauthorized()}>Test Unauthorized</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getValidationError()}>Test Validation Error</Button>
            </ButtonGroup>
        </Container>
    )
}