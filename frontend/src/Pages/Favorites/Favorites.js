import './Favorites.css';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineSearch, AiFillHeart } from 'react-icons/ai';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';



const Favorites = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/favorites/');
      const data = await response.data;
      setLoading(false);
      setFavorites(data);
      // console.log(data)      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {    
    try {
      const response = await axios.delete(`/api/remove-favorite/${id}`)
      const data = await response.data
      console.log(data)    
      fetchFavorites()
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="favorites">
      <div className="favorites__header">
        <div className="fav">
          <h2>Favourites</h2>
        </div>

        <form className="favorites__search" onSubmit={handleSubmit}>
          <AiOutlineSearch className="favorites__icon" />
          <input
            ref={inputRef}
            className="favorites__input"
            type="text"
            placeholder="Search for meals"
          />

          <button className="favorites__button" type="submit">
            Search
          </button>
        </form>
      </div>

       <div className="fav__start">
        <div>
          <Link
            to={{
              pathname: '/Meal',
            }}
          >
            <MdKeyboardArrowLeft />{' '}
          </Link>
        </div>
      
      </div>
      <div></div>

      <div className="sm:grid md:grid-cols-2 lg:grid-cols-5 mt-5">
        {favorites.length > 0 &&
          favorites.map((favorite) => {
            const { id, identifier, image, name } = favorite;
            return (
              <div className="favorites__detail" key={id}>
                <img src={image} alt={name} />

                <div className="favorites__name">
                  <h4>{name}</h4>
                  <div>
                    <AiFillHeart
                      style={{ color: '#DE1A1A' }}
                      onClick={() => removeFavorite(id)}
                    />
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {favorites.length <= 0 && !loading && (
        <div>Click the heart button on recipes to add favorites</div>
      )}
    </div>
  );
};

export default Favorites;
