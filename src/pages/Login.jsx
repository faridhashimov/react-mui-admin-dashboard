import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    styled,
    Typography,
} from '@mui/material'
import { useState } from 'react'

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
}))

const Form = styled('form')({})

const StyledLabel = styled(InputLabel)({
    color: '#000',
    fontSize: '20px',
    fontWeight: 400,
    marginBottom: '10px',
})

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <LoginContainer>
                <Form onSubmit={handleSubmit}>
                    <Typography variant="h4" textAlign={'center'} mb={3}>
                        Sing In
                    </Typography>
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <OutlinedInput
                        sx={{ marginBottom: '20px' }}
                        id="email"
                        fullWidth
                        autoComplete="off"
                        placeholder="Email adress"
                        onChange={handleChange('email')}
                    />
                    <StyledLabel htmlFor="email">Password</StyledLabel>
                    <OutlinedInput
                        sx={{ marginBottom: '40px' }}
                        fullWidth
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? (
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
            </LoginContainer>
        </Container>
    )
}

export default Login
