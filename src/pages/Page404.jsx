import { SentimentVeryDissatisfied } from '@mui/icons-material'
import { Box, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

const StyledLink = styled(Link)({
    textDecoration: 'none',
    margin: '40px',
    padding: '5px 20px',
    border: '1px solid blue',
    borderRadius: '3px',
    color: 'blue',
    backgroundcolor: 'transaprent',
    '&:hover': {
        backgroundcolor: '#6767a4',
    },
})

const Page404 = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'red',
                fontSize: '20px',
            }}
        >
            <SentimentVeryDissatisfied
                sx={{ margin: '40px', fontSize: '40px' }}
            />
            Page Not Found....
            <StyledLink to="/">Back to Main</StyledLink>
        </Box>
    )
}

export default Page404
