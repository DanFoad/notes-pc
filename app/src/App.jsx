import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {} from 'react-select/dist/react-select.css';
import {} from './styles/global.css';
import {} from './styles/local.css';

import { init } from './actions/AppActions';

import MenuBar from './components/MenuBar.jsx';
import SideBar from './components/SideBar.jsx';
import NotesBar from './components/NotesBar.jsx';
import Notes from './components/Notes.jsx';
import LoginView from './components/LoginView.jsx';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  getCurrentView() {
    let token = this.props.token;
    if (token != '') {
      return (
        <div className="main">
          <MenuBar />
          <div className="content">
            <SideBar />
            <NotesBar />
            <Notes />
          </div>
        </div>
      );
    } else {
      return (
        <div className="main">
          <MenuBar />
          <LoginView />
        </div>
      );
    }
  }

  render() {
    return this.getCurrentView();
  }
}
const mapStateToProps = state => {
  return {
    token: state.token
  };
};
export default connect(
  mapStateToProps,
  { init }
)(App);
