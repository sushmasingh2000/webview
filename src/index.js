
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.js'
import { ThemeProvider } from '@mui/material'
import theme from './Theme.js'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
    <Toaster
        toastOptions={{
          className: "",
          style: {
            border: `1px solid `,
            color: "#25D366",
            fontSize: "15px",
            marginTop: "100px",
            borderRadius: "10px",
          },
        }}
        autoClose={1000}
        limit={1}
      />
      <App/>
    </QueryClientProvider>
   </ThemeProvider>
  </StrictMode>
)