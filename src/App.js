import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout, Typography, Spin, Badge, Popover, Button } from 'antd';
import { head } from 'lodash';
import * as firebase from "firebase/app"
import { Sidebar } from './components/sidebar';
import { Dashboard } from './components/dashboard';
import { Classes } from './components/classes';
import { Subjects } from './components/subjects';
import { CalculatorOutlined, UserOutlined } from '@ant-design/icons';
import './App.scss';
import { FIREBASE_CONFIG } from './config/firebaseConfig';
import { Login, Signup } from './components/login';
import Avatar from 'antd/lib/avatar/avatar';

const { Header } = Layout;
const { Title } = Typography;

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);
firebase.analytics();

const ProtectedRoute = ({ uid, component: Component, ...rest }) => {
  if (uid) {
    return (
      <Route {...rest} render={
        props => <Component {...rest} {...props} />
      } />
    )
  } else {
    return (<Redirect to='/login' />)
  }
}

class App extends Component {
  state = {
    User: null,
    Loaded: 'false'
  }

  componentDidMount = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      console.log(user.email);
      this.setState({ User: user.email, Loaded: true });
    });
  }

  logout = () => {
    firebase.auth().signOut()
      .then(r => {
        console.log('signout');
        localStorage.setItem("isAuth", false)
        this.setState({ User: null, Loaded: true }, () => {
          this.props.history.push('/login')
        });
      })
  }

  render() {
    const { User, Loaded } = this.state;
    return (
      <Spin tip="Loading..." spinning={!Loaded && !User} size="large" >
        <div className="App">
          <Header className="App__header">
            <div className="App__header__title">
              <CalculatorOutlined />
              <Title level={3} className="App__title">Title</Title>
            </div>
            <div className="App__header__action">
              {
                User ? (
                  <Popover placement="bottomRight" title={`User: ${User}`} content={<Button danger onClick={this.logout}>Logout</Button>} trigger="click">
                    <Badge dot>
                      <Avatar style={{ backgroundColor: 'red', verticalAlign: 'middle', float: 'right' }} size="medium" gap={3}>
                        {head(User).toUpperCase()}
                      </Avatar>
                    </Badge>
                  </Popover>
                ) : ''
              }
            </div>
          </Header>

          <div className="App__container">
            {User && <Sidebar />}
            <div className="App__sub-container">
              <Switch>
                <Route uid={User} exact path='/login' children={<Login uid={User} />} />
                <Route uid={User} exact path='/signup' children={<Signup uid={User} />} />
                <ProtectedRoute uid={User} exact path="/">
                  <Dashboard />
                </ProtectedRoute >
                <ProtectedRoute uid={User} exact path="/classes">
                  <Classes />
                </ProtectedRoute  >
                <ProtectedRoute uid={User} path="/subject/:id" children={<Subjects />} />
              </Switch>
            </div>
          </div >
        </div >
      </Spin >
    )
  }
}

export default withRouter(App);
