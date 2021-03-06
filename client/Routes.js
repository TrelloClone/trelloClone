import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Workspace from './components/Workspace';
import Board from './components/Board';
import MiniDrawer from './components/MiniDrawer'
import {me} from './store'

import Box from '@mui/material/Box';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      // <div>
      <Box
        sx={{
          // display: "grid",
          
          boxSizing: "border-box",
          backgroundColor: "yellow",
          gridArea: "content",
          
        }}
      >

        {isLoggedIn ? (
          <Switch>
            <Route path="/workspace" component={Workspace} />
            <Route path="/board/:boardId" component={Board} />
            <Redirect to="/workspace" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </Box>
      // </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
