import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = (props)=>{
    // const [registerInput, setRegister] = useState({
    //     name:"",
    //     email:"",
    //     password:"",
    // })
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

   

    const registerSubmit = (e)=>{
        e.preventDefault();
        // const data={
        //     name:registerInput.name,
        //     email:registerInput.email,
        //     password:registerInput.password,
        // }
        const formdata = new FormData();
        formdata.append('name',name)
        formdata.append('email',email)
        formdata.append('password',password)
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`,formdata).then(({res})=>{
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_name',res.data.username);
                navigate('/');
            })
        })
    }
    return(
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div  className="card">
                            <div className="card-header">
                            <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" onChange={(e)=>{
                                            setName(e.target.value)
                                        }}  ></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" onChange={(e)=>{
                                            setEmail(e.target.value)
                                        }}></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="text" onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

