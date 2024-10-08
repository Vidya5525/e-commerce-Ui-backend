import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import MetaData from "../layouts/MetaData.jsx";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar.jsx";
import { getAllUsers,deleteUser } from "../../Redux/userReducer.js";
import { resetState,clearError } from "../../Redux/productReducer.js";
import { useNavigate } from "react-router-dom";

const UsersList = ({ history }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
  
    const { error, users } = useSelector((state) => state.user);
  
    const {error: deleteError,isDeleted,message,} = useSelector((state) => state.user);
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
    };
  
    useEffect(() => {
      if (error) {
        dispatch(clearError());
      }
  
      if (deleteError) {
        dispatch(clearError());
      }
  
      if (isDeleted) {
        navigate("/admin/users");
        dispatch(resetState());
      }
  
      dispatch(getAllUsers());
    }, [dispatch, error, deleteError, history, isDeleted,]);
  
    const columns = [
      { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
  
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },
  
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "redColor";
        },
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });
  
    return (
      <Fragment>
        <MetaData title={`ALL USERS - Admin`} />
  
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL USERS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    );
  };

export default UsersList;