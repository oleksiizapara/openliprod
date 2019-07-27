import React from 'react';
import PropTypes from 'prop-types';

import WordInner from './WordInner';

export default function Word({ word }) {
  return (
    <>
      <WordInner word={word} />
    </>
  );
}

Word.propTypes = {
  word: PropTypes.object
};
