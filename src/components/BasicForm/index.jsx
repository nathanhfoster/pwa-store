import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';

const getStyles = (name, array, theme) => ({
  fontWeight: array.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
});

const BasicForm = ({ title, data, submitTitle, children, onSubmit }) => {
  const theme = useTheme();
  const handleSubmit = (event) => {
    if (onSubmit) {
      event.preventDefault();
      const payload = new FormData(event.currentTarget);
      onSubmit(payload);
    }
  };

  const renderInputs = useMemo(
    () =>
      data.map(
        ({
          type = 'text',
          required = false,
          fullWidth = true,
          id,
          label,
          name = id,
          autoComplete,
          margin = 'normal',
          autoFocus = false,
          color = 'primary',
          multiple = false,
          value,
          MenuProps,
          disabled = false,
          options
        }) => {
          switch (type) {
            case 'checkbox':
              return <FormControlLabel control={<Checkbox value={id} color={color} />} label={label} />;

            case 'select':
              return (
                <FormControl
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
                    value={value}
                    required={required}
                    input={<OutlinedInput id={name} label={label} name={name} required={required} fullWidth />}
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
                  margin={margin}
                  required={required}
                  fullWidth={fullWidth}
                  id={id}
                  label={label}
                  name={name}
                  autoComplete={autoComplete}
                  autoFocus={autoFocus}
                  color={color}
                  InputProps={{ type }}
                />
              );
          }
        }
      ),
    [data]
  );
  return (
    <>
      {title && (
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
      )}
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {renderInputs}
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}>
          {submitTitle}
        </Button>
        {children}
      </Box>
    </>
  );
};

BasicForm.propTypes = {
  submitTitle: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOfType([
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
        'select'
      ]),
      required: PropTypes.bool,
      fullWidth: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      autoComplete: PropTypes.bool,
      margin: PropTypes.oneOf(['dense', 'none', 'normal']),
      autoFocus: PropTypes.bool,
      color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'string']),
      multiple: PropTypes.bool,
      MenuProps: PropTypes.shape({}),
      disabled: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }))
    })
  )
};

BasicForm.defaultProps = {
  submitTitle: 'Sign In',
  data: []
};

export default memo(BasicForm);
