import * as React from 'react';
import { FormEvent } from 'react';
import { AppContextConsumer } from '../index';
import { ClientApi } from '../backend-event-channel/client-api';
import { LoginStatus } from '../App.state';

export interface LoginPageProps {
  loginStatusChanged: (loginStatus: LoginStatus) => void
}

interface LoginPageState {
  userName: string;
  password: string
  error: boolean;
}

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  render = () => {
    return (
      <AppContextConsumer>
        {({clientApi}) => (
          <form className="form-signin"
                onSubmit={this.login(clientApi)}>
            <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
            <input type="text"
                   id="input-email"
                   className="form-control mb-3"
                   placeholder="User name"
                   required={true}
                   autoFocus={true}
                   onChange={evt => this.setState({userName: evt.target.value})}/>
            <input type="password"
                   id="input-password"
                   className="form-control mb-3"
                   placeholder="Password"
                   required={true}
                   onChange={evt => this.setState({password: evt.target.value})}/>
            <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign in</button>
            <a href="javascript: void 0;">Register new user</a>
            {
              this.state && this.state.error ?
                <div className="alert alert-danger mt-3" role="alert">
                  Incorrect credentials
                </div> :
                ''
            }
          </form>
        )
        }
      </AppContextConsumer>
    );
  };

  private login = (clientApi: ClientApi) => (formEvt: FormEvent) => {
    formEvt.preventDefault();
    this.setState({error: false});
    clientApi.login(this.state.userName, this.state.password)
      .then(user => this.props.loginStatusChanged({loggedIn: true, user}))
      .catch(() => this.setState({error: true}));
  };
}


export const LoginnPage = (props: LoginPageProps) => {
  function login(clientApi: ClientApi) {
    return (formEvt: FormEvent) => {
      formEvt.preventDefault();
      state.error = false;
      clientApi.login(state.userName, state.password)
        .then(user => props.loginStatusChanged({loggedIn: true, user}))
        .catch(() => state.error = true);
    };
  }

  const state = {
    userName: '',
    password: '',
    error: false
  };

  return (
    <AppContextConsumer>
      {({clientApi}) => (
        <form className="form-signin"
              onSubmit={login(clientApi)}>
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <input type="text"
                 id="input-email"
                 className="form-control mb-3"
                 placeholder="User name"
                 required={true}
                 autoFocus={true}
                 onChange={evt => state.userName = evt.target.value}/>
          <input type="password"
                 id="input-password"
                 className="form-control mb-3"
                 placeholder="Password"
                 required={true}
                 onChange={evt => state.password = evt.target.value}/>
          <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign in</button>
          <a href="javascript: void 0;">Register new user</a>
          {state.error ? <p>Fel</p> : ''}
        </form>

      )
      }
    </AppContextConsumer>
  );
};
