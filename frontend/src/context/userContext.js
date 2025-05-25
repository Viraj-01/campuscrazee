// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, clearUser } from '../redux/userSlice';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            dispatch(loginUser({ user: parsedUser })); // Dispatch login action
        } else {
            dispatch(clearUser()); // Clear user if not found
        }
    }, [dispatch]);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        dispatch(clearUser());
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
