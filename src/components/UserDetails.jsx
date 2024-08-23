// it will only show the data after the form is submitted 

import React from 'react';

function UserDetails() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <div className="card">
      <div className="card-header">
        <div className="text-header">User Details</div>
      </div>
      <div className="card-body">
        {userDetails ? (
          <ul>
            <li><strong>Email:</strong> {userDetails.email}</li>
            <li><strong>Name:</strong> {userDetails.name}</li>
            <li><strong>Address:</strong> {userDetails.address}</li>
            <li><strong>Age:</strong> {userDetails.age}</li>
            <li><strong>Location:</strong> {userDetails.location}</li>
          </ul>
        ) : (
          <p>No user details found. Please submit the form first.</p>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
