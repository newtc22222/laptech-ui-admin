import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import content from './content';
import InformationForm from './InformationForm';
import ChangePasswordForm from './ChangePasswordForm';

const Profile = () => {
  return (
    <>
      <PageHeader pageName={content.pageName} />
      <div className="row">
        <div className="col-6">
          <InformationForm />
        </div>
        <div className="col-5">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
