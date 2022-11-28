import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Error, LoadingContainer, ProductItem } from '../components'
import {
    useLazyGetProductsQuery,
} from '../redux/adminApi/adminApi'

const Header = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
})

const AddNew = styled(Link)({
    padding: '5px 10px',
    textTransform: 'none',
    textDecoration: 'none',
    borderRadius: '5px',
    border: '1px solid green',
    backgroundColor: 'transparent',
    color: 'green',
    '&:hover': {
        backgroundColor: '#f7f7f7',
    },
})

const Container = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: '30px',
    [theme.breakpoints.down('md')]: {
        width: '100vw',
    },
}))

const FiltersContainer = styled(Box)(({ theme }) => ({
    padding: '20px',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    fontWeight: '500',
    fontSize: '20px',
    color: '#9a9a9a',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}))

const ProductsContainer = styled(Box)(({ theme }) => ({
    padding: '20px',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
}))

const ProductsGrid = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '15px',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
}))

const Products = () => {
    const location = useLocation()
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [orderFilter, setOrderFilter] = useState('all')
    // const [products, setProducts] = useState(null)
    const [title, setTitle] = useState('all')
    const [page, setPages] = useState(1)
    const navigate = useNavigate()
    const sp = new URLSearchParams(location.search)
    const newPage = sp.get('page') || 1
    const newCategory = sp.get('category') || 'all'
    const newOrder = sp.get('order') || 'all'
    const newTitle = sp.get('title') || 'all'

    const handleChange = (e, value) => {
        setPages(value)
        navigate(
            `/products?page=${value}&category=${newCategory}&order=${newOrder}&title=${newTitle}`
        )
    }

    useEffect(() => {
        navigate(`/products?page=${1}`)
    }, [navigate])

    const [fetchProducts, { data: products, isLoading, isError }] =
        useLazyGetProductsQuery()

    useEffect(() => {
        fetchProducts({ newPage, newCategory, newOrder, newTitle })
    }, [newPage, newCategory, newOrder, newTitle, fetchProducts])

    const onCategoryChange = (event) => {
        setCategoryFilter(event.target.value)
        navigate(
            `/products?page=${1}&category=${
                event.target.value
            }&order=${newOrder}&title=${newTitle}`
        )
    }

    useEffect(() => {
        const titleTimeout = setTimeout(() => {
            navigate(
                `/products?page=${1}&category=${'all'}&order=${'all'}&title=${
                    title === '' ? 'all' : title
                }`
            )
        }, 500)

        return () => {
            clearTimeout(titleTimeout)
        }
    }, [title, navigate])

    const onOrderChange = (event) => {
        setOrderFilter(event.target.value)
        navigate(
            `/products?page=${newPage}&category=${newCategory}&order=${event.target.value}&title=${newTitle}`
        )
    }

    const spinner = isLoading ? (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    ) : null

    const content = products ? (
        <DataContainer
            products={products}
            handleChange={handleChange}
            page={page}
        />
    ) : null

    const errorMsg = isError ? <Error /> : null

    return (
        <Container>
            <Header>
                <Typography
                    color={{ color: '#9a9a9a' }}
                    variant="h5"
                    fontWeight={500}
                >
                    Products
                </Typography>
                <AddNew to="/products/new" variant="outlined">
                    Add New
                </AddNew>
            </Header>
            <FiltersContainer>
                <TextField
                    size="small"
                    sx={{
                        width: { xs: '100%', md: '400px' },
                        marginBottom: { xs: '10px', md: '0px' },
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search..."
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Box>
                    <Select
                        size="small"
                        value={categoryFilter}
                        onChange={onCategoryChange}
                        sx={{ marginRight: '15px', width: '140px' }}
                    >
                        <MenuItem value="all">All Category</MenuItem>
                        <MenuItem value="T-shirts">T-Shirts</MenuItem>
                        <MenuItem value="Shirts">Shirts</MenuItem>
                        <MenuItem value="Shorts">Shorts</MenuItem>
                        <MenuItem value="Shoes">Shoes</MenuItem>
                        <MenuItem value="Coats & Jackets">
                            Coats & Jackets
                        </MenuItem>
                    </Select>
                    <Select
                        size="small"
                        value={orderFilter}
                        onChange={onOrderChange}
                        sx={{ width: '110px' }}
                    >
                        <MenuItem value="all">Featured</MenuItem>
                        <MenuItem value="new">Newest</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </Box>
            </FiltersContainer>
            {spinner}
            {content}
            {errorMsg}
        </Container>
    )
}

const DataContainer = ({ products, page, handleChange }) => {
    return (
        <ProductsContainer>
            <ProductsGrid>
                {products.data.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </ProductsGrid>
            <Pagination
                sx={{ alignSelf: 'right' }}
                count={Math.ceil(products.count / 10)}
                variant="outlined"
                shape="rounded"
                color="primary"
                page={page}
                onChange={handleChange}
            />
        </ProductsContainer>
    )
}

export default Products
