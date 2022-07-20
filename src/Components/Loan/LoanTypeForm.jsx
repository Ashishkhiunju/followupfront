import axios from "axios";
import React,{useState,useEffect} from "react";
import Swal from 'sweetalert2';
import {Link } from 'react-router-dom';

export const LoanTypeForm = ()=>{

    useEffect(()=>{
        document.title = 'Loan Type'
    },[])

    const[title,setTitle]=useState('');

    const createLoanType = (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('title',title);
        axios.post('api/loan-type',formdata).then(({data})=>{
            Swal.fire({
                icon:'success',
                text:data.message
            })
        }).catch(({data})=>{

        })
    }

    return(
        <div className="same-gap">
        <div className="loan-detail-form cl-form">

            <div class="row">
                <div className="btn-header-title d-flex">
                    <h4 className="title">Add Loan Type</h4>
                    <div className="btn-group">
                        <Link to={`/loan-type-list`} className='btn btn-primary'>
                            List
                        </Link>
                     </div>
                </div>

            </div>
          <form onSubmit={createLoanType}>
            <div className="loan-form">
              <div className="section">

                <div className="row ">

                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Loan Type</label>
                      <input
                        type="text"
                        name="phone"

                        onChange = {(event)=>{
                          setTitle(event.target.value)
                        }}
                        placeholder="Loan Type"
                        className="form-control"
                      />
                      {/* {validationError.phone != null && (
                        <p className="alert text-danger">{validationError.phone}</p>
                      )} */}
                    </div>
                  </div>



                </div>
              </div>
              <div className="btn-group text-center d-block">
                    <button className="cl-btn">Save Details</button>
                  </div>
            </div>
          </form>
        </div>
      </div>
    )
}
