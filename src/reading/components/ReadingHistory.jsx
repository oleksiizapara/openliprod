import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import Enumerable from 'linq';

import { selectors } from '../reducer';
import Group from './Group';
import logger from 'common/logger';

const ReadingHistoryHeader = () => <Header as='h4'>Reading History</Header>;

const ReadingHistory = () => {
  const transcript = useSelector(state => selectors.transcript(state));
  const { groups } = transcript;
  return (
    <>
      <ReadingHistoryHeader />
      <Segment.Group style={{ overflow: 'auto', maxHeight: 400 }}>
        {Enumerable.from(groups)
          .reverse()
          .toArray()
          .map(group => {
            logger.debug(group);
            return <Group key={group.index} group={group} />;
          })}
      </Segment.Group>
    </>
  );
};

export default ReadingHistory;
