import React from 'react'
import Banner from './Banner'
import MovieRow from './MovieRow'
import NavMovies from './NavMovies'

export const StepOne = () => {
    return (
        <div>
            <NavMovies/>
            <Banner/>
            <MovieRow/>
            <MovieRow/>
            <MovieRow/>
            <MovieRow/>
        </div>
    )
}
