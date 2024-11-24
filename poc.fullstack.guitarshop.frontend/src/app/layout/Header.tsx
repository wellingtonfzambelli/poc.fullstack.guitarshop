import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header(){
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar variant="dense">
                
                <Typography variant="h6" color="inherit" component="div">
                    Guitar Shop
                </Typography>
            </Toolbar>
        </AppBar>
    )
}