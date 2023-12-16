import React, {useState} from 'react'
import './Header.css'
import MainContentBody from '../MainContent/MainContentBody'
import SideNav from '../SideNav/SideNav'


const Header = () => {

    return(
        <div className='momentHeader'>
            <SideNav />
                <div className='d-flex justify-content-between mx-5 my-3'>
                    <div className='drawer_icon' role="button">
                        <i class="ri-menu-2-line"></i>
                    </div>
                    <div className='profile_icon' role="button">
                        <i class="ri-user-shared-fill"></i>
                    </div>
                </div>
                <div className='addNewMoment fs-3 fw-bolder'>
                    <p class="">Add new moment</p>
                </div>
            <MainContentBody />
        </div>
    )
}
export default Header