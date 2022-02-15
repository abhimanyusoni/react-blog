import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/MOCK_DATA.json';

const Single = (props) => {

    const pathname = props.location.split("/");
    
    const singleItem = data.filter(onedata => pathname.includes(onedata.id.toString())).map((filtered) => {
        return (
            <div className='single-detail w-75 m-auto' key={filtered.id}>
                <img src={filtered.image} className="mb-3" alt="" />
                <h2 className="mb-0">{filtered.title}</h2>
                <span className="my-3 d-block">{filtered.date}</span>
                <p className="mb-0">{filtered.description}</p>
            </div>
        )
    })

  return (
    <div className='container mb-5'>
        {singleItem}
        <div className='mt-5 text-center'>
            <Link className='go-back' to={`/${props.passedCat}`}>Go Back</Link>
        </div>
    </div>
  )
}

export default Single
