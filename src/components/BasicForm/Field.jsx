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
import { capitalize } from 'utils';

const getStyles = (name, array, theme) => ({
  fontWeight: array?.indexOf?.(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
});

const Field = ({
  type = 'text',
  required = false,
  fullWidth = true,
  id = type,
  label = capitalize(id).replace('_', ' '),
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
  placeholder,
  onChange,
  setForm
}) => {
  const theme = useTheme();
  const mounted = useMounted();
  const isTextArea = type === 'textarea';

  useEffect(() => {
    if (mounted && !onChange) {
      setForm({ [id]: value });
    }
  }, [value, onChange]);

  switch (type) {
    case 'checkbox':
      return (
        <FormControlLabel
          key={id}
          control={<Checkbox type={type} id={id} name={id} color={color} checked={value} />}
          label={label}
        />
      );

    case 'select':
      const handleSelectChange = ({ target: { name, value } }) => {
        const newValue = typeof value === 'string' ? value.split(',') : value;
        if (onChange) {
          onChange(name, newValue);
        } else {
          setForm({ [name]: newValue });
        }
      };
      return (
        <FormControl key={id} id={id} label={label} name={id} required={required} margin={margin} fullWidth={fullWidth}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            id={id}
            label={label}
            labelId={label}
            name={id}
            multiple={multiple}
            onChange={handleSelectChange}
            value={value}
            required={required}
            input={
              <OutlinedInput
                id={id}
                type={type}
                label={label}
                name={id}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                fullWidth
              />
            }
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
          key={id}
          type={type}
          margin={margin}
          multiline={isTextArea}
          minRows={isTextArea ? 2 : 'auto'}
          maxRows={isTextArea ? 8 : 'auto'}
          required={required}
          fullWidth={fullWidth}
          id={id}
          label={label}
          name={id}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          color={color}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
        />
      );
  }
};

export default memo(Field);
