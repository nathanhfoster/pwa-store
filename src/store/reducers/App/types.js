import PropTypes from 'prop-types';

export const AlertColorType = ['success', 'info', 'warning', 'error'];

export const AlertPropsType = {
  action: PropTypes.node,
  classes: PropTypes.object,
  closeText: PropTypes.string,
  color: PropTypes.oneOf(AlertColorType),
  severity: PropTypes.oneOf(AlertColorType),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  role: PropTypes.string,
  iconMapping: PropTypes.shape(
    AlertColorType.reduce((acc, colorType) => {
      acc[colorType] = PropTypes.node;
      return acc;
    }, {})
  ),
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  sx: PropTypes.object
};

export const AlertType = {
  id: PropTypes.number,
  title: PropTypes.string,
  message: PropTypes.string,
  props: PropTypes.shape(AlertPropsType),
  onClick: PropTypes.func
};

export const AlertsType = PropTypes.arrayOf(PropTypes.shape(AlertType));
