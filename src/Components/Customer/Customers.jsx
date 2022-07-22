import DataTable from "./DataTable";
import "../DataTable/DataTable.scss";

export const Customers = ()=>{
    return (
        <div className="card">
            {/* <div className="card-header">Users</div> */}
            <div className="card-body">
                <DataTable
                    fetchUrl="/api/allcustomers"
                    columns={["name", "address", "email", "citizen_ship_no","company_name","phone","action"]}
                ></DataTable>
            </div>
        </div>
    )
}
