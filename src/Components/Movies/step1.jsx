import React from 'react'
import Banner from './Banner'
import MovieRow from './MovieRow'
import NavMovies from './NavMovies'
import StepThree from './step3'



export const StepOne = () => {
    const bannerText = "Step-1 : Choose Your Movie!";
    const imageUrl ="https://i.imgur.com/duNO2Zx.png";
    const categories =[ "Action" , "Drama", "Fiction" ,"Comedy"]
    const fetchURLS = [
        "apiurlAction.com",
        "apiurlDrama.com",
        "apiurlFiction.com",
        "apiurlComedy.com "
    ]
    return (
        <div>
            <NavMovies whereIam={1}/>
            <Banner bannerText={bannerText} ImageUrl={imageUrl}/>
            <MovieRow category={categories[0]} fetchURL={fetchURLS[0]}/>
            <MovieRow category={categories[1]} fetchURL={fetchURLS[1]}/>
            <MovieRow category={categories[2]} fetchURL={fetchURLS[2]}/>
            <MovieRow category={categories[3]} fetchURL={fetchURLS[3]}/>

            
        </div>
    )
}
