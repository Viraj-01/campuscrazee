// components/AddCollegeModal.js
import React, { useState } from 'react';
import './AddCollegeModal.css'; // Ensure you have CSS for styling
import axios from 'axios';

const AddCollegeModal = ({ onClose, onAddCollege }) => {
    const [collegeName, setCollegeName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('college_head');
    // const [setColleges] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // // Fetch colleges from the backend
    // useEffect(() => {
    //     const fetchColleges = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/auth/getAllColleges');
    //             setColleges(response.data);
    //         } catch (error) {
    //             console.error('Error fetching colleges:', error);
    //             setError('Failed to load colleges. Please try again later.');
    //         }
    //     };
    //     fetchColleges();
    // }, [setColleges]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null); // Clear any previous error

        const collegeData = {
            collegeName,
            location,
            email,
            password,
            role:'college_head', // Include selected collegeId in request
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/add-college', collegeData);

            if (response.status === 201) {
                console.log('College added successfully:', response.data);
                onAddCollege && onAddCollege(response.data); // Call parent callback if provided
                onClose(); // Close the modal
            } else {
                throw new Error('Failed to add college and user');
            }
        } catch (error) {
            console.error('Error adding college:', error);
            setError('There was an error adding the college. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay-AddCollegeModal" onClick={onClose}>
            <div className="modal-content-AddCollegeModal" onClick={(e) => e.stopPropagation()}>
                <h2>Add College</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="collegeName">College Name:</label>
                        <input
                            type="text"
                            id="collegeName"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="collegeLocation">Location:</label>
                        <input
                            type="text"
                            id="collegeLocation"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="college_head">College Head</option>
                        </select>
                    </div> */}
                    {/* <div className="form-group">
                        <label htmlFor="college">Select College:</label>
                        <select
                            id="college"
                            value={selectedCollegeId}
                            onChange={(e) => setSelectedCollegeId(e.target.value)}
                            required
                        >
                            <option value="">--Select College--</option>
                            {colleges.map((college) => (
                                <option key={college._id} value={college._id}>
                                    {college.name}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add College'}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCollegeModal;
