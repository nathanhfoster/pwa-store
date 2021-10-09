import React, { forwardRef, useEffect, useCallback } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { getManifestIconUrl } from 'store/reducers/User/utils';
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
  const { name, pwa_screenshots, manifest_url, manifest_json, height, width } = props;
  const [itemData, setItemData] = useSetStateReducer(props, getInitialItemData);

  useEffect(() => {
    (async () => {
      const manifestScreenshots =
        manifest_json?.screenshots?.map((screenshot) => ({
          ...screenshot,
          image_url: getManifestIconUrl(manifest_url, screenshot)
        })) || [];

      const items = await Promise.all(
        pwa_screenshots.concat(manifestScreenshots).map(async (item) => {
          const { image_url } = item;
          const { width } = await getImageDimensions(image_url, { height });
          return { ...item, width };
        })
      );

      setItemData({ items });
    })();
  }, [height, pwa_screenshots, manifest_url, manifest_json]);

  const getColumnHeight = useCallback(
    (index) => {
      return height;
    },
    [height]
  );

  const getColumnWidth = useCallback(
    (index) => {
      const { width } = itemData.items[index];

      return width;
    },
    [itemData.items]
  );

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
