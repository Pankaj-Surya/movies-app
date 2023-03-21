import React from 'react';



function MovieList(props) {
    let [movies, setMovie] = React.useState("");
    let [hover, setHover] = React.useState("");
    let [favourites, setFavourites] = React.useState([]);
    //console.log(results);

    React.useEffect(function fn() {
        async function fetchData() {

            // to get fav data arr after page load 
            let oldFav =localStorage.getItem("imdb"); 
            oldFav=JSON.parse(oldFav) || [];
            setFavourites([...oldFav]);
            
            // it is used to make request
            let response = await fetch
            ("https://api.themoviedb.org/3/trending/movie/week?api_key=16e7df484a81f634d85b2f25f938585d&page=" + props.pageNo);
            // response -> you will get in buffer -> convert it into json
            let data = await response.json();
            console.log(data);
            let movies = data.results;
            setMovie(movies);
        }
        fetchData();
    }, [props.pageNo])
    
    //add movie to fav array which is clicked and add to fav array
    function addToFavourites(movie) {
        let newArr = [...favourites, movie];
        setFavourites([...newArr]);
        
        //console.log(newArr);
        // add fav data to local storage to stay data after loading/refreshing also
        localStorage.setItem("imdb",JSON.stringify(newArr))
        
    }
    
    //add that movie which not present in fav Array (filter the movie)
    function removeFromFavourites(movie){
        let newArr = favourites.filter((m)=> m.id != movie.id)
        setFavourites([...newArr]);
        localStorage.setItem("imdb",JSON.stringify(newArr))
        
    }
    
    return (
        <>


            <div className={''}>
                {/*1. Heading */}
                <div className='mt-8 mb-8 font-bold   text-center text-2xl'>Trending Movies</div>





                {/*2. Movies List */}
                <div className='flex flex-wrap justify-center'>
                    {/*2.1 Movie-1 */}
                    {/* <div className={`bg-[url("https://image.tmdb.org/t/p/original//7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg")] md:h-[35vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 `}>
                        <div className="text-white text-center text-xl font-bold bg-gray-900 w-full rounded-b-lg">Title</div>
                    </div> */}

                    {/* using map */}
                    {
                        movies == "" ? <h1>Movie yet to come </h1> :
                            <>
                                {movies.map((movieObj, idx) => {
                                    return (
                                        <div key={idx}>
                                            <div className={`bg-[url("https://image.tmdb.org/t/p/original//${movieObj.poster_path}")] 
                                            md:h-[35vh] md:w-[200px]
                                             h-[25vh] w-[150px] 
                                             bg-center bg-cover
                                              rounded-xl
                                               flex items-end m-4
                                                hover:scale-110 ease-out duration-300 
                                                relative `}
                                                onMouseEnter={() => {
                                                    setHover(movieObj.id)
                                                    // console.log(movieObj.id)
                                                }}
                                                onMouseLeave={() => setHover("")}
                                            >
                                                {
                                                    hover == movieObj.id && <>{
                                                        !favourites.find((m) => m.id == movieObj.id) ?
                                                            <div className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl  cursor-pointer'
                                                                onClick={() => { addToFavourites(movieObj) }}>😍</div>
                                                            :
                                                            <div className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl  cursor-pointer'
                                                                onClick={() => { removeFromFavourites(movieObj) }}>❌</div>
                                                    }




                                                    </>



                                                }
                                                <div className="text-white text-center 
                                                                sm:text-sm md:text-lg text-xl 
                                                                font-bold bg-gray-900
                                                                 w-full rounded-b-lg">{movieObj.title}</div>
                                            </div>
                                        </div>

                                    )
                                })}
                            </>

                    }


                    {/* <div className={`bg-[url("https://image.tmdb.org/t/p/original//7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg")] md:h-[35vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 `}>
                        <div className="text-white text-center text-xl font-bold bg-gray-900 w-full rounded-b-lg">Title</div>
                    </div>

                    <div className={`bg-[url("https://image.tmdb.org/t/p/original//7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg")] md:h-[35vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 `}>
                        <div className="text-white text-center text-xl font-bold bg-gray-900 w-full rounded-b-lg">Title</div>
                    </div>


                    <div className={`bg-[url("https://image.tmdb.org/t/p/original//7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg")] md:h-[35vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 `}>
                        <div className="text-white text-center text-xl font-bold bg-gray-900 w-full rounded-b-lg">Title</div>
                    </div>

                    <div className={`bg-[url("https://image.tmdb.org/t/p/original//7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg")] md:h-[35vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 `}>
                        <div className="text-white text-center text-xl font-bold bg-gray-900 w-full rounded-b-lg">Title</div>
                    </div>

                    <div className={`bg-[url("https://image.tmdb.org/t/p/original//7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg")] md:h-[35vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 `}>
                        <div className="text-white text-center text-xl font-bold bg-gray-900 w-full rounded-b-lg">Title</div>
                    </div> */}



                </div>
            </div>

        </>

    )

}

export default MovieList