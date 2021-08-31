import React, { useState, useEffect, useCallback, lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Stack from '@material-ui/core/Stack';
import Avatar from '@material-ui/core/Avatar';
import useDebounce from 'hooks/useDebounce';
import { useMounted } from 'resurrection';
import BasicForm from 'components/BasicForm';
import { Redirect } from 'react-router-dom';
import { PwaType } from 'store/reducers/Pwas/types';
import { GetPwa, GetPwaManifest, UpdatePwa } from '../../store/reducers/Pwas/actions/api';
import { HOME } from 'utils/RouteMap';
import { getManifestIconSrc, getTagsFromManifest } from 'store/reducers/User/utils';
import { getFirstChar } from 'utils';

const detailContainerStyles = {
  height: '100%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  p: 4,
  mb: 3
};

const defaultProps = {
  pwa: { name: '', description: '', ratings: [], pwa_screenshots: [], pwa_analytics: {}, tags: [], manifest_json: {} },
  pwaTags: [],
  GetPwa: PropTypes.func.isRequired,
  GetPwaManifest: PropTypes.func.isRequired,
  UpdatePwa: PropTypes.func.isRequired
};

const PwaProfile = ({
  pwaSlug, // From react-router
  pwa: {
    id,
    name,
    slug,
    description,
    url,
    image_url,
    pwa_screenshots,
    pwa_analytics,
    ratings,
    organization,
    tags,
    updated_at,
    manifest_url,
    manifest_json
  },
  pwaTags,
  isLoading,
  isAuthorOfPwa,
  GetPwa,
  GetPwaManifest,
  UpdatePwa
}) => {
  const [manifestUrl, setManifestUrl] = useState(manifest_url);
  const [imageUrl, setImageUrl] = useState(undefined);
  const debouncedManifestUrl = useDebounce(manifestUrl);
  const mounted = useMounted();

  useEffect(() => {
    if (mounted && debouncedManifestUrl && id) {
      GetPwaManifest(debouncedManifestUrl, id);
    }
  }, [debouncedManifestUrl, id]);

  const formFields = useMemo(
    () => [
      { id: 'url', required: true, defaultValue: url },
      { id: 'manifest_url', required: true, defaultValue: manifest_url },
      { id: 'manifest_json', type: 'textarea', required: true, defaultValue: JSON.stringify(manifest_json) },
      { id: 'name', required: true, defaultValue: manifest_json.short_name || manifest_json.name || name },
      { id: 'slug', required: true, defaultValue: slug || name.toLowerCase().replace(' ', '-') },
      { id: 'description', type: 'textarea', defaultValue: manifest_json.description || description },
      { id: 'image_url', defaultValue: getManifestIconSrc(manifest_url, manifest_json.icons) || image_url },
      {
        id: 'tags',
        type: 'select',
        multiple: true,
        options: pwaTags,
        defaultValue:
          getTagsFromManifest(manifest_json.keywords, manifest_json.categories, pwaTags) || tags.map(({ name }) => name)
      }
    ],
    [description, image_url, manifest_json, manifest_url, name, pwaTags, slug, tags, url]
  );

  useEffect(() => {
    GetPwa(pwaSlug);
  }, [pwaSlug, GetPwa]);

  const handleOnChange = useCallback((name, value) => {
    if (name === 'url' || name === 'manifest_url') {
      setManifestUrl(value);
    }

    if (name === 'image_url') {
      setImageUrl(value);
    }
  }, []);

  const handleOnSubmit = useCallback(
    (payload) => {
      UpdatePwa(slug, payload);
    },
    [slug]
  );

  if (id && !isAuthorOfPwa) {
    return <Redirect to={HOME} />;
  }

  if (!id || isLoading) {
    return (
      <Backdrop sx={{ color: 'inherit', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!id}>
        <CircularProgress color='primary' size={100} />
      </Backdrop>
    );
  }

  const imageSrc = imageUrl !== undefined ? imageUrl : formFields.find(({ id }) => id === 'image_url')?.defaultValue;

  return (
    <Box sx={detailContainerStyles}>
      <BasicForm
        title={
          <Stack direction='row' spacing={2}>
            <Avatar src={imageSrc} title={name}>
              {getFirstChar(name)}
            </Avatar>
            <span>{`Update ${name}`}</span>
          </Stack>
        }
        submitTitle='Update Pwa'
        submitJson
        data={formFields}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
    </Box>
  );
};

const mapStateToProps = ({ User: { id: userId }, Pwas: { items, filteredItems, tags, isLoading } }, { pwaSlug }) => {
  const pwa =
    (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ slug }) => slug === pwaSlug) ||
    defaultProps.pwa;
  const isAuthorOfPwa = pwa.created_by === userId;

  return { pwa, pwaTags: tags, isLoading, isAuthorOfPwa };
};

const mapDispatchToProps = { GetPwa, GetPwaManifest, UpdatePwa };

PwaProfile.propTypes = { pwaSlug: PropTypes.string.isRequired, pwa: PropTypes.shape(PwaType), pwaTags: PwaType.tags };

PwaProfile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PwaProfile);
