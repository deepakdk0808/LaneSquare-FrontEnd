import axios from 'axios';
import {NavLink, useParams} from 'react-router-dom';
import { useState} from 'react'

export const Edit=()=>{
    const {id} = useParams();
  
    const [data,setdata] =useState({})
  
    const updateState = ()=>{
        axios.patch(`https://lanesquarebackend.herokuapp.com/todo/${id}`,data).then(function(response){
            alert("Your Data is Updated ✔️") 
        })
    }
  
    const handleChange = (e)=>{
        const {id,value} = e.target
        // console.log(id,value)
      setdata({...data,[id]:value})
    }
  
    return(
        <>
        <div className='Edit'>
        <h1>Edit your task</h1>
        <input onChange={handleChange} id="title" label="Title"/><br></br>
        <button onClick={updateState}>Edit</button><br></br>
        <NavLink to="/"><button>Back To TODOs</button></NavLink>
        </div>
       
        </>
    )
}