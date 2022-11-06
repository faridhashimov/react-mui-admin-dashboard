import { Typography, Box } from '@mui/material'
import { Widgets, RevenueComponent, LatestOrders } from '../components'

const Main = () => {
    return (
        <Box sx={{ padding: '30px' }}>
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
        </Box>
    )
}

export default Main
