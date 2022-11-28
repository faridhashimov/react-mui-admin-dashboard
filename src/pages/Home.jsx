import  Box  from '@mui/material/Box'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Leftbar, Navbar } from '../components'

const Home = () => {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <Box sx={{ display: 'flex' }}>
            <Leftbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <Box sx={{ flex: 8 }}>
                <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Home
