import React from 'react';
import { connect } from 'resurrection';
import { GetPwaTags } from 'store/reducers/Pwas/actions';

const StaticDataWrapper = ({ children, GetPwaTags, ...restProps }) => {
  // GetPwaTags();
  return <>{children}</>
}

const mapStateToProps = state => {{}};

const mapDispatchToProps = {
  GetPwaTags
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticDataWrapper);
