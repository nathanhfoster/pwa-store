import React from 'react';
import Base from '../Base';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PwaForm from './PwaForm';
import AddBusinessIcon from '@material-ui/icons/AddBusiness';
import { connect, useBooleanReducer } from 'resurrection';
import { PostUserPwa } from 'store/reducers/User/actions/api';
import useLighthouse from 'hooks/useLighthouse';

const AddPwa = ({ urlValue, imageUrlValue }) => {
  const [isModalOpen, toggleIsModalOpen] = useBooleanReducer(false);

  const [lightHouseIsLoading, lightHouseTests] = useLighthouse(urlValue);

  const shouldRenderAllFields = lightHouseTests.length > 0 && !lightHouseTests.some((test) => test.error);

  return (
    <>
      <Base onClick={toggleIsModalOpen}>
        <AddBusinessIcon fontSize='large' />
      </Base>
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
          onSubmit={PostUserPwa}
        >
          {imageUrlValue && (
            <img alt='Pwa Icon' src={imageUrlValue} srcSet={imageUrlValue} loading='lazy' height={375} />
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
    pwaToUpload: {
      form: {
        url: { value: urlValue },
        image_url: { value: imageUrlValue }
      }
    }
  }
}) => ({ urlValue, imageUrlValue });

export default connect(mapStateToProps)(AddPwa);
