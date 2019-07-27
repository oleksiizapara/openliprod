import { default as algorithmLogic } from './logic/algorithm';
import { default as controlLogic } from './logic/control';

export const logic = [...algorithmLogic, ...controlLogic];

export { actionTypes, actions, key } from './actions';
export { default as reducer, selectors } from './reducer';
