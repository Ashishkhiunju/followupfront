import axios from 'axios';
import React,{useState} from 'react';
import Swal from 'sweetalert2';


export const UserForm = (props)=>{

    const[name,setName]=useState('');
    const[address,setAddress]=useState('');
    const[email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[password,setPassword]=useState('');
    const[confirm_password,setConfirmPassword]=useState('');
    const[image,setImage]=useState('');
    const[role_id,setRoleId]=useState('');
    const[validationError,setValidationError] = useState({})
    const[previewImage,setPreviewImage] = useState();


    const changeUserImage = (e)=>{
        setImage(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]));

    }

    const changeConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);

    }

    const userSubmit = (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name',name)
        formdata.append('address',address)
        formdata.append('email',email)
        formdata.append('phone',phone)
        formdata.append('password',password)
        formdata.append('confirm_password',confirm_password)
        formdata.append('image',image)
        formdata.append('role_id',role_id)

        axios.post('/api/user',formdata).then(({data})=>{
            Swal.fire({
                icon:'success',
                text:data.message
            })
        }).catch(({response})=>{

            setValidationError(response.data.errors);
        })

    }


    return(
        <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <h4 className="title">Add User </h4>
          <form onSubmit={userSubmit}>
            <div className="loan-form">
              <div className="section">

                <div className="row ">
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Full Name</label>
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
                    <label>Email</label>
                      <input
                        type="text"
                        name="email"

                        onChange = {(event)=>{
                          setEmail(event.target.value)
                        }}
                        placeholder="Email"
                        className="form-control"
                      />
                      {validationError.email != null && (
                        <p className="alert text-danger">{validationError.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Phone</label>
                      <input
                        type="number"
                        name="phone"

                        onChange = {(event)=>{
                          setPhone(event.target.value)
                        }}
                        placeholder="Phone"
                        className="form-control"
                      />
                      {validationError.phone != null && (
                        <p className="alert text-danger">{validationError.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Address</label>
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
                    <label>Role</label>
                      <select className='form-control' name="role_id" onChange={(e)=>{
                        setRoleId(e.target.value);
                      }}>
                        <option value="0">--Select--</option>
                        <option value="2">Staff</option>
                        <option value="1">Admin</option>

                      </select>
                      {validationError.role_id != null && (
                        <p className="alert text-danger">{validationError.role_id}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={changeUserImage}
                        placeholder="Company Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  {previewImage &&
                    <img height="100" style={{width: '100px'}} src={previewImage}/>
                  }
                </div>
               </div>
               <div className="section">
                <small>Set Password</small>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Password</label>
                      <input
                        type="text"
                        name="password"

                        onChange = {(event)=>{
                          setPassword(event.target.value)
                        }}
                        placeholder="Password"
                        className="form-control"
                      />
                      {validationError.password != null && (
                        <p className="alert text-danger">{validationError.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Confirm Password</label>
                      <input
                        type="text"
                        name="confirm_password"

                        onChange = {changeConfirmPassword}
                        placeholder="Confirm Password"
                        className="form-control"
                      />
                      {validationError.confirm_password != null && (
                        <p className="alert text-danger">{validationError.confirm_password}</p>
                      )}
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
