import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

import Enumerable from 'linq';
import moment from 'moment/moment';
import { Header, Table } from 'semantic-ui-react';

import { Message, Form, Icon, Container } from 'semantic-ui-react';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';

const tooltipFormatter = (value, name, props) => {
  switch (name) {
    case 'readingSpeed':
      return [`${value} words/minute`, 'Reading Speed'];
    case 'recognisedWordsPercent':
      return [`${Math.round(value)}%`, 'Recognised Words'];
    default:
      return [];
  }
};

const legendFormatter = (value, entry, index) => {
  switch (value) {
    case 'readingSpeed':
      return 'Reading Speed';
    case 'recognisedWordsPercent':
      return 'Recognised Words';
    default:
      return '';
  }
};

const ProgressReadingMessage = ({ readingMessageProgress }) => {
  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

  const {
    readingMessageProgressUnits,
    readingMessageTitle
  } = readingMessageProgress;

  return (
    <>
      <Header>{readingMessageTitle}</Header>

      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={readingMessageProgressUnits}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='time'
            name='Time'
            tickFormatter={unixTime =>
              moment(unixTime - '0').format('HH:mm:ss Do')
            }
          />
          <YAxis
            yAxisId='readingSpeedId'
            type='number'
            dataKey='readingSpeed'
            orientation='right'
          />
          <YAxis
            yAxisId='recognisedWordsPercentId'
            type='number'
            dataKey='recognisedWordsPercent'
            orientation='left'
          />
          <Bar
            yAxisId='readingSpeedId'
            dataKey='readingSpeed'
            fill='#8884d8'
            label='Reading Speed'
          />
          <Bar
            yAxisId='recognisedWordsPercentId'
            dataKey='recognisedWordsPercent'
            fill='#82ca9d'
            label='Recognised Words %'
          />
          <Legend formatter={legendFormatter} />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            filterNull={true}
            formatter={tooltipFormatter}
            labelFormatter={unixTime =>
              moment(unixTime - '0').format('HH:mm:ss Do')
            }
          />
        </BarChart>
      </ResponsiveContainer>

      <Table basic='very' celled collapsing>
        <Table.Body>
          {Enumerable.from(readingMessageProgressUnits)
            .orderByDescending(x => x.time)
            .toArray()
            .map(readingMessageProgressUnit => {
              const {
                readingMessageId,
                time,
                readingSpeed,
                totalWords,
                uniqueWords,
                recognisedWords,
                notRecognisedWords,
                recognisedWordsPercent
              } = readingMessageProgressUnit;
              return (
                <React.Fragment key={time}>
                  <Table.Row>
                    <Table.Cell singleLine>
                      {moment(time - '0').format('HH:mm:ss Do')}
                    </Table.Cell>
                    <Table.Cell>
                      Not Recognised Words: {notRecognisedWords.join(', ')}
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ProgressReadingMessage;
