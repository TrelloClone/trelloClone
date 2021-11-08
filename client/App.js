import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'

import Box from '@mui/material/Box';


const App = () => {
  return (
    <div id="entire-layout">
      <Box
        sx={{
          display: 'grid',
          // gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '50px',
          gridAutoRows: "1fr",
          gridAutoColumns: '1fr',
          gridAutoFlow: "column",
          gridTemplateAreas: `
          "nav-main nav-main nav-main"
          "content content content"
          `
        }}
      >
        <div className="DIV">DIV</div>
        <div className="DIV">DIV</div>
        <Navbar />
        <Routes />
        <div className="DIV">DIV</div>
      </Box>
      
    </div>
  )
}

export default App
