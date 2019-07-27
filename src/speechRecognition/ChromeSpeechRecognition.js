import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseSpeechRecognition from './baseSpeechRecognition';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'control/actions';
import { errorMessages } from 'common/errorMessages';
import { selectors } from './reducer';
import { commands } from './actions';

const ChromeSpeechRecognition = ({
  startListening,
  stopListening,
  resetTranscript,
  recognition,
  browserSupportsSpeechRecognition
}) => {
  useEffect(() => {
    if (recognition.lang !== 'en') {
      recognition.lang = 'en';
    }
  }, [recognition.lang]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      dispatch(actions.error(errorMessages.speechRecognitionsIsNotSupported));
    }
  }, [dispatch, browserSupportsSpeechRecognition]);

  const command = useSelector(state => selectors.command(state));
  useEffect(() => {
    if (command) {
      switch (command.name) {
        case commands.START:
          startListening();
          break;
        case commands.STOP:
          stopListening();
          break;
        case commands.RESET:
          resetTranscript();
          break;
        default:
          break;
      }
    }
  }, [command, startListening, stopListening, resetTranscript]);

  return <></>;
};

const options = {
  autoStart: false
};

ChromeSpeechRecognition.propTypes = {
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  abortListening: PropTypes.func,
  listening: PropTypes.bool,
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.object
};

export default BaseSpeechRecognition(options)(ChromeSpeechRecognition);
