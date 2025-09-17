import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './authentiaction/Login';
import { routes } from './routes/Routes';
import Signup from './authentiaction/Signup';
import { useState } from 'react';
import SplashScreen from './SplashScreen';


function App() {
  const admin = localStorage.getItem("token");
    const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {admin ? (
          routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))
        ) : (
          <Route path="*" element={<Login />} />
        )}

       
      </Routes>
    </BrowserRouter>

  );
}

export default App;