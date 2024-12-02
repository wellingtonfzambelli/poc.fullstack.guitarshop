import { Container, ButtonGroup, Button, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material";
import APIs from "../../services/apis";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export default function SimulateErrorsPage(){
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        APIs.ApiTestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }

    return (        
        <Container>
            <h2>Error for testing purposes</h2>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getBadRequest()}>Bad Request</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getNotFound()}>Test Not Found</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getServerError()}>Test Server Error</Button>
                <Button variant="contained" onClick={() => APIs.ApiTestErrors.getUnauthorized()}>Test Unauthorized</Button>
                <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>

            {
                validationErrors.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}