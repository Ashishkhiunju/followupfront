import { InfoCard } from "../Components/Maincard/InfoCard/Info-card";
import {LoanList} from "../Components/Loan/LoanList";
import { Table } from "../Components/Maincard/Table/Table";

export const Home = () => {
  return (
    <>
      <InfoCard />
      <LoanList />
      {/* <Table hideUpdate={false} /> */}
    </>
  );
};
