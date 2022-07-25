import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import {useNavigate,useParams} from 'react-router-dom';

export const UserEdit = ()=>{
    const {id} = useParams();

    const[name,setName]=useState('');
    const[address,setAddress]=useState('');
    const[email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[password,setPassword]=useState('');
    const[confirm_password,setConfirmPassword]=useState('');
    const[image,setImage]=useState('');
    const[role_id,setRoleId]=useState('');
    const[validationError,setValidationError] = useState({})
    const [selectedFile, setSelectedFile] = useState()

    const[preview,setPreview]=useState('');

    const changeUserImage = (e)=>{
        setImage(null)
        setSelectedFile(e.target.files[0])
    }

    const changeConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);

    }

    useEffect(()=>{
        fetchUserDetail();
    },[])

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }else{
            const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
        }


    }, [selectedFile])

    const fetchUserDetail = (e)=>{
        axios.get(`/api/user/`+id).then(({data})=>{
            setName(data.name)
            setAddress(data.address)
            setEmail(data.email)
            setPhone(data.phone)
            setRoleId(data.role_id)
           setImage(data.image)
        })
    }

    const updateUserInfo = (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('_method', 'PATCH');
        formdata.append('name',name)
        formdata.append('address',address)
        formdata.append('email',email)
        formdata.append('phone',phone)
        formdata.append('role_id',role_id)
        formdata.append('image',selectedFile != null ? selectedFile : image)

        axios.post('/api/user/'+id,formdata).then(({data})=>{
            Swal.fire({
                icon:'success',
                text:data.message
            })
        })
    }

    const changePassword = (e)=>{
        e.preventDefault();
       const formdata = new FormData();
       formdata.append('password',password)
       formdata.append('confirm_password',confirm_password)
       axios.post('/api/updatepassword/'+id,formdata).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
       }).catch(({response})=>{
        setValidationError(response.data.errors);
       })

    }

    return(
    <div className="same-gap">
    <div className="loan-detail-form cl-form">
        <h4 className="title">Edit User </h4>
        <form onSubmit={updateUserInfo}>
        <div className="loan-form">
            <div className="section">

            <div className="row ">
                <div className="col-md-4">
                <div className="form-group">
                <label>Full Name</label>
                    <input
                    type="text"
                    value={name}

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
                    value={email}

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
                    value={phone}

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
                    value={address}

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
                    <select className='form-control' value={role_id} onChange={(e)=>{
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
            </div>
            </div>
            {image != null &&
            <div class="form-group">

                <img  height="100" src={window.baseurl+`/storage/`+image} />
            </div>
             }


            <img  height="100" src={preview} />

            <div className="btn-group text-center d-block">
                <button className="cl-btn">Save Details</button>
                </div>
            </div>
        </form>
        <form onSubmit={changePassword}>
          <div className="loan-form">
            <div className="section">
                <small>Set Password (Incase if you want to change password)</small>
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
             </div>
             <div className="btn-group text-center d-block">
                <button className="cl-btn">Save Password</button>
                </div>

           </form>
        </div>
    </div>

    )
}
