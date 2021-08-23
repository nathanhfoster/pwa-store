import React, { useCallback } from 'react';
import { connect } from 'resurrection';
import { styled } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SetUserPwaForm } from 'store/reducers/User/actions/redux';
import MaterialTextField from '@material-ui/core/TextField';
import MaterialTextArea from '@material-ui/core/TextareaAutosize';

const StyledTextArea = styled(MaterialTextArea)((props) => ({
  minHeight: 56,
  maxHeight: 56 * 3,
  padding: 16,
  fontSize: 'inherit',
  width: '100%',
  resize: 'vertical',
  background: 'inherit',
  color: 'inherit'
}));

const TextField = ({
  type,
  name,
  autoFocus,
  placeholder,
  value,
  disabled,
  label,
  required,
  lightHouseIsLoading,
  SetUserPwaForm
}) => {
  let FieldComponent;
  let fieldValue = value;

  const handleFormChange = useCallback(({ target: { name, value } }) => {
    console.log(name, value)
    SetUserPwaForm(name, value);
  }, []);

  switch (type) {
    case 'textarea':
      FieldComponent = StyledTextArea;
      fieldValue = typeof fieldValue === 'object' ? JSON.stringify(fieldValue) : fieldValue;
      break;
    default:
      FieldComponent = MaterialTextField;
  }

  return (
    <FormControl type={type} id={name} label={label} name={name} margin='normal' fullWidth>
      <FieldComponent
        type={type}
        autoFocus={autoFocus}
        id={name}
        label={label}
        name={name}
        required={required}
        disabled={disabled || lightHouseIsLoading}
        value={fieldValue}
        placeholder={placeholder}
        onChange={handleFormChange}
        margin='none'
        fullWidth
      />
      {lightHouseIsLoading && name === 'url' && <LinearProgress />}
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

TextField.defaultProps = {
  type: 'text'
};

export default connect(mapStateToProps, mapDispatchToProps)(TextField);
