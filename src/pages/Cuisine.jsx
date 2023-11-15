import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams} from 'react-router-dom'; 
import axios from 'axios';



function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (category) => {
        console.log(category)
        const response = await axios.post('http://localhost:3000/Recipes/category', {category:category});
        console.log("cuisine",response)

        
        setCuisine(response.data);
    }

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type]);

  return <Grid
          animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}
          
        }
         >
        {cuisine.map((item) => {
            return (
                <Card key={item._id}>
                <Link to={'/recipe/' + item._id}>
                    <img src={item.imageUrl} alt="img"  style={{width:"250px",height:"250px"}} />
                    <h4>{item.title}</h4>
                </Link>
                </Card>
            )
        })}
    </Grid>
  
}

const Grid = styled(motion.div)`
    display: grid;
   
    grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
    margin-top: 10px;
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
        display:inline-block;
        text-align:center;
        padding: 1rem;
        
    }
`;

export default Cuisine