import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserData } from '../userSlice'

const baseQuery = fetchBaseQuery({
    tagTypes: ['Products', 'Orders', 'Users', 'Reviews'],
    baseUrl: 'https://ecommerce-store-backend.vercel.app/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user?.user?.accessToken
        if (token) {
            headers.set('token', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.data?.status === 403) {
        console.log('Request refresh token')
        const refreshResult = await baseQuery(
            { url: 'auth/refresh', method: 'GET' },
            api,
            extraOptions
        )

        if (refreshResult?.data) {
            api.dispatch(setUserData({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = 'Your login has expired'
            }
            return refreshResult
        }
    }

    return result
}

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => 'users',
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        getAllReviews: builder.query({
            query: () => 'products/reviews/all',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Reviews',
                              id,
                          })),
                          { type: 'Reviews', id: 'LIST' },
                      ]
                    : [{ type: 'Reviews', id: 'LIST' }],
        }),
        getAllOrders: builder.query({
            query: ({ email, status }) => ({
                url: 'orders',
                params: {
                    email,
                    status,
                },
                providesTags: (result) =>
                    result
                        ? [
                              ...result.map(({ id }) => ({
                                  type: 'Orders',
                                  id,
                              })),
                              { type: 'Orders', id: 'LIST' },
                          ]
                        : [{ type: 'Orders', id: 'LIST' }],
            }),
        }),
        getProducts: builder.query({
            query: ({ newPage, newCategory, newOrder, newTitle }) => ({
                url: `products`,
                params: {
                    page: newPage,
                    category: newCategory,
                    order: newOrder,
                    title: newTitle,
                },
                providesTags: (result) =>
                    result
                        ? [
                              ...result.map(({ id }) => ({
                                  type: 'Products',
                                  id,
                              })),
                              { type: 'Products', id: 'LIST' },
                          ]
                        : [{ type: 'Products', id: 'LIST' }],
            }),
        }),
        getSingleUser: builder.query({
            query: (userId) => `users/${userId}`,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        getUserOrders: builder.query({
            query: (userId) => ({ url: `orders/find/${userId}` }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getUserSixMonthOrders: builder.query({
            query: (userId) => ({ url: `orders/${userId}/sixmonthspendings` }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getOrder: builder.query({
            query: (orderId) => ({ url: `orders/${orderId}` }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getUsersCount: builder.query({
            query: () => 'users/count',
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        getOrdersCount: builder.query({
            query: () => 'orders/count',
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getSales: builder.query({
            query: () => 'orders/sales',
        }),
        getSalesByIntervals: builder.query({
            query: () => 'orders/intervals',
        }),
        getIncome: builder.query({
            query: () => 'orders/income',
        }),
        getProductsCount: builder.query({
            query: () => 'products/count',
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LISt' }],
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: 'products',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LISt' }],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Products', id: 'LISt' }],
        }),
        updateOrderStatus: builder.mutation({
            query({ orderId, status }) {
                return {
                    url: `orders/${orderId}`,
                    method: 'PUT',
                    body: { status },
                }
            },
            invalidatesTags: [{ type: 'Orders', id: 'LISt' }],
        }),
    }),
})

export const {
    useGetAllUsersQuery,
    useGetAllReviewsQuery,
    useGetUsersCountQuery,
    useGetOrdersCountQuery,
    useGetProductsCountQuery,
    useGetSalesQuery,
    useGetSalesByIntervalsQuery,
    useGetAllOrdersQuery,
    useGetOrderQuery,
    useLazyGetProductsQuery,
    useGetSingleUserQuery,
    useGetUserOrdersQuery,
    useGetUserSixMonthOrdersQuery,
    useLoginUserMutation,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateOrderStatusMutation,
    useGetIncomeQuery,
} = adminApi
