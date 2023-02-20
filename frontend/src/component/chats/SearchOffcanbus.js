import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, postConfigureToken } from "../../api/api";
import { createNewChat } from "../../app/features/chatSlice";

const SearchOffcanbus = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  // search user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.dismiss();
      toast.error("please enter something before search");
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        toast.dismiss();
        setLoading(true);

        const res = await fetch(`${BASE_URL}/user?search=${search}`, config);
        const data = await res.json();

        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast.dismiss();
        toast.error("failed to search");
      }
    }
  };

  const createChat = async (userID) => {
    try {
      const res = await fetch(
        `${BASE_URL}/chats`,
        postConfigureToken(token, { userID })
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(createNewChat(data));
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        className="btn d-flex align-items-center text-white border-0 rounded-circle"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <FaSearch />
        <span className="ms-2 d-lg-block d-none">Search User</span>
      </button>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Search User
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {loading && <h5 className="mt-4 text-center">Loading...</h5>}

          {searchResult &&
            searchResult.map((user) => {
              const { _id, name, picture, email } = user;

              return (
                <button
                  key={_id}
                  className="btn btn-outline-dark text-start border-0 w-100 mt-4 p-2 d-flex shadow rounded "
                  onClick={() => createChat(_id)}
                  data-bs-dismiss="offcanvas"
                >
                  <div className="search-user-image rounded-circle ">
                    <img
                      className="h-100 w-100 rounded-circle"
                      src={picture}
                      alt=""
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="p-0 m-0">{name}</h6>
                    <p className="p-0 m-0 mt-1 ">{email}</p>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchOffcanbus;
