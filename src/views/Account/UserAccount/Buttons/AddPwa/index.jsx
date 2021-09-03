import React from 'react';
import Base from '../Base';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import PwaForm from './PwaForm';
import AddBusinessIcon from '@material-ui/icons/AddBusiness';
import CloseIcon from '@material-ui/icons/Close';
import { ResetUserPwaForm } from 'store/reducers/User/actions/redux';
import { connect, useBooleanReducer } from 'resurrection';

const AddPwa = ({ ResetUserPwaForm }) => {
  const [isModalOpen, toggleIsModalOpen] = useBooleanReducer(false);

  const handleOnClose = () => {
    toggleIsModalOpen(false);
    ResetUserPwaForm();
  };

  return (
    <>
      <Base onClick={toggleIsModalOpen}>
        <AddBusinessIcon fontSize='large' sx={{ animation: 'grow 200ms', '&:hover': { color: 'primary.main' } }} />
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
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            overflowY: 'auto',
            height: '100%',
            width: { xs: '100%', sm: '85%', md: 800 },
            boxShadow: 24
          }}
          justifyContent='center'
          noValidate={false}
          autoComplete='off'
        >
          <Box display='flex' justifyContent='flex-end'>
            <IconButton onClick={handleOnClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <PwaForm />
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

const mapDispatchToProps = { ResetUserPwaForm };

export default connect(mapStateToProps, mapDispatchToProps)(AddPwa);
