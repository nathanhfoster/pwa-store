import React from 'react';
import Base from './Base';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import { connect } from 'resurrection';
import { PromptAddToHomeScreenPrompt } from 'store/reducers/App/actions';

const AddToHomeScreenButton = ({ disabled, onClick, children }) => {
  if (disabled) {
    return null;
  }

  return (
    <>
      <Base title='Install to home screen' disabled={disabled} onClick={onClick}>
        <SystemUpdateIcon />
      </Base>
      {children}
    </>
  );
};
const mapStateToProps = ({ App: { addToHomeScreenPrompt } }) => ({ disabled: !addToHomeScreenPrompt?.prompt });

const mapDispatchToProps = { onClick: PromptAddToHomeScreenPrompt };

export default connect(mapStateToProps, mapDispatchToProps)(AddToHomeScreenButton);
