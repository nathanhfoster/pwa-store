import React, { memo } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddPwaButton from './Buttons/AddPwa';

const TabControls = ({ index }) => {
  var Buttons;

  if (index === 0) {
    Buttons = [AddPwaButton];
  } else if (index === 1) {
  }

  if (!Buttons) {
    return null;
  }
  return (
    <ButtonGroup sx={{ position: 'absolute', top: 0, bottom: 0, right: 0 }}>
      {Buttons.map((Button, i) => (
        <Button key={i} />
      ))}
    </ButtonGroup>
  );
};

export default memo(TabControls);
