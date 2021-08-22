import React, { useCallback } from 'react';
import { connect } from 'resurrection';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import { SetUserPwaForm } from 'store/reducers/User/actions/redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const getStyles = (name, array, theme) => ({
  fontWeight: array.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
});

const SelectField = ({ name, label, options, value, disabled, SetUserPwaForm }) => {
  const theme = useTheme();

  const handleFormChange = useCallback(({ target: { name, value } }) => {
    SetUserPwaForm(
      name,
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  }, []);

  return (
    <FormControl id={name} label={label} name={name} margin='normal' fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        id={name}
        label={label}
        labelId={label}
        name={name}
        multiple
        value={value}
        onChange={handleFormChange}
        input={<OutlinedInput id={name} label={label} name={name} fullWidth />}
        MenuProps={MenuProps}
        disabled={disabled}
      >
        {options.map(({ name }) => (
          <MenuItem key={name} value={name} style={getStyles(name, value, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectField);
