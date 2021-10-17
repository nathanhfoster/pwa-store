import React, { memo } from 'react';
import { areEqual } from 'react-window';
import Skeleton from '@material-ui/core/Skeleton';
import Pwa from './Pwa';
import { DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import { getCellIndex } from './utils';

const Cell = ({
  columnIndex,
  rowIndex,
  style,
  isScrolling,
  data: { items, columnCount, isLoading, isDetailedView, gutterSize }
}) => {
  const index = getCellIndex(rowIndex, columnIndex, columnCount);
  const pwa = items[index];
  if (!pwa) return null;
  return (
    <div
      key={pwa.id}
      style={{
        ...style,
        left: style.left + gutterSize,
        top: style.top + gutterSize,
        width: style.width - gutterSize,
        height: style.height - gutterSize
      }}
    >
      {!pwa.slug ? (
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
