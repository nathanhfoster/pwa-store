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
import { useSetRefState } from 'resurrection';
import { cleanObject, capitalize } from 'utils';

const getStyles = (name, array, theme) => ({
  fontWeight: array.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
});

const BasicForm = ({ title, data, submitTitle, disabled, sx, children, onSubmit }) => {
  const theme = useTheme();
  const [form, setForm] = useSetRefState(
    data.reduce((acc, { id, name = id, multiple = false, defaultValue = multiple ? [] : '' }) => {
      acc[name] = defaultValue;
      return acc;
    }, {})
  );
  const handleSubmit = (event) => {
    if (onSubmit) {
      event.preventDefault();
      const payload = new FormData(event.currentTarget);
      Object.entries(cleanObject(form, true)).forEach(([key, value]) => payload.append(key, value));
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
          id = type,
          label = capitalize(id),
          name = id,
          autoComplete,
          margin = 'normal',
          autoFocus = false,
          color = 'primary',
          multiple = false,
          defaultValue = multiple ? [] : '',
          MenuProps,
          disabled = false,
          options = [{ id: 'No results' }]
        }) => {
          switch (type) {
            case 'checkbox':
              return <FormControlLabel key={name} control={<Checkbox value={id} color={color} />} label={label} />;

            case 'select':
              const handleFormChange = ({ target: { name, value } }) => {
                setForm((prevForm) => ({ ...prevForm, [name]: typeof value === 'string' ? value.split(',') : value }));
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
                    defaultValue={defaultValue}
                    onChange={handleFormChange}
                    // value={form[name]}
                    required={required}
                    input={<OutlinedInput id={name} label={label} name={name} required={required} fullWidth />}
                    MenuProps={MenuProps}
                    disabled={disabled}
                  >
                    {options.map(({ id, name = id }) => (
                      <MenuItem key={name} value={name} style={getStyles(name, defaultValue, theme)}>
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
                  defaultValue={defaultValue}
                />
              );
          }
        }
      ),
    [data, theme]
  );
  return (
    <>
      {title && <Typography variant='h5'>{title}</Typography>}
      <Box component='form' noValidate onSubmit={handleSubmit} sx={sx}>
        {renderInputs}
        <Button
          disabled={disabled || !onSubmit}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}
        >
          {submitTitle}
        </Button>
        {children}
      </Box>
    </>
  );
};

BasicForm.propTypes = {
  submitTitle: PropTypes.string,
  disabled: PropTypes.bool,
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
      autoComplete: PropTypes.string,
      margin: PropTypes.oneOf(['dense', 'none', 'normal']),
      autoFocus: PropTypes.bool,
      color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'string']),
      multiple: PropTypes.bool,
      MenuProps: PropTypes.shape({}),
      disabled: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
      defaultValue: PropTypes.string
    })
  ),
  sx: PropTypes.object
};

BasicForm.defaultProps = {
  submitTitle: 'Sign In',
  disabled: false,
  data: [],
  sx: { mt: 1 }
};

export default memo(BasicForm);
