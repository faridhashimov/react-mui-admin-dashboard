import useFetch from '../hooks/useFetch'

const BASE_URL = 'http://localhost:5000/api'

const useAdminService = () => {
    const { loading, error, clearError, getData } = useFetch()

    const getProducts = async (newPage, category, order, title) => {
        const res = await getData(
            `${BASE_URL}/products?page=${newPage}&category=${category}&order=${order}&title=${title}`
        )
        return res
    }
    const getAllUSers = async () => {
        const res = await getData(`${BASE_URL}/users`)
        return res
    }
    const getAllOrders = async () => {
        const res = await getData(`${BASE_URL}/orders`)
        return res
    }
    const getOrdersCount = async () => {
        const res = await getData(`${BASE_URL}/orders/count`)
        return res
    }
    const getUsersCount = async () => {
        const res = await getData(`${BASE_URL}/users/count`)
        return res
    }
    const getProductsCount = async () => {
        const res = await getData(`${BASE_URL}/products/count`)
        return res
    }
    const getOrder = async (id) => {
        const res = await getData(`${BASE_URL}/orders/${id}`)
        return res
    }
    const getSales = async () => {
        const res = await getData(`${BASE_URL}/orders/sales`)
        return res[0].amount
    }

    return {
        loading,
        error,
        clearError,
        getProducts,
        getAllUSers,
        getAllOrders,
        getOrder,
        getOrdersCount,
        getSales,
        getProductsCount,
        getUsersCount
    }
}

export default useAdminService
