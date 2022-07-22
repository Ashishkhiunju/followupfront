import {useParams} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./Saving.scss";

export const SavingPreserveForm = ()=>{
    const {id} = useParams();
    const [saving,SetSaving] = useState({});
    const [customer_name,SetCustomerName]=useState();
    const [saving_type,SetSavingType]=useState();
    const [total_amount,SetTotalAmount]=useState();
    const [saving_amount,SetSavingAmount]=useState();

    var totalsaving = 0;
    var totalwithdraw = 0;

    useEffect(()=>{
        fetchSaving();
    },[])

    const fetchSaving = ()=>{
        axios.get(`api/saving/${id}`).then(({data})=>{
            SetCustomerName(data.customer.name);
            SetSavingType(data.saving_type);
            SetTotalAmount(data.saving_amount);
            SetSaving(data);

        })
    }

    const createSavingDetail = async(e)=>{
        e.preventDefault();
        const isConfirm = await Swal.fire({
            title: 'Are you sure you want to Saving',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            e.target.checked = false;
            return;
          }

          const formdata = new FormData();
          formdata.append('amount',saving_amount);
          formdata.append('saving_id',id);
          await axios.post(`api/create-saving-detail`,formdata).then(({data})=>{
             Swal.fire({
                icon:'success',
                text:data.message
            })
            fetchSaving()
          })
    }

    return (
        <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <form onSubmit={createSavingDetail}>
            <div className="loan-form">
            <div className="section">
                <p>Saving Form</p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>Customer</label>
                            <input className="form-control" value={customer_name} readOnly/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>Saving Type</label>
                            <input className="form-control" value={saving_type} readOnly/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>Total Amount</label>
                            <input className="form-control" value={total_amount} readOnly/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>Saving Amount</label>
                            <input type="number" className="form-control" onChange={(e)=>{
                                SetSavingAmount(e.target.value)
                            }} step="0.1"/>
                        </div>
                    </div>
                </div>
                <div className="btn-group text-center d-block">
                    <button className="cl-btn">Save Details</button>
                  </div>
              </div>

            </div>
          </form>
        </div>
        <div className='saving-wrap'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='saving-content'>
                        <h2 className='title'>Saving </h2>
                        <ul>
                            {saving?.saving_details &&
                                saving.saving_details.map((item)=>{
                                    totalsaving+=item.amount;
                                    return (
                                        <li>Amount <strong>{item.amount}</strong> added on
                                        <strong> {item.date}</strong></li>
                                    )
                                })
                            }
                        </ul>
                        Total Saving: <strong>{totalsaving}</strong>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='saving-content withdraw-content'>
                    <h2 className='title'>Saving Withdraw</h2>
                        <ul>
                        {

                        saving?.saving_withdraws &&

                            saving.saving_withdraws.map((item)=>{
                                totalwithdraw += item.amount
                                return (
                                    <li>Amount <strong>{item.amount}</strong> withdraw on <strong> {item.date}</strong></li>
                                )
                            })
                        }
                        </ul>
                        Total Withdraw: <strong>{totalwithdraw}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
