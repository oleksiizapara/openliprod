import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import * as constants from 'common/constants';

const ForwardButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      circular
      icon='forward'
      color={constants.controlDefaultColor}
      onClick={() => dispatch(actions.forward())}
    />
  );
};

export default ForwardButton;
