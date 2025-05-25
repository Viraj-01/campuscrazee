import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext'; // Adjust the import path as necessary
import './AddCommitteeModal.css';

const AddCommitteeModal = ({ onClose, onAddCommittee }) => {
    const { user } = useUser(); // Access user context
    console.log('Current User:', user); // Add this line
    const [committeename, setName] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in and has a college
        if (!user || !user.college) {
            console.error('User is not logged in or college is missing.');
            return;
        }

        // Prepare the data to send to the backend
        const committeeData = {
            name: committeename,
            college: user.college, // Use the logged-in user's college
            description,
            email,
            password,
            role: 'committee_head'
        };

        try {
            // Make the POST request to add the committee
            const response = await axios.post('http://localhost:5000/api/auth/add-committee', committeeData);
            if (response.status === 201) {
                console.log('Committee added successfully:', response.data);
                onAddCommittee && onAddCommittee(response.data); // Call parent callback if provided
                onClose(); // Close the modal
            } else {
                throw new Error('Failed to add committee and user');
            }
        } catch (error) {
            console.error('Error adding committee:', error);
        }
    };

    return (
        <div className="modal-overlay-AddCommitteeModal" onClick={onClose}>
            <div className="modal-content-AddCommitteeModal" onClick={(e) => e.stopPropagation()}>
                <h2>Add Committee</h2>
                <form onSubmit={handleSubmit}>
                    {/* Committee Name */}
                    <input 
                        type="text" 
                        placeholder="Committee Name" 
                        value={committeename} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />

                    {/* Committee Description */}
                    <textarea
                        placeholder="Committee Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    {/* Email Field */}
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    {/* Password Field */}
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit">Add Committee</button>
                </form>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AddCommitteeModal;
