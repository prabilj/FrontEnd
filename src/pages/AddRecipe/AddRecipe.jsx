import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './custom-quill.css';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../STYLES/AddRecipe.css'
import './AddRecipe.css'
import Category from '../../components/Category';
let userId = localStorage.getItem("userId")
function AddRecipe() {
  const navigate = useNavigate();
 
  console.log("userId-------",userId)
  const [categories, setCategories] = useState([])
  const [responseData, setResponseData] = useState('');
  const [recipeData, setRecipeData] = useState({
        title: '',
        description: '',
        ingredients: [],
        instructions: '',
        cookingTime: 0,
        serving: 0,
        imageUrl: '',
        category: '',
        difficulty: '',
      });
      useEffect(() => {
        getCategories();
    },[]);
    const getCategories = async () => {
      const response = await axios.get('http://localhost:3000/category');
      console.log(response.data)
      setCategories(response.data.data)
      
  }
  const quillModules = {
    toolbar: [[]], // An empty array means no toolbar
  };
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
      };
      // const onCategoryChange = (e) => {

      // }
    
      const handleAddIngredient = () => {
        setRecipeData({
          ...recipeData,
          ingredients: [...recipeData.ingredients, { name: '', quantity: '' }],
        });
      };
    
      const handleIngredientChange = (index, event) => {
        const updatedIngredients = [...recipeData.ingredients];
        updatedIngredients[index][event.target.name] = event.target.value;
        setRecipeData({ ...recipeData, ingredients: updatedIngredients });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        recipeData.imageUrl  = responseData
        recipeData.userId = userId
        console.log(recipeData)
        try {
          const response = await axios.post('http://localhost:3000/Recipes', recipeData);
          console.log('Recipe added successfully', response.data);
          navigate("/");

          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success',
          //   text: 'Recipe added sucessfully', 
          // })
          
          // You can handle success, e.g., redirect to the recipe details page
        } catch (error) {
          console.error('Failed to add recipe', error);
        
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Failed to add recipe. Please try again later'
        // })
        }
      };
    


      const handleFileChange = async (event) => {
        const file = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:3000/fileupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("response.data file",response.data)
            setResponseData(response.data)
            console.log("responseData",responseData)

            // setRecipeData({ ...recipeData, imageUrl: responseData });
            console.log("recipeData",recipeData)

            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };
      return (
        <div className='recepie-group'> 
        <div className='recepie-add-form'>
          <h2>Create a Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='title'>Recipe Title:</label>
              <input
                type='text'
                id='title'
                name='title'
                value={recipeData.title}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div>
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                name='description'
                value={recipeData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Ingredients:</label>
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <input
                    type='text'
                    name='name'
                    placeholder='Ingredient Name'
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required
                  />
                  <input
                    type='text'
                    name='quantity'
                    placeholder='Quantity'
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required
                  />
                </div>
              ))}
              <div className='btn-sub'>  <button type='button' onClick={handleAddIngredient}>
                Add Ingredient
              </button> </div>
             
            </div>
    
            {/* <div>
              <label htmlFor='instructions'>Instructions:</label>
              <ReactQuill
                id='instructions'
                name='instructions'
                value={recipeData.instructions}
                // onChange={handleInputChange}
                onchange={(value) => setRecipeData({...recipeData, instructions: value})}
                modules={{ toolbar: false }}
                required
              />
            </div> */}

<div>
  <label htmlFor='instructions'>Instructions:</label>
  <ReactQuill
    id='instructions'
    name='instructions'
    value={recipeData.instructions}
    onChange={(value) => setRecipeData({ ...recipeData, instructions: value })}
    // modules={{ toolbar:  ['blockquote'], }}
    modules={{
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote'], // Added blockquote for paragraphed content
        ['link', 'image'],
        ['clean'],
      ],
    }}
  //  style={{ color: 'white' }}
    style={{ color: 'black', backgroundColor: 'your-background-color' }}
    formats={[
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'blockquote',
      'link',
      'image',
    ]}

    required
  />
</div>

    
            <div>
              <label htmlFor='cookingTime'>Cooking Time (minutes):</label>
              <input
                type='number'
                id='cookingTime'
                name='cookingTime'
                value={recipeData.cookingTime}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div>
              <label htmlFor='serving'>Serving Size:</label>
              <input
                type='number'
                id='serving'
                name='serving'
                value={recipeData.serving}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div>
              <label htmlFor='imageUrl'>Image URL (optional):</label>
             
              <input
                type='file'
                id='imageUrl'
                name='imageUrl'
                // value={recipeData.imageUrl}
                onChange={handleFileChange}
              />
            </div>
    
      
            <div>
              <label htmlFor='category'>Categories:</label>
              <select
                id='category'
                name='category'
                value={recipeData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((Category)=>(
                  <option value={Category._id}>{Category.category}</option>
                ))}
                
              </select>
            </div>
    
            <div>
              <label htmlFor='difficulty'>Difficulty:</label>
              <select
                id='difficulty'
                name='difficulty'
                value={recipeData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value=''>Select Difficulty</option>
                <option value='Easy'>Easy</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Advanced'>Advanced</option>
              </select>
            </div>
    
            <button type='submit'>Submit Recipe</button>
          </form>
        </div>
        </div>
      );
}

export default AddRecipe