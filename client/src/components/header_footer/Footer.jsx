import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'



const Footer = () => {
  return (
    <footer className = 'bck_b_dark'>
      <div className="container">
        <div className="logo">KOUMAKAN</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact infomation</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon
                  icon = {faCompass}
                  className = 'icon'
                />
                <div className="nfo">
                  <div>Address</div>
                  <div>Royal Navy</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                  icon = {faPhone}
                  className = 'icon'
                />
                <div className="nfo">
                  <div>Address</div>
                  <div>Eagle Union</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                  icon = {faClock}
                  className = 'icon'
                />
                <div className="nfo">
                  <div>Address</div>
                  <div>Sakura Empire</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                  icon = {faEnvelope}
                  className = 'icon'
                />
                <div className="nfo">
                  <div>Address</div>
                  <div>Iron Blood</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer