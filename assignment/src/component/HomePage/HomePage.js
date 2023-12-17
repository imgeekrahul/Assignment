import React,{ useState } from 'react'
import './HomePage.css'
import SignUpLogo from '../../assets/sign_logo.png'
import 'remixicon/fonts/remixicon.css'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import localStorage from 'local-storage'



const HomePage = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailId, setEmailId] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5050/api/add/user', {firstname, lastname, phone, emailId, city, password})
        .then((newUser) => {
            console.log("New user created :", newUser)
            localStorage.set("username", newUser)
            const name = localStorage.get("username")
            console.log(name.data._id);
            const userId = name.data._id;
            navigate('/moment')
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmailId('');
            setCity('');
            setPassword('');
        })
        .catch((err) => {
            console.log("Error detected :", err);
        })
    }


  return (
    <>
        <div className='header'>
            <img src={SignUpLogo} alt="sign_logo"  />
        </div>
        <div className='signupSection text-center'>
            <p className='m-5 fs-3 fw-bolder'>Sign up</p>
            <form onSubmit={handleFormSubmit}>
                <div className='container text-start'>
                    <div className='row m-0'>
                        <div className='col lh-2'>
                            <p>First Name</p>
                            <div className='row'>
                                <div className='col-1'>
                                    <i className="ri-user-line"></i>
                                </div>
                                <div className='col-3'>
                                    <input type="text" placeholder='Robert' value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                        <div className='col lh-2'>
                            <p>Last Name</p>
                            <div className='row'>
                                <div className='col-1'>
                                    <i class="ri-user-line"></i>
                                </div>
                                <div className='col-3'>
                                <input type="text" placeholder='Downey Jr.' value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-0 mt-4'>
                        <div className='col mr-4 lh-2'>
                            Mobile No.

                            <PhoneInput 
                                className='mt-3 mr-3 '
                                placeholder="Enter phone number"
                                defaultCountry='IN'
                                pattern="[6789][0-9]{9}"
                                title="Please enter valid phone number"
                                value={phone}
                                onChange={setPhone}
                                style={{border: "none", outline: "none", width: "90px", height: "20px"}}
                            required />
                        </div>
                        <div className='col lh-2'>
                            Email-ID
                            <div className='row mt-3'>
                                <div className='col-1'>
                                    <i class="ri-mail-line"></i>
                                </div>
                                <div className='col-3'>
                                    <input type="email" placeholder='rdj@gmail.com' value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-0 mt-4'>
                        <div className='col lh-2'>
                            City
                            <div className='col mt-3'>
                                <input type="text" placeholder='Pune' value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                        </div>
                        <div className='col lh-2'>
                            Enter Password
                            <div className='row mt-3'>
                                <div className='col-1'>
                                    <i class="ri-lock-line"></i>
                                </div>
                                <div className='col-3'>
                                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} minLength="4" maxLength="8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='signUp rounded-pill px-5 py-2 mt-5'>Submit</button>
            </form>
        </div>
    </>
  )
}

export default HomePage