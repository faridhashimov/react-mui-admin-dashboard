import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
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
    Reviews,
    Transactions
} from './pages'
import { userInputs } from './data'
import { useSelector } from 'react-redux'

const App = () => {
    const { user } = useSelector((state) => state.user)
    console.log(user);
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" replace />}
                >
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
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="transactions" element={<Transactions />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    )
}

export default App
