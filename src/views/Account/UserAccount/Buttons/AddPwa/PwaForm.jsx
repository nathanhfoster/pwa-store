import React, { useCallback } from 'react';
import connect from 'resurrection';
import PwaFormComponent from 'components/PwaForm';
import { SetUserPwaForm, SetUserPwaFormManifest, PostUserPwa } from 'store/reducers/User/actions';

const PwaForm = ({ form, SetUserPwaForm, SetUserPwaFormManifest, PostUserPwa }) => {
  const handleFormChange = useCallback(({ type, name, payload }) => {
    if (type === 'SET_MANIFEST') {
      SetUserPwaFormManifest(payload);
    } else {
      SetUserPwaForm(name, payload);
    }
  }, []);

  return <PwaFormComponent titlePrefix='Post' form={form} onChange={handleFormChange} onSubmit={PostUserPwa} />;
};

const mapStateToProps = ({
  User: {
    pwaToUpload: { form }
  }
}) => ({
  form
});

const mapDispatchToProps = { SetUserPwaForm, SetUserPwaFormManifest, PostUserPwa };

export default connect(mapStateToProps, mapDispatchToProps)(PwaForm);
