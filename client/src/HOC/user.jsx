import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User infomation',
    linkTo: '/user/user_profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
]

const admin = [
  {
    name: 'Site info',
    linkTo: '/admin/site_info'
  },
  {
    name: 'Add product',
    linkTo: '/admin/add_product'
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage_categories'
  }
]

const generateLinks = (links) => {
  return links.map((link, i) => (
    <Link
      to={link.linkTo}
      key={i} >
      {link.name}
    </Link>
  ))
}

const UserLayout = (props) => {
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">
            {generateLinks(links)}
          </div>
          {
            props.user.userData.isAdmin ?
              <div>
                <h2>Admin</h2>
                <div className="links">
                  {generateLinks(admin)}
                </div>
              </div>
              : null
          }
        </div>
        <div className="user_right">
          {props.children}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(UserLayout);