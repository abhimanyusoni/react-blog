import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const BlogList = (props) => {

    const [loading, setLoading] = useState(true);

    const listOut = props.data.filter(onedata => onedata.genres.split("|").includes(localStorage.getItem('Category')));

    let arr = listOut;

    let result = [];

    arr.forEach((x,y,z) => !(y % 4) ? result.push(z.slice(y, y + 3)) : '');

    const Mapped = result.map((outone) => {
        const inmaped = outone.map((inone) => {
            return(
                <div className='oneblog' key={inone.id}>
                    <img className='image mb-3' src={inone.image} alt="" />
                    <Link to={`/${props.passedCat}/${inone.id}`}>
                        <h2 className='title mb-2'>{inone.title}</h2>
                    </Link>
                    <p className='desc'>{inone.description}</p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Link className='read-more' to={`/${props.passedCat}/${inone.id}`}>Read More</Link>
                        <span className='date'>{inone.date}</span>
                    </div>
                </div>
            )
        })
        return(
            <div className='grouped-one' key={uuidv4()}>
                {inmaped}
            </div>
        )
    })

    let counter = 0;

    const nextSlide = () => {
        if(counter >= 0){
            counter++;
            const allel = document.querySelectorAll('.grouped-one');
            allel.forEach((oneel) => {
                oneel.style.transform = "translateX(-" + counter*100 + "%)";
            })
            console.log(counter);   
            document.getElementById('prev').classList.remove('disabled')
        }
    }

    const prevSlide = () => {
        counter--;
        const allel = document.querySelectorAll('.grouped-one');
        allel.forEach((oneel) => {
            oneel.style.transform = "translateX(-" + counter*100 + "%)";
        })
        console.log(counter);   
        if(counter === 0){
            document.getElementById('prev').classList.add('disabled')
        }
    }

    useEffect(() => {
        setLoading(false)
    }, []);

    // console.log(props);

    const relatedCats = props.related.map((relatedone) => {
        const relatedItems = props.data.filter(onedata => onedata.genres.split("|").includes(relatedone)).slice(0, 4).map((filtered) => {
            return(
                <div className='oneblog' key={filtered.id}>
                    <img className='image mb-3' src={filtered.image} alt="" />
                    <Link to={`/${props.passedCat}/${filtered.id}`}>
                        <h2 className='title mb-2'>{filtered.title}</h2>
                    </Link>
                    <p className='desc'>{filtered.description}</p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Link className='read-more' to={`/${props.passedCat}/${filtered.id}`}>Read More</Link>
                        <span className='date'>{filtered.date}</span>
                    </div>
                </div>
            )
        })
        return(
            <div className='explored-one_cat' key={uuidv4()}>
                <h3 className='explore-one-title mb-4'>{relatedone}</h3>
                {relatedItems}
            </div>
        )
    })


  return (
      <>
        {
            loading ? <h2 className='text-center'>Loading...</h2> :
            <div className='list-out-blogs'>
                <div className='container'>
                    <div className='d-flex align-items-center mb-4 justify-content-between'>
                        <h3 className='bloglist-title mb-0'>{localStorage.getItem('Category')}</h3>
                        <div className='navigation'>
                            <button id='prev' className='btn prev disabled' onClick={prevSlide}>Prev</button>
                            <button id='next' className='btn next ml-4' onClick={nextSlide}>Next</button>
                        </div>
                    </div>
                    <div className='main-outer-mapped mb-4'>
                        {Mapped}
                    </div>
                    <div className='mt-3 mb-5 text-center'>
                        <Link className='go-back' to={'/'}>Go Back</Link>
                    </div>
                    <div className='explore_more_cats'>
                        <h2 className='explore-ttl mb-5'>Explore more categories!</h2>
                        <div className='d-flex pb-5 justify-content-between'>
                            {relatedCats}
                        </div>
                    </div>
                </div>
            </div>
        }
      </>
  )
}

export default BlogList
