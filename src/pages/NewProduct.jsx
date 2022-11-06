import { DriveFolderUpload } from '@mui/icons-material'
import {
    Box,
    Button,
    Input,
    InputLabel,
    TextField,
    styled,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Autocomplete,
    Chip,
    InputAdornment,
} from '@mui/material'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import app from '../firebase'
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
    fontSize: '16px',
    fontWeight: 400,
    width: '80%',
    paddingLeft: 1,
})
const StyledLabel = styled(InputLabel)({
    fontSize: '16px',
    fontWeight: 500,
})
const InputContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
})

const InputRadio = styled(FormControlLabel)({
    '& .MuiSvgIcon-root': {
        fontSize: 16,
    },

    color: '#666',
})
const StyledTextField = styled(TextField)({
    width: '80%',
    fontSize: '12px',
})
const ImagesContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '5px',
    padding: '10px',
})

const allCategories = [
    'Shirts',
    'Linen Shirts',
    'Shorts',
    'Cargo Shorts',
    'Pants',
    'Hoodies & Sweatshirts',
    'Sweatshirts',
    'Hoodies',
    'Jeans',
    'Slim',
    'Coats & Jackets',
    'Jackets',
]
const allSizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2Xl',
    '3XL',
    '1-2Y',
    '2-3Y',
    '3-4Y',
    '4-5Y',
    '5-6Y',
    '6-7Y',
    '7-8Y',
]
const allStatuses = ['Top', 'New', 'Sale', 'Out Of Stock']
const allColors = [
    'DFFF00',
    'FFBF00',
    'FF7F50',
    'DE3163',
    '9FE2BF',
    '40E0D0',
    '6495ED',
    'CCCCFF',
    'F44336',
    'FFEBEE',
    // '#FFCDD2',
    // '#EF9A9A',
    // '#E57373',
    // '#EF5350',
    // '#E53935',
    // '#D32F2F',
    // '#C62828',
    // '#B71C1C',
    // '#FF8A80',
    // '#FF5252',
    // '#FF1744',
    // '#D50000',
    // '#FCE4EC',
    // '#F8BBD0',
    // '#F48FB1',
    // '#F06292',
    // '#EC407A',
    // '#E91E63',
    // '#D81B60',
    // '#C2185B',
    // '#AD1457',
    // '#880E4F',
]

const NewProduct = ({ title, data }) => {
    const [files, setFiles] = useState([])
    // const [images, setImages] = useState([])
    const [input, setInput] = useState({})
    const [category, setCategory] = useState([])
    const [size, setSize] = useState([])
    const [status, setStatus] = useState([])
    const [color, setColor] = useState([])

    const obj = {
        ...input,
        category,
        size,
        status,
        color,
    }

    console.log(obj)

    const onInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (files) {
            const promises = files.map((file) => {
                const fileName = new Date().getTime() + file.name
                const storage = getStorage(app)
                const storageRef = ref(storage, fileName)

                const uploadTask = uploadBytesResumable(storageRef, file)

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        console.log('Upload is ' + progress + '% done')
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused')
                                break
                            case 'running':
                                console.log('Upload is running')
                                break
                            default:
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                    }

                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                )
                return getDownloadURL(uploadTask.snapshot.ref)
            })
            Promise.all(promises).then(allUrls => console.log(allUrls))
        }
    }
    console.log(files)

    return (
        <Box sx={{ padding: '30px', height: '100vh' }}>
            <Header>Add New Product</Header>
            <AddContainer mt={3}>
                <ImagesContainer flex={1}>
                    {files.length > 0 ? (
                        files.map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    height: '100px',
                                    width: '70px',
                                    border: '1px solid grey',
                                }}
                            >
                                <img
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'contain',
                                    }}
                                    src={URL.createObjectURL(item)}
                                    alt="avatar"
                                />
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                height: '200px',
                                width: '200px',
                                border: '1px solid grey',
                            }}
                        >
                            <img
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'contain',
                                }}
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                alt="avatar"
                            />
                        </div>
                    )}
                </ImagesContainer>
                <Box flex={2}>
                    <AddForm onSubmit={handleSubmit}>
                        <InputContainer mb={2}>
                            <Box mb={2}>
                                <StyledLabel
                                    htmlFor="file"
                                    sx={{
                                        marginRight: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Image:
                                    <DriveFolderUpload
                                        sx={{ marginLeft: '30px' }}
                                    />
                                </StyledLabel>
                                <StyledInput
                                    id="file"
                                    sx={{ display: 'none' }}
                                    name="image"
                                    multiple
                                    type="file"
                                    onChange={(e) =>
                                        setFiles((files) => [
                                            ...files,
                                            e.target.files[0],
                                        ])
                                    }
                                    // onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="title">Title</StyledLabel>
                                <StyledInput
                                    onChange={onInputChange}
                                    name="title"
                                    id="title"
                                    type="text"
                                    placeholder="Cotton T-Shirt"
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="desc">
                                    Description
                                </StyledLabel>
                                <StyledInput
                                    onChange={onInputChange}
                                    name="desc"
                                    id="desc"
                                    type="text"
                                    placeholder="Beautiful Cotton T-Shirt"
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="brand">Brand</StyledLabel>
                                <StyledInput
                                    onChange={onInputChange}
                                    name="brand"
                                    id="brand"
                                    type="text"
                                    placeholder="Adidas"
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="price">Price</StyledLabel>
                                <StyledInput
                                    onChange={onInputChange}
                                    name="price"
                                    id="price"
                                    type="number"
                                    inputProps={{ step: 'any' }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    }
                                    placeholder="34.99"
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="gender">
                                    Gender
                                </StyledLabel>
                                <RadioGroup
                                    onChange={onInputChange}
                                    name="gender"
                                    row
                                    defaultValue="Women"
                                >
                                    <InputRadio
                                        value="Women"
                                        control={<Radio />}
                                        label={
                                            <Typography
                                                variant="span"
                                                fontSize={14}
                                            >
                                                Female
                                            </Typography>
                                        }
                                    />
                                    <InputRadio
                                        value="Men"
                                        control={<Radio />}
                                        label={
                                            <Typography
                                                variant="span"
                                                fontSize={14}
                                            >
                                                Male
                                            </Typography>
                                        }
                                    />
                                    <InputRadio
                                        value="Boys"
                                        control={<Radio />}
                                        label={
                                            <Typography
                                                variant="span"
                                                fontSize={14}
                                            >
                                                Boys
                                            </Typography>
                                        }
                                    />
                                    <InputRadio
                                        value="Girls"
                                        control={<Radio />}
                                        label={
                                            <Typography
                                                variant="span"
                                                fontSize={14}
                                            >
                                                Girls
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="category">
                                    Category
                                </StyledLabel>
                                <Autocomplete
                                    onChange={(event, value) =>
                                        setCategory(value)
                                    }
                                    multiple
                                    id="category"
                                    options={allCategories.map(
                                        (option) => option
                                    )}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Set Category"
                                        />
                                    )}
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="size">Size</StyledLabel>
                                <Autocomplete
                                    onChange={(event, value) => setSize(value)}
                                    multiple
                                    id="size"
                                    options={allSizes.map((option) => option)}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Set Size"
                                        />
                                    )}
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="status">
                                    Status
                                </StyledLabel>
                                <Autocomplete
                                    onChange={(event, value) =>
                                        setStatus(value)
                                    }
                                    multiple
                                    id="status"
                                    options={allStatuses.map(
                                        (option) => option
                                    )}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Set Status"
                                        />
                                    )}
                                />
                            </Box>
                            <Box mb={2}>
                                <StyledLabel htmlFor="color">Color</StyledLabel>
                                <Autocomplete
                                    onChange={(event, value) => setColor(value)}
                                    multiple
                                    id="color"
                                    options={allColors.map((option) => option)}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                sx={{
                                                    backgroundColor: `#${option}`,
                                                }}
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderOption={(props, option) => {
                                        return (
                                            <span
                                                {...props}
                                                style={{
                                                    backgroundColor: `#${option}`,
                                                    height: '25px',
                                                }}
                                            >
                                                {option}
                                            </span>
                                        )
                                    }}
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Set Hex Color"
                                        />
                                    )}
                                />
                            </Box>
                        </InputContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
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

export default NewProduct
