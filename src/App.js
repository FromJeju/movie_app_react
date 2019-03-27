import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update: componentWillReceiveProps() -> shouldComponentUpdate() == true -> componentwillUpdate() -> render() -> componentDidUpdate()

  state = {
    requestSent: false,
    pageNum: 1,
    movies: []
  }

  componentDidMount(){
    this._getMovies(1)
    window.addEventListener('scroll', this._handleOnScroll);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this._handleOnScroll);
  }

  // scroll check
  _handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this._querySearchResult();
    }
  }

  _querySearchResult = () => {
      if (this.state.requestSent) {
        return;
      }
      this.setState({
        pageNum: this.state.pageNum + 1
      })
      this._getMovies(this.state.pageNum);
      this.setState({requestSent: true});
  }

  _renderMovie = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie 
        title={movie.title} 
        poster={movie.large_cover_image} 
        key={movie.id} 
        genres={movie.genres} 
        summary={movie.summary} 
        rating={movie.rating} 
      />
    })
    return movies
  }

  _getMovies = async (pageNum) => {
    const movies = await this._callApi(pageNum)
    if(pageNum === 1){
      this.setState({
        movies
      })
    } else {
      this.setState({
        movies : this.state.movies.concat(movies)
        
      })
    }
    this.setState({requestSent: false});
  }

  _callApi = (pageNum) => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count&page=' + pageNum)
    .then(function(response) {
      if(!response.redirected){
        return response.json()
        .then(json => json.data.movies)
      }
    })
    .catch(err => console.log(err))
  }
  
  _loading = (text) => {
    return (
      <div className="Loading">{text}</div>
    )
  }
  render() {
    const { movies } = this.state
    
    return (
      <div className={movies.length !== 0 ? "App" : "App--loading"}>
        
        {movies.length !== 0 ? this._renderMovie() : "Loading..."}
        {this.state.requestSent ? this._loading("Loading...") : ""}
      </div>
      
      
    );
  }

}

export default App;