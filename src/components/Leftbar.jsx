import Inventory from '@mui/icons-material/Inventory'
import Paid from '@mui/icons-material/Paid'
import AddBoxRounded from '@mui/icons-material/AddBoxRounded'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import BrandingWatermark from '@mui/icons-material/BrandingWatermark'
import InsertChart from '@mui/icons-material/InsertChart'
import RateReviewSharp from '@mui/icons-material/RateReviewSharp'
import PersonOutline from '@mui/icons-material/PersonOutline'
import Home from '@mui/icons-material/Home'
import Close from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import { styled } from '@mui/system'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const StyledListBtn = styled(Link)({
    display: 'flex',
    color: '#7451f8',
    borderRadius: 5,
    marginBottom: 5,
    padding: '10px',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: '#EDE7FF',
    },
})

const StyledListItemText = styled(Typography)({
    color: '#9a9a9a',
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: 15,
})

const LeftMenu = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    zIndex: 10000,
    position: 'fixed',
    top: '0',
    width: '20%',
    [theme.breakpoints.down('md')]: {
        width: '60%',
        height: '100%',
    },
}))

const CloseContainer = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        position: 'absolute',
        top: '15px',
        right: '20px',
    },
}))

const Leftbar = ({ openMenu, setOpenMenu }) => {
    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [openMenu])

    return (
        <Box
            flex={2}
            sx={{
                borderRight: '1px solid #d8d8d8',
                display: { xs: openMenu ? 'block' : 'none', md: 'block' },
            }}
        >
            <LeftMenu>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#7451f8',
                        fontSize: 20,
                        padding: '4px 10px',
                        margin: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#EDE7FF',
                    }}
                >
                    FRED Admin
                </Typography>
                {openMenu && (
                    <CloseContainer onClick={() => setOpenMenu(false)}>
                        <Close />
                    </CloseContainer>
                )}

                <List
                    sx={{
                        width: '100%',
                        padding: '8px',
                    }}
                    component="nav"
                >
                    <StyledListBtn onClick={() => setOpenMenu(false)} to="/">
                        <Home />
                        <StyledListItemText>Home</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/users"
                    >
                        <PersonOutline />
                        <StyledListItemText>Users</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/products"
                    >
                        <Inventory />
                        <StyledListItemText>Products</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/orders"
                    >
                        <ShoppingCart />
                        <StyledListItemText>Orders</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/products/new"
                    >
                        <AddBoxRounded />
                        <StyledListItemText>Add product</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/transactions"
                    >
                        <Paid />
                        <StyledListItemText>Transactions</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/account"
                    >
                        <AccountCircle />
                        <StyledListItemText>Account</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/reviews"
                    >
                        <RateReviewSharp />
                        <StyledListItemText>Reviews</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/brands"
                    >
                        <BrandingWatermark />
                        <StyledListItemText>Brands</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn
                        onClick={() => setOpenMenu(false)}
                        to="/statistics"
                    >
                        <InsertChart />
                        <StyledListItemText>Stats</StyledListItemText>
                    </StyledListBtn>
                </List>
            </LeftMenu>
        </Box>
    )
}

export default Leftbar
