import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Main } from './components'
import {
    Brands,
    Customers,
    Home,
    Login,
    New,
    NewProduct,
    Orders,
    Page404,
    Products,
    SingleOrder,
    SingleProduct,
    SingleUser,
} from './pages'
import { userInputs } from './data'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Main />} />
                    <Route path="users">
                        <Route index element={<Customers />} />
                        <Route path=":userId" element={<SingleUser />} />
                        <Route
                            path="new"
                            element={
                                <New title={'Add New User'} data={userInputs} />
                            }
                        />
                    </Route>
                    <Route path="products">
                        <Route index element={<Products />} />
                        <Route path=":productId" element={<SingleProduct />} />
                        <Route path="new" element={<NewProduct />} />
                    </Route>
                    <Route path="orders">
                        <Route index element={<Orders />} />
                        <Route path=":orderId" element={<SingleOrder />} />
                    </Route>
                    <Route path="brands" element={<Brands />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    )
}

export default App
