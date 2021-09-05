import React, { memo } from 'react';
import Pwa from './Pwa';
import Skeleton from '@material-ui/core/Skeleton';
import { DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import { GUTTER_SIZE, getCellIndex } from './utils';
import { areEqual } from 'react-window';

const Cell = ({
  columnIndex,
  rowIndex,
  style,
  isScrolling,
  data: { items, columnCount, isLoading, isDetailedView }
}) => {
  const index = getCellIndex(rowIndex, columnIndex, columnCount);
  const pwa = items[index];
  if (!pwa) return null;
  return (
    <div
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }}
    >
      {isLoading ? (
        <>
          <Skeleton variant='circular' width={DEFAULT_PWA_IMAGE_SIZE} height={DEFAULT_PWA_IMAGE_SIZE} />
          <Skeleton sx={{ mt: 2 }} variant='text' width={DEFAULT_PWA_IMAGE_SIZE} height={24} />
          <Skeleton sx={{ mt: 1, mx: 'auto' }} variant='text' width='50%' height={21} />
        </>
      ) : (
        <Pwa {...pwa} detailed={isDetailedView} imageSize={DEFAULT_PWA_IMAGE_SIZE} />
      )}
    </div>
  );
};

export default memo(Cell, areEqual);
