import { Box, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { brands } from '../data'

const Container = styled(Box)({
    padding: '30px',
    minHeight: '100vh',
})

const BrandsContainer = styled(Box)(({ theme }) => ({
    padding: '20px',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px',
}))

const ImageContainer = styled('div')({
    height: '68px',
    width: '68px',
    overflow: 'hidden',
    transition: 'all 0.2s ease-in',
})

const Brand = styled(Box)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #E8EBED',
    alignItems: 'center',
    padding: '10px 0 30px',
}))

const LogoContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #E8EBED',
    width: '100%',
    marginBottom: '20px',
})

const Brands = () => {
    return (
        <Container>
            <Typography
                color={{ color: '#9a9a9a' }}
                variant="h5"
                mb={3}
                fontWeight={500}
            >
                Brands
            </Typography>
            <BrandsContainer>
                {brands.map((brand) => (
                    <Brand key={brand.id}>
                        <LogoContainer>
                            <ImageContainer>
                                <img
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: ' contain',
                                    }}
                                    src={brand.img}
                                    alt={brand.name}
                                />
                            </ImageContainer>
                        </LogoContainer>
                        <Typography variant="span" mb={1}>
                            {brand.name}
                        </Typography>
                        <Link style={{ color: 'blue' }} to="/">
                            210 items
                        </Link>
                    </Brand>
                ))}
            </BrandsContainer>
        </Container>
    )
}

export default Brands
