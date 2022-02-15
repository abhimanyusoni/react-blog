import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AllCategories = (props) => {

    const mapCats = props.allcats.map((cat) => {

        const link = cat.replace(/[^A-Z0-9]/ig, "");
        
        return(
            <div className='onecat m-2' key={uuidv4()}>
                <Link to={`/${link}`}>
                    <button className='btn' onClick={props.getCatHandler} type='button'>{cat}</button>
                </Link>
            </div>
        )
    })

  return (
    <div className='all-categories'>
        <div className='container'>
            <h3 className='text-center mb-4'><strong>Categories</strong></h3>
            <div className='d-flex align-items-center flex-wrap justify-content-center'>
                {mapCats}
            </div>
        </div>
    </div>
  )
}

export default AllCategories
