import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';



function Chinees() {

    const [chinees, setChineesRecipes] = useState([]);

    useEffect(() => {
        getChinees();
    }, []);

    const getChinees = async () => {

        console.log("hloo Chinees")
        const response = await axios.post('http://localhost:3000/Recipes/category', {category:"6530e1b5fd0aa8adead064e8"});
        console.log(response.data)
        setChineesRecipes(response.data);
            
    };


    return (
        <div>
                    <Wrapper>
                        <h3>Chinees Cusine</h3>

                        <Splide options={{
                            perPage: 5,
                            drag: 'free',
                            gap: '1rem',
                            arrows: false,
                        }}>

                        {chinees.map((recipe) => {
                           return (
                               <SplideSlide key={recipe._id}>
                            <Card>
                            <Link to={'/recipe/' + recipe._id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.imageUrl} alt={recipe.title} />
                                <Gradient />
                            </Link>
                            </Card>
                            </SplideSlide>
                           )
                        })}
                        </Splide>
                    </Wrapper>
                
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        width: 100%;
        height: 50%;
        position: absolute;
        object-fit: cover;
        left: 0;
        filter: brightness(60%) saturate(150%);
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 40%;
        color: white;
        transform: translate(-50%, 0%);
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 2, 2));
    `;

export default Chinees