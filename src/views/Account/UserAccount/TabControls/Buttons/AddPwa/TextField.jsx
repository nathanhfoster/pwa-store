import React, { useCallback } from 'react';
import { connect } from 'resurrection';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SetUserPwaForm } from 'store/reducers/User/actions/redux';
import MaterialTextField from '@material-ui/core/TextField';

const TextField = ({ name, autoFocus, value, disabled, label, required, SetUserPwaForm }) => {
  const handleFormChange = useCallback(({ target: { name, value } }) => {
    SetUserPwaForm(name, value);
  }, []);

  return (
    <FormControl id={name} label={label} name={name} margin='normal' fullWidth>
      <MaterialTextField
        autoFocus={autoFocus}
        id={name}
        label={label}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={handleFormChange}
        margin='normal'
        fullWidth
      />
      {disabled && <LinearProgress />}
    </FormControl>
  );
};

const mapStateToProps = (
  {
    User: {
      pwaToUpload: { form }
    }
  },
  { name }
) => form[name];

const mapDispatchToProps = { SetUserPwaForm };

export default connect(mapStateToProps, mapDispatchToProps)(TextField);
