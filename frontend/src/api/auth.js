import axios from 'axios';

// api/auth.js
export const login = async (credentials) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', { // Update URL as per your API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        return data; // Ensure the API returns user data
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Rethrow error to handle in your component
    }
};

export const checkLoginStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.get('http://localhost:5000/api/auth/checkLogin', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
    return { loggedIn: false };
};

// frontend/src/api/auth.js
export const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
// api/auth.js

// ... other imports

export const clearUser = async () => {
    try {
        // If you are using an API call to logout, uncomment the following line:
        // await api.post('/logout'); // Adjust the URL according to your backend endpoint
        // Optionally clear any token or session data if necessary
    } catch (error) {
        console.error('Logout failed:', error);
        throw error; // Rethrow to handle in the Navbar if needed
    }
};

export const addCollege = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/addcollege', credentials);
        return response.data; // Ensure the API returns user data
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Rethrow error to handle in your component
    }
};

export const addCommittee = async (committeeData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/add-committee', committeeData);
        return response.data; // Ensure the API returns committee data or a success message
    } catch (error) {
        console.error('Error adding committee:', error);
        throw error; // Rethrow error to handle in your component
    }
};
