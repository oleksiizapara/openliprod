import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import * as constants from 'common/constants';

const FastBackwardButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      circular
      icon='fast backward'
      color={constants.controlDefaultColor}
      onClick={() => dispatch(actions.fastBackward())}
    />
  );
};

export default FastBackwardButton;
