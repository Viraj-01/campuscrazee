// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 Use the new API
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { UserProvider } from './context/userContext'; // Import UserProvider

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // 👈 Create a root

root.render(
    <Provider store={store}>
        <UserProvider>
            <App />
        </UserProvider>
    </Provider>
);
