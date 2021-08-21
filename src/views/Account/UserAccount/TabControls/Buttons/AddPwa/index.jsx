import React, { useRef, useState, useCallback, useMemo, useLayoutEffect } from 'react';
import Base from '../Base';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import FileUpload from 'components/FileUpload';
import { connect, useBooleanReducer } from 'resurrection';
import useLighthouse from 'hooks/useLighthouse';
import useCallbackDebounce from 'hooks/useCallbackDebounce';

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

const AddPwa = ({ userId, pwaTags }) => {
  const formRef = useRef();
  const theme = useTheme();
  const [isModalOpen, toggleIsModalOpen] = useBooleanReducer(false);
  const [pwaTagNames, setPwaTagNames] = useState([]);

  const [lightHouseIsLoading, lightHouseTests, setTargetUrl] = useLighthouse();

  const setPwaUrl = useCallbackDebounce(useCallback((value) => setTargetUrl(value), []));

  const shouldRenderAllFields = lightHouseTests.length > 0;

  console.log(lightHouseIsLoading);

  const pwaFields = useMemo(
    () => [
      { name: 'url', label: 'Url', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'slug', label: 'Custom url' },
      { name: 'tags', label: 'Tags', options: pwaTags, required: true },
      { name: 'image_url', label: 'Image url' },
      { name: 'short_description', label: 'Short Description', required: true },
      { name: 'description', label: 'Description' }
      //   { name: 'organization', label: 'Organization' }
    ],
    [pwaTags]
  );

  const handleChange = ({ target: { value } }) => {
    setPwaTagNames(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    payload.append('created_by', userId);
    payload.append('updated_by', userId);
    for (const [key, value] of payload.entries()) {
      console.log(`${key}: ${value}`);
    }
    // add tagNames
    // UpdateUser(payload);
  };

  const handleFormChange = ({ target: { name, value } }) => {
    if (name === 'url') {
      setPwaUrl(value);
    }
  };

  useLayoutEffect(() => {
    if (lightHouseTests.length > 0) {
      console.log(formRef.currentTarget);
    }
  }, [lightHouseTests]);

  return (
    <>
      <Base onClick={toggleIsModalOpen}>Add</Base>
      <Modal
        sx={{
          overflowY: 'auto'
        }}
        disablePortal
        hideBackdrop
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box
          ref={formRef}
          component='form'
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            overflowY: 'auto',
            height: shouldRenderAllFields ? '100%' : 'auto',
            width: { xs: '100%', sm: 800 },
            boxShadow: 24,
            p: 4
          }}
          justifyContent='center'
          noValidate={false}
          autoComplete='off'
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        >
          {(shouldRenderAllFields ? pwaFields : [pwaFields[0]]).map(({ name, label, options, required = false }, i) =>
            options ? (
              <FormControl key={name} id={name} label={label} name={name} margin='normal' fullWidth>
                <InputLabel id={name}>{label}</InputLabel>
                <Select
                  labelId='pwa-tags-label'
                  id='pwa-tags-multiple-name'
                  multiple
                  value={pwaTagNames}
                  onChange={handleChange}
                  input={<OutlinedInput id={name} label={label} name={name} fullWidth />}
                  MenuProps={MenuProps}
                  disabled={lightHouseIsLoading}
                >
                  {options.map(({ name }) => (
                    <MenuItem key={name} value={name} style={getStyles(name, pwaTagNames, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl key={name} id={name} label={label} name={name} margin='normal' fullWidth>
                <TextField
                  autoFocus={i === 0}
                  id={name}
                  label={label}
                  name={name}
                  required={required}
                  disabled={lightHouseIsLoading}
                  margin='normal'
                  fullWidth
                />
                {lightHouseIsLoading && <LinearProgress />}
              </FormControl>
            )
          )}
          {shouldRenderAllFields && <FileUpload disabled={lightHouseIsLoading} />}
          {shouldRenderAllFields && (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}
              disabled={lightHouseIsLoading}
            >
              Post
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ User: { id }, Pwas: { tags } }) => ({ userId: id, pwaTags: tags });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddPwa);
