import { combineReducers } from 'redux';

import { key as speechRecognitionKey } from 'speechRecognition/index';
import { key as readingKey } from 'reading/index';
import { key as reviewKey } from 'review/index';
import { key as readingMessageKey } from 'readingMessage/index';
import { key as settingsKey } from 'settings/index';
import { key as controlKey } from 'control/index';
import { key as readingListKey } from 'readingList/index';
import { key as readingSearchKey } from 'readingSearch/index';
import { key as profileKey } from 'profile/index';
import { key as progressKey } from '../progress/index';

import * as readingMessageMocks from 'mocks/readingMessageMocks';
import * as readingMocks from 'mocks/readingMocks';
import * as reviewMocks from 'mocks/reviewMocks';
import * as settingsMocks from 'mocks/settingsMocks';
import * as controlMocks from 'mocks/controlMocks';
import * as readingListMocks from 'mocks/readingListMocks';
import * as readingSearchMocks from 'mocks/readingSearchMocks';
import * as profileMocks from 'mocks/profileMocks';
import * as progressMocks from 'mocks/progressMocks';

const initialSpeechRecognitionState = {};
const initialReadingState = readingMocks.reviewSample;
const initialReadingMessageState = readingMessageMocks.loadedSampleMessage;
const initialReviewState = reviewMocks.loadedMock;
const initialSettingsState = settingsMocks.authenticatedState;
const initialControlState = controlMocks.defaultMock;
const initialReadingListState = readingListMocks.defaultMock;
const initialReadingSearchState = readingSearchMocks.searchedMock;
const initialProfileState = profileMocks.defaultMock;
const initialProgressState = progressMocks.defaultMock;

const mockedReducer = initialState => (state = initialState) => {
  return state;
};

export default combineReducers({
  [speechRecognitionKey]: mockedReducer(initialSpeechRecognitionState),
  [readingKey]: mockedReducer(initialReadingState),
  [readingMessageKey]: mockedReducer(initialReadingMessageState),
  [reviewKey]: mockedReducer(initialReviewState),
  [settingsKey]: mockedReducer(initialSettingsState),
  [controlKey]: mockedReducer(initialControlState),
  [readingListKey]: mockedReducer(initialReadingListState),
  [readingSearchKey]: mockedReducer(initialReadingSearchState),
  [profileKey]: mockedReducer(initialProfileState),
  [progressKey]: mockedReducer(initialProgressState)
});
