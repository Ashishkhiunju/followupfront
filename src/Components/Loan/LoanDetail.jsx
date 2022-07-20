// import "../Maincard/Table/Table.scss";
import "./Loan.scss";
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export const LoanDetail = ()=>{
    const {id} = useParams();
    const [loandetail,setLoanDetail] = useState({});

    useEffect(()=>{
        document.title = 'Loan Detail'
        fetchloan();
        },[])

        const fetchloan = (e)=>{

            axios.get(`/api/view-loan-alldetails/${id}`).then(({data})=>{
                if(data.status){
                    Swal.fire({
                        icon:"error",
                        text:data.message
                    })
                }else{
                    setLoanDetail(data);
                }

            })
        }
        // console.log(loandetail);
    return(
        <div className="same-gap">
            <div className="loan-detail-form cl-form">


                <div className='card customer-card'>
                    <div className="card-header">
                        <h4 className="card-title">Customer Detail</h4>

                    </div>

                    <div className='card-body row'>
                    {loandetail?.customer &&
                     <ul className='clear'>
                         <li> <strong>Name:</strong> {loandetail?.customer?.name}</li>
                         <li> <strong>Email:</strong> {loandetail?.customer?.email}</li>
                         <li> <strong>Phone:</strong> {loandetail?.customer?.phone}</li>
                         <li> <strong>Address:</strong> {loandetail?.customer?.address}</li>
                         <li> <strong>Company Name:</strong> {loandetail?.customer?.company_name}</li>
                         <li> <strong>Citizen No:</strong> {loandetail?.customer?.citizen_ship_no}</li>

                     </ul>

                    }

                    </div>


                </div>
                <div className='card customer-card'>
                    <div className='card-header'>
                            <h4 className="card-title">Loan Detail</h4>
                    </div>
                    <div className='card-body'>

                            {loandetail &&
                                  <ul className='clear'>
                                  <li> <strong>Purpose:</strong> {loandetail?.loan_purpose}</li>
                                  <li><strong>Amount:</strong> {loandetail?.loan_amount}</li>
                                  <li><strong>Paid Amount:</strong> {loandetail?.paid_amount}</li>
                                  <li><strong> Remaining Amount:</strong> {loandetail?.remaining_amount}</li>
                                  <li><strong>Installation Type: </strong>{loandetail?.installation_type}</li>
                                  <li><strong> Loan Type:</strong> {loandetail?.loan_type?.type}</li>
                                  <li> <strong>Issue Date English: </strong>{loandetail?.issue_date_eng}</li>
                                  <li><strong>Issue Date Nepali:</strong> {loandetail?.issue_date_nep}</li>
                                  <li> <strong>Due Date English:</strong> {loandetail?.due_date_eng}</li>
                                  <li><strong>Due Date Nepali: </strong>{loandetail?.due_date_nep}</li>
                                  <li><strong>Accured Intrest: </strong><NumberFormat
                                    value={ loandetail?.intrest_amount}
                                    className="foo"
                                    displayType={'text'}
                                    prefix="Rs "
                                    thousandSeparator={true}
                                    decimalScale="2"
                                    renderText={(value, props) => <span {...props}>{value}</span>}
                                    />
                                  </li>
                              </ul>
                            }
                    </div>
                </div>
                <div className='card customer-card'>
                    <div className='card-header'>
                            <h4 className="card-title">Loan Payments</h4>
                    </div>
                    <div className='card-body'>
                        <div className="cl-table">
                        <table className=" table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Paid Date</th>
                                            <th>Paid Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loandetail?.loan_details?.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{item.paid_date}</td>
                                                    <td>{item.paid_amount}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>

                                </table>
                        </div>

                    </div>
                </div>
                <div className='card customer-card'>
                    <div className='card-header'>
                        <h4 className="card-title">Loan Contacts</h4>
                    </div>
                    <div className='card-body'>
                        <div className="cl-table">
                        <table className=" table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Installation Date</th>
                                            <th>Contacted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loandetail?.loan_contacts?.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{item.installation_date}</td>
                                                    <td>{item.contacted == '1' ? "Yes":"NO" }</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>

                                </table>
                        </div>

                    </div>
                </div>
                <div className='card customer-card'>
                    <div className='card-header'>
                        <h4 className="card-title">Loan Reminder</h4>
                    </div>
                    <div className='card-body'>
                        <div className="cl-table">
                        <table className=" table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Installation Date</th>
                                            <th>Reminder Date</th>
                                            <th>Reminder Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loandetail?.loan_reminders?.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{item.installation_date}</td>
                                                    <td>{item.reminder_date_eng}</td>
                                                    <td>{item.reminder_detail}</td>

                                                </tr>
                                            )
                                        })}

                                    </tbody>

                                </table>
                        </div>

                    </div>
                </div>
                <div className='card customer-card'>
                    <div className='card-header'>
                        <h4 className="card-title">Loan Images</h4>
                    </div>
                    <div className='card-body'>
                        <div class="row">
                        {loandetail?.loan_images?.map((item,index)=>{
                            return(
                                <div class="col-md-4">
                                    <Zoom>
                                    <img width="200px" height="200px" src={window.baseurl+`/storage/${item.image}`} />
                                    </Zoom>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
