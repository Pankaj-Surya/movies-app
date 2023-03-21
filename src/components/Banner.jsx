import React from 'react'
import { results } from "../MovieData"

function Banner() {
  let [firstMovie, setMovie] = React.useState("");

  //console.log(results);
  React.useEffect(function fn() {
    async function fetchData() {
    
    let response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=3d0d19fa95bbcb42f7a4cf93bc4eeead");
    let data = await response.json();
    //console.log(data);

    let movies =await data.results;
    //console.log(movies[0].title)
     
     setMovie(movies[1]);
  }
  fetchData()
},[])

 


  return (
    <>
    
    <div className={`bg-[url("https://image.tmdb.org/t/p/original//${firstMovie.backdrop_path}")]
          h-[35vh] md:h-[60vh] bg-center bg-cover flex items-end justify-center`}>
      <div className={`text-white text-xl  md:text-3xl p-4 bg-gray-900 bg-opacity-30 w-full`}>{firstMovie.title}</div>

       
    </div>
    </>
    
  )
}

export default Banner