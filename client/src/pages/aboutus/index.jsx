import React from 'react';
import './aboutus.css'; // Import custom styles for the page

// Teammate data with image paths directly from the public folder
const teammates = [
  { name: 'Srestha Mukherjee', image: '/utsho.JPG', role: 'Frontend Developer' },
  { name: 'Utsho Saha', image: '/utsho.JPG', role: 'Backend Developer' },
  { name: 'Sukanya Dey', image: '/utsho.JPG', role: 'UI/UX Designer' },
  { name: 'Tripti Das', image: '/utsho.JPG', role: 'Project Manager' },
  { name: 'Diganta Chowdhury', image: '/utsho.JPG', role: 'QA Engineer' },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="page-title">About Us</h1>
      <div className="team-members">
        {teammates.map((teammate, index) => (
          <div key={index} className="team-member">
            <img src={teammate.image} alt={teammate.name} className="teammate-img" />
            <h2>{teammate.name}</h2>
            <p>{teammate.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
