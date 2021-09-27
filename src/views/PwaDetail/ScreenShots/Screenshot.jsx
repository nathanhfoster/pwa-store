import React, { memo } from 'react';
import { areEqual } from 'react-window';
import { IMAGE_HEIGHT, GUTTER_SIZE } from './utils';

const ScreenShot = ({ columnIndex, data, style }) => {
  const { items, name } = data;
  const { image_url } = items[columnIndex];
  const handleOnImageClick = () => {
    window.open(
      image_url,
      'Image',
      'height=auto,width=auto,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
    );
  };
  return (
    <div
      key={image_url}
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }}
    >
      <img
        height={IMAGE_HEIGHT}
        src={image_url}
        srcSet={image_url}
        alt={name}
        loading='lazy'
        onClick={handleOnImageClick}
      />
    </div>
  );
};

export default memo(ScreenShot, areEqual);
