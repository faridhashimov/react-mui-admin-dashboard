import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
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
import { useState } from 'react'
import { OrderItem, ErrorMsg, LoadingContainer } from '../components'
import { useGetAllOrdersQuery } from '../redux/adminApi/adminApi'

const Header = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
})

const Container = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: '30px',
    [theme.breakpoints.down('md')]: {
        overflow: 'hidden',
        width: '100vw',
    },
}))

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
    const { isError, isLoading, data: orders } = useGetAllOrdersQuery()

    const onStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const spinner = isLoading ? (
        <TableRow>
            <TableCell colSpan={7}>
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            </TableCell>
        </TableRow>
    ) : null
    const content = orders
        ? orders.map((order, i) => <OrderItem key={i} data={order} />)
        : null
    const errorMsg = isError ? <ErrorMsg /> : null
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
                    sx={{
                        width: '400px',
                        marginRight: { xs: '10px', md: '0px' },
                    }}
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
                        sx={{
                            marginRight: { xs: '0px', md: '15px' },
                            width: '130px',
                        }}
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
