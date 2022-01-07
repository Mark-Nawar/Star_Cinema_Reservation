import React from 'react'
import Banner from '../Movies/Banner';
import NavMovies from '../Movies/NavMovies';
import MovieRowM from './MovieRowM';

function MoviesEvents() {
    const bannerText = "Step-1 : Choose Your Movie!";
    const imageUrl ="https://images2.alphacoders.com/450/thumb-1920-450291.jpg";
    const categories =[ "Action" , "Drama", "Fiction" ,"Comedy"]
    const fetchURLS = [
        "apiurlAction.com",
        "apiurlDrama.com",
        "apiurlFiction.com",
        "apiurlComedy.com "
    ]
    return (
        <div>
            <NavMovies whereIam={3}/>
            <Banner bannerText="Choose A movie" ImageUrl={imageUrl}/>
            <MovieRowM category={categories[0]} fetchURL={fetchURLS[0]}/>
            <MovieRowM category={categories[1]} fetchURL={fetchURLS[1]}/>
            <MovieRowM category={categories[2]} fetchURL={fetchURLS[2]}/>
            <MovieRowM category={categories[3]} fetchURL={fetchURLS[3]}/>

            
        </div>
        
    )
}

export default MoviesEvents


