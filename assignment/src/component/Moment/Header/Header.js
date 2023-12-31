import React, {useEffect, useState} from 'react'
import './Header.css'
import MainContentBody from '../MainContent/MainContentBody'
import SideNav from '../SideNav/SideNav'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {

    const [newMoment, setNewMoment] = useState(false);
    const [showContent, setShowContent] = useState(false)

    const navigate = useNavigate();
    
    const handleClick = (optionName) => {
        if(optionName == "momentList") {
            setNewMoment(false);
        }
        if(optionName == "newMoment") {
            setNewMoment(true)
        }
    }

    const {state} = useLocation();
    const [stateData, setSatatData] = useState(state);

    useEffect(() => {
        if(stateData == null) {
            alert("You can't loggedIn, Please Log In !!") 
            navigate('/')
        }
    }, [stateData])
    

    return(
        <div className='momentHeader'>
            <SideNav handleClick={handleClick} />
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
                {
                    newMoment ? <MainContentBody stateData={stateData} /> : 
                    <div className='nonContent'>
                        <p>No Content Available !!</p>
                    </div>
                    
                }
        </div>
    )
}
export default Header