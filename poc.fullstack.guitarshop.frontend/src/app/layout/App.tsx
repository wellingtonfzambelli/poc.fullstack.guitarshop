import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useBasketContext } from "../../context/BasketProvider";
import APIs from "../../services/apis";
import Loader from "./Loader";
import { getCookie } from "../../utils/commom";

function App() {
  const {setBasket} = useBasketContext();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');

    if(buyerId){
      APIs.ApiBasket.getBasket()
        .then(basket => setBasket(basket))
        .finally(() => setLoading(false));
    }
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode: paletteType,
      background:{
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    console.log(paletteType);
    setDarkMode(!darkMode);
    
  }

  if(loading) return <Loader message="App is loading" />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
