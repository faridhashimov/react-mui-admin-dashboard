import { DriveFolderUpload } from '@mui/icons-material'
import { Box, Button, Input, InputLabel, styled } from '@mui/material'
import { useState } from 'react'

const Header = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    fontSize: '20px',
    color: '#9a9a9a',
}))

const AddContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
}))

const AddForm = styled('form')({})
const StyledInput = styled(Input)({
    fontSize: '12px',
    fontWeight: 500,
    width: '80%',
    paddingLeft: 1,
})
const InputContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
})


const New = ({title, data}) => {
    const [file, setFile] = useState(undefined)
    return (
        <Box sx={{ padding: '30px', height: '100vh' }}>
            <Header>{title}</Header>
            <AddContainer mt={3}>
                <Box
                    flex={1}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <img
                        height={100}
                        width={100}
                        style={{ borderRadius: '50%' }}
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                        }
                        alt="avatar"
                    />
                </Box>
                <Box flex={2}>
                    <AddForm>
                        <InputContainer mb={2}>
                            <Box mb={2}>
                                <InputLabel
                                    htmlFor="file"
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        marginRight: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Image:{' '}
                                    <DriveFolderUpload
                                        sx={{ marginLeft: '30px' }}
                                    />
                                </InputLabel>
                                <StyledInput
                                    id="file"
                                    sx={{ display: 'none' }}
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Box>
                            {data.map((user) => (
                                <Box key={user.id} mb={2}>
                                    <InputLabel
                                        sx={{
                                            fontSize: '15px',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {user.title}
                                    </InputLabel>
                                    <StyledInput
                                        type={user.type}
                                        placeholder={user.placeholder}
                                    />
                                </Box>
                            ))}
                        </InputContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{
                                    textTransform: 'none',
                                    padding: '5px 50px',
                                }}
                                variant="contained"
                            >
                                Send
                            </Button>
                        </Box>
                    </AddForm>
                </Box>
            </AddContainer>
        </Box>
    )
}

export default New
