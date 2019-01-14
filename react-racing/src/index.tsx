import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BackendEventChannel } from './backend-event-channel/backend-event-channel';
import { composeWithDevTools, } from 'redux-devtools-extension';
import { rootReducer } from './state';
import { ClientApi } from './backend-event-channel/client-api';
import {changeLoginStatus} from './App.state';

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export interface IAppContext {
  clientApi: ClientApi;
}
export const AppContext = React.createContext<IAppContext>({} as IAppContext);
export const AppContextConsumer = AppContext.Consumer;
const appContext: IAppContext = {
  clientApi: new ClientApi()
};

appContext.clientApi.userForToken()
  .then(user => {
    store.dispatch(changeLoginStatus({loggedIn: true, user}));
    init();
  })
  .catch(() => {
    store.dispatch(changeLoginStatus({loggedIn: false}));
    init();
  });

function init() {
  ReactDOM.render(
    <AppContext.Provider value={appContext}>
      <Provider store={store}>
        <App websocket={new BackendEventChannel(store)}/>
      </Provider>
    </AppContext.Provider>
    ,
    document.getElementById('root') as HTMLElement
  );
}