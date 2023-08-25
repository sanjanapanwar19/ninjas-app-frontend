import React from "react";
import style from '../Styling/Table.module.css'

export const Table = (props)=>{
        // console.log("props",props)
        // console.log(props.deleteUser)
         const deleteUser = props.deleteUser
        // console.log(props.updateUser);
         const updateUser = props.updateUser
         const users = props.data
 return(
        <div className={style.table}>
                <table className={style.friends}>
                <thead>
                        <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Update friends</th>
                                <th>Delete Friends</th>
                        </tr>
                </thead>
                          
                <tbody>
                        {
                                users.map((user)=>{
                                   return(
                                        <tr key={user.email}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.age}</td>
                                                <td><button className= {style.editBtn}onClick={()=>{updateUser(user)}}>Edit</button></td>
                                                <td><button className= {style.deleteBtn} onClick={()=>{deleteUser(user._id)}}>Delete</button></td>
                                        </tr>
                                   )
                                })
                        }
                </tbody>
        </table>
        </div>
 )
}