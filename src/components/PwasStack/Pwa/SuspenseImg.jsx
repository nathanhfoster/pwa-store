import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import { DEFAULT_PWA_IMAGE } from '../../../constants';

const imgCache = {
  __cache: {},
  read(src) {
    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
      }).then((img) => {
        this.__cache[src] = true;
      });
    }
    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  }
};

const SuspenseImg = ({ image, size, ...restOfProps }) => {
  // imgCache.read(image);
  return <CardMedia
           image={image}
           sx={{ m: '0 auto', width: size, height: size, animation: 'grow 100ms' }}
           onError={(source) => {
            source.target.src = DEFAULT_PWA_IMAGE;
           }}
           {...restOfProps} 
 />;
};

SuspenseImg.propTypes = {};

SuspenseImg.defaultProps = { component: 'img' };

export default memo(SuspenseImg);
