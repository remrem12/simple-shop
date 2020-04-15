import React from 'react'
import MyButton from '../utils/Button.jsx'
import Login from './Login.jsx'



const RegisterLogin = () => {
  return (
    <div className = 'page_wrapper'>
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae obcaecati, nisi dignissimos ad excepturi expedita quaerat quidem impedit a doloribus cumque? Tempora quam ipsam vel exercitationem. Earum, necessitatibus ab? Ratione?</p>
            <MyButton
              type = 'default'
              title = 'Create an account'
              linkTo = '/register'
              addStyles = {{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If u have an acc, pls login</p>
            <Login/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLogin