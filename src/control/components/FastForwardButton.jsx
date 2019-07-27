import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import * as constants from 'common/constants';

const FastForwardButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      circular
      icon='fast forward'
      color={constants.controlDefaultColor}
      onClick={() => dispatch(actions.fastForward())}
    />
  );
};

export default FastForwardButton;
