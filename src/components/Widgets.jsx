import Group from '@mui/icons-material/Group'
import MonetizationOn from '@mui/icons-material/MonetizationOn'
import LocalShipping from '@mui/icons-material/LocalShipping'
import ShoppingBasket from '@mui/icons-material/ShoppingBasket'

import { styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
    useGetOrdersCountQuery,
    useGetProductsCountQuery,
    useGetSalesQuery,
    useGetUsersCountQuery,
} from '../redux/adminApi/adminApi'

const WidgetContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    const {
        data: usersCount,
        isLoading: isLoadingUserSCount,
        isError: usersCountError,
    } = useGetUsersCountQuery()
    const {
        data: ordersCount,
        isLoading: isLoadingOrdersCount,
        isError: ordersCountError,
    } = useGetOrdersCountQuery()
    const {
        data: sales,
        isLoading: isLoadingSales,
        error: errorMessage,
        isError: salesError,
    } = useGetSalesQuery()
    const {
        data: productsCount,
        isLoading: isLoadingProductsCount,
        isError: productsCountError,
    } = useGetProductsCountQuery()

    // console.log(sales)

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
        >
            <WidgetContainer flex={1}>
                {isLoadingUserSCount ? (
                    <CircularProgress />
                ) : usersCountError ? (
                    <p>Something went wrong {errorMessage}</p>
                ) : (
                    <Box width={'100%'} display={'flex'}>
                        <IconContainer sx={{ backgroundColor: '#E9967A' }}>
                            <Group sx={{ color: '#E32636' }} />
                        </IconContainer>
                        <Stack>
                            <WidgetHeader variant="h6">
                                Total Users
                            </WidgetHeader>
                            <Typography variant="p">{usersCount}</Typography>
                        </Stack>
                    </Box>
                )}
            </WidgetContainer>
            <WidgetContainer flex={1}>
                {isLoadingSales ? (
                    <CircularProgress />
                ) : salesError ? (
                    <p>Something went wrong</p>
                ) : (
                    <Box width={'100%'} display={'flex'}>
                        <IconContainer sx={{ backgroundColor: '#D6E1FB' }}>
                            <MonetizationOn sx={{ color: '#3167EB' }} />
                        </IconContainer>
                        <Stack>
                            <WidgetHeader variant="h6">
                                Total Sales
                            </WidgetHeader>
                            <Typography variant="p">
                                ${sales[0].amount.toFixed(0)}
                            </Typography>
                        </Stack>
                    </Box>
                )}
            </WidgetContainer>
            <WidgetContainer flex={1}>
                {isLoadingOrdersCount ? (
                    <CircularProgress />
                ) : ordersCountError ? (
                    <p>Something went wrong</p>
                ) : (
                    <Box width={'100%'} display={'flex'}>
                        <IconContainer sx={{ backgroundColor: '#CCF0D1' }}>
                            <LocalShipping sx={{ color: '#00B517' }} />
                        </IconContainer>
                        <Stack>
                            <WidgetHeader variant="h6">
                                Total Orders
                            </WidgetHeader>
                            <Typography variant="p">{ordersCount}</Typography>
                        </Stack>
                    </Box>
                )}
            </WidgetContainer>
            <WidgetContainer flex={1}>
                {isLoadingProductsCount ? (
                    <CircularProgress />
                ) : productsCountError ? (
                    <p>Something went wrong</p>
                ) : (
                    <Box width={'100%'} display={'flex'}>
                        <IconContainer sx={{ backgroundColor: '#FFE8D0' }}>
                            <ShoppingBasket sx={{ color: '#FD8A14' }} />
                        </IconContainer>
                        <Stack>
                            <WidgetHeader variant="h6">
                                Total Products
                            </WidgetHeader>
                            <Typography variant="p">{productsCount}</Typography>
                        </Stack>
                    </Box>
                )}
            </WidgetContainer>
        </Stack>
    )
}

export default Widgets
