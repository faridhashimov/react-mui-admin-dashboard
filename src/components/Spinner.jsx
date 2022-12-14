import { styled } from '@mui/material/styles'

const SpinnerContainer = styled('div')({
    /* position: absolute; */
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const StyledSpinner = styled('svg')({
    animation: 'rotate 1s linear infinite',
    margin: '40px',
    width: '80px',
    height: '80px',

    '& .path': {
        stroke: '#f27a1a',
        strokeLinecap: 'round',
        animation: 'dash 1.5s ease-in-out infinite',
    },

    '@keyframes rotate': {
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
    '@keyframes dash ': {
        '0%': {
            strokeDasharray: '1, 150',
            strokeDashoffset: '0',
        },
        '50%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-35',
        },
        '100%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-124',
        },
    },
})

const Spinner = () => {
    return (
        <SpinnerContainer>
            <StyledSpinner viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                />
            </StyledSpinner>
        </SpinnerContainer>
    )
}

export default Spinner
