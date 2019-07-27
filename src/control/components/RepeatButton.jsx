import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import * as constants from 'common/constants';

const RepeatButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      circular
      icon='repeat'
      color={constants.controlDefaultColor}
      onClick={() => dispatch(actions.reset())}
    />
  );
};

export default RepeatButton;
