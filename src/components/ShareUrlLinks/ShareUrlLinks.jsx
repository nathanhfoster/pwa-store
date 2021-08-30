import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { getShareUrlParameters } from './utils';
import { omit } from 'utils';

const ShareUrlLinks = ({ href, parameterString, children, onClick, dataAction, ...restOfProps }) => {
  const handleOnClick = (e) => {
    e.stopPropagation();
    if (onClick instanceof Function) {
      onClick(e);
    }
  };

  const [hrefWithParameters, buttonProps] = useMemo(() => {
    // Remove empty extra spaces and split
    const params = parameterString.replace(/\s+/g, '').trim().split(',');

    const parameters = getShareUrlParameters(restOfProps, params);
    const newHref = href ? `${href}?${parameters}` : '';

    // Omit the paramter props
    const buttonProps = omit(restOfProps, params);

    return [newHref, buttonProps];
  }, [href, parameterString]);

  return (
    <IconButton
      {...buttonProps}
      href={hrefWithParameters}
      onClick={handleOnClick}
      title={restOfProps.title}
      data-action={dataAction}
    >
      {children}
    </IconButton>
  );
};

ShareUrlLinks.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string,
  active: PropTypes.bool,
  block: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
  disabled: PropTypes.bool,
  target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  color: PropTypes.oneOf(['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
  isButton: PropTypes.bool,
  children: PropTypes.node
};

ShareUrlLinks.defaultProps = {
  target: '_blank',
  url: window.location.href,
  type: 'button',
  variant: 'link',
  parameterString: ''
};

export default memo(ShareUrlLinks);
