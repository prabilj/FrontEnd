import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {GiNoodles, GiPizzaSlice, GiHamburger, GiIceCreamCone, GiHotDog, GiChopsticks } from 'react-icons/gi';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const foodIcons = [GiNoodles, GiPizzaSlice,GiChopsticks,FaHamburger, GiHamburger, GiIceCreamCone, GiHotDog,FaPizzaSlice];
function Category() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories();
    },[]);
    const getCategories = async () => {
      const response = await axios.get('http://localhost:3000/category');
      console.log(response.data)
      setCategories(response.data.data)
      
    }
    const getRandomFoodIcon = () => {
        const randomIndex = Math.floor(Math.random() * foodIcons.length);
        const RandomFoodIcon = foodIcons[randomIndex];
        return <RandomFoodIcon size={25} />;
      };
      const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
      };
  return (
    // <Slider {...settings}>
    <List>
        

        {categories.map((cate)=>(
    //         return (
                // <SplideSlide key={cate._id}>
           <SLink to={`/cuisine/${cate._id}`}>
            
           {getRandomFoodIcon()}
           <h4>{cate.category}</h4>
       </SLink> 
        ))}
    </List>
    // </Slider>
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
`;
const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    padding:5px;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4 {
        color: white;
        font-size: 0.8rem;
        text-align:center;

    }
 
    svg {
        color: white;
        font-size: 1.8rem;
    }
    &.active {
     
        background: linear-gradient(-250deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);

        svg {
            color: white;
        }
        h4{
            color: white;
        }

    }
`;

export default Category
