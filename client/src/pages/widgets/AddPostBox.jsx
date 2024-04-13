import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { constants } from '../../AppOption';
import Card from './Card';
import { Button } from 'react-bootstrap';

const AddPostBox = ({user}) => {
    const mode = useSelector((state) => state.mode);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview,setFilePreview] = useState(null);
    const [post,setPost] = useState(null);
    const [text,setText] = useState("");
    const [rows,setRows] = useState(3);

    const handleChange = (event) => {
        const textareaLineHeight = 24;
        const previousRows = event.target.rows;
        event.target.rows = 3;
    
        const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);
    
        if (currentRows === previousRows) {
          event.target.rows = currentRows;
        }
    
        setText(event.target.value);
        setRows(currentRows);
      };
    

    useEffect(()=>{
        if(text== "" && filePreview == null){
            setPost(null)
        }else{
            setPost({
                text:text,
                filePreview:filePreview
            });
        }
    },[text,filePreview]);

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
                    className='border border-2 rounded-pill shadow p-1' height={50} width={50} />
                    <h5 className={'w-100 text-end '}>What's on your mind...?</h5>
            </div>
            <div className="d-flex store-content-between w-100 my-3">
                <textarea maxLength={500} value={text} rows={rows} onChange={handleChange} placeholder="What's on your mind"
                className={('col-sm-6 form-control border-0 rounded-3 dynamic-textarea bg-secondary bg-opacity-50 ')+((mode=="dark"?"text-light":"text-dark"))}
                />
            </div>
            <div className="my-2 d-flex justify-content-end">
                {text.length}/500
            </div>
            <div className="d-flex justify-content-between">
                <input type='file' className={('form-control w-25 ')+((mode=="dark"?"bg-dark text-light":"bg-light text-dark"))}
                    onChange={(e) => setImage(e)}
                />

                <div className='d-flex' id="button-group">
                    <Button className='mx-2' variant={'outline-danger'}>Reset</Button>
                    <Button className='mx-2' variant={'outline-'+((mode=='dark')?'light':'dark')}>Post</Button>
                </div>
            </div>
        </div>

        {post && 

                <Card user={user} post={post}/>
        }
    </div>
  )
}

export default AddPostBox