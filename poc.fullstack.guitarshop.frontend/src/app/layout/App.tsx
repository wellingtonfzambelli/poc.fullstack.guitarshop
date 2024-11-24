import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../components/catalog/Catalog";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog />
      </Container>
    </>
  )
}

export default App
