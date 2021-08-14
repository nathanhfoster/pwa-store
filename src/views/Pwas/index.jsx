import React, { useLayoutEffect, lazy } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'store';
import useMounted from 'hooks/useMounted';
import useQuery from 'hooks/useQuery';
import { SearchPwas } from 'store/reducers/Pwas/actions';

const Pwa = lazy(() => import('./Pwa'));

const Pwas = ({ pwas, SearchPwas }) => {
  const mounted = useMounted();
  const query = useQuery();
  const tagName = query.get('tagName');

  useLayoutEffect(() => {
    if (mounted) {
      SearchPwas(tagName);
    }
  }, [mounted, tagName]);

  return (
    <Grid container>
      {pwas.map((pwa) => (
        <Grid key={pwa.id} item>
          <Pwa {...pwa} />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });
const mapDispatchToProps = { SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(Pwas);
