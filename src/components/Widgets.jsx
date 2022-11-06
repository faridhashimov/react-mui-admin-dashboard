import {
    Group,
    MonetizationOn,
    LocalShipping,
    ShoppingBasket,
} from '@mui/icons-material'
import { Stack, Typography, styled, Box } from '@mui/material'
import { Spinner } from '../components'
import { useEffect, useState } from 'react'
import useAdminService from '../services/useAdminService'

const WidgetContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
}))

const IconContainer = styled(Box)(({ theme }) => ({
    marginRight: 15,
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '50%',
}))

const WidgetHeader = styled(Typography)({
    fontWeight: 500,
    marginBottom: 10,
    lineHeight: 1,
    fontSize: 16,
    color: '#9a9a9a',
})

const Widgets = () => {
    const [users, setUsers] = useState(null)
    const [ordersCount, setOrdersCount] = useState(null)
    const [productsCount, setProductsCount] = useState(null)
    const [sales, setSales] = useState(null)
    const {
        loading,
        error,
        getUsersCount,
        getOrdersCount,
        getSales,
        getProductsCount,
    } = useAdminService()

    useEffect(() => {
        onPageLoad()
    }, [])

    const onPageLoad = () => {
        getUsersCount().then((data) => setUsers(data))
        getOrdersCount().then((data) => setOrdersCount(data))
        getSales().then((data) => setSales(data))
        getProductsCount().then((data) => setProductsCount(data))
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p>Something went wrong</p>
            ) : (
                <Stack direction="row" spacing={3}>
                    <WidgetContainer flex={1}>
                        <Box display={'flex'}>
                            <IconContainer sx={{ backgroundColor: '#E9967A' }}>
                                <Group sx={{ color: '#E32636' }} />
                            </IconContainer>
                            <Stack>
                                <WidgetHeader variant="h6">
                                    Total Users
                                </WidgetHeader>
                                <Typography variant="p">{users}</Typography>
                            </Stack>
                        </Box>
                    </WidgetContainer>
                    <WidgetContainer flex={1}>
                        <Box display={'flex'}>
                            <IconContainer sx={{ backgroundColor: '#D6E1FB' }}>
                                <MonetizationOn sx={{ color: '#3167EB' }} />
                            </IconContainer>
                            <Stack>
                                <WidgetHeader variant="h6">
                                    Total Sales
                                </WidgetHeader>
                                <Typography variant="p">${sales}</Typography>
                            </Stack>
                        </Box>
                    </WidgetContainer>
                    <WidgetContainer flex={1}>
                        <Box display={'flex'}>
                            <IconContainer sx={{ backgroundColor: '#CCF0D1' }}>
                                <LocalShipping sx={{ color: '#00B517' }} />
                            </IconContainer>
                            <Stack>
                                <WidgetHeader variant="h6">
                                    Total Orders
                                </WidgetHeader>
                                <Typography variant="p">
                                    {ordersCount}
                                </Typography>
                            </Stack>
                        </Box>
                    </WidgetContainer>
                    <WidgetContainer flex={1}>
                        <Box display={'flex'}>
                            <IconContainer sx={{ backgroundColor: '#FFE8D0' }}>
                                <ShoppingBasket sx={{ color: '#FD8A14' }} />
                            </IconContainer>
                            <Stack>
                                <WidgetHeader variant="h6">
                                    Total Products
                                </WidgetHeader>
                                <Typography variant="p">
                                    {productsCount}
                                </Typography>
                            </Stack>
                        </Box>
                    </WidgetContainer>
                </Stack>
            )}
        </>
    )
}

export default Widgets
