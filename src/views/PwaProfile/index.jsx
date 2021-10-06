import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { Redirect } from 'react-router-dom';
import { PwaType } from 'store/reducers/Pwas/types';
import { GetPwa, UpdatePwa } from '../../store/reducers/Pwas/actions/api';
import { HOME } from 'utils/RouteMap';
import PwaForm from 'components/PwaForm';

const defaultProps = {
  pwa: { name: '', description: '', ratings: [], pwa_screenshots: [], pwa_analytics: {}, tags: [], manifest_json: {} },
  GetPwa: PropTypes.func.isRequired,
  UpdatePwa: PropTypes.func.isRequired
};

const PwaProfile = ({
  pwaSlug, // From react-router
  pwa,
  isLoading,
  isAuthorOfPwaOrSuperUser,
  GetPwa,
  UpdatePwa
}) => {
  useEffect(() => {
    GetPwa(pwaSlug);
  }, [pwaSlug, GetPwa]);

  const handleOnSubmit = useCallback(
    (payload) => {
      UpdatePwa(pwaSlug, payload);
    },
    [pwaSlug]
  );

  if (pwa.id && !isAuthorOfPwaOrSuperUser) {
    return <Redirect to={HOME} />;
  }

  if (!pwa.id || isLoading) {
    return (
      <Backdrop sx={{ color: 'inherit', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!pwa.id}>
        <CircularProgress color='primary' size={100} />
      </Backdrop>
    );
  }

  return <PwaForm pwa={pwa} onSubmit={handleOnSubmit} />;
};

const mapStateToProps = (
  { User: { id: userId, is_superuser }, Pwas: { items, filteredItems, isLoading } },
  { pwaSlug }
) => {
  const pwa = items.concat(filteredItems).find(({ slug }) => slug === pwaSlug) || defaultProps.pwa;
  const isAuthorOfPwaOrSuperUser = is_superuser || pwa.created_by === userId;

  return { pwa, isLoading, isAuthorOfPwaOrSuperUser };
};

const mapDispatchToProps = { GetPwa, UpdatePwa };

PwaProfile.propTypes = { pwaSlug: PropTypes.string.isRequired, pwa: PropTypes.shape(PwaType) };

PwaProfile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PwaProfile);
