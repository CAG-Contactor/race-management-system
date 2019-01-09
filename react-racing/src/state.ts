import { combineReducers } from 'redux';
import { backendEventChannelReducer } from './backend-event-channel/backend-event-channel.state';
import { queueEventChannelReducer } from './queue/queue-event-channel-reducer';
import { StateType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import { appStateReducer } from './App.state';

export const rootReducer = combineReducers({
  appState: appStateReducer,
  backendEventChannelState: backendEventChannelReducer,
  queueEventChannelReducer
});

export type RootState = DeepReadonly<StateType<typeof rootReducer>>;