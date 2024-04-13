import React from 'react'
import { constants } from '../../../AppOption'

const ProfileBox = ({user,posts}) => {
    const addLineBreak = (str) =>
        str.split('\n').map((subStr) => {
            return (
            <>
                {subStr}
                <br />
            </>
            );
    });

    return (
    <div className='my-5 shadow rounded-5 py-2'>
        <div className='d-flex justify-content-between'>
            <div className="img-fluid m-3">
                <img src={constants.serverUrl+"/"+user.picturePath} className='border border-2 rounded-pill shadow p-1' height={200} />
            </div>
            <div className="m-5 p-4">
                <div className="fs-5 text-secondary-50 mx-3 d-flex justify-content-between">
                    <h4 className="text-center mx-2">
                        <p className="my-0">
                            Posts
                        </p>{posts ? posts.length:0}
                    </h4>
                    <h4 className="text-center mx-2">
                        <p className="my-0">
                            Followers
                        </p>{user.follower}
                    </h4>
                    <h4 className="text-center mx-2">
                        <p className="my-0">
                        Following
                        </p>{user.following}
                    </h4>
                </div>
            </div>
        </div>
        <div className="text-left p-4">
            <h4 className='fw-bolder'>{user.firstName} {user.lastName}</h4>
            <h5 className='text-secondary'>{user.title}</h5>
            <p style={{maxWidth:400}}>{addLineBreak(user.bio)}</p>
        </div>
    </div>
  )
}

export default ProfileBox