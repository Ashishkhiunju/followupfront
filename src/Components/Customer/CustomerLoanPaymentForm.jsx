import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import {useParams,useNavigate} from 'react-router-dom';
import Moment from 'moment';

export const CustomerLoanPaymentForm = (props)=>{
    const {loanid} = useParams();
    const navigate = useNavigate();


    const [loanDetail,setLoanDetail] = useState([])
    const [customerName,setCustomerName] = useState('')
    const [paid_amount,setPaidAmount] = useState('')
    const [total_paid,setTotalPaid] = useState('')
    const [total_remain,setTotalRemain] = useState('')
    const [loan_payment_details,setLoanPaymentDetails]=useState([])
    const [emi,setEmi]=useState()
    const [loanbased,setLoanBased]=useState('')


    useEffect(()=>{
        document.title = 'Loan Payments'
        fetchLoanDetail()
    },[])

    const fetchLoanDetail = async(e)=>{
        await axios.get(`/api/loandetail/${loanid}`).then(({data})=>{
            setCustomerName(data.customer.name)
            setLoanDetail(data)
            setLoanPaymentDetails(data.loan_details)
            setLoanBased(data.loan_type.based);
            // var array = data.loan_details
            // var total_paid = 0;
            // for(var i in array){
            //     total_paid += array[i].paid_amount;

            // }
            // setTotalPaid(total_paid)
            // setTotalRemain(data.loan_amount - total_paid )
            setTotalPaid(data.paid_amount)
            setTotalRemain(data.remaining_amount)
            setEmi(data.emi)
            setPaidAmount(data.emi);
            if(data.remaining_amount <= 1){
                setTotalRemain(0)
                setEmi(0)
            }
            if(data.remaining_amount < data.emi){
                setEmi(data.remaining_amount)
                setPaidAmount(data.remaining_amount);
            }



        })

    }

    const createLoanPayment = async(e)=>{
        e.preventDefault();
        const isConfirm = await Swal.fire({
            title: 'Are you sure want to pay?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Pay'
          }).then((result) => {
            return result.isConfirmed
          });
          if(!isConfirm){
            return;
          }
        const formdata = new FormData();
        formdata.append('loan_id',loanDetail.id)
        formdata.append('paid_amount',paid_amount)
        formdata.append('loanbased',loanbased)

        axios.get('/sanctum/csrf-cookie').then(response => {
           axios.post('/api/saveloandetail',formdata).then(({data})=>{
            Swal.fire({
              icon:"success",
              text:data.message
            })
            fetchLoanDetail()
          }).catch(({respone})=>{

          })
        })
    }

    return (
        <>
        {loanDetail.length != "0" &&
        <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <h4 className="title">Loan Installation</h4>
          <form onSubmit={createLoanPayment}>
            <div className="loan-form">
              <div className="section">
                {/* <small>Loan Installation</small> */}
                <div className="row ">
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Customer Name</label>
                      <input
                        type="text"
                        name="name"
                        value={customerName}
                        placeholder="Full Name"
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label> Loan Amount</label>
                      <input
                        type="text"
                        name="loan_amount"
                        value={loanDetail.loan_amount}
                        placeholder="Loan Amount"
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Total Loan Amount including Intrest</label>
                      <input
                        type="text"
                        name="loan_amount"
                        value={loanDetail.total_loan_amount}
                        placeholder="Loan Amount"
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Loan Purpose</label>
                      <input
                        type="text"
                        name="loan_purpose"
                        value={loanDetail.loan_purpose}
                        placeholder="Loan Purpose"
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Installation Type</label>
                      <input
                        type="text"
                        value={loanDetail.installation_type}
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Next Installation Date</label>
                      <input
                        type="text"
                        value={loanDetail.loan_installation_date.next_installation_nep_date}
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Total Paid</label>
                      <input
                        type="text"
                        value={total_paid}

                        className="form-control"
                        readOnly
                      />

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Total Remaining</label>
                      <input
                        type="text"
                        value={total_remain}

                        className="form-control"
                        readOnly
                      />

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Amount To Pay</label>
                      <input
                        type="number"

                        value={emi}
                        onChange={(event)=>{
                            setPaidAmount(event.target.value)
                            setEmi(event.target.value)
                        }}
                        placeholder="Loan Purpose"
                        className="form-control"

                      />

                    </div>
                  </div>
                </div>

                <div className="btn-group text-center d-block">
                    {loanDetail.remaining_amount <= 1 ? (
                        <button className="cl-btn" disabled>No Remaining</button>
                    ):(
                        <button className="cl-btn" >Make Payment</button>
                    )}

                </div>
                {loan_payment_details?.map((item, index) => {
                    Moment.locale('en');
                    var dt = item.created_at;
                  return (
                    <li>Amount {item.paid_amount} paid on {Moment(dt).format('d MMM Y')} </li>
                  );
                })}

              </div>
             </div>
           </form>
          </div>
        </div>
       }

        </>
    )
}
