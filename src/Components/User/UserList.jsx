import React,{useEffect, useState} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import $ from 'jquery';



export const UserList = (props) => {



const [users,setUsers] = useState([]);
useEffect(()=>{
    fetchUsers();
},[])

 

const fetchUsers = async()=>{
    await axios.get('/api/user').then(({data})=>{
        console.log(data)
        setUsers(data)
    })
   }


const deleteuser = async(e)=>{
  
    const isConfirm = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        return result.isConfirmed
      });

      if(!isConfirm){
        return;
      }

        await axios.delete('api/user/'+e).then(({data})=>{
            Swal.fire({
                icon:'success',
                text:data.message
            })
            fetchUsers()
        }).catch(({response})=>{

        })
      
}
   const rows = users.map((items)=>{
        
    return ({
            'name':items.name,
            'address':items.address,
            'phone':items.phone,
            'email':items.email,
            
            'action':<div className='row'>
                <div className='col-md-2'>
                <Link to={`/user-edit/${items.id}`} className='fa fa-edit' title="Edit"></Link>
                </div>
                <div className='col-md-2'>
                
                <button onClick={()=>deleteuser(items.id)} id={items.id} className='fa fa-trash deleteuser' title="Delete"></button>
                
                </div>
                </div>
    })
})

   const data = {
    
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Phone',
        field: 'phone',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
      },
      
     
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 150
      },
      
      
     
    ],
    rows:rows
    
    
  };
    return(
        <MDBDataTable
        striped
        bordered
        //   medium
        data={data}
        
        />
    )

}