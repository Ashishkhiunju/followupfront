import React,{useEffect, useState} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SavingList= ()=>{
    const [savings,setSaving]=useState([]);
    useEffect(()=>{
        fetchSavings();
    },[])

    const fetchSavings = ()=>{
        axios.get('api/saving').then(({data})=>{
            setSaving(data);
        })
    }

    const rows = savings.map((item)=>{
        return ({
            'name':item.customer.name,
            'saving_type':item.saving_type,
            'saving_amount':item.saving_amount,
            'action':<div class="row">
                        <div class="col-md-2">
                            <Link to={`/saving-detail/${item.id}`} className='fa fa-eye' title="View Saving Detail"></Link>
                        </div>
                        <div class="col-md-2">
                            <Link to={`/saving-preserve/${item.id}`} className='fa fa-save' title="Preserve"></Link>
                        </div>
                        <div class="col-md-2">
                            <Link to={`/saving-withdraw/${item.id}`} className='fa fa-money' title="Withdraw"></Link>
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
            label: 'Saving Type',
            field: 'saving_type',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Saving Amount',
            field: 'saving_amount',
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
    <><MDBDataTable
    striped
    bordered
    processing
  //   medium
//   paging={false}
    data={data}
  /></>
)
}
