import { Box, styled } from '@mui/material'

const Container = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
})

const ErrorMsg = () => {
    return <Container>Something went wrong...</Container>
}

export default ErrorMsg
