import UserLoanDataTable from "./UserLoanDataTable";
import "../DataTable/DataTable.scss";
import { useParams,Link } from "react-router-dom";

export const UsersAllLoan = () => {
  const { id } = useParams();
  var url = "api/users-loan/" + id;

  return (
    <>
      <div className="card">
        <button>
        <Link to='/users-loan'>Select User</Link>
        </button>
      </div>
      <div className="card" id="replaceTable">
        {/* <div className="card-header">Users</div> */}
        <div className="card-body">
          <UserLoanDataTable
            fetchUrl={url}
            columns={["name", "installation_type", "loan_amount", "action"]}
          ></UserLoanDataTable>
        </div>
      </div>
    </>
  );
};
