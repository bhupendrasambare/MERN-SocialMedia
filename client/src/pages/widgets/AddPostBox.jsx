import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { constants } from '../../AppOption';
import Card from './Card';

const AddPostBox = ({user}) => {
    const mode = useSelector((state) => state.mode);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview,setFilePreview] = useState(null);
    const [post,setPost] = useState(null);
    const [text,setText] = useState("")

    useEffect(()=>{
        if(text== "" && filePreview == null){
            setPost(null)
        }else{
            setPost({
                text:text,
                filePreview:filePreview
            });
        }
    },[text,filePreview])

    const setImage = (e)=>{
        if(e.target.files.length>0){
            setSelectedFile(e.target.files[0]);
            setFilePreview(URL.createObjectURL(e.target.files[0]))
        }else{
            setSelectedFile(null);
            setFilePreview(null)
        }
    }

  return (
    <div className='container my-3'>
        <div className="rounded-5 shadow p-4">
            <div className='d-flex'>
                <img src={constants.serverUrl+"/"+user.picturePath}
                    className='border border-2 img-fluid rounded-pill shadow p-1' height={50} width={50} />
                    <h5 className={'w-100 text-end '}>What's on your mind...?</h5>
            </div>
            <div className="d-flex store-content-between w-100">
                <textarea value={text} onChange={(e)=>setText(e.target.value)}
                className={('col-sm-6 form-control my-3 rounded-3 ')+((mode=="dark"?"bg-dark text-light":"bg-light text-dark"))}
                />
            </div>
            <div className="d-flex justify-content-between">
                {/* <input type='text' className={('form-control w-50 ')+((mode=="dark"?"bg-dark text-light":"bg-light text-dark"))} placeholder='Location'/> */}

                <input type='file' className={('form-control w-25 ')+((mode=="dark"?"bg-dark text-light":"bg-light text-dark"))}
                    onChange={(e) => setImage(e)}
                />
            </div>
        </div>

        {post && 

                <Card user={user} post={post}/>
        }
    </div>
  )
}

export default AddPostBox