import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Chart, Error, LatestTransactions, Spinner } from '../components'
import useFetch from '../hooks/useFetch'

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const UserInfoContainer = styled(Container)(({ theme }) => ({
    padding: 20,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    position: 'relative',
    overflow: 'hidden',
}))

const StyledTypo = styled(Typography)({
    color: '#9a9a9a',
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: 10,
    lineHeight: 1,
})

const UserInfoSpan = styled(StyledTypo)({
    fontSize: '16px',
    color: '#9a9a9a',
    fontWeight: 400,
    margin: '10px 0px 5px',
    span: {
        fontWeight: 600,
    },
})

const Edit = styled('div')(({ theme }) => ({
    backgroundColor: '#DDE0F0',
    position: 'absolute',
    color: '#A5A2E2',
    padding: '4px 7px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: 500,
    borderBottomLeftRadius: theme.shape.borderRadius,
    top: 0,
    right: 0,
    '&:hover': { backgroundColor: '#e0e4f9' },
}))

const SingleUser = () => {
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [userOrders, setUserOrders] = useState(null)
    const { userId } = useParams()
    console.log(userId)

    const getData = () => {
        setLoading(true)
        let endpoints = [
            'http://localhost:5000/api/users/' + userId,
            'http://localhost:5000/api/orders/find/' + userId,
        ]
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            ([{ data: userInfo }, { data: orders }]) => {
                setUserInfo(userInfo)
                setUserOrders(orders)
                setLoading(false)
            }
        )
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(userInfo)
    console.log(userOrders)

    return (
        <Container p={4}>
            <Stack direction="row" spacing={3}>
                <UserInfoContainer flex={1}>
                    <Edit>Edit</Edit>
                    <StyledTypo variant="h2">Information</StyledTypo>
                    <Box sx={{ display: 'flex' }} mt={2}>
                        <Avatar
                            sx={{ width: 120, height: 120 }}
                            src={
                                userInfo?.img
                                    ? userInfo?.img
                                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                            alt="avatar"
                        />
                        {loading && <Spinner />}
                        {/* {error && <Error />} */}
                        {userInfo && (
                            <Container ml={3}>
                                <StyledTypo
                                    variant="h3"
                                    sx={{ fontSize: '32px' }}
                                >
                                    {(userInfo.firstName &&
                                        userInfo.lastName) !== undefined
                                        ? `${userInfo.firstName} ${userInfo.lastName}`
                                        : 'No info provided'}
                                </StyledTypo>
                                <UserInfoSpan variant="p">
                                    <span>Email:</span> {userInfo.email}
                                </UserInfoSpan>
                                <UserInfoSpan variant="p">
                                    <span>Phone:</span>{' '}
                                    {userInfo?.phone}
                                </UserInfoSpan>
                                <UserInfoSpan variant="p">
                                    <span>Street:</span>{' '}
                                    {userInfo.adress.street}
                                </UserInfoSpan>
                                <UserInfoSpan variant="p">
                                    <span>City:</span> {userInfo.adress.city}
                                </UserInfoSpan>
                            </Container>
                        )}
                    </Box>
                </UserInfoContainer>
                <UserInfoContainer flex={1}>
                    <StyledTypo variant="h2">
                        Last 6 Months (spending)
                    </StyledTypo>
                    <Chart />
                </UserInfoContainer>
            </Stack>
            <Box>
                {loading && <Spinner />}
                {userOrders && (
                    <LatestTransactions
                        user={userInfo.firstName}
                        transactions={userOrders}
                    />
                )}
            </Box>
        </Container>
    )
}

export default SingleUser
