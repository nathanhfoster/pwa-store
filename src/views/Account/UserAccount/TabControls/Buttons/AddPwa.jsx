import React, { useState, useMemo } from 'react';
import Base from './Base';
import Backdrop from '@material-ui/core/Backdrop';
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
import { connect, useBooleanReducer } from 'resurrection';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const MODAL_STYLE = {
  position: 'absolute',
  display: 'flex',
  flexWrap: 'wrap',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 99999
};

const getStyles = (name, array, theme) => ({
  fontWeight: array.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
});

const AddPwa = ({ userId, pwaTags }) => {
  const theme = useTheme();
  const [isModalOpen, toggleIsModalOpen] = useBooleanReducer(false);
  const [pwaTagNames, setPwaTagNames] = useState([]);

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

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
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
  return (
    <>
      <Base onClick={toggleIsModalOpen}>Add</Base>
      <Modal
        disablePortal
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box
          component='form'
          sx={MODAL_STYLE}
          justifyContent='center'
          noValidate={false}
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          {pwaFields.map(({ name, label, options, required = false }, i) =>
            options ? (
              <FormControl id={name} label={label} name={name} margin='normal' fullWidth>
                <InputLabel id={name}>{label}</InputLabel>
                <Select
                  labelId='pwa-tags-label'
                  id='pwa-tags-multiple-name'
                  multiple
                  value={pwaTagNames}
                  onChange={handleChange}
                  input={<OutlinedInput id={name} label={label} name={name} fullWidth />}
                  MenuProps={MenuProps}
                >
                  {options.map(({ name }) => (
                    <MenuItem key={name} value={name} style={getStyles(name, pwaTagNames, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                autoFocus={i === 0}
                id={name}
                label={label}
                name={name}
                required={required}
                margin='normal'
                fullWidth
              />
            )
          )}

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}>
            Post
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ User: { id }, Pwas: { tags } }) => ({ userId: id, pwaTags: tags });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddPwa);
