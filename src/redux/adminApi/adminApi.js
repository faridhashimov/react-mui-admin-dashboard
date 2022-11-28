import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        tagTypes: ['Products', 'Orders'],
        baseUrl: 'https://ecommerce-store-backend.vercel.app/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.user.accessToken
            if (token) {
                headers.set('token', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllUSers: builder.query({
            query: () => 'users',
        }),
        getAllOrders: builder.query({
            query: () => 'orders',
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
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
                provideTags: (result) =>
                    result
                        ? [
                              ...result.map(({ id }) => ({
                                  type: 'Posts',
                                  id,
                              })),
                              { type: 'Posts', id: 'LIST' },
                          ]
                        : [{ type: 'Posts', id: 'LIST' }],
            }),
        }),
        getSingleUser: builder.query({
            query: (userId) => `users/${userId}`,
        }),
        getUserOrders: builder.query({
            query: (userId) => ({ url: `orders/find/${userId}` }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getOrder: builder.query({
            query: (orderId) => ({ url: `orders/${orderId}` }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getUsersCount: builder.query({
            query: () => 'users/count',
        }),
        getOrdersCount: builder.query({
            query: () => 'orders/count',
        }),
        getSales: builder.query({
            query: () => 'orders/sales',
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
        }),
        updateOrderStatus: builder.mutation({
            query({ orderId, status }) {
                console.log(status)
                return {
                    url: `orders/${orderId}`,
                    method: 'PUT',
                    body: { status },
                }
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Orders', id },
            ],
        }),
    }),
})

export const {
    useGetAllUSersQuery,
    useGetUsersCountQuery,
    useGetOrdersCountQuery,
    useGetProductsCountQuery,
    useGetSalesQuery,
    useGetAllOrdersQuery,
    useGetOrderQuery,
    useLazyGetProductsQuery,
    useGetSingleUserQuery,
    useGetUserOrdersQuery,
    useLoginUserMutation,
    useUpdateOrderStatusMutation,
} = adminApi
