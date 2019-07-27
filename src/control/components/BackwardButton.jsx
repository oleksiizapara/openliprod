import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import * as constants from 'common/constants';

const BackwardButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      circular
      icon='backward'
      color={constants.controlDefaultColor}
      onClick={() => dispatch(actions.backward())}
    />
  );
};

export default BackwardButton;
