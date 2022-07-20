import {Link} from 'react-router-dom';
import React,{useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const CustomerForm = ()=>{
 const[name,setName]=useState('');
 const[address,setAddress]=useState('');
 const[phone,setPhone]=useState('');
 const[email,setEmail]=useState('');
 const[company_name,setCompanyName]=useState('');
 const[citizen_ship_no,setCitizenShipNo]=useState('');
 const[image,setImage]=useState();
 const[company_address,setCompanyAddress]=useState('');
const[validationError,setValidationError]=useState({});

 const changeHandler = (e)=>{
    setImage(e.target.files[0]);
 }

 const submitCustomer = async(e)=>{
   e.preventDefault();
   const formdata = new FormData();
   formdata.append('name',name);
   formdata.append('address',address);
   formdata.append('phone',phone);
   formdata.append('email',email);
   formdata.append('company_name',company_name);
   formdata.append('citizen_ship_no',citizen_ship_no);
   formdata.append('company_address',company_address);
   formdata.append('image',image);

   await axios.post('/api/customers',formdata).then(({data})=>{
    Swal.fire({
        icon:'success',
        text:data.message
    })
   }).catch(({response})=>{

    if(response.status ===422){

        setValidationError(response.data.errors)

      }else{
        Swal.fire({
          icon:"error",
          text:response.data.message
        })
      }
    })
 }
return (
    <div className="same-gap">
    <div className="loan-detail-form cl-form">

    <div class="row">
            <div className="btn-header-title d-flex">
                <h4 className="title">Add Customer</h4>
                <div className="btn-group">
                    <Link to={`/list-customer`} className='btn btn-primary'>
                        List
                    </Link>
                </div>
            </div>

        </div>
      <form onSubmit={submitCustomer}>
        <div className="loan-form">
          <div className="section">
            <small>Personal Information</small>
            <div className="row ">
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"

                    onChange = {(event)=>{
                      setName(event.target.value)
                    }}
                    placeholder="Full Name"
                    className="form-control"
                  />
                  {validationError.name != null && (
                    <p className="alert text-danger">{validationError.name}</p>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="address"

                    onChange = {(event)=>{
                      setAddress(event.target.value)
                    }}

                    placeholder="Address"
                    className="form-control"
                  />
                  {validationError.address != null && (
                    <p className="alert text-danger">{validationError.address}</p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"

                    onChange = {(event)=>{
                      setPhone(event.target.value)
                    }}
                    placeholder="Phone No"
                    className="form-control"
                  />
                  {validationError.phone != null && (
                    <p className="alert text-danger">{validationError.phone}</p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="email"

                    onChange = {(event)=>{
                      setEmail(event.target.value)
                    }}
                    placeholder="Email Id"
                    className="form-control"
                  />
                  {validationError.email != null && (
                    <p className="alert text-danger">{validationError.email}</p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="company_name"

                    onChange = {(event)=>{
                      setCompanyName(event.target.value)
                    }}
                    placeholder="Company Name"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="company_address"

                    onChange = {(event)=>{
                      setCompanyAddress(event.target.value)
                    }}

                    placeholder="Company Address"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="citizen_ship_no"

                    onChange = {(event)=>{
                      setCitizenShipNo(event.target.value)
                    }}

                    placeholder="Citizen Ship No"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="file"
                    name="image"
                    onChange={changeHandler}
                    placeholder="Company Name"
                    className="form-control"
                  />
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
