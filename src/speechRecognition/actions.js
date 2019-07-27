export const key = 'speechRecognition';

const FINAL_UPDATED = `[${key}] FINAL_UPDATED`;
const INTERIM_UPDATED = `[${key}] INTERIM_UPDATED`;
const LISTENING_UPDATED = `[${key}] LISTENING_UPDATED`;
const COMMAND_UPDATED = `{${key}} COMMAND_UPDATED`;

export const actionTypes = {
  FINAL_UPDATED,
  INTERIM_UPDATED,
  LISTENING_UPDATED,
  COMMAND_UPDATED
};

const START = 'START_COMMAND';
const STOP = 'STOP_COMMAND';
const RESET = 'RESTART_COMMAND';

export const commands = {
  START,
  STOP,
  RESET
};

const finalUpdated = finalTranscript => ({
  type: actionTypes.FINAL_UPDATED,
  payload: {
    finalTranscript
  }
});

const interimUpdated = interimTranscript => ({
  type: actionTypes.INTERIM_UPDATED,
  payload: {
    interimTranscript
  }
});

const listeningUpdated = listening => ({
  type: actionTypes.LISTENING_UPDATED,
  payload: {
    listening
  }
});

const commandUpdated = command => ({
  type: actionTypes.COMMAND_UPDATED,
  payload: {
    command
  }
});

export const actions = {
  finalUpdated,
  interimUpdated,
  listeningUpdated,
  commandUpdated
};
