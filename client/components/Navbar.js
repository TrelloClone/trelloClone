import React from 'react'
import {connect} from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import {logout} from '../store'

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const Navbar = ({handleClick, isLoggedIn}) => {

  return (
  // <div>
  //   <nav>
      isLoggedIn ? (
        <AppBar
          position="static"
          sx={{
            gridArea: "nav-main"
          }}
        >
          <Toolbar>
            <Link component={RouterLink} to="/home" color="secondary" >Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link component={RouterLink} to="/workspace">Workspace </Link>
          </Toolbar>
        </AppBar>

        // <div>
         
        //   <Link component={RouterLink} to="/home">Home</Link>
        //   <a href="#" onClick={handleClick}>
        //     Logout
        //   </a>
        //   <Link component={RouterLink} to="/workspace">Workspace</Link>
        // </div>
      ) : (
        // <Box
        //   sx={{
        //     backgroundColor: "yellow",
        //     gridColumn: "1 / 3",
        //     height: "30px",
        //   }}
        // >
        //   <Link component={RouterLink} to="/login" color="secondary">Login</Link>
        //   <Link component={RouterLink} to="/signup" color="secondary">Sign Up</Link>
        // </Box>

        <AppBar
          position="static"
          sx={{
            // gridRow: "2 / 3",
            // gridColumn: "2 / 3"
            gridArea: "nav-main"
          }}
        >
          <Toolbar >
            <Link component={RouterLink} to="/login" color="secondary">Login</Link>
            <Link component={RouterLink} to="/signup" color="secondary">Sign Up</Link>
          </Toolbar>
        </AppBar>

        // <div>
          
        //   <Link to="/login">Login</Link>
        //   <Link to="/signup">Sign Up</Link>
        // </div>
      )
  //   </nav>
  //   <hr />
  // </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
