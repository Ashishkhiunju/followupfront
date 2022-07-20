import "./Form.scss";
export const LoanFollowForm = () => {
  return (
    <>
      <div className="follow-form container">
        <form>
          <div className="loan-form">
            <h4 className="title">Loan Follow up</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Account Number</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Loan Type</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Follow up Type</label>
                  <select className="form-control">
                    <option></option>
                    <option></option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Next Follow up Date</label>
                  <select className="form-control">
                    <option></option>
                    <option></option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Loanee Response / Remarks</label>
                  <textarea className="form-control"></textarea>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Letter No.</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Chalani No.</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Letter Sent Through</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="follow-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Followup Type</th>
                  <th>Followup Date</th>
                  <th>Sent Through</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Phone Call</td>
                  <td>2079-10-1</td>
                  <td>Phone</td>
                  <td>Maturty Date agadi nai clear garxu</td>
                </tr>
                <tr>
                  <td>Phone Call</td>
                  <td>2079-10-1</td>
                  <td>Phone</td>
                  <td>Maturty Date agadi nai clear garxu</td>
                </tr>
                <tr>
                  <td>Phone Call</td>
                  <td>2079-10-1</td>
                  <td>Phone</td>
                  <td>Maturty Date agadi nai clear garxu</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};
