import React,{useEffect, useState} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const CustomerList = (props) => {
const [customers,setCustomers] = useState([]);
useEffect(()=>{
    document.title = 'Customers'
    fetchCustomer();
},[])



const fetchCustomer = ()=>{
     axios.get('/api/customers').then(({data})=>{
        console.log(data)
        setCustomers(data)
    })
   }


    const rows = customers.map((items)=>{

        return ({
                'name':items.name,
                'address':items.address,
                'phone':items.phone,
                'email':items.email,
                'company_name':items.company_name,
                'citizen_ship_no':items.citizen_ship_no,
                'action':<Link to={`/customer-loandetail/${items.id}`} className='fa fa-eye' title="View Loan Detail"></Link>
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
        label: 'Company Name',
        field: 'company_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Citizen Ship No',
        field: 'citizen_ship_no',
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



  return (
    <MDBDataTable
      striped
      bordered
    //   medium
      data={data}
    />
  );
}
