import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function Users(){
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    const {setNotification} = useStateContext();
    useEffect(()=>{
        getUsers();
    },[])
    const onDelete = (user_id) => {
        if(!window.confirm("Are you sure delete this user?")){
            return
        }
        axiosClient.delete(`users/${user_id}`)
        .then(()=>{
            getUsers();
            setNotification("User has been deleted successfully.");
        });
    }
    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data})=>{
            console.log(data);
            setUsers(data.data);
            setLoading(false);

        })
        .catch(()=>{
            setLoading(false);
        })
    }

    return (
        <div>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1> Users</h1>
                <Link to="/users/new" className='btn-add'>Add User</Link>
           </div>
           <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading &&<tbody>
                      <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                     </tr>
                    </tbody>}
                    {!loading &&
                        <tbody>
                            {users.map(user=>(
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link to={'/users/'+user.user_id} className="btn-edit">Edit</Link> &nbsp;
                                        <button onClick={()=>onDelete(user.user_id)} className="btn-delete" >Delete</button>
                                    </td>
                            </tr>
                            )
                            
                            )}
                        </tbody>
                    }
                </table>
           </div>
        </div>
    )
}
