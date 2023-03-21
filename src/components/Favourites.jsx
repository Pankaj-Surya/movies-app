import React from 'react'
import { useEffect } from 'react'
import NavBar from './NavBar'
import Pagination from './Pagination'

function Favourites() {
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  }
  const [curGenre, setCurrGenre] = React.useState("All Genres")
  const [favourites, setFavourites] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [popularity, setPopularity] = React.useState(0);

   const [search, setSearch] = React.useState("")
  const [rows, setRows] = React.useState(5)
  const [curPage, setCurPage] = React.useState(1)

  //console.log(results);

  //for Local Storage
  //getting data from local storgae  after only one load 
  React.useEffect(function fn() {

    // to get fav data arr after page load 
    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || [];
    console.log("oldfav", oldFav)
    setFavourites([...oldFav]);
  }, []
  )


  //for genres get -> to build those blue/grey button
  React.useEffect(() => {
    //console.log(favourites);
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]])
    console.log(temp);
    temp = new Set(temp);
    setGenres(["All Genres", ...temp]);

  }, [favourites])

  //add that movie which not present in fav Array (filter the movie)
  function removeFromFavourites(movie) {
    let newArr = favourites.filter((m) => m.id != movie.id)
    setFavourites([...newArr]);
    localStorage.setItem("imdb", JSON.stringify(newArr))

  }

  //filtering the movie on the click genre button 
  //Displaying Particular genre 
  let filteredMovies = []

  filteredMovies = curGenre == "All Genres" ? favourites
    : favourites.filter((movie) => genreids[movie.genre_ids[0]] == curGenre);


  //sorting --> based on rating
  if (rating == 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average
    })

  } else if (rating == -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average
    })
  }

  //sorting --> based on popularity
  if (popularity == 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.popularity - objB.popularity
    })
  } else if (popularity == -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.popularity - objA.popularity
    })
  }

  //searching 
  filteredMovies = filteredMovies.filter((movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
)

   // pagination
   let maxPage = Math.ceil(filteredMovies.length / rows);
   let si = (curPage - 1) * rows
   let ei = Number(si) + Number(rows)
 
   filteredMovies = filteredMovies.slice(si, ei);
 
   let goBack = () => {
     if (curPage > 1) {
       setCurPage(curPage - 1)
     }
   }
 
   let goAhead = () => {
     if (curPage < maxPage) {
       setCurPage(curPage + 1)
     }
   }

  return (
    <>
      {/*1.NavBar */}
      <NavBar></NavBar>
      {/*2.Genere Container */}
      <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
        {
          genres.map((genre, id) =>
            <button key={id} className={curGenre == genre ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' :
              'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'}
              onClick={() => setCurrGenre(genre)}>
              {genre}
            </button>)
        }


        {/* <button className= {curGenre== "Action" ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold':'m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'}>
        Action
       </button> */}
        {/* <button className='m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
        Animation
       </button>
       <button className='m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
        Fantasy
       </button>
       <button className='m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
        Family
       </button>
       <button className='m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
        Music
       </button>
       <button className='m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
         Drama
       </button>
       <button className='m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
        Rommance
       </button> */}
      </div>

      {/*3.Input Container */}
      <div className='text-center'>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='border border-2 text-center p-1 m-2' />
      <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} placeholder='Rows' className='border border-2 text-center p-1 m-2' />
    </div>

      {/*4.Table Container  */}

      <div className='flex justify-center '>
        <div className="flex flex-col m-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 min-w-full">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className='flex'>
                          <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer'
                            onClick={() => {
                              setPopularity(0)
                              setRating(-1)
                            }} />
                          Rating
                          <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png'
                            className='ml-2 mr-2'
                            onClick={() => {
                              setPopularity(0)
                              setRating(1)
                            }} />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className='flex'>
                          <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png'
                            className='mr-2'
                            onClick={() => {
                              setRating(0)
                              setPopularity(-1)
                            }} />
                          Popularity
                          <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2'
                            onClick={() => {
                              setRating(0)
                              setPopularity(1)
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">


                    {/* Row 1 */}
                    {filteredMovies.map((movieObj) => (



                      <tr key={movieObj.id} >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                              <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movieObj.backdrop_path}`} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 font-bold">{movieObj.title}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{movieObj.vote_average}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{movieObj.popularity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {genreids[movieObj.genre_ids[0]]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                          <button href="#" className="text-red-600 hover:text-red-900"
                            onClick={() => removeFromFavourites(movieObj)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>

                    ))

                    }

                    {/* Row 2 */}
                    {/* <tr >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                    <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg`} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 font-bold">Spider</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">8.208</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">3198.248</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                   Action
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                <button href="#" className="text-red-600 hover:text-red-900"

                >
                  Delete
                </button>
              </td>
            </tr>  */}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>









      {/*5.Pagination */}
      <Pagination pageProp={curPage} goBack={goBack} goAhead={goAhead}></Pagination>
    </>

  )
}

export default Favourites