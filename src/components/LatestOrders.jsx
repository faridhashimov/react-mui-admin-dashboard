import {
    TableContainer,
    TableHead,
    TableCell,
    Button,
    TableBody,
    TableRow,
    Paper,
    Table,
    Box,
    Typography,
    styled,
} from '@mui/material'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAdminService from '../services/useAdminService'
import Spinner from './Spinner'

const StyledTypo = styled(Typography)({
    color: '#9a9a9a',
    lineHeight: 1,
})

const TransactionContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}))

const Status = styled(Typography)(({ theme }) => ({
    padding: '5px 7px',
    borderRadius: theme.shape.borderRadius,
}))

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
})

const LatestOrders = () => {
    const [orders, setOrders] = useState([])
    const { loading, error, getAllOrders } = useAdminService()

    useEffect(() => {
        onOrdersLoad()
    }, [])

    console.log(orders)

    const onOrdersLoad = () => {
        getAllOrders().then((data) => setOrders(data))
    }

    return (
        <TransactionContainer mt={3}>
            <StyledTypo variant="span" mb={3} sx={{ fontWeight: 500 }}>
                Latest Orders
            </StyledTypo>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong...</p>
            ) : (
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
                            {orders.map(
                                ({
                                    _id,
                                    userFirstName,
                                    userLastName,
                                    userEmail,
                                    createdAt,
                                    status,
                                    amount,
                                }) => (
                                    <TableRow
                                        key={_id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {`${_id.slice(0, 5)}...`}
                                        </TableCell>
                                        <TableCell align="left">
                                            {`${userFirstName} ${userLastName}`}
                                        </TableCell>
                                        <TableCell align="left">
                                            {userEmail}
                                        </TableCell>
                                        <TableCell align="left">
                                            {format(
                                                parseISO(createdAt),
                                                'dd-MMM'
                                            )}
                                        </TableCell>
                                        <TableCell align="left">
                                            {amount}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Status
                                                variant="span"
                                                sx={{
                                                    backgroundColor:
                                                        status === 'Delivered'
                                                            ? '#DCF5E0'
                                                            : status ===
                                                              'Pending'
                                                            ? '#FFE8D0'
                                                            : status ===
                                                              'Shipped'
                                                            ? '#9af2fa'
                                                            : '#FDCCCC',
                                                    color:
                                                        status === 'Delivered'
                                                            ? '#006D0E'
                                                            : status ===
                                                              'Pending'
                                                            ? '#985325'
                                                            : status ===
                                                              'Shipped'
                                                            ? '#014f56'
                                                            : '#920000',
                                                }}
                                            >
                                                {status}
                                            </Status>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button
                                                size="small"
                                                variant="outlined"
                                            >
                                                <StyledLink
                                                    to={`/orders/${_id}`}
                                                    size="small"
                                                    variant="outlined"
                                                >
                                                    Details
                                                </StyledLink>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </TransactionContainer>
    )
}

export default LatestOrders
