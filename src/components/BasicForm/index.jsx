import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { isFunction } from 'utils';
import { useSetStateReducer, useLazyMemo, useEffectAfterMount } from 'resurrection';
import Field from './Field';

const getInitialFormState = (data) =>
  Object.entries(data).reduce((acc, [id, { multiple = false, defaultValue, value }]) => {
    const derivedValue = multiple ? [] : '';
    acc[id] = value ?? defaultValue ?? derivedValue;
    return acc;
  }, {});

const BasicForm = ({ title, data, submitTitle, submitJson, disabled, sx, children, onChange, onSubmit }) => {
  const [form, setForm] = useSetStateReducer(data, getInitialFormState);
  const initialForm = useLazyMemo(() => form);

  useEffectAfterMount(() => {
    setForm(getInitialFormState(data));
  }, [data]);

  const handleOnChange = ({ target: { type, name, value, checked } }) => {
    const newValue = type === 'checkbox' ? checked : value;
    if (onChange) {
      onChange(name, newValue);
    } else {
      setForm({ [name]: newValue });
    }
  };

  const handleSubmit = (event) => {
    if (onSubmit) {
      event.preventDefault();
      let payload;

      if (onChange) {
        payload = getInitialFormState(data);
      } else if (submitJson) {
        payload = form;
      } else {
        payload = new FormData(event.currentTarget);
        Object.entries(form).forEach(([key, value]) => {
          if (value !== undefined) {
            payload.set(key, value);
          }
        });
      }

      onSubmit(payload);
    }
  };

  const renderInputs = useMemo(
    () =>
      Object.entries(form).reduce((acc, [id, formValue]) => {
        if (id) {
          const props = data[id];
          const { type = 'text', value = formValue, error = false, ...restOfProps } = props;
          const initialValue = initialForm[id];
          const coalescingValue = value ?? '';
          const errorExists = value != initialValue && Boolean(isFunction(error) ? error(props, data) : error);

          acc.push(
            <Field
              {...restOfProps}
              key={id}
              type={type}
              id={id}
              value={coalescingValue}
              error={errorExists}
              onChange={onChange}
              setForm={setForm}
            />
          );
        }
        return acc;
      }, []),
    [form, initialForm, onChange, setForm]
  );

  const submitDisabled = useMemo(
    () =>
      Object.entries(data).some(([id, props]) => {
        let valueIsEmpty = false;
        const { type, required, multiple, getOptionLabelKey = 'name', value = form[id], error = false } = props;
        const errorExists = isFunction(error) ? error(props) : error;
        switch (type) {
          case 'select':
            valueIsEmpty = multiple ? value.length === 0 : !value?.[getOptionLabelKey];
            break;

          default:
            valueIsEmpty = !value;
        }

        return errorExists || (required && valueIsEmpty);
      }),
    [data, form]
  );

  return (
    <>
      {title && <Typography variant='h4'>{title}</Typography>}
      <Box component='form' noValidate onSubmit={handleSubmit} onChange={handleOnChange} sx={sx}>
        {renderInputs}
        <Button
          disabled={disabled || !onSubmit || submitDisabled}
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  submitTitle: PropTypes.string,
  submitJson: PropTypes.bool,
  disabled: PropTypes.bool,
  data: PropTypes.objectOf(
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
      label: PropTypes.string,
      autoComplete: PropTypes.string,
      margin: PropTypes.oneOf(['dense', 'none', 'normal']),
      autoFocus: PropTypes.bool,
      color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'string']),
      multiple: PropTypes.bool,
      multiline: PropTypes.bool,
      MenuProps: PropTypes.shape({}),
      disabled: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
      error: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.any]),
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.object)
      ])
    })
  ),
  sx: PropTypes.object
};

BasicForm.defaultProps = {
  submitTitle: 'Sign In',
  submitJson: true,
  disabled: false,
  data: {},
  sx: { mt: 1 }
};

export default memo(BasicForm);
