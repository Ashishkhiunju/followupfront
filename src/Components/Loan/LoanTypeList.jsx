import React,{useState,useEffect} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

export const LoanTypeList = ()=>{

    const[loantypes,setLoanTypes] = useState([]);
    useEffect(()=>{
        fetchloantypes()
    },[])

    const fetchloantypes = (e)=>{
        axios.get('api/loan-type').then(({data})=>{
            setLoanTypes(data);
        })
    }

    const data = {
    
        columns: [
          {
            label: 'Title',
            field: 'type',
            sort: 'asc',
            width: 150
          },
         
         
        ],
        rows:loantypes
        
        
      };
    return (
        <MDBDataTable
        striped
        bordered
        //   medium
        data={data}
      
        />
    )
}