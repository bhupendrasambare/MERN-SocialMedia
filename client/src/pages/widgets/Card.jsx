import React from 'react'
import { constants } from '../../AppOption'
import { useSelector } from 'react-redux';

const Card = ({user,post}) => {
    const mode = useSelector((state) => state.mode);

    return (
    <div className='p-2 shadow mt-2 rounded-5'>
        <div className='d-flex p-4'>
            <div className="d-flex w-75">
                <img src={constants.serverUrl+"/"+user.picturePath} className='border border-2 img-fluid rounded-pill shadow p-1' height={50} width={50} />
                <div className=" mx-3">
                    <p className='mb-0 fw-bold fs-5'>{user.firstName + " " + user.lastName}</p>
                    <small className='mt-0'>{user.title}</small>
                </div>
            </div>
            <p className={'w-25 text-end align-items-center'}>Just now</p>
        </div>
        <p className='px-4 '>
            {post?.text}
        </p>
        <div className="px-3">
            {post.filePreview &&  <img className='shadow m-2 w-100 img-fluid' height={100} src={post.filePreview} /> }
        </div>
        
    </div>
  )
}

export default Card