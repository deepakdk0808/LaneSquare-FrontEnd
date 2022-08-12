import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


export const Create=()=>{
    const [todo, setTodo] = useState([])
    const [title,setTitle]=useState('')
  
    const [values, setValues] = useState({});
    const handleChange = (e) => {
      //  console.log(e.target.value)
      const { id, value } = e.target;
      setValues({ ...values, [id]: value })
    }
   
    ///FOR POSTING TODO
    function updateTodo(){
      console.log(values);
      axios.post(`https://lanesquarebackend.herokuapp.com/todo`, values).then((response) => {
        console.log(response.data);
        alert("Data is Added in The Table ✔️")
        getTodos()
      })
    }
  
  
    useEffect(() => {
      getTodos();
    }, [])
  
  ///FOR GETTING TODO LIST
    function getTodos() {
      fetch("https://lanesquarebackend.herokuapp.com/todo").then((result) => {
        result.json().then((resp) => {
          // console.log(resp)
          setTodo(resp)
          setTitle(resp[0].title)
        })
      })
    }
   
  ///FOR DELETING TODO  
    function deleteTodo( _id) {
      fetch(`https://lanesquarebackend.herokuapp.com/todo/${_id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          // console.log(resp)
          getTodos()
        })
      })
    }

    return (
      <div className='Container'>

        <div className='Create'>
        <h1>ADD TODO </h1>
        <h4>ID</h4>
        <input type="text" id="id" onChange={handleChange} /> <br /> <br />
        <h4>TITLE</h4>
        <input type="text" id="title" onChange={handleChange} /> <br /> <br />
        <button type="button" onClick={updateTodo} >Save New Todo</button>
        </div>


  <div className='List'>
  <h1>TODO LIST </h1>
  <TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell align="right">Title</TableCell>
      <TableCell align="right">Remove</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {todo.map((item,i) => (
      <TableRow  key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row">{item.id}</TableCell>
        <TableCell align="right"> <NavLink to={`/edit/${item._id}`} style={{textDecoration:"none",color:"black"}}>{item.title}</NavLink></TableCell>
        <TableCell align="right"><Button onClick={() => deleteTodo(item._id)}>Delete</Button></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
  </div>
       
      </div>
    );
}
