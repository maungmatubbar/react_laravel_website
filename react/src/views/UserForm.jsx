import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function UserForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [errors,setErrors] = useState(null);
  const {setNotification} = useStateContext();
  const [user,setUser] = useState({
        id:null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [loading,setLoading] = useState(false);
    if(id)
    {
      useEffect(() => {
        setLoading(true)
        axiosClient.get(`users/${id}`)
        .then(({data})=> {
           setLoading(false);
           setUser({
                'id': data.user_id,
                'name': data.user_name,
                'email': data.user_email,
           })
           console.log(data)
        }).catch(()=>{
          setLoading(false)
        })
      }, [])
      
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        if(user.id){
            axiosClient.put(`/users/${user.id}`,user)
            .then(({data})=>{
                console.log(data)
                setNotification('User has been updated successfully');
                navigate('/users');
            })
            .catch(err=>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                    console.log(errors)
                }
            })
        }
        else
        {
            axiosClient.post(`/users`,user)
            .then(({data})=>{
                console.log(data)
                setNotification('User has been created successfully');
                navigate('/users');
            })
            .catch(err=>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                    console.log(errors)
                }
            })
        }
    }
  return (
    <>
        <div className='card animated fadeInDown'>
          {id && <h1 className='py-2'>Update User: {user.name}</h1>}
          {!id && <h1 className='py-2'>New User</h1>}
            {loading && <div className='text-center'>Loading...</div>}
            {errors && <div className="alert">
                    {Object.keys(errors).map(key=>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            {!loading && 
                <form onSubmit={onSubmit}>
                    <input type="text" value={user.name} onChange={e=>setUser({...user,name:e.target.value})}  placeholder='Name' />
                    <input type="email" value={user.email} onChange={e=>setUser({...user,email:e.target.value})}  placeholder='Email Address' />
                    <input type="password" onChange={e=>setUser({...user,password:e.target.value})}  placeholder='Password' />
                    <input type="password" onChange={e=>setUser({...user,password_confirmation:e.target.value})} placeholder='Password Confirmation' />
                    <button className='btn'>Submit</button>
                </form>
            }
        </div>
    </>
  )
}
