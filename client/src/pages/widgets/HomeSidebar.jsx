import React, { useEffect, useState } from 'react'
import { constants } from '../../AppOption'
import axios from 'axios';
import { MessageOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomeSidebar = ({user}) => {
    const[folloings,setFollowings] = useState([]);
    const [loginUser,setLoginUser] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFollowings() {
          try {
            const response = await axios.get(constants.serverUrl + '/users/following');
            setFollowings(response.data); // Update state with fetched data
          } catch (error) {
            console.error('Error fetching followings:', error); // Log errors for debugging
            setFollowings([]); // Clear state on error to avoid displaying stale data
          }
        }
      
        fetchFollowings();

        axios.get(constants.serverUrl+'/users/profile')
        .then((response) => {
            if (response?.data) {
                setLoginUser(response.data);
            }
        })
        .catch((error) => {
            console.log(error.response.data.message);
        });
    }, []);




  return (
    <div className='container my-3 position-relative'>
        <div className="rounded-5 shadow p-4">
            <div className='d-flex justify-content-between'>
                <img src={constants.serverUrl+"/"+loginUser.picturePath}
                    className='border border-2 rounded-pill shadow p-1' height={50} width={50} />
                <h5 className='mx-2'>{loginUser.firstName + " "+loginUser.lastName}</h5>
                <div className=" mx-3 d-flex justify-content-between">
                    <div className="text-center mx-2">
                        <small className="my-0">
                            Followers
                        </small><br/>{loginUser.follower}
                    </div>
                    <div className="text-center mx-2">
                        <small className="my-0">
                        Following
                        </small><br/>{loginUser.following}
                    </div>
                </div>
            </div>
        </div>
        <div className="rounded-5 shadow p-4 mt-3 w-100">
            <div className='justify-content-between'>
                <p>Friends</p>
                {
                    folloings && (
                        folloings.map((followedUser) => (
                        <div className='mx-2 my-3 d-flex'>
                            <div id="image" className='cursor-pointer' onClick={()=>navigate("/profile/"+followedUser._id)}>
                                <img src={constants.serverUrl+"/"+followedUser.picturePath} className='border border-2 rounded-pill shadow p-1' height={50} width={50} />
                            </div>
                            <div id="name" className='mx-3 cursor-pointer' onClick={()=>navigate("/profile/"+followedUser._id)}>
                                <div>{followedUser.firstName} {followedUser.lastName}</div>
                                <small>{followedUser.title}</small>
                            </div>
                            <div className="ms-auto cursor-pointer" onClick={()=>navigate("/message/"+followedUser._id)}>
                                <MessageOutlined/>
                            </div>
                        </div>
                        ))
                    )
                }
                    
            </div>
        </div>
    </div>
  )
}

export default HomeSidebar