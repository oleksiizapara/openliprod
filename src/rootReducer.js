import { combineReducers } from 'redux';

import {
  key as speechRecognitionKey,
  reducer as speechRecognitionReducer
} from './speechRecognition/index';

import { key as readingKey, reducer as readingReducer } from './reading/index';

import { key as reviewKey, reducer as reviewReducer } from './review/index';
import {
  key as settingsKey,
  reducer as settingsReducer
} from './settings/index';

import { key as controlKey, reducer as controlReducer } from './control/index';

import {
  key as readingMessageKey,
  reducer as readingMessageReducer
} from './readingMessage/index';

import {
  key as readingListKey,
  reducer as readingListReducer
} from './readingList/index';

import {
  key as readingSearchKey,
  reducer as readingSearchReducer
} from './readingSearch/index';

import {
  key as progressKey,
  reducer as progressReducer
} from './progress/index';

import { key as profileKey, reducer as profileReducer } from './profile/index';

export default combineReducers({
  [speechRecognitionKey]: speechRecognitionReducer,
  [readingKey]: readingReducer,
  [readingMessageKey]: readingMessageReducer,
  [reviewKey]: reviewReducer,
  [settingsKey]: settingsReducer,
  [controlKey]: controlReducer,
  [readingListKey]: readingListReducer,
  [readingSearchKey]: readingSearchReducer,
  [profileKey]: profileReducer,
  [progressKey]: progressReducer
});
