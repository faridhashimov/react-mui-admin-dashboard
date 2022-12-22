import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { userColumns } from '../data.js'
import { UsersTable } from '../components'
import { useGetAllUsersQuery } from '../redux/adminApi/adminApi'

const UsersContainer = styled(Box)({
    padding: '30px',
    minHeight: '100vh',
})

const Header = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
})
const AddNew = styled(Link)({
    padding: '5px 10px',
    textTransform: 'none',
    textDecoration: 'none',
    borderRadius: '5px',
    border: '1px solid green',
    backgroundColor: 'transparent',
    color: 'green',
    '&:hover': {
        backgroundColor: '#f7f7f7',
    },
})

const Customers = () => {
    const { data, isLoading, isError } = useGetAllUsersQuery()
    return (
        <UsersContainer>
            <Header>
                <Typography
                    color={{ color: '#9a9a9a' }}
                    variant="h5"
                    fontWeight={500}
                >
                    Customers
                </Typography>
                <AddNew to="/users/new" variant="outlined">
                    Add New
                </AddNew>
            </Header>
            <UsersTable
                data={data}
                isLoading={isLoading}
                isError={isError}
                columns={userColumns}
            />
        </UsersContainer>
    )
}

export default Customers
