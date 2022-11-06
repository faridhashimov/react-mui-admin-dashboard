import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Leftbar, Navbar } from '../components'

const Home = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Leftbar />
            <Box sx={{ flex: 8 }}>
                <Navbar />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Home
