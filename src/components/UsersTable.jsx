import { styled } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { DataGrid } from '@mui/x-data-grid'
import { userRows, userColumns } from '../data.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Error, LoadingContainer } from '../components'
import { useGetAllUSersQuery } from '../redux/adminApi/adminApi.js'

const Table = styled('div')(({ theme }) => ({
    height: 650,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
}))

const UsersTable = () => {
    const { data: customers, isLoading, isError } = useGetAllUSersQuery()

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link
                            to={`/users/${params.row._id}`}
                            style={{
                                textDecoration: 'none',
                                color: '#014f56',
                                border: '1px solid #014f56',
                                padding: '3px 7px',
                                marginRight: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            View
                        </Link>
                        <div
                            style={{
                                textDecoration: 'none',
                                color: '#920000',
                                border: '1px solid #920000',
                                padding: '3px 7px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                )
            },
        },
    ]

    const [info, setInfo] = useState(userRows)

    const handleDelete = (id) => {
        setInfo(info.filter((item) => item.id !== id))
    }
    return (
        <>
            {isLoading && (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )}
            {isError && <Error />}
            {customers && (
                <Table>
                    <DataGrid
                        rows={customers}
                        columns={userColumns.concat(actionColumn)}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </Table>
            )}
        </>
    )
}

export default UsersTable
