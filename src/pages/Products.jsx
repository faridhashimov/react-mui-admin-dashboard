import {
    Typography,
    Box,
    styled,
    TextField,
    Select,
    MenuItem,
    Pagination,
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Error, ProductItem, Spinner } from '../components'
import useAdminService from '../services/useAdminService'

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

const Container = styled(Box)({
    minHeight: '100vh',
    padding: '30px',
})

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
}))

const ProductsContainer = styled(Box)(({ theme }) => ({
    padding: '20px',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
}))

const ProductsGrid = styled(Box)({
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '15px',
    marginBottom: '20px',
})

const Products = () => {
    const location = useLocation()
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [orderFilter, setOrderFilter] = useState('all')
    const [products, setProducts] = useState(null)
    const [title, setTitle] = useState('all')
    const [page, setPages] = useState(1)
    const navigate = useNavigate()
    const sp = new URLSearchParams(location.search)
    const newPage = sp.get('page') || 1
    const newCategory = sp.get('category') || 'all'
    const newOrder = sp.get('order') || 'all'
    const newTitle = sp.get('title') || 'all'

    const { loading, error, getProducts } = useAdminService()
    // console.log(loading)
    // console.log(error)

    const handleChange = (e, value) => {
        setPages(value)
        navigate(
            `/products?page=${value}&category=${newCategory}&order=${newOrder}&title=${newTitle}`
        )
    }

    useEffect(() => {
        onProductsLoad(newPage, newCategory, newOrder, newTitle)
    }, [newPage, newCategory, newOrder, newTitle])

    useEffect(() => {
        navigate(`/products?page=${1}`)
    }, [])

    const onProductsLoad = (pg, ct, no, tt) => {
        getProducts(pg, ct, no, tt).then((products) => setProducts(products))
    }

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
    }, [title])

    const onOrderChange = (event) => {
        setOrderFilter(event.target.value)
        navigate(
            `/products?page=${newPage}&category=${newCategory}&order=${event.target.value}&title=${newTitle}`
        )
    }

    const spinner = loading && !products ? <Spinner /> : null
    const content =
        !loading && products ? (
            <DataContainer
                products={products}
                handleChange={handleChange}
                page={page}
            />
        ) : null

    const errorMsg = !loading && error ? <Error /> : null

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
                    sx={{ width: '400px' }}
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
