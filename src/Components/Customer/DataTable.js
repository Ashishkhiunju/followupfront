import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Paginator from "../DataTable/Paginator";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactWhatsapp from 'react-whatsapp';

const SORT_ASC = "asc";
const SORT_DESC = "desc";

const DataTable = ({ columns, fetchUrl }) => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(columns[0]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleSort = (column) => {
    if (column === sortColumn) {
      sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC);
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

  const handleSearch = useRef(
    debounce((query) => {
      setSearch(query);
      setCurrentPage(1);
      setSortOrder(SORT_ASC);
      setSortColumn(columns[0]);
    }, 500)
  ).current;

  const handlePerPage = (perPage) => {
    setCurrentPage(1);
    setPerPage(perPage);
  };

  const loaderStyle = { width: "4rem", height: "4rem" };

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true)
      const params = {
        search,
        sort_field: sortColumn,
        sort_order: sortOrder,
        per_page: perPage,
        page: currentPage,
      };
      const { data } = await axios(fetchUrl, { params });
      setData(data.data);
      setPagination(data.meta);
      // setTimeout(() => {
      //     setLoading(false)
      // }, 100)
    };

    fetchData();
  }, [perPage, sortColumn, sortOrder, search, currentPage]);

  return (
    <div>
      {/* Search per page starts */}
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Search..."
              type="search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <label className="mt-2 me-2">Per page:</label>
            <select
              className="form-select"
              value={perPage}
              onChange={(e) => handlePerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
      {/* Search per page ends  */}
      <div className="tableFixHead">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              {columns.map((column) => {
                return (
                  <th key={column} onClick={(e) => handleSort(column)}>
                    {column.toUpperCase().replace("_", " ")}
                    {column === sortColumn ? (
                      <span>
                        {sortOrder === SORT_ASC ? (
                          <i
                            className="ms-1 fa fa-arrow-up"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i
                            className="ms-1 fa fa-arrow-down"
                            aria-hidden="true"
                          ></i>
                        )}
                      </span>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>No items found</td>
              </tr>
            ) : (
              ""
            )}

            {!loading ? (
              data.map((d, index) => {
                return (
                  <tr key={index}>
                    {columns.map((column) => {
                      if (column === "whatsapp") {
                        return(
                            <td><ReactWhatsapp number={d.phone} style={{border:'none'}}><i class="fa fa-whatsapp" style={{color:'green'}}/></ReactWhatsapp></td>
                        )

                      }
                      if (column === "action") {
                        return (
                          <td key={column}>
                            <div class="row">
                              <div class="col-md-2">
                                <a
                                  class="fa fa-edit"
                                  title="Edit"
                                  href={"/customer-edit/" + d.id}
                                ></a>
                              </div>
                              <div class="col-md-2">
                                <a
                                  class="fa fa-eye"
                                  title="View Loan Detail"
                                  href={"/customer-loandetail/" + d.id}
                                ></a>
                              </div>
                            </div>
                          </td>
                        );
                      } else {
                        return <td key={column}>{d[column]}</td>;
                      }
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border"
                      style={loaderStyle}
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && !loading ? (
        <div className="mt-2">
          <Paginator
            pagination={pagination}
            pageChanged={(page) => setCurrentPage(page)}
            totalItems={data.length}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;
