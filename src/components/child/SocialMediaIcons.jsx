import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGithub, 
    faXTwitter, 
    faLinkedin, 
    faFacebook, 
    faInstagram, 
    faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './SocialMediaIcons.css';

const SocialMediaIcons = () => {
    const socialMedia = [
        { icon: faGithub, url: 'https://github.com/modhack2003', color: '#333' },
        { icon: faXTwitter, url: 'https://x.com/Bikramdey2003', color: 'white' },
        { icon: faLinkedin, url: 'https://www.linkedin.com/in/bikram-dey-700452997020031312', color: '#0077B5' },
        { icon: faFacebook, url: 'https://www.facebook.com/bikram.dey.94849', color: '#1877F2' },
        { icon: faInstagram, url: 'https://instagram.com/your_username', color: '#E4405F' },
        { icon: faYoutube, url: 'https://youtube.com/@bikramdey3964?si=JOx16q8QoAim52z7', color: '#FF0000' },
        { icon: faEnvelope, url: 'mailto:bikram20031213@gmail.com', color: '#D14836' },
        { icon: faPhone, url: 'tel:+917003529970', color: '#34B7F1' },
    ];

    return (
        <div className="social-media-icons">
            {socialMedia.map((media, index) => (
                <a
                    key={index}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ '--hover-color': media.color }}
                >
                    <FontAwesomeIcon icon={media.icon} />
                </a>
            ))}
        </div>
    );
};

export default SocialMediaIcons;
