import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function UserForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    age: '',
    location: '',
  });

  const [locationPlaceholder, setLocationPlaceholder] = useState('Enter your location');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name;
            setLocationPlaceholder(address);
            setFormData({ ...formData, location: address });
          } catch (error) {
            console.error('Error getting address:', error);
            setLocationPlaceholder('Unable to get location');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPlaceholder('Unable to get location');
        }
      );
    } else {
      setLocationPlaceholder('Geolocation not supported');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Form submitted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/users');  // Navigate to the user details page on success
        }, 2000);
      } else {
        console.error('Error saving data');
        setSuccessMessage('Error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="text-header">Form Details</div>
      </div>
      <div className="card-body">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              required
              className="form-control"
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              required
              className="form-control"
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              required
              className="form-control"
              name="address"
              id="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              required
              className="form-control"
              name="age"
              id="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Current Location:</label>
            <div className="location-input">
              <input
                required
                className="form-control"
                name="location"
                id="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder={locationPlaceholder}
              />
              <button type="button" className="btn-location" onClick={getCurrentLocation}>
                Get Location
              </button>
            </div>
          </div>
          <input type="submit" className="btn" value="Submit" />
        </form>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <Link to="/users" className="btn-location">View User Details</Link>
      </div>
    </div>
  );
}

export default UserForm;
