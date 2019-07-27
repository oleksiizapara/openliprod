import React from 'react';
import PropTypes from 'prop-types';

export default function WordInner({ word }) {
  var style = {
    color: '#212121'
  };

  if (word.isInterimRecognised) {
    style['color'] = '#00a152';
  }

  if (word.isFinalRecognised) {
    style['color'] = '#4615b2';
  }

  return <span style={style}>{word.viewWord}</span>;
}

WordInner.propTypes = {
  word: PropTypes.object
};
