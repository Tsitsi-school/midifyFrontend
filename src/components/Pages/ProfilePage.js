import React, {useState, useEffect} from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Header from '../Headers/pageHeader';
import {fetchProfile} from '../../api/midifyApi';
import '../pageStyles.css';
import Layout from '../common/Layout';
import {updateProfile} from '../../api/midifyApi';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await fetchProfile();
                setProfile(data); // Set the fetched profile data
            } catch (error) {
                setError('Failed to fetch profile.');
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfileData();
    }, []);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleSave = async () => {
        try {
            await updateProfile(profile); // Save the updated profile to the backend
            setIsEditable(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <Layout header={Header}>
            <div className="profile-page-container">
                <div className="profile-container">
                    <AccountCircleOutlinedIcon className="profile-icon"/>
                    <div className="profile-details">
                        <h2 className="profile-name">{profile.first_name} {profile.last_name}</h2>
                        <p className="profile-email">{profile.email}</p>
                    </div>
                    <button
                        className="profile-edit-button"
                        onClick={isEditable ? handleSave : handleEditClick}
                    >
                        {isEditable ? 'Save' : 'Edit'}
                    </button>

                </div>

                <div className="profile-form-container">
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            className="profile-form-field"
                            placeholder="Your First Name"
                            value={profile.first_name}
                            onChange={(e) => setProfile({...profile, first_name: e.target.value})} // Update state
                            disabled={!isEditable}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="profile-form-field"
                            placeholder="Your Last Name"
                            value={profile.last_name}
                            onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                            disabled={!isEditable}
                        />
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="profile-form-field"
                            placeholder="Your Email Address"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            disabled={!isEditable}
                        />
                    </div>
                    <div>
                        <label>Language</label>
                        <select
                            className="profile-form-field-select"
                            onChange={(e) => setProfile({...profile, preferred_language: e.target.value})}
                            disabled={!isEditable}
                        >
                            <option value={profile.preferred_language}>
                                {profile.preferred_language}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;