import {
    Typography,
    Box,
    styled,
    TextField,
    Select,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TableBody,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { OrderItem, Spinner, ErrorMsg } from '../components'
import useAdminService from '../services/useAdminService'

const Header = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
})

const Container = styled(Box)({
    minHeight: '100vh',
    padding: '30px',
})

const FiltersContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    fontSize: '20px',
    color: '#9a9a9a',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
}))

const Orders = () => {
    const [status, setStatus] = useState('All')
    const [orders, setOrders] = useState(null)

    const { loading, error, getAllOrders } = useAdminService()

    const onStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
        onOrdersLoad()
    }, [])

    console.log(orders)

    const onOrdersLoad = () => {
        getAllOrders().then((orders) => setOrders(orders))
    }

    const spinner = loading ? (
        <TableRow>
            <TableCell colSpan={7}>
                <Spinner />
            </TableCell>
        </TableRow>
    ) : null
    const content =
        !loading && orders
            ? orders.map((order, i) => <OrderItem key={i} data={order} />)
            : null
    const errorMsg = error ? <ErrorMsg /> : null
    return (
        <Container>
            <Header>
                <Typography
                    color={{ color: '#9a9a9a' }}
                    variant="h5"
                    fontWeight={500}
                >
                    Orders
                </Typography>
            </Header>
            <FiltersContainer>
                <TextField
                    size="small"
                    sx={{ width: '400px' }}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search..."
                />
                <Box>
                    <Select
                        size="small"
                        fullWidth
                        value={status}
                        onChange={onStatusChange}
                        sx={{ marginRight: '15px', width: '130px' }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                </Box>
            </FiltersContainer>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="left">Customer</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Amount</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">See Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {spinner}
                        {content}
                        {errorMsg}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Orders
