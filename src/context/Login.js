import { createContext, useContext, useState } from 'react';

const LoginModalContext = createContext();

export const useLoginModal = () => useContext(LoginModalContext);

export const LoginModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <LoginModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};
