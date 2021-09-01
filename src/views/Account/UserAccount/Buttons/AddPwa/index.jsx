import React from 'react';
import Base from '../Base';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import PwaForm from './PwaForm';
import AddBusinessIcon from '@material-ui/icons/AddBusiness';
import { connect, useBooleanReducer } from 'resurrection';

const AddPwa = ({ urlValue, imageUrlValue }) => {
  const [isModalOpen, toggleIsModalOpen] = useBooleanReducer(false);

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
            width: { xs: '100%', sm: 800 },
            boxShadow: 24
          }}
          justifyContent='center'
          noValidate={false}
          autoComplete='off'
        >
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

export default connect(mapStateToProps)(AddPwa);
