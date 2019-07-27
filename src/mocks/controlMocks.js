import { errorMessages } from 'common/errorMessages';
import { formStates } from 'control/actions';

export const errorMock = {
  formState: formStates.ERROR_STATE,
  error: errorMessages.speechRecognitionsIsNotSupported
};

export const defaultMock = {
  formState: formStates.DEFAULT_STATE
};
