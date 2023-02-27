import NightsStay from '@mui/icons-material/NightsStay'
import Mail from '@mui/icons-material/Mail'
import Search from '@mui/icons-material/Search'
import NotificationsActive from '@mui/icons-material/NotificationsActive'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import MenuIcon from '@mui/icons-material/Menu'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/userSlice'

const RightContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        justifyContent: 'flex-end',
    },
}))
const IconContainer = styled('div')({
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    color: '#adb5bd',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#eaeaea',
        color: '#3167eb',
    },
})

const SearchIconContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '10%',
    borderRadius: 'none',
    cursor: 'pointer',
})

export const ToggleContainer = styled(IconContainer)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        position: 'absolute',
        left: '10px',
    },
}))

const SearchBox = styled(Box)(({ theme }) => ({
    width: '60%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}))
const StyledAvatar = styled(Avatar)({
    marginLeft: 2,
    border: '2px solid #d8d8d8',
    transition: 'all .2s ease-in',
    '&:hover': { border: '2px solid #3167eb', transition: 'all .2s ease-in' },
})
const ProfileContainer = styled(Box)({})

const Navbar = ({ openMenu, setOpenMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const onLogOut = () => {
        dispatch(logOut())
    }
    return (
        <Box
            sx={{
                position: 'sticky',
                top: '0',
                backgroundColor: '#fff',
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    padding: '15px 30px ',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #d8d8d8',
                }}
            >
                <SearchBox>
                    <InputBase
                        sx={{
                            width: '90%',
                            height: '100%',
                            padding: '0px 10px',
                        }}
                        placeholder="search users orders by email adress..."
                    />
                    <SearchIconContainer>
                        <Search />
                    </SearchIconContainer>
                </SearchBox>
                <RightContainer>
                    <ToggleContainer onClick={() => setOpenMenu(true)}>
                        <MenuIcon />
                    </ToggleContainer>

                    <IconContainer>
                        <NightsStay />
                    </IconContainer>
                    <IconContainer>
                        <NotificationsActive />
                    </IconContainer>
                    <IconContainer>
                        <Mail />
                    </IconContainer>
                    <ProfileContainer>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <StyledAvatar
                                alt="Remy Sharp"
                                src="https://minimaltoolkit.com/images/randomdata/male/80.jpg"
                            />
                            <ArrowDropDown />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                                My account
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    onLogOut()
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </ProfileContainer>
                </RightContainer>
            </Box>
        </Box>
    )
}

export default Navbar
