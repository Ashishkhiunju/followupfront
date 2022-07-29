import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import LoanDataTable from './LoanDataTable';
import "../DataTable/DataTable.scss";

export const CustomerLoanDetail = (props) => {
    const {id} = useParams();

    // const[loanDetail,setLoanDetail]=useState([])
    useEffect(()=>{
        document.title = 'Customer Loan Detail'
        // fetchCustomerLoanDetail()
    },[])

    // const fetchCustomerLoanDetail = async(e)=>{
    //     await axios.get(`/api/customerloandetail/${id}`).then(({data})=>{
    //         console.log(data);
    //         setLoanDetail(data);
    //     }).catch(({response})=>{

    //     })
    // }

    // const rows = loanDetail.map((items,index)=>{
    //   console.log(items)
    //     return ({
    //         'loan_amount':items.loan_amount,
    //         'loan_type':items.loan_type.type,
    //         'loan_duration':items.loan_duration,
    //         'loan_purpose':items.loan_purpose,
    //         'installation_type':items.installation_type,
    //         'recommend_to':items.recommend_to,
    //         'issue_date':items.issue_date,
    //         'due_date':items.due_date,
    //         'action':<div class="row">
    //                     <div class="col-md-2">
    //                         <Link to={`/customer-loandetail-all/${items.id}`} className='fa fa-eye' title="View Loan Detail"></Link>
    //                     </div>
    //                     <div class="col-md-2">
    //                         <Link to={`/customer-loandetail-payment/${items.id}`} className='fa fa-money' title="Pay"></Link>
    //                     </div>
    //                 </div>
    //     })
    // })
    // const data = {
    //     columns:[
    //         {
    //             label: 'Loan Amount',
    //             field: 'loan_amount',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Loan Type',
    //             field: 'loan_type',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Loan Duration',
    //             field: 'loan_duration',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Installation Type',
    //             field: 'installation_type',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Recommend To',
    //             field: 'recommend_to',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Issue Date',
    //             field: 'issue_date',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Due Date',
    //             field: 'due_date',
    //             sort: 'asc',
    //             width: 150
    //           },
    //           {
    //             label: 'Action',
    //             field: 'action',
    //             sort: 'asc',
    //             width: 150
    //           },
    //     ],
    //     rows:rows
    // };

return(

    <div className="card">
            {/* <div className="card-header">Users</div> */}
            <div className="card-body">
                <LoanDataTable
                    fetchUrl={"/api/customerloandetail/"+id}
                    columns={["loan_amount", "loan_type", "loan_duration", "installation_type","recommend_to","issue_date",'due_date',"action"]}
                ></LoanDataTable>
            </div>
        </div>
//     <MDBDataTable
//     striped
//     bordered
//     // small
//     data={data}

//   />
)
}
