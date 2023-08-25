import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./Table";
import style from "../Styling/Form.module.css"


export const Form = ()=>{
  const[users,setUsers] = useState([]);
  const[formData,setFormData] = useState({name:"",email:"",age:''})
  const [id,setId] = useState(undefined);
  
  useEffect(()=>{
    fetchUsers()
  },[])

  const changeFormData = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormData({...formData,[name]:value})
  }
  
   const formSubmit = (e)=>{
         e.preventDefault();
   }

   //GET USERS
   const fetchUsers = async()=>{
     try{
    const res = await axios.get("http://localhost:4000/getFriendsFromDB")
    console.log("response",res.data);
    setUsers(res.data)
     }catch(err){
      console.log("error",err);
     }
   };

   // CREATE USERS
   const createUser = async ()=>{
    try{
    const res = await axios.post("http://localhost:4000/addFriends",formData);
    console.log("reasponse",res.data);
    fetchUsers()
     setFormData({...formData,
       ["name"] : "",
       ["email"] : "",
       ["age"] : ""
  })
  }catch(err){
          console.log("error",err)
        }
   };

   //UPDATE USER
   const updateUser = (item)=>{
       console.log("form data is",formData)
        console.log("update user function has been called")
          setFormData({...formData,
               ["name"] : item.name,
               ["email"] : item.email,
               ["age"] : item.age
          });
         setId(item._id);
        }
   const updateData = async()=>{
    console.log(id);
       try{
   const res = await axios.put(`http://localhost:4000/update/${id}`,formData)
   console.log(res);
   fetchUsers();
   setFormData({...formData,
        ["name"] : "",
        ["email"] :"",
        ["age"] : ""
  })
      }catch(err){
          console.log("Error",err);
       }
   }

   //DELETE USERS
   const deleteUser = async(id)=>{
       console.log("Calling delete",id);
       try{
    const res = await axios.delete(`http://localhost:4000/deleteById/${id}`)
     console.log(res);
     fetchUsers()
       }catch(err){
        console.log("Error",err);
       }
   };



   return(
 <>
     {/* <h1>Form</h1> */}
       <div className={style.form}>
       <form onSubmit={formSubmit}>


          <div className={style.row}>
            <div className={style.col25}>
            <label htmlFor="fname">Name</label>
            </div>
            <div className={style.col75}>
            <input type="text"
               placeholder="name"
                name="name"
                id="fname"
                value={formData.name}
              onChange={changeFormData}
                />
            </div>
        </div>


       


        


        <div className={style.row}>
        <div className={style.col25}>
          <label htmlFor="femail">Email</label>
        </div>
        <div className={style.col75}>
        <input type="email"
               placeholder="Email"
                name="email"
                id="femail"
                value={formData.email}
                onChange={changeFormData}
                />       
        </div>      
        </div>



       <div className={style.row}>
       <div className={style.col25}>
          <label htmlFor="fage">Age</label>
       </div>
       <div className={style.col75}>
       <input type="number"
             placeholder="age" 
             name="age"
             id="fage"
             value={formData.age}
           onChange={changeFormData}
             />
       </div>
     </div>





        <div className={style.btn}>
                <button className={style.btnGet} onClick={fetchUsers}>Get</button>
                <button className={style.btnPost} onClick={createUser}>Post</button>
                <button className={style.btnUpdate} onClick={updateData}>Update</button>
        </div>
        </form>
       </div>
            <Table data = {users} deleteUser = {deleteUser} updateUser = {updateUser}/>
       </>
  )
};