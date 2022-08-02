import "./Login.scss";
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Login = (props)=>{


    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Login');

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userRole,setUserRole] = useState()
    const loginSubmit = (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('email',email)
        formdata.append('password',password)
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login',formdata).then(({data})=>{
                // alert(data.token);

                // return;
              if(data.status == 200){
                var session_time = 60*60000 //min
                let newDate = new Date()
                let time = newDate.getTime() + session_time;
                localStorage.setItem('auth_token',data.token);
                localStorage.setItem('auth_name',data.username);
                localStorage.setItem('role',data.role);
                localStorage.setItem('auth_image',data.image);
                localStorage.setItem('ttl', time);

                window.location.reload();
              }else{
                Swal.fire({
                    icon:'error',
                    text:data.message
                })
                setButtonText('Login')
              }


            }).catch(({response})=>{
                Swal.fire({
                    icon:'error',
                    text:response.data.message

                })
                setButtonText('Login')
            })
        })
    }

    useEffect(() => {
        document.title = "Login";
      }, []);

      function handleClickLogin() {

        setButtonText('Please wait...');
      }

    return(
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div  className="card login-form">
                            <div className="card-header">
                            <h4 className="card-title">Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>

                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" onChange={(e)=>{
                                            setEmail(e.target.value)
                                        }} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }} className="form-control"></input>
                                    </div>
                                        <button type="submit" onClick={handleClickLogin} className="btn cl-btn">{buttonText}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
