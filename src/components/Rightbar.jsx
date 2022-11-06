import { Box } from '@mui/material'
import Main from './Main'
import Navbar from './Navbar'

const Rightbar = () => {
    return (
        <Box sx={{ flex: 8 }}>
            <Navbar />
            <Main />
        </Box>
    )
}

export default Rightbar
