import React, { useReducer, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import Box from '@material-ui/core/Box';
import Stack from '@material-ui/core/Stack';
import Avatar from '@material-ui/core/Avatar';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { useMountedEffect } from 'resurrection';
import BasicForm from 'components/BasicForm';
import { PwaType } from 'store/reducers/Pwas/types';
import { GetPwaManifest } from '../../store/reducers/Pwas/actions/api';
import { getFirstChar } from 'utils';
import { defaultProps, getInitialFormState, formReducer } from './state';

const detailContainerStyles = {
  height: '100%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  px: 4,
  mb: 3
};

const PwaForm = (props) => {
  const { titlePrefix, form: formFromProps, pwa, pwaTags, GetPwaManifest, onSubmit, onChange } = props;
  const [form, setForm] = useReducer(formReducer, props, getInitialFormState);
  const [potentialManifestUrl, setPotentialManifestUrl] = useState('');
  const debouncedPotentialManifestUrl = useDebouncedValue(potentialManifestUrl);

  const pwaImage = (formFromProps || form).image_url?.value?.src;
  const pwaName = (formFromProps || form).name.value;
  const shouldRenderTitle = Boolean(pwaImage || pwaName);

  const data = formFromProps || form;

  useMountedEffect(() => {
    if (!onChange) {
      setForm({ type: 'SET_FORM', payload: props });
    }
  }, [onChange, props, pwa]);

  useMountedEffect(() => {
    if (!data.manifest_json.error?.(data.manifest_json)) {
      setForm({ type: 'SET_TAGS', payload: { manifest_json: JSON.parse(data.manifest_json.value), pwaTags } });
    }
  }, [data.manifest_json, onChange, pwaTags]);

  useMountedEffect(() => {
    setForm({ type: 'SET_TAGS', payload: { manifest_json: pwa.manifest_json, pwaTags } });
  }, [onChange, pwa.manifest_json, pwaTags]);

  useMountedEffect(() => {
    (async () => {
      if (debouncedPotentialManifestUrl) {
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

  const formTitle = useMemo(
    () =>
      shouldRenderTitle && (
        <Stack direction='row' spacing={2}>
          <Avatar src={pwaImage} title={pwaName}>
            {getFirstChar(pwaName)}
          </Avatar>
          <span>{pwaName}</span>
        </Stack>
      ),
    [pwaImage, pwaName, shouldRenderTitle]
  );

  return (
    <Box sx={detailContainerStyles}>
      <BasicForm
        title={formTitle}
        submitTitle={`${titlePrefix} Pwa`}
        data={data}
        onChange={handleOnChange}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

const mapStateToProps = ({ Pwas: { tags } }) => ({ pwaTags: tags });

const mapDispatchToProps = { GetPwaManifest };

PwaForm.propTypes = {
  pwa: PropTypes.shape(PwaType),
  pwaTags: PwaType.tags,
  GetPwaManifest: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PwaForm.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PwaForm);
