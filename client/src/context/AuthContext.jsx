import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context (The "Global Storage")
export const AuthContext = createContext();

// 2. Create the Provider (The wrapper that gives data to our app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // When the app first loads, check if they were already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Function to run when someone logs in or registers
  const login = (userData, token) => {
    setUser(userData); // Save to React state
    localStorage.setItem('user', JSON.stringify(userData)); // Save to browser memory
    localStorage.setItem('token', token);
  };

  // Function to run when they click Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    // Make the user data, login function, and logout function available EVERYWHERE
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
