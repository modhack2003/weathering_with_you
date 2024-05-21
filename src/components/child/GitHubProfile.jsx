import React, { useState, useEffect } from 'react';

const GitHubProfile = () => {
    const [userData, setUserData] = useState(null);
    const username = 'modhack2003';

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [username]);

    return (
        <div>
            {userData && (
                <div>
                    <h2>{userData.name}</h2>
                    <p>{userData.bio || 'No bio available.'}</p>
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Public Repositories: {userData.public_repos}</p>
                    <p>
                        <a href={userData.html_url}>View on GitHub</a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default GitHubProfile;
