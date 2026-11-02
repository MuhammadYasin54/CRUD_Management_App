"use client"
import axios from "axios";
import { useState, useEffect } from "react";

import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const UserPage = () =>{
const router = useRouter();

  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    role: ""
  })
  const [message, setMessage] = useState("")
   const [users, setUsers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [targetKey, setTargetkey] = useState <string | number >("")
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0)


  const fetchAllUsers = async () => { 
    
  
    try {
      let apiUrl = "http://localhost:5050/user/fetch";
      let res = await axios({
        url: apiUrl,
        method: "GET",
        
      });
     
      const { status, data } = res;

      if (status == 200) {
        setUsers(res.data?.data);
  
      }
      
    }

    catch (error:any) {
      console.log("FETCH ERROR:", error);
    console.log("ERROR RESPONSE:", error.response?.data);

      const {status} = error.response;

      if(status == 400 )setUsers([])
      
    };
  };
const deleteUser = async (id: string) => {
  console.log("User ID:", id)
    try {
      let apiUrl = `http://localhost:5050/user/delete/${id}`;
      let res = await axios({
        url: apiUrl,
        method: "DELETE",
       
      });
      setMessage("User Deleted Successfully..!")
      console.log(res);
      const { status, data } = res;

      if (status == 200) {
        await fetchUsersPerPage();
      }
    }

    catch (error) {
      console.log('Err while Deleting user:', error);
      setMessage("Failed to Delete User..!")
    }
  }

  const fetchUsersPerPage = async () =>{
    try {
      
      let apiUrl = "http://localhost:5050/user/fetch/perpage";
      let res = await axios({
        url: apiUrl,
        method: "GET",
        params : {
          pageVal : currentPage,
          limitVal : limit
        }
        
      });
     
      const { status, data } = res;

      if (status == 200) {
        
        setUsers(res.data?.data.users || 0);
        setTotalUsers(res?.data?.data.count || 0)
      }
    } catch (error:any) {
            console.log("FETCH ERROR:", error);
    console.log("ERROR RESPONSE:", error.response?.data);

      const {status} = error.response;

      if(status == 400 )setUsers([])
        setTotalUsers(0)
      
    };
  };


const deleteAllUser = async () =>{
 
    try {
        let apiUrl = "http://localhost:5050/user/deleteall"
      
        let res = await axios({
          url : apiUrl,
          method: "DELETE",
        })
        
        console.log(res.data);
        const {status, data} = res.data
        if(res.status === 200){
        
            setUsers([])
      setMessage("All Users Deleted Successfully..!")
        }
    } catch (error) {
      console.log("Error While Deleting All Users", error)
      setMessage("Failed to Delete All Users..!")
    }
  }
  const editUser = (index: number) =>{
console.log("Index:", index);
  setIsEditing(true);
  setNewUser(users[index])
  setTargetkey(users[index]._id)
}

  const updateUser = async () => {

    try {
      let apiUrl = `http://localhost:5050/user/update`;
      let res = await axios({
        url: apiUrl,
        method: "PUT",
       data: {
       uid: targetKey,
  updatedName: newUser.userName,
  updatedPassword: newUser.password,
  updatedEmail: newUser.email,
                    updatedRole: newUser.role

       }
      });
      setMessage("User Updated Successfully..!")
    
      console.log(res);
      const { status, data } = res;

      if (status == 200) {
        await fetchUsersPerPage();
          setIsEditing(false)
      setNewUser({
          userName: "",
          email:"",
          password: "",
          role: "",
        })


      console.log(data)
        
      }
    }

    catch (error) {
      console.log('Err while updating user:', error);
      setMessage("Failed to Update User..!")
    }
  }

  useEffect(() => {
 
    fetchUsersPerPage();
  }, [currentPage, limit]);

  const saveAllUsers = async ()=>{
      if(newUser.userName=="" || newUser.email == "" || newUser.password == "" || newUser.role == ""){
        alert("Please fill all fields")
          setNewUser({
          userName: "",
          email:"",
          password: "",
          role: "",
        })
        return;
      }
    try {
      let apiUrl = "http://localhost:5050/user/save"
      let res = await axios ({
        url: apiUrl,
        method : "POST",
        data: {
          userName: newUser.userName,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role
        }
      })
      console.log(res);
      
      const {status, data} = res
      if(status==200) {
        console.log("User Added Successfully...!", data)
        await fetchUsersPerPage();
        setNewUser({
          userName: "",
          email:"",
          password: "",
          role: "",
        })
      }

    } catch (error:any) {
      console.log("Error while Adding Users:", error)
      if(error.response?.status === 400){
        setMessage(error.response.data.message)
         setNewUser({
          userName: "",
          email:"",
          password: "",
          role: "",
        })

      }
      else {
        setMessage("Failed to Add User")
      }
    }
  }

  useEffect(()=>{
    if(!message) return;

    const timer = setTimeout(() => {
      setMessage("")
    }, 5000);
    return ()=>clearTimeout(timer)
  },[message])

return (
  <div className="user-page">

    <div className="user-container">

      {/* Page Heading */}
      <div className="page-header">
        <h1>CRUD Management App</h1>
        <p>Manage users with MongoDB database</p>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </div>


      {/* Add User Card */}
      <div className="card">

        <div className="card-header">
          <h2>
            {isEditing ? "Update User" : "Add New User"}
          </h2>

          <p>
            {isEditing
              ? "Update the information of the selected user."
              : "Enter user information to save a new user."}
          </p>
        </div>


        {/* Form */}
        <div className="form-grid">

          {/* User Name */}
          <div className="form-group">
            <label>User Name</label>

            <input
              type="text"
              placeholder="Enter user name"
              value={newUser.userName}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  userName: e.target.value,
                })
              }
            />
          </div>


          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="text"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />
          </div>


          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }
            />
          </div>


          {/* Role */}
          <div className="form-group">

            <label>Role</label>

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value,
                })
              }
            >
              <option value="">select role</option>
              <option value="trainer">trainer</option>
              <option value="student">student</option>
            </select>

          </div>

        </div>


        {/* Form Buttons */}
        <div className="form-buttons">

          {!isEditing ? (

            <button
              className="save-button"
              onClick={saveAllUsers}
            >
              Save User
            </button>

          ) : (

            <button
              className="update-button"
              onClick={updateUser}
            >
              Update User
            </button>

          )}

        </div>

      </div>


      {/* Existing Users Card */}
      <div className="card users-card">

        <div className="users-card-header">

          <div>
            <h2>Existing Users</h2>

            <p>
              Users currently stored in MongoDB.
            </p>
          </div>


          <div className="user-header-buttons">

            {/* IMPORTANT: Fetch current page */}
            <button
              className="refresh-button"
              onClick={fetchUsersPerPage}
            >
              Refresh
            </button>

            <button
              className="delete-all-button"
              onClick={deleteAllUser}
            >
              Delete All
            </button>

          </div>

        </div>


        {/* Users */}
        {users.length === 0 ? (

          <div className="empty-users">

            <div className="empty-icon">
              👥
            </div>

            <h3>No users available</h3>

            <p>
              Add a new user using the form above.
            </p>

          </div>

        ) : (

          <div className="users-table-wrapper">

            <table className="users-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {users.map((item: any, index: number) => (

                  <tr key={item._id}>

                    {/* Pagination serial number */}
                    <td>
                      {(currentPage - 1) * limit + index + 1}
                    </td>

                    <td>
                      <strong>{item.userName}</strong>
                    </td>

                    <td>
                      {item.email}
                    </td>

                    <td>
                      <span className="password-text">
                        ••••••••
                      </span>
                    </td>

                    <td>
                      <span className="role">
                        {item.role}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() => editUser(index)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => deleteUser(item?._id)}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>


            {/* ================= PAGINATION ================= */}
<div className="pagination-container">

  <button
    className="pagination-button"
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
  >
    ← Previous
  </button>


  <div className="pagination-info">

    <span className="page-text">
      Page <strong>{currentPage}</strong>
    </span>

    <span className="separator">|</span>

    <span className="total-text">
      Total Users: <strong>{totalUsers}</strong>
    </span>

  </div>


  <button
    className="pagination-button"
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage * limit >= totalUsers}
  >
    Next →
  </button>

</div>

          </div>

        )}

      </div>


      {/* Footer */}
      <div className="footer">
        CRUD Management System
      </div>

    </div>

  </div>
);
}
export default UserPage;

