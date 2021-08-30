import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { isEmpty } from 'utils';
/**
 * Cleans a childKeys string and splits them into an array of key strings
 * @param {number|string} childKey - childKeys string to be cleaned
 * @returns {array.<string>} - array of keys
 */
const getArrayOfKeys = (childKeys) => {
  const stringChildrenKey = childKeys.toString();
  const childrenKeyWithNoSpaces = stringChildrenKey.replace(/\s+/g, '');
  const arrayOfChildrenKeys = childrenKeyWithNoSpaces.split(',');
  return arrayOfChildrenKeys;
};

/**
 * Conditional Component conditionally renders a child that matches a given key or index
 * @param {string} className - whether to render children inside a parent element with specified className
 * @param {boolean} show - whether or not to return the children
 * @param {string|number} value - unqiue keys (',' is the delimeter) of the children to render
 * @param {React.children} children - the child component(s)
 * @returns {ReactNode} - the found child or null
 */
const Conditional = ({ show, value, children, ...restOfProps }) => {
  // If children or show is falsey
  if (!(children && show)) return null;
  // If the value is falsey
  if (!value) return children;

  /**
   *  Filter out children whose childKeys are not a subset of value.
   *  The value or childKey strings can have a ',' as a delinator
   */
  const childrenToRender =
    Children.toArray(children).filter(({ key: childKey }, index) => {
      if (!childKey) {
        throw new TypeError(`Child component at index: ${index} does not have a key!`);
      }
      // remove react prefix
      const cleanChildKey = childKey.replace('.$', '');
      const childKeys = getArrayOfKeys(cleanChildKey);
      const childrenRenderKeys = getArrayOfKeys(value);

      // return all the childKeys that are a subset of childrenRenderKeys
      const childFound = childrenRenderKeys.some((childKeyToRender) =>
        childKeys.some((childKey) => childKey.includes(childKeyToRender))
      );
      return childFound;
    }) || null;

  return !isEmpty(restOfProps) ? <Box {...restOfProps}>{childrenToRender}</Box> : childrenToRender;
};

Conditional.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
};

Conditional.defaultProps = { show: true, value: undefined, children: undefined };

export default Conditional;
