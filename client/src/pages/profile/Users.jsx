import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { constants } from '../../AppOption';
import ProfileBox from '../widgets/profile/ProfileBox';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [loginUser,setLoginUser] = useState(null);
    const [posts,setPosts] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(constants.serverUrl+'/users/profile')
        .then((response) => {
            if (response?.data) {
                setLoginUser(response.data);
                axios.get(constants.serverUrl+'/posts/user/'+response.data._id)
                .then((res) => {
                    setPosts(res.data);
                })  
            }
        })
        .catch((error) => {
            if(error.response.status==401){
                navigate("/")
            }
        });
    },[])

    return (
        <div className='container'>
            {loginUser &&
                <ProfileBox user={loginUser} posts={posts}/>
            }
            
        </div>
    )
}

export default Users