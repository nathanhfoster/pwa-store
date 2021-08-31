import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import { useMounted } from 'resurrection';
import { cleanObject, capitalize } from 'utils';

const getStyles = (name, array, theme) => ({
  fontWeight: array.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
});

const Field = ({
  type = 'text',
  required = false,
  fullWidth = true,
  id = type,
  label = capitalize(id).replace('_', ' '),
  name = id,
  autoComplete,
  margin = 'normal',
  autoFocus = false,
  color = 'primary',
  multiple = false,
  defaultValue,
  value,
  MenuProps,
  disabled = false,
  options = [{ id: 'No results' }],
  setForm
}) => {
  const theme = useTheme();
  const mounted = useMounted();
  const isTextArea = type === 'textarea';

  useEffect(() => {
    if (mounted) {
      setForm({ [name]: defaultValue });
    }
  }, [defaultValue]);

  switch (type) {
    case 'checkbox':
      return (
        <FormControlLabel
          key={name}
          control={<Checkbox type={type} id={id} name={name} color={color} checked={value} />}
          label={label}
        />
      );

    case 'select':
      const handleSelectChange = ({ target: { name, value } }) => {
        setForm({ [name]: typeof value === 'string' ? value.split(',') : value });
      };
      return (
        <FormControl
          key={name}
          id={name}
          label={label}
          name={name}
          required={required}
          margin={margin}
          fullWidth={fullWidth}
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            id={name}
            label={label}
            labelId={label}
            name={name}
            multiple={multiple}
            onChange={handleSelectChange}
            value={value}
            required={required}
            input={<OutlinedInput id={name} type={type} label={label} name={name} required={required} fullWidth />}
            MenuProps={MenuProps}
            disabled={disabled}
          >
            {options.map(({ id, name = id }) => (
              <MenuItem key={name} value={name} style={getStyles(name, value, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    default:
      return (
        <TextField
          key={name}
          type={type}
          margin={margin}
          multiline={isTextArea}
          minRows={isTextArea ? 2 : 'auto'}
          maxRows={isTextArea ? 8 : 'auto'}
          required={required}
          fullWidth={fullWidth}
          id={id}
          label={label}
          name={name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          color={color}
          value={value}
        />
      );
  }
};

export default memo(Field);
