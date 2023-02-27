import { CircularProgress, styled } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import { useDeleteProductMutation } from '../redux/adminApi/adminApi'
import LoadingContainer from './LoadingContainer'
// import { Box } from '@mui/system'

const Product = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #9a9a9a',
    height: '320px',
    widht: '100px',
    borderRadius: '5px',
    overflow: 'hidden',
})
const InfoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
})
const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
})
const StyledButton = styled(Button)({
    padding: '2px 5px',
    textTransform: 'none',
})

const ProductItem = ({ product }) => {
    const [deleteProduct, { isLoading: isDeleting }] =
        useDeleteProductMutation()

    return (
        <>
            {isDeleting ? (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            ) : (
                <Product>
                    <Box
                        sx={{
                            height: '65%',
                            borderBottom: '1px solid #9a9a9a',
                        }}
                    >
                        <img
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                            src={product.img[1]}
                            alt="t-shirt"
                        />
                    </Box>
                    <Box sx={{ height: '35%', padding: '10px' }}>
                        <InfoContainer>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    marginBottom: '5px',
                                }}
                                variant="span"
                            >
                                {product.title.slice(0, 17) + '...'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#000',
                                }}
                                variant="span"
                            >
                                $ {product.price}
                            </Typography>
                        </InfoContainer>
                        <ButtonContainer>
                            <StyledButton
                                sx={{ marginRight: '6px' }}
                                variant="outlined"
                                startIcon={<Edit />}
                            >
                                Edit
                            </StyledButton>
                            <StyledButton
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                disabled={isDeleting}
                                onClick={() => deleteProduct(product._id)}
                            >
                                Delete
                            </StyledButton>
                        </ButtonContainer>
                    </Box>
                </Product>
            )}
        </>
    )
}

export default ProductItem
