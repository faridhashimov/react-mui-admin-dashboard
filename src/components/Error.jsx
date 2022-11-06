import { Typography, Box, styled } from '@mui/material'
import error from '../images/Decrease_3.jpg'

const Container = styled(Box)({
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const StyledTypo = styled(Typography)({
    color: 'red',
})

const Error = () => {
    return (
        <Container>
            <img
                style={{
                    height: '300px',
                    width: '400px',
                    objectFit: 'contain',
                }}
                src={error}
                alt="Error"
            />
            <StyledTypo variant="p">
                Ups...Something went wrong... Reload the page or come back later
            </StyledTypo>
        </Container>
    )
}

export default Error
