import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const range = [10, 50, 100];

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:5000/user?limit=${limit}&search=${search}&page=${page}`
    );
    setPage(response.data.page);
    setUser(response.data.result);
    setTotalPage(response.data.totalPage);
    setLimit(response.data.limit);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setSearch(query);
  };

  useEffect(() => {
    getData();
  }, [page, search, limit]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          <form onSubmit={searchData}>
            <div className="input-group">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search..."
                className="form-control"
              />
              <div style={{ width: "80px", marginLeft: "20px" }}>
                <select
                  className="form-select"
                  onChange={(item) => setLimit(item.target.value)}
                >
                  {range.map((e, index) => (
                    <option value={e} key={index}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th className="bg-primary text-light">ID</th>
                <th className="bg-primary text-light">Name</th>
                <th className="bg-primary text-light">Email</th>
                <th className="bg-primary text-light">Gender</th>
              </tr>
            </thead>
            <tbody>
              {user.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-end"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
