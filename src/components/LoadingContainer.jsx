import Box  from '@mui/material/Box'

const LoadingContainer = ({ children }) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '200px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </Box>
    )
}

export default LoadingContainer
