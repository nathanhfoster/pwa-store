import React, { forwardRef, useLayoutEffect, useCallback } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

import { styled } from '@material-ui/styles';
import connect, { useSetStateReducer } from 'resurrection';
import { getImageDimensions } from 'utils';
import { IMAGE_HEIGHT, GUTTER_SIZE } from './utils';
import Screenshot from './Screenshot';

const StyledGrid = styled(Grid)((props) => ({
  paddingLeft: GUTTER_SIZE
}));

const innerElementType = forwardRef(({ style, ...children }, ref) => {
  return <div ref={ref} style={style} {...children} />;
});

const styles = { paddingLeft: GUTTER_SIZE };

const getInitialItemData = ({ name }) => ({ name, items: [] });

const Screenshots = (props) => {
  const { screenshotSrcs, height, width } = props;
  const [itemData, setItemData] = useSetStateReducer(props, getInitialItemData);

  useLayoutEffect(() => {
    (async () => {
      const items = await Promise.all(
        screenshotSrcs.split(',').map(async (src) => {
          const { width } = await getImageDimensions(src, { height });
          return { width, src };
        })
      );

      setItemData({ items });
    })();
  }, [height, screenshotSrcs]);

  const getColumnHeight = useCallback((index) => height, [height]);

  const getColumnWidth = useCallback((index) => itemData.items[index].width, [itemData.items]);

  return (
    <StyledGrid
      innerElementType={innerElementType}
      style={styles}
      columnCount={itemData.items.length}
      columnWidth={getColumnWidth}
      height={height}
      rowCount={1}
      rowHeight={getColumnHeight}
      width={width}
      itemData={itemData}
      layout='horizontal'
    >
      {Screenshot}
    </StyledGrid>
  );
};

const mapStateToProps = ({ Window: { innerWidth } }) => ({
  height: IMAGE_HEIGHT + GUTTER_SIZE,
  width: innerWidth - GUTTER_SIZE
});

export default connect(mapStateToProps)(Screenshots);
