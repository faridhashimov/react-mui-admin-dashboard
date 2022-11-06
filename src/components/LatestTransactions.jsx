import { TableContainer, Tooltip } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableCell } from '@mui/material'
import { Avatar } from '@mui/material'
import { TableBody } from '@mui/material'
import { TableRow } from '@mui/material'
import { Paper } from '@mui/material'
import { Table } from '@mui/material'
import { Box, Typography, styled } from '@mui/material'
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

function createData(name, src, calories, fat, carbs, protein, status) {
    return { name, src, calories, fat, carbs, protein, status }
}

const rows = [
    createData(
        '#1234775',
        'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F4e%2F3b%2F4e3badd30820eccaed5b3531fb02d42616fd7815.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
        'Slim Fit Linen-blend Shirt',
        'John Smith',
        '14 March',
        '$ 134.99',
        'Delivered'
    ),
    createData(
        '#2344775',
        'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc5%2F46%2Fc546e8f009fade125334ceb19f34aa2b847d077f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
        'Regular Fit Knee-length Cargo Shorts',
        'Alex Merchant',
        '12 - March',
        '$ 14.99',
        'Pending'
    ),
    createData(
        '#6734775',
        'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa0%2F1b%2Fa01b0e3012660277b6336511cae734da9bb7e6be.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
        'Strappy Sandals',
        'Michael Keaton',
        '10 - March',
        '$ 75.99',
        'Shipped'
    ),
    createData(
        '#9874775',
        'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa7%2Fda%2Fa7da66b142a546f8babcde6c64a64bb37bf6fec4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
        'Backpack',
        'Tom Cruise',
        '07 - March',
        '$ 12.99',
        'Cancelled'
    ),
    createData(
        '#8714775',
        'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F20%2F03%2F2003400c32ab270f7dd5d02039493c52b0506e85.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
        'Knit Pencil Skirt',
        'John Smith',
        '05 - March',
        '$ 34.99',
        'Delivered'
    ),
]

const LatestTransactions = ({ user, transactions }) => {
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
                                                alt="Remy Sharp"
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
