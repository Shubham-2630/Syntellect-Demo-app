import './App.css';
import React, { useState, useEffect } from 'react';


//Mock Data for users
const mockUserData = [
  {
    "id": 1,
    "first_name": "Rohit Sharma",
    "email": "my.name@mywebsite.com",
    "role": "Admin"
  },
  {
    "id": 2,
    "first_name": "Virat Kohli",
    "email": "adam.admin@mywebsite.com",
    "role": "SubAdmin"
  },
  {
    "id": 3,
    "first_name": "Hardik Pandya",
    "email": "any.user@mywebsite.com",
    "role": "User"
  },
]

function App() {



  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [userData, setUserData] = useState([]);
  const [id , setId]= useState(0)

  useEffect(() => {
    fetchUserData();
  }, [])

  async function fetchUserData() {
    setUserData(mockUserData);
  }

  const handleUpdate = () => {
    const index = userData.map((item,index)=>{
      return item.id
    }).indexOf(id);

    const data = [...userData];
    data[index].first_name = userName
    data[index].email = email
    data[index].role = role
    setUserData(data);
  }


  const handleClear = () => {
    setUserName('');
    setEmail('');
    setRole('');
  }

  const handleAdd = () => {

  }



  const handleEdit = (id) => {
    const newData = userData.filter(item => item.id === id);
    if(newData !== undefined){
      setUserName(newData[0].first_name);
      setEmail(newData[0].email);
      setRole(newData[0].role);
    }
  }

  const handleDelete = (id) => {
    if (id !== 0 || id !== undefined) {
      if (window.confirm("Are you sure you want to delete this record")) {
        const newData = userData.filter(item => item.id !== id)
        setUserData(newData)
      }
    }
  }

  return (
    <div className="App">
      <h1>
        USER MANAGEMNET DASHBOARD
      </h1>

      <div>
        <div style={{ display: "flex", justifyContent: "center", alignContent:"space-between" }}>
          <label>
            Username
          </label>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} maxLength={20} type='text' placeholder='Enter Username'>
          </input>

          <label>
            Email
          </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} maxLength={30} type='email' placeholder='Enter Email'>
          </input>

          <label>
            Role
          </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={""}>Select Role</option>
            <option value={"Admin"}>Admin</option>
            <option value={"SubAdmin"}>Sub-Admin</option>
            <option value={"User"}>User</option>
            <option value={"Manager"}>Manager</option>

          </select>

          <div>
            <button onClick={(e) => handleAdd(e)} className='btn btn-primary'> Add</button>
            <button onClick={(e) => handleUpdate(e)} className='btn btn-primary'> Update</button>
            <button onClick={handleClear} className='btn btn-danger'> Clear</button>

          </div>

        </div>
      </div>


      <div>
        <table className='table table-info'>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </thead>
          <tbody>
            {
              userData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.first_name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button className='btn btn-primary' onClick={() => handleEdit(item.id)}> Edit</button>
                      <button className='btn btn-danger' onClick={() => handleDelete(item.id)}> Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
