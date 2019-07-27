import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import { selectors as readingSelector } from 'reading/reducer';

import * as constants from 'common/constants';

const RecordingButton = () => {
  const isReading = useSelector(state => readingSelector.isReading(state));

  const dispatch = useDispatch();

  return !isReading ? (
    <Button
      circular
      icon='microphone'
      color={constants.recordUnActiveColor}
      onClick={() => dispatch(actions.start())}
    />
  ) : (
    <Button
      circular
      icon='microphone'
      color={constants.recordActiveColor}
      onClick={() => dispatch(actions.stop())}
    />
  );
};

export default RecordingButton;
