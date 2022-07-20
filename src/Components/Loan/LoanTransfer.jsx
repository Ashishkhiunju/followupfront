import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

export const LoanTransfer = ()=>{
    const[userOptions,setUserOptions] = useState({});
    const[loanOptions,setLoanOptions] = useState({});
    const[user_id,setUserId]=useState("");
    const[loan_id,setLoanId]=useState("");
    const[transfer_to,setTransferTo]=useState("");


    useEffect(()=>{
        document.title = 'Loan Transfer'
        fetchusers();
    },[])

    const fetchusers = ()=>{
        axios.get(`/api/user/list`).then(({data})=>{
            setUserOptions(data)
        })
    }
    const changeUser = (e)=>{
        setUserId(e.value)
        setLoanId("")
        axios.get(`/api/user-related/loan`,{params:{user_id:e.value}}).then(({data})=>{
            setLoanOptions(data);
        })
    }
    const changeLoanOption = (e)=>{
        setLoanId(e.value)
    }

    const changeTransferOption = (e)=>{
        setTransferTo(e.value)
    }

    const createTransfer = async(e)=>{
        e.preventDefault();
        const isConfirm = await Swal.fire({
            title: 'Are you sure you want to Transfer',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Transfer'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            e.target.checked = false;
            return;
          }

          const formdata = new FormData();
          formdata.append('user_id',user_id);
          formdata.append('loan_id',loan_id);
          formdata.append('transfer_to',transfer_to);

          await axios.post(`/api/user/transferLoan`,formdata).then(({data})=>{
            Swal.fire({
                icon:'success',
                text:data.message,
            })
          });
    }

    return (
        <div className="same-gap">
        <div className="loan-detail-form cl-form">

          <form onSubmit={createTransfer}>
            <div className="loan-form">
              <div className="section">

                <div className="row ">
                  <div className="col-md-6">
                    <div className="form-group">
                    <label>Select User</label>
                    <Select

                      options={userOptions}
                      onChange={changeUser}
                       >

                      </Select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                    <label>Select Loan</label>
                    <Select

                      options={loanOptions}
                      onChange={changeLoanOption}
                       >

                      </Select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                    <label>Transfer To</label>
                    <Select

                      options={userOptions}
                      onChange={changeTransferOption}
                       >

                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-group text-center d-block">
                    <button className="cl-btn">Transfer</button>
                  </div>
            </div>
           </form>
           </div>
        </div>
    )
}
