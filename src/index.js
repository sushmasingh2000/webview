import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store/store';
// Create a client
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
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
        </QueryClientProvider>
    </PersistGate>
  </Provider>
);