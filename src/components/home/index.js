
import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Home = ()=>{
    const [welcomeMsg,setWelcomeMsg] = useState('')
    const navigate = useNavigate()

    const getMsg = async ()=>{
        const token = localStorage.getItem('token')
        try{
            const response = await axios.get("http://localhost:5000/home-message",{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
        setWelcomeMsg(response.data)
        console.log(response)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{


       getMsg()
        
    });

    return (
        <div>
        <h1 className="welcome-message">{welcomeMsg}</h1>
        <button className="logout-button" onClick={()=>{
            navigate('/login')
            localStorage.removeItem('token')
        }
        }>Logout</button>
        </div>
    )

}


export default Home