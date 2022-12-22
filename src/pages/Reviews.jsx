import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'
// import { Link } from 'react-router-dom'
import { UsersTable } from '../components'
import Add from '@mui/icons-material/Add'
import { useGetAllReviewsQuery } from '../redux/adminApi/adminApi'
import { reviewColumns } from '../data'

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

const Reviews = () => {
    const { data, isLoading, isError } = useGetAllReviewsQuery()

    return (
        <UsersContainer>
            <Header>
                <Typography
                    color={{ color: '#9a9a9a' }}
                    variant="h5"
                    fontWeight={500}
                >
                    Reviews
                </Typography>
                <Button variant="contained" startIcon={<Add />}>
                    Create New
                </Button>
            </Header>
            <UsersTable
                data={data}
                isLoading={isLoading}
                isError={isError}
                columns={reviewColumns}
            />
        </UsersContainer>
    )
}

export default Reviews
