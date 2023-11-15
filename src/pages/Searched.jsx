import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Searched() {

  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();


  const getSearched = async (title) => {
    
        
        const data = await axios.get(`http://localhost:3000/search/${title}`)
       console.log(data)
        
        setSearchedRecipes(data.data);

    }

    useEffect(() => {
      // console.log(params.search)
      getSearched(params.search);
    },[params.search]);


  return <Grid>
    {searchedRecipes.map((item) => {
      return (
        <Card key={item._id}>
        <Link to={'/recipe/' + item._id}>
          <img src={item.imageUrl} alt="" />
          <h4>{item.title}</h4>
          </Link>
        </Card>
      )
    })}
  </Grid>
  
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 1rem;
        filter: brightness(80%) saturate(150%);

    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched 






