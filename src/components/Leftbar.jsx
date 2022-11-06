import {
    Inventory,
    Paid,
    AddBoxRounded,
    ShoppingCart,
    AccountCircle,
    BrandingWatermark,
    InsertChart,
    RateReviewSharp,
    PersonOutline,
    Home,
} from '@mui/icons-material'
import { Box, Typography, List } from '@mui/material'
import { styled } from '@mui/system'
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

const Leftbar = () => {
    return (
        <Box sx={{ flex: 2, borderRight: '1px solid #d8d8d8' }}>
            <Box sx={{ position: 'fixed', top: '0', width: '20%' }}>
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
                <List
                    sx={{
                        width: '100%',
                        padding: '8px',
                    }}
                    component="nav"
                >
                    <StyledListBtn to="/">
                        <Home />
                        <StyledListItemText>Home</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/users">
                        <PersonOutline />
                        <StyledListItemText>Users</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/products">
                        <Inventory />
                        <StyledListItemText>Products</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/orders">
                        <ShoppingCart />
                        <StyledListItemText>Orders</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/products/new">
                        <AddBoxRounded />
                        <StyledListItemText>Add product</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/transactions">
                        <Paid />
                        <StyledListItemText>Transactions</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/account">
                        <AccountCircle />
                        <StyledListItemText>Account</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/reviews">
                        <RateReviewSharp />
                        <StyledListItemText>Reviews</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/brands">
                        <BrandingWatermark />
                        <StyledListItemText>Brands</StyledListItemText>
                    </StyledListBtn>
                    <StyledListBtn to="/statistics">
                        <InsertChart />
                        <StyledListItemText>Stats</StyledListItemText>
                    </StyledListBtn>
                </List>
            </Box>
        </Box>
    )
}

export default Leftbar
