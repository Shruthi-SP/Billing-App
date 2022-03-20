import React from 'react'

const Home = (props) => {

    return (
        <div className='row justify-content-between mt-2 mb-2'>
            
            <div className='col-md-4'>
                <h4>Your personalised customer invoicing app</h4>
                <img src='bill.png' alt='' width='350px' height='350px' />
            </div>

            <div className='col-md-8'>
                <h5 className='text-primary'>What is this app about?</h5>
                <p>Billing app is an application designed for the creation of customer invoice with the detailing to product and the quantity purchased. This app can be used while the customer completes the shopping and is ready to checkout from the retail outlet. This application is intended for the user of the stores or the outlet.</p>
                <h6>How to use the app?</h6>
                <p>Register & Login - User has to Register in the application by filling the required information. Once registered, user can navigate to login and enter his credentails to access.</p>
                <p>Try this for login : <em>Email: <strong>sps@gmail.com</strong></em> and <em>Password: <b>secret123</b></em></p>
                <p>Customer - Click on Customer link in the main menu, user can add customer and view the information. Update and Delete is also provided in the list for the data modification.</p>
                <p>Product - Products can be added via product link in the main menu. Update and Delete product can be done. Product information can also be viewed on clicking the specific product (Pop up will be appear with details)</p>
                <p>Billing - Click on Billing link in the main menu to add bill information. Bill can be deleted in case of wrong update </p>
                <p>Dashboard - User can view the sales data through the dashboard</p>
            </div>

        </div>
    )
}
export default Home