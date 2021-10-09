import React, { memo } from 'react';
import { areEqual } from 'react-window';
import { IMAGE_HEIGHT, GUTTER_SIZE, getItemSrcs } from './utils';

const ScreenShot = ({ columnIndex, data, style }) => {
  const { items, name } = data;
  const { src } = items[columnIndex];
  const title = `${name} screenshot ${columnIndex + 1}`;
  const handleOnImageClick = () => {
    window.open(
      src,
      'Image',
      'height=auto,width=auto,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
    );
  };
  return (
    <div
      key={src}
      title={title}
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }}
    >
      <img height={IMAGE_HEIGHT} src={src} srcSet={src} alt={title} loading='lazy' onClick={handleOnImageClick} />
    </div>
  );
};

const isEqual = (prev, next) => {
  const {
    data: { items: prevItems },
    ...restPrev
  } = prev;
  const {
    data: { items: nextData },
    ...restNext
  } = next;
  const prevItemSrcs = getItemSrcs(prevItems);
  const nextItemSrcs = getItemSrcs(nextData);

  return areEqual({ ...restPrev, srcs: prevItemSrcs }, { ...restNext, srcs: nextItemSrcs });
};

export default memo(ScreenShot, isEqual);
