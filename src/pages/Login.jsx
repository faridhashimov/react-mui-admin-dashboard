import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import { CircularProgress, styled } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/adminApi/adminApi'

const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
})

const LoginContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: '400px',
    border: '1px solid #ddd',
}))

const Form = styled('form')({})

const StyledLabel = styled(InputLabel)({
    color: '#000',
    fontSize: '20px',
    fontWeight: 400,
})

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const [showPrompt, setShowPrompt] = useState(false)
    const [loginUser, { isError, isLoading, isSuccess }] =
        useLoginUserMutation()

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleClickShowPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await loginUser(credentials).unwrap()
            console.log(isSuccess)
            dispatch(setUserData(user))
        } catch (err) {}
    }

    return (
        <Container>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Box>
                    <Typography sx={{ color: 'red' }}>
                        Something went wrong...
                    </Typography>
                </Box>
            ) : isSuccess ? (
                <Navigate to={'/'} />
            ) : (
                <LoginContainer>
                    <Form onSubmit={handleSubmit}>
                        <Typography variant="h4" textAlign={'center'} mb={3}>
                            Log In
                        </Typography>
                        <StyledLabel htmlFor="email">Email</StyledLabel>
                        <OutlinedInput
                            sx={{ marginBottom: '20px' }}
                            id="email"
                            fullWidth
                            autoComplete="email"
                            placeholder="Email adress"
                            name="email"
                            value={credentials.email}
                            onChange={(e) => handleChange(e)}
                            onMouseEnter={() => setShowPrompt(true)}
                            onMouseLeave={() => setShowPrompt(false)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            }
                        />
                        <StyledLabel htmlFor="email">Password</StyledLabel>
                        <OutlinedInput
                            sx={{ marginBottom: '40px' }}
                            fullWidth
                            type={
                                credentials.showPassword ? 'text' : 'password'
                            }
                            value={credentials.password}
                            placeholder="Password"
                            autoComplete="current-password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                            onMouseEnter={() => setShowPrompt(true)}
                            onMouseLeave={() => setShowPrompt(false)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {credentials.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Button
                            sx={{ height: '56px' }}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Login
                        </Button>
                    </Form>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '50px',
                        }}
                    >
                        {showPrompt && (
                            <Box>
                                <Typography color="inherit">
                                    <strong>Login:</strong> admin@gmail.com
                                </Typography>
                                <Typography color="inherit">
                                    <strong>Password:</strong> admin1234%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </LoginContainer>
            )}
        </Container>
    )
}

export default Login
