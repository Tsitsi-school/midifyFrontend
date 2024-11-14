import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Header from './pageHeader'; // Assuming Header uses the theme colors

const PageContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 40px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distributes items to each end */
  max-width: 80%;
  width: 80%;
  margin: 40px 0px;
`;

const ProfileIcon = styled(AccountCircleOutlinedIcon)`
  font-size: 5rem !important;
  color: var(--text-color);
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  margin: 10px;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
`;

const ProfileEmail = styled.p`
  font-size: 1rem;
  color: var(--drop-text-color);
`;

const FormContainer = styled.div`
  width: 80%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const FormField = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px ;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
  background-color: ${({ editable }) => (editable ? 'white' : 'var(--upload-container-bg)')};
  cursor: ${({ editable }) => (editable ? 'text' : 'not-allowed')};

  &:focus {
    outline: ${({ editable }) => (editable ? '2px solid var(--upload-button-bg)' : 'none')};
  }
`;

const FormFieldSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
  background-color: ${({ editable }) => (editable ? 'white' : 'var(--upload-container-bg)')};
  cursor: ${({ editable }) => (editable ? 'pointer' : 'not-allowed')};

  &:focus {
    outline: ${({ editable }) => (editable ? '2px solid var(--upload-button-bg)' : 'none')};
  }
`;

const EditButton = styled.button`
  padding: 10px 40px;
  background-color: var(--upload-button-bg);
  color: var(--upload-button-text);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1a5cad;
  }
`;

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div>
      <Header /> {/* Includes the Header with theme colors */}
      <PageContainer>
        <ProfileContainer>
          <ProfileIcon />
          <ProfileDetails>
            <ProfileName>Akhil Ajith</ProfileName>
            <ProfileEmail>akhilajith@gmail.com</ProfileEmail>
          </ProfileDetails>
          <EditButton onClick={handleEditClick}>
          {isEditable ? 'Save' : 'Edit'}
        </EditButton>
        </ProfileContainer>

        <FormContainer>
          <div>
            <label>First Name</label>
            <FormField type="text" placeholder="Your First Name" editable={isEditable} disabled={!isEditable} />
          </div>
          <div>
            <label>Last Name</label>
            <FormField type="text" placeholder="Your Last Name" editable={isEditable} disabled={!isEditable} />
          </div>
          <div>
            <label>Email Address</label>
            <FormField type="email" placeholder="Your Email Address" editable={isEditable} disabled={!isEditable} />
          </div>
          <div>
            <label>Language</label>
            <FormFieldSelect editable={isEditable} disabled={!isEditable}>
              <option value="">Your Preferred Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </FormFieldSelect>
          </div>
        </FormContainer>


      </PageContainer>
    </div>
  );
};

export default ProfilePage;
