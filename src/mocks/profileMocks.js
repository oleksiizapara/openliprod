import { formStates } from 'profile/actions';

export const defaultMock = {
  formState: formStates.DEFAULT_STATE,
  error: undefined
};

export const loadingMock = {
  formState: formStates.LOADING_STATE,
  error: undefined
};

export const errorMock = {
  formState: formStates.ERROR_STATE,
  error: 'Sample Error'
};
