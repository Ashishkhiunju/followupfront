import {useParams} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


export const SavingWithdrawForm = ()=>{

    const {id} = useParams();
    const [saving,SetSaving] = useState({});
    const [customer_name,SetCustomerName]=useState();
    const [saving_type,SetSavingType]=useState();
    const [total_amount,SetTotalAmount]=useState();
    const [withdraw_amount,SetWithdrawAmount]=useState();
    const [withdrawAmountError,setErrorWithdrawAmount]=useState('');

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

    const createWithdrawDetail = async(e)=>{
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
          formdata.append('amount',withdraw_amount);
          formdata.append('saving_id',id);
          await axios.post(`api/create-withdraw-detail`,formdata).then(({data})=>{

             Swal.fire({
                icon:'success',
                text:data.message
            })
            fetchSaving()
          }).catch(({response})=>{

            if(response.status===422){

                setErrorWithdrawAmount(response.data.errors.amount);
            }

            Swal.fire({
                icon:"error",
                text:response.message,
            })
          })
    }

    return (
        <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <form onSubmit={createWithdrawDetail}>
            <div className="loan-form">
            <div className="section">
                <p>Saving Withdraw Form</p>
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
                        <label>Withdraw Amount</label>
                            <input type="number" className="form-control" onChange={(e)=>{
                                SetWithdrawAmount(e.target.value)
                                if(e.target.value > total_amount){
                                    setErrorWithdrawAmount("Withdraw amount must not be greater than total amount")
                                }else{
                                    setErrorWithdrawAmount('')
                                }
                            }} step="0.1"/>
                            {withdrawAmountError &&
                             <p class="alert alert-danger">{withdrawAmountError}</p>

                            }
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
            {saving?.saving_withdraws &&
                saving.saving_withdraws.map((item)=>{
                    return (
                        <li>Amount <b>{item.amount}</b> withdraw on <b>{item.date}</b></li>
                    )
                })
            }
        </div>
    )
}
