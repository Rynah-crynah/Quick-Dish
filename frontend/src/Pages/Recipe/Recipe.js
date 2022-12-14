import './Recipe.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Recipe = () => {
  const { recipes } = useGlobalContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState({});

  const fetchMeal = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/meal/${id}`);
      const data = await response.data;      
      const { meals } = data;
      setMeal(meals[0]);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMeal();
  }, [fetchMeal]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  
  return (
    <div className="recipe">
      <div className="recipe__main">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h1>{meal.strMeal}</h1>
          <Link to={`/meal/${meal.idMeal}`}>
            <button className="recipe__button">Make meal</button>
          </Link>
        </div>
      </div>
      <div className="recipe__start">
        <div>
          <Link
            to={{
              pathname: '/Home',
            }}
          >
            <MdKeyboardArrowLeft />{' '}
          </Link>
        </div>
        <div>
          <h2>Recipe</h2>
        </div>
      </div>
      <div>
        <h2 className="recipes__title mt-5 ml">You might also like</h2>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="sm:grid md:grid-cols-2 lg:grid-cols-5 mt-5">
            {recipes?.map((recipe) => {
              const { idMeal, strMeal, strMealThumb } = recipe;
              return (
                <Link key={idMeal} to={`/${idMeal}`}>
                  <div className="recipes__detail" key={idMeal}>
                    <img src={strMealThumb} alt={strMeal} />
                    <div className="recipes__name">
                      <h4>{strMeal}</h4>
                      <div>
                        <AiOutlineHeart />
                        <BsThreeDotsVertical />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Recipe;
