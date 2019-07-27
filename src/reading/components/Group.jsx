import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Enumerable from 'linq';
import {
  readingHistoryFinalColor,
  readingHistoryInterimColor
} from 'common/constants';

const FinalTranscript = ({ transcript, toggleShowDetails }) => {
  return (
    <Segment
      onClick={() => toggleShowDetails()}
      color={readingHistoryFinalColor}
    >
      {transcript.content}
    </Segment>
  );
};

const InterimTranscript = ({ transcript }) => {
  return (
    <Segment color={readingHistoryInterimColor}> {transcript.content}</Segment>
  );
};

const Group = ({ group }) => {
  const { final, interim } = group;

  const [isShowDetails, setIsShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setIsShowDetails(!isShowDetails);
  };

  if (isShowDetails) {
    const reversedInterim = Enumerable.from(interim)
      .reverse()
      .toArray();
    return (
      <>
        <FinalTranscript
          transcript={final}
          toggleShowDetails={toggleShowDetails}
        />
        {reversedInterim.map(item => (
          <InterimTranscript key={item.key} transcript={item} />
        ))}
      </>
    );
  }

  if (final) {
    return (
      <FinalTranscript
        transcript={final}
        toggleShowDetails={toggleShowDetails}
      />
    );
  } else if (interim.length > 0) {
    const lastInterim = interim[interim.length - 1];
    return <InterimTranscript transcript={lastInterim} />;
  }

  return <></>;
};

export default Group;

Group.propTypes = {
  group: PropTypes.object
};
