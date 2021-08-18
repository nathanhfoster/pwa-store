import React, { memo } from 'react';
import { useDispatch } from 'resurrection';
import { DeleteAlert } from 'store/reducers/App/actions';
import MaterialAlert from '@material-ui/core/Alert';
import MaterialAlertTitle from '@material-ui/core/AlertTitle';
import MaterialTypography from '@material-ui/core/Typography';
import { AlertType } from 'store/reducers/App/types';

const Alert = ({ id, title, message, props = { severity: 'info' }, onClick }) => {
  const dispatch = useDispatch();

  const handleAlertDelete = () => {
    dispatch(DeleteAlert(id));
  };

  return (
    <MaterialAlert
      key={id}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
      onClick={onClick}
      onClose={handleAlertDelete}
    >
      {title && <MaterialAlertTitle>{title}</MaterialAlertTitle>}
      <MaterialTypography variant='body2'>{message}</MaterialTypography>
    </MaterialAlert>
  );
};

Alert.propTypes = AlertType;

export default memo(Alert);
