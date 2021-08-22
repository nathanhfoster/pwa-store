import React, { useLayoutEffect } from 'react';
import Base from '../Base';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PwaForm from './PwaForm';
import { connect, useBooleanReducer } from 'resurrection';
import useLighthouse from 'hooks/useLighthouse';

const AddPwa = ({ userId, urlValue, imageUrlValue }) => {
  const [isModalOpen, toggleIsModalOpen] = useBooleanReducer(false);

  const [lightHouseIsLoading, lightHouseTests] = useLighthouse(urlValue);

  const shouldRenderAllFields = lightHouseTests.length > 0 && !lightHouseTests.some((test) => test.error);

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
        sx={{
          overflowY: 'auto'
        }}
        disablePortal
        // hideBackdrop
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box
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
            px: 4,
            py: 1
          }}
          justifyContent='center'
          noValidate={false}
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          {imageUrlValue && (
            <img
              alt='Pwa Icon'
              src={`${imageUrlValue}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${imageUrlValue}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              loading='lazy'
              height={375}
            />
          )}
          <PwaForm shouldRenderAllFields={shouldRenderAllFields} lightHouseIsLoading={lightHouseIsLoading} />
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

const mapStateToProps = ({
  User: {
    id,
    pwaToUpload: {
      form: {
        url: { value: urlValue },
        image_url: { value: imageUrlValue }
      }
    }
  }
}) => ({ userId: id, urlValue, imageUrlValue });

export default connect(mapStateToProps)(AddPwa);