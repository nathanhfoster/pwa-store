import React, { forwardRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import connect, { useSetStateReducer } from 'resurrection';
import { getImageDimensions } from 'utils';
import { IMAGE_HEIGHT, GUTTER_SIZE_DESKTOP } from './utils';
import Screenshot from './Screenshot';

const innerElementType = forwardRef(({ style, ...children }, ref) => {
  return <div ref={ref} style={style} {...children} />;
});

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
  }, [height, screenshotSrcs, setItemData]);

  const getColumnHeight = useCallback((index) => height, [height]);

  const getColumnWidth = useCallback((index) => itemData.items[index].width, [itemData.items]);

  const styles = useMemo(() => {
    if (itemData.items.length) {
      const { width } = itemData.items[itemData.items.length - 1];
      return { paddingLeft: width - GUTTER_SIZE_DESKTOP };
    }
    return { paddingLeft: GUTTER_SIZE_DESKTOP };
  }, [itemData.items]);

  return (
    <Grid
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
    </Grid>
  );
};

const mapStateToProps = ({ Window: { innerWidth } }) => ({
  height: IMAGE_HEIGHT + GUTTER_SIZE_DESKTOP,
  width: innerWidth - GUTTER_SIZE_DESKTOP
});

export default connect(mapStateToProps)(Screenshots);
