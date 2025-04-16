import React from 'react';
import SignUpOrg from '../../components/organisms/SignUpOrg';
import { SCREENS } from '../../constants';

function EditScreen() {
    
        return (
          <SignUpOrg
          step={1}
          isEditProfile={true}
          
          />
        );
}

export default EditScreen;