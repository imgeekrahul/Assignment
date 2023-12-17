import React, { useState } from 'react'
import EventLogo from '../../../assets/event_logo.png'
import './SideNav.css';
import {CButton, CCollapse, CCard, CCardBody} from '@coreui/react'
import MainContent from '../MainContent/MainContentBody';

const SideNav = ({handleClick}) => {

  const [visible, setVisible] = useState(false)
  const [momentSelected, setMomentSelected] = useState(false)
  const [newMomentSelected, setNewMomentSelected] = useState(false)
  

  const handleTab = (name) => {
    if(name == "momentList") {
      setMomentSelected(true)
      setNewMomentSelected(false)
    }
    if(name == "newMoment") {
      setNewMomentSelected(true)
      setMomentSelected(false)

    }
  }

  return (
      <div>
          <div className='sideNav pt-4'>
            <div className='logo'>
              <img src={EventLogo} alt="Event logo" />
            </div>
            <div className='sideNavOption'>
              <div className='sideOp row mt-2'>
                <p>Profile</p>
              </div>
              <div className='row mt-2'>
                <div className='moments col d-flex justify-content-between m-2' onClick={(event)=> {
                  event.preventDefault();
                  setVisible(!visible)
                }}>
                  <p>Moments</p>
                  <i class="ri-arrow-down-s-line"></i>
                </div>
              </div>
              <CCollapse visible={visible}>
                <CCard className="collapseBody mt-5">
                  <CCardBody>
                    <ul>
                      <li onClick={() => {handleClick("momentList"); handleTab("momentList")}}>
                        {
                          momentSelected ? <b>•   Moment List</b> : <p>Moment List</p>
                        }
                        </li>
                      <li onClick={() => {handleClick("newMoment"); handleTab("newMoment")}}>
                        {
                          newMomentSelected ? <b>•   Add New Moment</b> : <p>Add New Moment</p>
                        }
                      </li>
                    </ul>
                  </CCardBody>
                </CCard>
              </CCollapse>
            </div>
        </div>
      </div>
  )
}

export default SideNav