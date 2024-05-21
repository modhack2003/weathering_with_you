import React from 'react';
import './About_us.css'; // Import your CSS file for styling
import GitHubProfile from './child/GitHubProfile';
import GitHubWidget from './child/GitHubWidget';

const AboutUsPage = () => {
  return (
    <div className='container'>
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>Welcome to our Weather App!</p>
      <p>We are a team passionate about providing accurate and up-to-date weather information to our users.</p>
      <p>Our mission is to make it easy for you to check the weather forecast for any location around the world.</p>
      <p>Feel free to explore our app and don't hesitate to reach out to us if you have any questions or feedback!</p>
      <div className='github-info'>
        
        <GitHubWidget/>

      </div>
    </div>
    </div>
  );
}

export default AboutUsPage;
