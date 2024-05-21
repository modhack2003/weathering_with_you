import React, { useState, useEffect } from 'react';
import './GitHubWidget.css'; // Import CSS for styling

const GitHubProfileWidget = () => {
    const [userData, setUserData] = useState(null);
    const username = 'modhack2003';

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub profile');
                }
                return response.json();
            })
            .then((data) => setUserData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [username]);

    return (
        <div className="github-widget">
            {userData && (
                <div>
                    <div className="avatar">
                        <img src={userData.avatar_url} alt="GitHub Avatar" />
                    </div>
                    <div>
                        <h3 className="widget-header">GitHub Profile</h3>
                        <div className="widget-content">
                            <p>Name: {userData.name}</p>
                            <p>Bio: {userData.bio || 'No bio available.'}</p>
                            <p>Followers: {userData.followers}</p>
                            <p>Following: {userData.following}</p>
                            <p>Public Repositories: {userData.public_repos}</p>
                        </div>
                        <div className="widget-footer">
                            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitHubProfileWidget;
