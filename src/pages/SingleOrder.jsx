import {
    CalendarMonth,
    LocalShipping,
    LocationOn,
    Person,
} from '@mui/icons-material'
import {
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorMsg, Spinner } from '../components'
import useAdminService from '../services/useAdminService'

const Container = styled(Box)({
    minHeight: '100vh',
    padding: '30px',
})

const OrderContainer = styled(Box)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    marginTop: '20px',
}))

const Header = styled(Box)({
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #d8d8d8',
})

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

const SingleOrder = () => {
    const [status, setStatus] = useState('Pending')
    const [order, setOrder] = useState(null)
    const { orderId } = useParams()
    const sum =
        order &&
        order.products
            .reduce((sum, prev) => sum + prev.quantity * prev.price, 0)
            .toFixed(2)
    const shipping = 10.0

    const { loading, getOrder } = useAdminService()

    console.log(order)

    useEffect(() => {
        onOrderLoad(orderId)
    }, [])

    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const onOrderLoad = (id) => {
        getOrder(id).then((order) => setOrder(order))
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
                {loading ? (
                    <Spinner />
                ) : !loading && order ? (
                    <>
                        <Header>
                            <OrderTitle>
                                <Typography
                                    variant="h4"
                                    fontSize={16}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '4px',
                                    }}
                                >
                                    <CalendarMonth />
                                    Wed, Aug 13, 2020, 4:34PM
                                </Typography>
                                <Typography
                                    variant="span"
                                    sx={{ fontSize: '14px', color: '#9a9a9a' }}
                                >
                                    Order ID: {order._id}
                                </Typography>
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
                                <SaveBtn variant="outlined">Save</SaveBtn>
                            </Box>
                        </Header>
                        <OrderInfo>
                            <Stack
                                mb={4}
                                sx={{ width: '100%' }}
                                direction="row"
                            >
                                <Item flex={1}>
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
                                <Item flex={1}>
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
                                <Item flex={1}>
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
                            <TableContainer component={Paper}>
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
                                                    <img
                                                        style={{
                                                            height: '40px',
                                                            width: '40px',
                                                            borderRadius: '50%',
                                                            marginRight: '10px',
                                                        }}
                                                        src={product.img[0]}
                                                        alt="product.title"
                                                    />{' '}
                                                    {product.title}
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
                                                            'lightgreen',
                                                        color: 'green',
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
                ) : (
                    <ErrorMsg />
                )}
            </OrderContainer>
        </Container>
    )
}

export default SingleOrder
