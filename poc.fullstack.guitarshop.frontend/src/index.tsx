import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'

// Material UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { BasketProvider } from './context/BasketProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BasketProvider>
      <RouterProvider router={router} />
    </BasketProvider>
  </StrictMode>,
)
