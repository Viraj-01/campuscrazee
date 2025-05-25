import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventCreationPage.css';
import { useUser } from '../context/userContext';

function EventCreationPage() {
    const { user} = useUser(); // Access user context
    // State for form fields
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        dateFrom: '',
        dateTo: '',
        timeFrom: '',
        timeTo: '',
        location: '',
        category: '',
        capacity: '',
    });
    const [images, setImages] = useState({ image1: null, image2: null });
    const [imagePreviews, setImagePreviews] = useState({ image1: null, image2: null });
    const [committeeId, setCommitteeId] = useState(null);
    const username = user.username; // Replace with the actual username from your context

    // Fetch the committee ID by username
    useEffect(() => {
        const fetchCommitteeId = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/committees/by-username/${username}`);
                setCommitteeId(response.data.committeeId);
            } catch (error) {
                console.error('Error fetching committee ID:', error);
            }
        };

        fetchCommitteeId();
    }, [username]);

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        });
        setEventData({ ...eventData, [name]: name === 'capacity' ? Number(value) : value });
    };

    // Handle image uploads
    const handleImageChange = (e, imageKey) => {
        const file = e.target.files[0];
        setImages((prevImages) => ({
            ...prevImages,
            [imageKey]: file
        }));
        setImagePreviews((prevPreviews) => ({
            ...prevPreviews,
            [imageKey]: URL.createObjectURL(file)
        }));
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', eventData.name);
        formData.append('description', eventData.description);
        formData.append('dateFrom', eventData.dateFrom);
        formData.append('dateTo', eventData.dateTo);
        formData.append('timeFrom', eventData.timeFrom);
        formData.append('timeTo', eventData.timeTo);
        formData.append('location', eventData.location);
        formData.append('category', eventData.category);
        formData.append('capacity', eventData.capacity);
        formData.append('image1', images.image1);
        formData.append('image2', images.image2);
        formData.append('committeeId', committeeId); // Add committee ID

        try {
            const response = await axios.post('http://localhost:5000/api/events/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Event created:', response.data);
            // Clear form and reset state if needed
            setEventData({
                name: '',
                description: '',
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                location: '',
                category: '',
                capacity: '',
            });
            setImages({ image1: null, image2: null });
            setImagePreviews({ image1: null, image2: null });
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="event-creation-page">
            <h1>Create New Event</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Input fields for event details (same as before) */}
                <label>Event Name</label>
                <input type="text" name="name" value={eventData.name} onChange={handleInputChange} required />

                <label>Description</label>
                <textarea name="description" value={eventData.description} onChange={handleInputChange} required />

                <label>Date From</label>
                <input type="date" name="dateFrom" value={eventData.dateFrom} onChange={handleInputChange} required />

                <label>Date To</label>
                <input type="date" name="dateTo" value={eventData.dateTo} onChange={handleInputChange} required />

                <label>Time From</label>
                <input type="time" name="timeFrom" value={eventData.timeFrom} onChange={handleInputChange} required />

                <label>Time To</label>
                <input type="time" name="timeTo" value={eventData.timeTo} onChange={handleInputChange} required />

                <label>Location</label>
                <input type="text" name="location" value={eventData.location} onChange={handleInputChange} required />

                <label>Category</label>
                <select name="category" value={eventData.category} onChange={handleInputChange} required>
                    <option value="">Select Category</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="meetup">Meetup</option>
                    <option value="competition">Competition</option>
                </select>

                <label>Capacity</label>
                <input type="number" name="capacity" value={eventData.capacity} onChange={handleInputChange} required min="1" />

                <label>Upload Event Image 1</label>
                <input type="file" name="image1" accept="image/*" onChange={(e) => handleImageChange(e, 'image1')} required />

                {imagePreviews.image1 && (
                    <div className="image-preview">
                        <img src={imagePreviews.image1} alt="Event Preview 1" />
                    </div>
                )}

                <label>Upload Event Image 2</label>
                <input type="file" name="image2" accept="image/*" onChange={(e) => handleImageChange(e, 'image2')} required />

                {imagePreviews.image2 && (
                    <div className="image-preview">
                        <img src={imagePreviews.image2} alt="Event Preview 2" />
                    </div>
                )}

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default EventCreationPage;
