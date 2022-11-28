import CalendarMonth from '@mui/icons-material/CalendarMonth'
import LocalShipping from '@mui/icons-material/LocalShipping'
import LocationOn from '@mui/icons-material/LocationOn'
import Person from '@mui/icons-material/Person'

import { Avatar, styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorMsg, LoadingContainer } from '../components'
import {
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
} from '../redux/adminApi/adminApi'
import { useEffect } from 'react'

const Container = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: '30px',
    [theme.breakpoints.down('md')]: {
        overflow: 'hidden',
        width: '100vw',
    },
}))

const OrderContainer = styled(Box)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    marginTop: '20px',
}))

const Header = styled(Box)(({ theme }) => ({
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #d8d8d8',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}))

const OrderTitle = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const SaveBtn = styled(Button)({
    textTransform: 'none',
    borderColor: '#C4C4C4',
    color: '#000',
    '&:hover': {
        borderColor: '#000',
    },
})

const OrderInfo = styled(Box)({
    padding: '20px',
})

const Item = styled(Box)({
    display: 'flex',
})

const IconContainer = styled('div')({
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#3167EB',
    backgroundColor: '#D6E1FB',
})

const StyledTypo = styled(Typography)({
    fontWeight: '500',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
})

const StyledSpan = styled(Typography)({
    fontSize: '16px',
    fontWeight: '300',
    color: '#000',
    margin: '3px 0px',
})

const TableTotal = styled(TableCell)({
    fontSize: '16px',
    fontWeight: '600',
})

const Color = styled('div')({
    height: '20px',
    width: '50px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
})

const Date = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
        marginBottom: '10px',
    },
}))

const OrderId = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: '#9a9a9a',
    [theme.breakpoints.down('md')]: {
        marginBottom: '10px',
    },
}))

const SingleOrder = () => {
    const [status, setStatus] = useState('')
    const { orderId } = useParams()

    const { isLoading, isError, data: order } = useGetOrderQuery(orderId)
    const [
        updateOrder,
        {
            isLoading: isOrderUpdateLoading,
            isError: isOrderUpdateError,
            isSuccess: isOrderUpdateSucces,
        },
    ] = useUpdateOrderStatusMutation()
    const sum =
        order &&
        order.products
            .reduce((sum, prev) => sum + prev.quantity * prev.price, 0)
            .toFixed(2)
    const shipping = 10.0

    useEffect(() => {
        order && setStatus(order.status)
    }, [order])

    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    console.log(isOrderUpdateSucces)

    const onStatusSave = () => {
        updateOrder({ orderId, status })
        console.log('render')
    }

    return (
        <Container>
            <Typography
                color={{ color: '#9a9a9a' }}
                variant="h5"
                fontWeight={500}
            >
                Order Detail
            </Typography>
            <OrderContainer>
                {isLoading || isOrderUpdateLoading ? (
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                ) : isError || isOrderUpdateError ? (
                    <ErrorMsg />
                ) : (
                    <>
                        <Header>
                            <OrderTitle>
                                <Date variant="h4">
                                    <CalendarMonth />
                                    Wed, Aug 13, 2020, 4:34PM
                                </Date>
                                <OrderId variant="span">
                                    Order ID: {order._id}
                                </OrderId>
                            </OrderTitle>
                            <Box sx={{ display: 'flex' }}>
                                <Select
                                    size="small"
                                    fullWidth
                                    value={status}
                                    onChange={onStatusChange}
                                    sx={{ marginRight: '15px', width: '130px' }}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Shipped">Shipped</MenuItem>
                                    <MenuItem value="Delivered">
                                        Delivered
                                    </MenuItem>
                                    <MenuItem value="Cancelled">
                                        Cancelled
                                    </MenuItem>
                                </Select>
                                <SaveBtn
                                    onClick={onStatusSave}
                                    variant="outlined"
                                >
                                    Save
                                </SaveBtn>
                            </Box>
                        </Header>
                        <OrderInfo>
                            <Stack
                                mb={4}
                                sx={{ width: '100%' }}
                                direction={{ xs: 'column', md: 'row' }}
                            >
                                <Item flex={1} mb={2}>
                                    <IconContainer>
                                        <Person />
                                    </IconContainer>
                                    <OrderTitle ml={1}>
                                        <StyledTypo variant="h5">
                                            Customer
                                        </StyledTypo>
                                        <StyledSpan variant="span">
                                            {`${order.userFirstName} ${order.userLastName}`}
                                        </StyledSpan>
                                        <StyledSpan variant="span">
                                            {order.userEmail}
                                        </StyledSpan>
                                        <StyledSpan variant="span">
                                            {order.adress?.phone}
                                        </StyledSpan>
                                    </OrderTitle>
                                </Item>
                                <Item flex={1} mb={2}>
                                    <IconContainer>
                                        <LocalShipping />
                                    </IconContainer>
                                    <OrderTitle ml={1}>
                                        <StyledTypo variant="h5">
                                            Order info
                                        </StyledTypo>
                                        <StyledSpan variant="span">
                                            {`${order.adress?.city} ${order.adress?.street}`}
                                        </StyledSpan>
                                        <StyledSpan variant="span">
                                            Payment method: card
                                        </StyledSpan>
                                        <StyledSpan variant="span">
                                            Status: {order.status}
                                        </StyledSpan>
                                    </OrderTitle>
                                </Item>
                                <Item flex={1} mb={2}>
                                    <IconContainer>
                                        <LocationOn />
                                    </IconContainer>
                                    <OrderTitle ml={1}>
                                        <StyledTypo variant="h5">
                                            Deliver to
                                        </StyledTypo>
                                        <StyledSpan variant="span">
                                            City: {order.adress?.city}
                                        </StyledSpan>
                                        <StyledSpan variant="span">
                                            {order.adress?.street}
                                        </StyledSpan>
                                        <StyledSpan variant="span">
                                            {order.adress?.zipcode}
                                        </StyledSpan>
                                    </OrderTitle>
                                </Item>
                            </Stack>
                            <TableContainer
                                sx={{
                                    border: {
                                        xs: '1px solid #ddd',
                                        md: 'none',
                                    },
                                }}
                                component={Paper}
                            >
                                <Table
                                    sx={{ minWidth: 700 }}
                                    aria-label="spanning table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Size</TableCell>
                                            <TableCell>Color</TableCell>
                                            <TableCell>Qty.</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Sum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.products.map((product) => (
                                            <TableRow key={product._id}>
                                                <TableCell
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Avatar
                                                        src={product.img[0]}
                                                        alt="product.title"
                                                    />
                                                    <Typography ml={1}>
                                                        {product.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {product.productSize}
                                                </TableCell>
                                                <TableCell>
                                                    <Color
                                                        sx={{
                                                            backgroundColor: `#${product.productColor}`,
                                                        }}
                                                    >
                                                        {product.productColor}
                                                    </Color>
                                                </TableCell>
                                                <TableCell>
                                                    {product.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    ${product.price}
                                                </TableCell>
                                                <TableCell>
                                                    $
                                                    {product.price *
                                                        product.quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={4} />
                                            <TableCell>Subtotal</TableCell>
                                            <TableCell>${sum}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} />
                                            <TableCell>Shipping cost</TableCell>
                                            <TableCell>
                                                ${shipping.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} />
                                            <TableCell>Total</TableCell>
                                            <TableTotal>
                                                ${sum + shipping}
                                            </TableTotal>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} />
                                            <TableCell
                                                sx={{ color: '#9a9a9a' }}
                                            >
                                                Status
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    style={{
                                                        padding: '2px 7px',
                                                        borderRadius: '5px',
                                                        backgroundColor:
                                                            order.status ===
                                                            'Delivered'
                                                                ? '#DCF5E0'
                                                                : order.status ===
                                                                  'Pending'
                                                                ? '#FFE8D0'
                                                                : order.status ===
                                                                  'Shipped'
                                                                ? '#9af2fa'
                                                                : '#FDCCCC',
                                                        color:
                                                            order.status ===
                                                            'Delivered'
                                                                ? '#006D0E'
                                                                : order.status ===
                                                                  'Pending'
                                                                ? '#985325'
                                                                : order.status ===
                                                                  'Shipped'
                                                                ? '#014f56'
                                                                : '#920000',
                                                    }}
                                                >
                                                    {order.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </OrderInfo>
                    </>
                )}
            </OrderContainer>
        </Container>
    )
}

export default SingleOrder
