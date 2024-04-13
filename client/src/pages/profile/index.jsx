import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { constants } from '../../AppOption';
import axios from 'axios';
import ProfileBox from '../widgets/profile/ProfileBox';

const Profile = () => {
    const { id } = useParams();
    const [user,setUser] = useState(null);
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        let userId = id ? id:"";
        
        axios.get(constants.serverUrl+'/users/profile/'+userId)
        .then((response) => {
            if (response?.data) {
                setUser(response.data);
                axios.get(constants.serverUrl+'/posts/user/'+response.data._id)
                .then((res) => {
                    setPosts(res.response);
                })                
            }
        })
        .catch((error) => {
            console.log(error.response.data.message);
        });
    },[useParams()])

    return (
        <div className='container'>
            {
                user &&
                    <ProfileBox user={user} posts={posts}/>
            }
        </div>
    )
}

export default Profile