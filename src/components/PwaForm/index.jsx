import React, { useReducer, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import Box from '@material-ui/core/Box';
import Stack from '@material-ui/core/Stack';
import Avatar from '@material-ui/core/Avatar';
import useDebounce from 'hooks/useDebounce';
import { useMounted } from 'resurrection';
import BasicForm from 'components/BasicForm';
import { PwaType } from 'store/reducers/Pwas/types';
import { GetPwaManifest } from '../../store/reducers/Pwas/actions/api';
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
  titlePrefix: 'Update',
  pwa: {
    name: '',
    description: '',
    ratings: [],
    pwa_screenshots: [],
    pwa_analytics: {},
    tags: [],
    manifest_json: {}
  },
  pwaTags: []
};

const getInitialFormState = ({
  form,
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
  pwaTags
}) =>
  form || {
    url: { required: true, value: url },
    manifest_url: { required: true, value: manifest_url },
    manifest_json: { type: 'textarea', required: true, value: JSON.stringify(manifest_json) },
    name: { required: true, value: manifest_json.short_name || manifest_json.name || name },
    slug: { label: 'Unique url', required: true, value: slug || name.toLowerCase().replace(' ', '-') },
    description: { type: 'textarea', value: manifest_json.description || description },
    image_url: { value: getManifestIconSrc(manifest_url, manifest_json.icons) || image_url },
    tags: {
      type: 'select',
      multiple: true,
      options: pwaTags,
      value:
        getTagsFromManifest(manifest_json.keywords, manifest_json.categories, pwaTags) || tags.map(({ name }) => name)
    }
  };

const formReducer = (state, action) => {
  const { type, name, payload } = action;

  switch (type) {
    case 'SET_FORM': {
      return getInitialFormState(payload);
    }
    case 'SET_TAGS':
      return {
        ...state,
        tags: {
          ...state.tags,
          value:
            getTagsFromManifest(payload.manifest_json.keywords, payload.manifest_json.categories, payload.pwaTags) ||
            payload.pwaTags.map(({ name }) => name)
        }
      };
    default:
      return {
        ...state,
        [name]: { ...state[name], value: name === 'manifest_json' ? JSON.stringify(payload) : payload }
      };
  }
};

const PwaForm = (props) => {
  const { titlePrefix, form: formFromProps, pwa, pwaTags, GetPwaManifest, onSubmit, onChange } = props;
  const [form, setForm] = useReducer(formReducer, props, getInitialFormState);
  const [potentialManifestUrl, setPotentialManifestUrl] = useState();
  const debouncedPotentialManifestUrl = useDebounce(potentialManifestUrl);
  const mounted = useMounted();

  useEffect(() => {
    if (mounted && !onChange) {
      setForm({ type: 'SET_FORM', payload: props });
    }
  }, [mounted, onChange, props, pwa]);

  useEffect(() => {
    if (mounted && !onChange) {
      setForm({ type: 'SET_TAGS', payload: { manifest_json: pwa.manifest_json, pwaTags } });
    }
  }, [mounted, onChange, pwa.manifest_json, pwaTags]);

  useEffect(() => {
    (async () => {
      if (mounted && debouncedPotentialManifestUrl) {
        await GetPwaManifest(debouncedPotentialManifestUrl)
          .then(({ data }) => {
            if (onChange) {
              onChange({ type: 'SET_MANIFEST', payload: data });
            } else {
              setForm({ name: 'manifest_url', payload: data.manifest_url });
              setForm({ name: 'manifest_json', payload: data.manifest_json });
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
    })();
  }, [debouncedPotentialManifestUrl]);

  const handleOnChange = useCallback(
    (name, value) => {
      if (onChange) {
        onChange({ name, payload: value });
      } else {
        setForm({ name, payload: value });
      }
      if (name === 'url' || name === 'manifest_url') {
        setPotentialManifestUrl(value);
      }
    },
    [onChange]
  );

  const pwaImage = (formFromProps || form).image_url?.value;
  const pwaName = (formFromProps || form).name.value;

  return (
    <Box sx={detailContainerStyles}>
      <BasicForm
        title={
          <Stack direction='row' spacing={2}>
            <Avatar src={pwaImage} title={pwaName}>
              {getFirstChar(pwaName)}
            </Avatar>
            <span>{`${titlePrefix} ${pwaName}`}</span>
          </Stack>
        }
        submitTitle={`${titlePrefix} Pwa`}
        submitJson
        data={formFromProps || form}
        onChange={handleOnChange}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

const mapStateToProps = ({ Pwas: { tags } }) => {
  return { pwaTags: tags };
};

const mapDispatchToProps = { GetPwaManifest };

PwaForm.propTypes = {
  pwa: PropTypes.shape(PwaType),
  pwaTags: PwaType.tags,
  GetPwaManifest: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PwaForm.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PwaForm);
