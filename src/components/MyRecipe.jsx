import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    axios.get(`http://localhost:3000/userRecipes/${userId}`)
      .then((response) => {
        console.log("response",response);
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [userId]); 



return (
    <RecipeContainer>
      <h1 style = {{color : 'white' }}>My Recipes</h1>
      <RecipeGrid>
      {/* <div className="recipe-grid"> */}
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <div className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} />
              <p style={{ color: 'white' }}>{recipe.title}</p>
            </div>
          </Link>
        ))}
      </RecipeGrid>
    </RecipeContainer>
  );
}



export default MyRecipes;

const RecipeContainer = styled.div`
  text-align: center;
  padding: 20px;
  img{
    width: 100%;
    height:200px;
    margin-top:2rem;
    border-radius: 1rem;
    filter: brightness(80%) saturate(150%);

}
a {
  text-decoration: none;
}
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
    margin-top: 10px;
`;

const RecipeCard = styled(Link)`
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    object-fit: cover;
    filter: brightness(70%) saturate(150%);
}
`;

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const RecipeTitle = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;