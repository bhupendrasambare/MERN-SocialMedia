import React, { useEffect, useState } from 'react'
import AddPostBox from '../widgets/AddPostBox'
import { useSelector } from 'react-redux'
import HomeSidebar from '../widgets/HomeSidebar'

const HomePage = () => {
    const user = useSelector((state) => state.user )
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [screenWidth]);

    return (
        <div className='d-flex flex-wrap container pb-5'>
            <div className="col-lg-8">
                <AddPostBox user={user}/>
            </div>
            {
                screenWidth>1400 && 
                    <div className="col-sm-4">
                        <HomeSidebar user={user}/>
                    </div>
            }
        </div>
    )
}

export default HomePage