import { DEFAULT_PAGINATION_SIZE } from '../../constants';

export const GUTTER_SIZE_DESKTOP = 32;
export const GUTTER_SIZE_MOBILE = 16;
export const getCellIndex = (rowIndex, columnIndex, columnCount) => rowIndex * columnCount + columnIndex;

export const getItemKey = ({ rowIndex, columnIndex, data: { columnCount, isDetailedView, isLoading, items } }) => {
  const index = getCellIndex(rowIndex, columnCount, columnIndex);
  const item = items[index];
  return item?.id;
};

export const MAP_PWA_SKELETON = (e, i) => ({ id: i });

export const getPwasSkeleton = () => Array.from({ length: DEFAULT_PAGINATION_SIZE }, MAP_PWA_SKELETON);
