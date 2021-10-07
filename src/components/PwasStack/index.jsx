import React, { forwardRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PwasType } from 'store/reducers/Pwas/types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FixedSizeGrid as Grid } from 'react-window';
import { styled } from '@material-ui/styles';
import connect from 'resurrection';

import { DEFAULT_PWA_IMAGE_SIZE, APP_DRAWER_HEIGHT, APP_DRAWER_WIDTH, DEFAULT_PAGINATION_SIZE } from '../../constants';
import { GUTTER_SIZE, getCellIndex, getItemKey, getPwasSkeleton } from './utils';
import Cell from './Cell';

const StyledGrid = styled(Grid)((props) => ({
  paddingLeft: props.isDetailedView ? 0 : GUTTER_SIZE
}));

const innerElementType = forwardRef(({ style, ...children }, ref) => {
  return <div ref={ref} style={style} {...children} />;
});

const PwasStack = ({
  title,
  subtitle,
  data,
  flexWrap,
  isLoading,
  hasFilteredData,
  columnCount,
  columnWidth,
  rowCount,
  rowHeight,
  height,
  width,
  isDetailedView,
  loadMoreData
}) => {
  const itemData = useMemo(
    () => ({ items: data, columnCount, isLoading, isDetailedView }),
    [data, columnCount, isDetailedView, isLoading]
  );
  const handleOnItemsRendered = useCallback(
    ({
      overscanColumnStartIndex,
      overscanColumnStopIndex,
      overscanRowStartIndex,
      overscanRowStopIndex,
      visibleColumnStartIndex,
      visibleColumnStopIndex,
      visibleRowStartIndex
    }) => {
      if (!loadMoreData || isLoading || hasFilteredData) {
        return;
      }
      const { length } = data;
      const overscanStopIndex = isDetailedView
        ? getCellIndex(overscanRowStopIndex, overscanColumnStopIndex, columnCount)
        : overscanColumnStopIndex;
      const bottomOfListIndex = length === 0 ? length : length - 1;
      const reachedOverscan = bottomOfListIndex !== 0 && overscanStopIndex >= bottomOfListIndex;

      if (reachedOverscan) {
        loadMoreData();
      }
    },
    [loadMoreData, isLoading, hasFilteredData, data, isDetailedView, columnCount]
  );

  const handleOnScroll = useCallback(
    ({ horizontalScrollDirection, scrollLeft, scrollTop, scrollUpdateWasRequested, verticalScrollDirection }) => {},
    []
  );

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        mt: 2,
        px: 0
      }}
    >
      {title && (
        <Typography variant={isDetailedView ? 'h4' : 'h6'} mx={4} my={0}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant='subtitle2' color='text.secondary' mx={4} my={0}>
          {subtitle}
        </Typography>
      )}
      <StyledGrid
        innerElementType={innerElementType}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={width}
        itemData={itemData}
        overscanColumnCount={2}
        overscanRowCount={2}
        useIsScrolling={false}
        onItemsRendered={handleOnItemsRendered}
        onScroll={handleOnScroll}
        isDetailedView={isDetailedView}
        // itemKey={getItemKey}
      >
        {Cell}
      </StyledGrid>
    </Box>
  );
};

PwasStack.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PwasType,
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse', 'inherit', 'initial', 'revert', 'unset'])
};

PwasStack.defaultProps = {
  data: [],
  flexWrap: 'nowrap'
};

const mapStateToProps = (
  {
    Pwas: {
      items,
      filteredItems,
      isLoading: isLoadingFromStore,
      search: { value: searchValue }
    },
    Window: {
      breakpoints: { xs, sm, md, lg, xl },
      innerWidth,
      innerHeight
    }
  },
  { isLoading: isLoadingFromProps, flexWrap, data: dataFromProps }
) => {
  const dataFromStore = items.concat(filteredItems);
  const hasFilteredData = filteredItems.length > 0 || searchValue;
  const isLoading = isLoadingFromProps || isLoadingFromStore || dataFromProps?.length === 0 || dataFromStore.length === 0;
  const data = (dataFromProps || dataFromStore).concat(isLoading ? getPwasSkeleton() : []);

  const isDetailedView = flexWrap === 'wrap';

  const width = innerWidth - (xl || lg || md || sm ? APP_DRAWER_WIDTH : 0);
  const height = isDetailedView ? innerHeight - APP_DRAWER_HEIGHT - 42 - 16 : DEFAULT_PWA_IMAGE_SIZE * 2 + GUTTER_SIZE;

  const columnWidth = DEFAULT_PWA_IMAGE_SIZE + GUTTER_SIZE;
  const columnCount = isDetailedView ? Math.floor(width / columnWidth) : data.length;

  const rowHeight = DEFAULT_PWA_IMAGE_SIZE + 70 + GUTTER_SIZE;
  const rowCount = isDetailedView ? Math.ceil(data.length / columnCount) : 1;

  return {
    isLoading,
    hasFilteredData,
    data,
    columnCount,
    columnWidth,
    rowCount,
    rowHeight,
    height,
    width,
    isDetailedView
  };
};

export default connect(mapStateToProps)(PwasStack);
