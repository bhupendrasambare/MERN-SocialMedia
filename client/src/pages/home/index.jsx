import React from 'react'
import AddPostBox from '../widgets/AddPostBox'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const user = useSelector((state) => state.user )

    return (
        <div className='d-flex container'>
            <div className="col-lg-8">
                <AddPostBox user={user}/>
            </div>
            <div className="col-sm-4">
                
            </div>
        </div>
    )
}

export default HomePage