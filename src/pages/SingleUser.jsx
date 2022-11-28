import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Chart, LatestTransactions, LoadingContainer } from '../components'
import {
    useGetSingleUserQuery,
    useGetUserOrdersQuery,
} from '../redux/adminApi/adminApi'

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
    const { userId } = useParams()

    const {
        isLoading: isUserInfoLoading,
        isError: isUserInfoError,
        data: userInfo,
    } = useGetSingleUserQuery(userId)

    const {
        isLoading: isUserOrdersLoading,
        isError: isUserOrdersError,
        data: userOrders,
    } = useGetUserOrdersQuery(userId)

    return (
        <Container p={4}>
            <Stack direction="row" spacing={3}>
                <UserInfoContainer flex={1}>
                    <Edit>Edit</Edit>
                    <StyledTypo variant="h2">Information</StyledTypo>
                    {isUserInfoLoading || isUserOrdersLoading ? (
                        <LoadingContainer>
                            <CircularProgress />
                        </LoadingContainer>
                    ) : isUserInfoError || isUserOrdersError ? (
                        <p>Something went wrong</p>
                    ) : (
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
                                    <span>Phone:</span> {userInfo?.phone}
                                </UserInfoSpan>
                                <UserInfoSpan variant="p">
                                    <span>Street:</span>{' '}
                                    {userInfo.adress.street}
                                </UserInfoSpan>
                                <UserInfoSpan variant="p">
                                    <span>City:</span> {userInfo.adress.city}
                                </UserInfoSpan>
                            </Container>
                        </Box>
                    )}
                </UserInfoContainer>
                <UserInfoContainer flex={1}>
                    <StyledTypo variant="h2">
                        Last 6 Months (spending)
                    </StyledTypo>
                    <Chart />
                </UserInfoContainer>
            </Stack>
            <Box>
                {isUserOrdersLoading || isUserInfoLoading ? (
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                ) : isUserInfoError || isUserOrdersError ? (
                    <p>Something went wrong</p>
                ) : (
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
