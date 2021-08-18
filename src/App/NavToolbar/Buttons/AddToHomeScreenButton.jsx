import React from 'react';
import Base from './Base';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import { connect } from 'resurrection';

const AddToHomeScreenButton = ({ addToHomeScreenPrompt, children }) => {
  if (!addToHomeScreenPrompt) {
    return null;
  }

  const handleInstallToHomeScreen = () => addToHomeScreenPrompt.prompt();

  return (
    <>
      <Base
        title='Install to home screen'
        disabled={!addToHomeScreenPrompt}
        edge='end'
        aria-label='prompt to install pwa'
        aria-haspopup='true'
        onClick={handleInstallToHomeScreen}
      >
        <SystemUpdateIcon sx={{ animation: 'grow 200ms' }} />
      </Base>
      {children}
    </>
  );
};
const mapStateToProps = ({ App: { addToHomeScreenPrompt } }) => ({ addToHomeScreenPrompt });

export default connect(mapStateToProps)(AddToHomeScreenButton);
