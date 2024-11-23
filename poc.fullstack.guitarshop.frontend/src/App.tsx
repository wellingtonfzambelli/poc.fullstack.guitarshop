import { useState, useEffect } from "react"

function App() {

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/product")
    .then(response => response.json())
    .then(jsonResponse => setProduct(jsonResponse));
  }, []);

  return (
    <>
      <h1>Guita Shop</h1>
      <ul>
        {
          product.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))
        }
      </ul>

      <button>Call api</button>
    </>
  )
}

export default App
