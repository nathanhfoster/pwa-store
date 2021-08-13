import React, { useEffect, lazy } from 'react';
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

  useEffect(() => {
    if (mounted) {
      // TODO
      SearchPwas(tagName);
    }
  }, [mounted, tagName]);

  return (
    <Grid container spacing={2}>
      {pwas.map((item) => (
        <Grid key={item.id} item>
          <Pwa {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });
const mapDispatchToProps = { SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(Pwas);
