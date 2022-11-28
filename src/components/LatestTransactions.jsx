import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody'

import { format, parseISO } from 'date-fns'

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

const LatestTransactions = ({ user, transactions }) => {
    console.log(transactions)
    return (
        <TransactionContainer mt={3}>
            <StyledTypo variant="span" mb={3} sx={{ fontWeight: 500 }}>
                Latest Transactions
            </StyledTypo>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="left">Products</TableCell>
                            <TableCell align="left">Customer</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Amount</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow
                                key={transaction._id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {transaction._id.substr(0, 5) + '...'}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(4,1fr)',
                                    }}
                                    align="left"
                                >
                                    {transaction.products.map((product) => (
                                        <Tooltip
                                            key={product._id}
                                            title={product.title}
                                            placement="top"
                                        >
                                            <Avatar
                                                sx={{
                                                    border: '1px solid grey',
                                                }}
                                                alt={product.title}
                                                src={product.img[0]}
                                            />
                                        </Tooltip>
                                    ))}
                                </TableCell>

                                <TableCell align="left">{user}</TableCell>
                                <TableCell align="left">
                                    {format(
                                        parseISO(transaction.createdAt),
                                        'dd-MMM'
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    ${transaction.amount}
                                </TableCell>
                                <TableCell align="left">
                                    <Status
                                        variant="span"
                                        sx={{
                                            backgroundColor:
                                                transaction.status ===
                                                'Delivered'
                                                    ? '#DCF5E0'
                                                    : transaction.status ===
                                                      'Pending'
                                                    ? '#FFE8D0'
                                                    : transaction.status ===
                                                      'Shipped'
                                                    ? '#9af2fa'
                                                    : '#FDCCCC',
                                            color:
                                                transaction.status ===
                                                'Delivered'
                                                    ? '#006D0E'
                                                    : transaction.status ===
                                                      'Pending'
                                                    ? '#985325'
                                                    : transaction.status ===
                                                      'Shipped'
                                                    ? '#014f56'
                                                    : '#920000',
                                        }}
                                    >
                                        {transaction.status}
                                    </Status>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TransactionContainer>
    )
}

export default LatestTransactions
