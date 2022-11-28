import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { Widgets, RevenueComponent, LatestOrders } from '../components'

const MainContainer = styled(Box)(({ theme }) => ({
    padding: '30px',
    [theme.breakpoints.down('md')]: {
        padding: '10px',
        width: '100vw',
    },
}))

const Main = () => {
    return (
        <MainContainer>
            <Typography
                color={{ color: '#9a9a9a' }}
                variant="h5"
                mb={3}
                fontWeight={500}
            >
                Dashboard
            </Typography>

            <Widgets />
            <RevenueComponent />
            <LatestOrders />
        </MainContainer>
    )
}

export default Main
