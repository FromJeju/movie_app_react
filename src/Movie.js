import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis';

function Movie({title, poster, genres, summary, rating}) {
    return (
        <div className="Movie">
            <div className="Movie__Column">
                <MoviePoster poster={poster} alt={title} />
            </div>
            <div className="Movie__Column">
                <h1>{title}</h1>
                <div className="Movie__Genres">
                    {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                </div>
                <span className="Movie__rating">{rating}</span>
                <LinesEllipsis
                    className="Movie__Synopsis"
                    text={summary}
                    maxLine='5'
                    ellipsis=' ...'
                    trimRight
                    basedOn='letters'
                />
                </div>
        </div>
    )
}

function MoviePoster({poster, alt}) {
    return (
        <img className="Movie__Poster" src={poster} alt={alt} title={alt} />
    )
}

function MovieGenre({genre}) {
    return (
        <span className="Movie__Genre">{genre}</span>
    )
}

Movie.prototype = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    summary: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired
}

MoviePoster.prototype = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

MovieGenre.prototype = {
    genre: PropTypes.string.isRequired
}


export default Movie;