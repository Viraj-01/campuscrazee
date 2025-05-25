import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as Components from './DoubleSliderFormstyle';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';

function DoubleSliderForm() {
    const dispatch = useDispatch();
    const [signIn, toggle] = useState(true);
    const [colleges, setColleges] = useState([]); // State for colleges
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        college: '', // Ensure college is set to an empty string initially
        year: '',
        course: '',
        password: '',
        userType: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch colleges on mount
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/getAllcolleges');
                setColleges(response.data);
            } catch (error) {
                console.error("Error fetching colleges:", error);
            }
        };
        fetchColleges();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                college: formData.college,  // Now correctly referencing the selected college ID
                userType: 'normal_user',
                year: formData.year,
                course: formData.course
            });
            console.log("Signup successful:", response.data);
            toggle(true); // Close the form on successful signup
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Error signing up');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password,
                userType: formData.userType
            });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(loginUser({ user, token }));

            window.location.reload();

        } catch (error) {
            setErrorMessage(error.response.data.message || 'Error logging in');
        }
    };

    return (
        <Components.Container>
            <Components.SignUpContainer signin={signIn}>
                <Components.Form onSubmit={handleSignUp}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='Username' name="username" value={formData.username} onChange={handleInputChange} />
                    <Components.Input type='email' placeholder='Email' name="email" value={formData.email} onChange={handleInputChange} />
                    <Components.Select name="college" value={formData.college} onChange={handleInputChange}>
                        <option value="" disabled>Choose your college</option>
                        {colleges.map(college => (
                            <option key={college._id} value={college._id}>{college.name}</option>
                        ))}
                    </Components.Select>
                    <Components.Select name="year" value={formData.year} onChange={handleInputChange}>
                        <option value="" disabled>Select Year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                    </Components.Select>
                    <Components.Select name="course" value={formData.course} onChange={handleInputChange}>
                        <option value="" disabled>Select Course / Branch</option>
                        <option value="cs">Computer Science</option>
                        <option value="it">Information Technology</option>
                        <option value="eng">Engineering</option>
                    </Components.Select>
                    <Components.Input type='password' placeholder='Password' name="password" value={formData.password} onChange={handleInputChange} />
                    <Components.Button type="submit">Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signin={signIn}>
                <Components.Form onSubmit={handleSignIn}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Select name="userType" value={formData.userType} onChange={handleInputChange}>
                        <option value="" disabled>Type of User</option>
                        <option value="normal">Normal</option>
                        <option value="college-head">College-Head</option>
                        <option value="committee-head">Committee-Head</option>
                        <option value="main-admin">Main Admin</option>
                    </Components.Select>
                    <Components.Input type='email' placeholder='Email' name="email" value={formData.email} onChange={handleInputChange} />
                    <Components.Input type='password' placeholder='Password' name="password" value={formData.password} onChange={handleInputChange} />
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button type="submit">Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signin={signIn}>
                <Components.Overlay signin={signIn}>
                    <Components.LeftOverlayPanel signin={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signin={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start your journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton> 
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Components.Container>
    );
}

export default DoubleSliderForm;
