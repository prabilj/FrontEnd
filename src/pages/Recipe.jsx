import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    let params = useParams();
    let navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions")

    const fetchDetails = async () => {
        const response = await axios.get(`http://localhost:3000/Recipes/${params.id}`);
        console.log(response.data.data)
       
        setDetails(response.data.data);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.id]);

    const handleEdit = () => {
       navigate(`/EditRecipe/${params.id}`)
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
        if (confirmDelete) {
          axios.delete(`http://localhost:3000/Recipes/${params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(() => {
              
              navigate('/MyRecipes');
            })
            .catch((error) => {
              console.error('Error deleting recipe:', error);
              alert('Failed to delete recipe');
            });
        }
    };
    const isOwner = details.userId === userId; // Check if the user is the owner of the recipe


  return (
    <DetailWrapper>
        <div>
            <h2 style={{ color: 'white'}}>{details.title}</h2>
            <img src={details.imageUrl} alt="" />
            {isOwner && ( 
                    <div>
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </div>
                )}
        </div>
        
        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button> 
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>    
            
            {activeTab === "instructions" && (

                <div>
                <h3 dangerouslySetInnerHTML={{__html: details.description}}></h3>
                <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div> 
            )}
            
            {activeTab === "ingredients" && (
                 <ul>
                {details.ingredients.map((ingredient) => (
                <li key={ingredient.name}>{ingredient.name} : {ingredient.quantity}</li>
                ))}
                </ul>

            )}
            
            

        </Info>

  </DetailWrapper>
    
  );
  
}

const DetailWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;

    .active {
       background-color: #990000;
       background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);

       color: white;
    }
    h2 {
        margin-bottom: 1rem;
        font-size: 30px;
    
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
        margin-left: 2rem;
    }
    ul {
        margin-top: 2rem;
    }

    img {
        width: 400px;
        filter: brightness(80%) saturate(150%);
    }

`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid #990000;
    margin-right: 2rem;
    font-weight: 600;
    margin-top: 3rem;
    cursor: pointer;
`;

const Info = styled.div`
    margin-left: 5rem;
    text-align: justify;
   
  
`;

export default Recipe