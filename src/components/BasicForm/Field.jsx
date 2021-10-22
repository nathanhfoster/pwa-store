import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete, { createFilterOptions } from '@material-ui/core/Autocomplete';
import { capitalize } from 'utils';

const filter = createFilterOptions();

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
  error = false,
  defaultValue,
  value,
  disabled = false,
  options = [{ name: 'No results' }],
  canAddOption = true,
  disableCloseOnSelect = multiple,
  getOptionLabelKey = 'name',
  placeholder,
  onChange,
  setForm
}) => {
  const isTextArea = type === 'textarea';

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
      const handleSelectChange = (event, details, reason) => {
        let newValue = details;

        if (details?.inputValue) {
          newValue = { [getOptionLabelKey]: details.inputValue };
        }

        if (Array.isArray(details)) {
          newValue = details.map(({ inputValue, ...restOfProps }) => ({
            ...restOfProps,
            [getOptionLabelKey]: inputValue || restOfProps?.[getOptionLabelKey]
          }));
        }

        switch (reason) {
          case 'createOption':
            break;
          case 'selectOption':
            break;
          case 'removeOption':
            break;
          case 'blur':
            break;
          case 'clear':
            break;
          default:
        }

        if (onChange) {
          onChange(id, newValue);
        } else {
          setForm({ [id]: newValue });
        }
      };

      return (
        <Autocomplete
          key={id}
          id={id}
          name={id}
          multiple={multiple}
          includeInputInList={canAddOption}
          disableCloseOnSelect={disableCloseOnSelect}
          selectOnFocus={canAddOption}
          clearOnBlur={canAddOption}
          onChange={handleSelectChange}
          options={options}
          getOptionLabel={(option) => option[getOptionLabelKey] ?? ''}
          isOptionEqualToValue={(option, value) => option[getOptionLabelKey] === value[getOptionLabelKey]}
          value={value}
          defaultValue={defaultValue}
          renderInput={(params) => (
            <TextField
              {...params}
              required={required}
              variant='outlined'
              margin={margin}
              label={label}
              placeholder={placeholder}
              error={error}
            />
          )}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue, getOptionLabel } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === getOptionLabel(option));

            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                [getOptionLabelKey]: `Add "${inputValue}"`
              });
            }

            return filtered;
          }}
          // noOptionsText={
          //   canAddOption ? (
          //     <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAddOptionClick}>
          //       {label}
          //     </Button>
          //   ) : (
          //     'No options'
          //   )
          // }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Prevent's default 'Enter' behavior.
              event.defaultMuiPrevented = true;
              // your handler code
            }
          }}
        />
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
          error={error}
          disabled={disabled}
          placeholder={placeholder}
        />
      );
  }
};

export default memo(Field);
