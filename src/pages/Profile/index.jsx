import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import content from './content';
import InformationForm from './InformationForm';
import ChangePasswordForm from './ChangePasswordForm';

const Profile = () => {
  return (
    <div>
      <PageHeader pageName={content.pageName} />
      <InformationForm />
      <ChangePasswordForm />
    </div>
  );
};

export default Profile;
