import React, { forwardRef, useMemo, useCallback } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { getManifestIconUrl } from 'store/reducers/User/utils';
import { styled } from '@material-ui/styles';
import connect from 'resurrection';
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

const Screenshots = ({ name, pwa_screenshots, manifest_url, manifest_json, height, width }) => {
  const itemData = useMemo(() => {
    const manifestScreenshots =
      manifest_json?.screenshots?.map((screenshot) => ({
        ...screenshot,
        image_url: getManifestIconUrl(manifest_url, screenshot)
      })) || [];
    const items = pwa_screenshots.concat(manifestScreenshots);
    return { items, name };
  }, [manifest_json?.screenshots, manifest_url, name, pwa_screenshots]);

  const getColumnHeight = useCallback(
    (index) => {
      return height;
    },
    [height]
  );

  const getColumnWidth = useCallback(
    (index) => {
      const screenshot = itemData.items[index];
      const result = getImageDimensions(screenshot.image_url, { height });
      return result[0];
    },
    [height, itemData.items]
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