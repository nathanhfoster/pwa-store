import React, { forwardRef, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { PwasType } from 'store/reducers/Pwas/types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/core/Skeleton';
import { DEFAULT_PWA_IMAGE_SIZE, APP_DRAWER_HEIGHT, APP_DRAWER_WIDTH } from '../../constants';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import connect from 'resurrection';
import Pwa from './Pwa';

const GUTTER_SIZE = 32;

const innerElementType = forwardRef(({ style, ...children }, ref) => {
  return <div ref={ref} style={style} {...children} />;
});

const Cell = memo(
  ({ columnIndex, rowIndex, style, isScrolling, data: { items, columnCount, isLoading, isDetailedView } }) => {
    const index = rowIndex * columnCount + columnIndex;
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
          <Skeleton variant='rectangular' width={DEFAULT_PWA_IMAGE_SIZE} height={DEFAULT_PWA_IMAGE_SIZE} />
        ) : (
          <Pwa {...pwa} detailed={isDetailedView} imageSize={DEFAULT_PWA_IMAGE_SIZE} />
        )}
      </div>
    );
  },
  areEqual
);

const PwasStack = ({
  title,
  subtitle,
  data,
  flexWrap,
  isLoading,
  columnCount,
  columnWidth,
  rowCount,
  rowHeight,
  height,
  width
}) => {
  const isDetailedView = flexWrap === 'wrap';

  const itemData = useMemo(
    () => ({ items: data, columnCount, isLoading, isDetailedView }),
    [data, columnCount, isDetailedView, isLoading]
  );

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        py: 4,
        px: 0
      }}
    >
      {title && (
        <Typography variant={isDetailedView ? 'h4' : 'h6'} mx={4} mb={1}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant='subtitle2' color='text.secondary' mx={4} mb={2}>
          {subtitle}
        </Typography>
      )}
      <Grid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        innerElementType={innerElementType}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={width}
        itemData={itemData}
      >
        {Cell}
      </Grid>
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
    Pwas: { items, filteredItems, isLoading: isLoadingFromStore },
    Window: {
      breakpoints: { xs, sm, md, lg, xl },
      innerWidth,
      innerHeight
    }
  },
  { isLoading: isLoadingFromProps, flexWrap, data }
) => {
  const isDetailedView = flexWrap === 'wrap';

  const width = innerWidth - (xl || lg || md || sm ? APP_DRAWER_WIDTH : 0);
  const height = isDetailedView
    ? innerHeight - APP_DRAWER_HEIGHT - 72 - 41 - 32
    : DEFAULT_PWA_IMAGE_SIZE * 2 + GUTTER_SIZE;

  const columnWidth = DEFAULT_PWA_IMAGE_SIZE + GUTTER_SIZE;
  const columnCount = isDetailedView ? Math.floor(width / columnWidth) : data.length;

  const rowHeight = DEFAULT_PWA_IMAGE_SIZE + 70;
  const rowCount = isDetailedView ? Math.ceil(data.length / columnCount) : 1;

  return {
    isLoading: isLoadingFromProps || isLoadingFromStore || items.concat(filteredItems).length === 0,
    columnCount,
    columnWidth,
    rowCount,
    rowHeight,
    height,
    width,
    GUTTER_SIZE
  };
};

export default connect(mapStateToProps)(PwasStack);
