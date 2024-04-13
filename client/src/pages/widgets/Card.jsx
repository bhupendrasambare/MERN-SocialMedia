import React from 'react'
import { constants } from '../../AppOption'
import { useSelector } from 'react-redux';
import { ChatBubbleOutline, RemoveRedEye, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';

const Card = ({user,post}) => {
    const mode = useSelector((state) => state.mode);

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
    <div className='shadow mt-3 rounded-5'>
        {post.filePreview && 
        <div className='px-3 rounded-top-5 d-flex bg-secondary bg-opacity-50 py-1'>
            <RemoveRedEye/> <p className='mx-2 my-0'>Post Preview</p>
        </div>}
        <div className='d-flex p-4'>
            <div className="d-flex w-75">
                <img src={constants.serverUrl+"/"+user.picturePath} className='border border-2 rounded-pill shadow p-1' height={50} width={50} />
                <div className=" mx-3">
                    <p className='mb-0 fw-bold fs-5'>{user.firstName + " " + user.lastName}</p>
                    <small className='mt-0'>{user.title}</small>
                </div>
            </div>
            <p className={'w-25 text-end align-items-center'}>Just now</p>
        </div>
        <p className='px-4'>
            {post?.text && addLineBreak(post.text)}
        </p>
        <div className="p-3">
            {post.filePreview &&  <img className='shadow m-2 w-100 img-fluid' height={100} src={post.filePreview} /> }
        </div>
        <div className="p-3">
            <div className="d-flex w-100">
                <div className="mx-2">
                    <ThumbUpOutlined/>
                    <span className='mx-3'>Like</span>
                </div>
                <div className="mx-2">
                    <ChatBubbleOutline/>
                    <span className='mx-2'>Coments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card