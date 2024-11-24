import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';


interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props){
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Guitar Shop
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
}