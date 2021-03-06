import React, { useEffect, useState } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import swal from 'sweetalert'
import PrivateRoute from "./helper/PrivateRoute";
import Home from './components/user/Home'
import Register from './components/user/Register'
import Login from './components/user/Login'
import Account from './components/user/Account'
import Customers from './components/customers/Customers'
import Products from './components/products/Products'
import Billings from './components/bills/Billings'
import BillingDashboard from "./components/bills/BillingDasboard";
import { useDispatch } from "react-redux";
import { asyncGetAllCustomers } from './actions/customersAction'
import { asyncGetAllProducts } from './actions/productsAction'
import { asyncGetAllBills } from './actions/billsAction'

function App(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleLoggedIn = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleLoggedIn()
      dispatch(asyncGetAllCustomers())
      dispatch(asyncGetAllProducts())
      dispatch(asyncGetAllBills())
    }
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Billing App</h1>
      {
        userLoggedIn ? <div className="container d-flex bg-info">
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/users/account'>Account</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/customers'>Customers</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/products'>Products</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/bills'>Billings</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/dashboard'>Dashboard</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none"
            to='#' onClick={() => {
              localStorage.removeItem('token')
              swal('successfully logged out')
              handleLoggedIn()
              props.history.push('/')
            }}>Logout</Link>
        </div> : <div className="d-flex bg-info">
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/'>Home</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/users/register'> Register</Link>
          <Link className="p-2 ms-5 text-white text-decoration-none" to='/users/login'>Login</Link>
        </div>
      }
      <div className='container'>
        <Route path='/' component={Home} exact></Route>
        <Route path='/users/register' component={Register}></Route>
        <Route path='/users/login' render={(props) => {
          return <Login {...props} handleLoggedIn={handleLoggedIn} />
        }}></Route>

        <PrivateRoute path='/users/account' component={Account} />
        <PrivateRoute path='/customers' component={Customers} />
        <PrivateRoute path='/products' component={Products} />
        <PrivateRoute path='/bills' component={Billings} />
        <PrivateRoute path='/dashboard' component={BillingDashboard} />
      </div>

    </div>
  );
}

export default withRouter(App);
