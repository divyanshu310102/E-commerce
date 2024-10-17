import Authlayout from "./components/auth/Authlayout.jsx"
import { Routes, Route } from "react-router-dom"
import AuthLogin from "./pages/auth/AuthLogin.jsx"
import AuthRegister from "./pages/auth/AuthRegister.jsx"
import AdminLayout from "./components/admin-view/AdminLayout.jsx"
import AdminDashboard from "./pages/admin-view/AdminDashboard.jsx"
import AdminProducts from "./pages/admin-view/AdminProducts.jsx"
import AdminOrders from "./pages/admin-view/AdminOrders.jsx"
import AdminFeatures from "./pages/admin-view/AdminFeatures.jsx"
import ShoppingLayout from "./components/shopping-view/ShoppingLayout.jsx"
import PageError from "./pages/not-found/PageError.jsx"
import ShoppingHome from "./pages/shopping-view/ShoppingHome.jsx"
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount.jsx"
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout.jsx"
import ShoppingListing from "./pages/shopping-view/ShoppingListing.jsx"
import CheckAuth from "./components/common/CheckAuth.jsx"
import UnAuth from "./Un-auth/UnAuth.jsx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./features/authSlice/index.jsx"
import { Skeleton } from "./components/ui/skeleton.jsx"
import PaypalReturnPage from "./pages/shopping-view/PaypalReturn.jsx"
import PaymentSuccessPage from "./pages/shopping-view/PaymentSuccess.jsx"
import SearchProducts from "./pages/shopping-view/Search.jsx"


function App() {

 const isAuthenticated = useSelector((state) => state.authSlice.isAuthenticated)
 const user = useSelector((state) => state.authSlice.user)
 const isLoading = useSelector((state) => state.authSlice.isLoading)

//  if(user){
//   console.log(user?.role)
//  }
 const dispatch = useDispatch();
 
 
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
 

if(isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

 

  return (
    <>
    
      <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
      
      <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
      <Route path="/unauth-page" element={<UnAuth/>}/>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <Authlayout/>
        </CheckAuth>}>
        <Route path="login" element={<AuthLogin/>} />
        <Route path="register" element={<AuthRegister/>} />
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AdminLayout/>
        </CheckAuth>} >
        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="products" element={<AdminProducts/>}/>
        <Route path="orders" element={<AdminOrders/>}/>
        <Route path="features" element={<AdminFeatures/>}/>
        </Route>
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ShoppingLayout/>
        </CheckAuth>} >
        <Route path="home" element={<ShoppingHome/>} />
        <Route path="account" element={<ShoppingAccount/>} />
        <Route path="checkout" element={<ShoppingCheckout/>} />
        <Route path="list" element={<ShoppingListing/>} />
        <Route path="paypal-return" element={<PaypalReturnPage />} />
        <Route path="payment-success" element={<PaymentSuccessPage />} />
        <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="*" element={<PageError/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
