import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 import './UpdateReceipe.css'
function EditRecipe(props) {
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    cookingTime: '',
    serving: '',
    imageUrl: '',
    category: '',
    difficulty: '',
  });
  const [image,setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseData,setResponseData] = useState(null);
  const navigate = useNavigate();

  const {id} = useParams();
  //console.log("recipeId",recipeId)
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
        setSelectedFile(response.data)

        setRecipeData({ ...recipeData, imageUrl: response.data });
        console.log("recipeData",recipeData)

        alert('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
    }
};

  useEffect(() => {
    
    // Fetch the existing recipe data based on the recipeId
    axios.get(`http://localhost:3000/Recipes/${id}`)
      .then((response) => {
        console.log("update-----",response);
        const existingRecipeData = response.data.data;
        setRecipeData(existingRecipeData);
        setImage(response.data.data.imageUrl)
      })
      .catch((error) => {
        console.error('Error fetching recipe data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

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
    console.log('submit',recipeData)

    try {
      const response = await axios.put(`http://localhost:3000/Recipes/${id}`, recipeData);
      console.log(recipeData)
      if (response.status === 200) {
        alert('Recipe updated successfully');
        navigate('/MyRecipes')
      } else {
        alert('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the recipe');
    }
  };
  const handleDelete = async (e,ingredientIdd) => {
    e.preventDefault();
    const recepieId = id;
    
    const ingredientId = ingredientIdd;
  
    try {
      // Send DELETE request to the server
      const response = await axios.delete(`http://localhost:3000/Recipes/${recepieId}/ingredients/${ingredientId}`);
      
      if (response.status === 200) {
        // If the deletion is successful, update the state
        const updatedItems = recipeData.ingredients.filter(ingredient => ingredient._id !== ingredientId);
        setRecipeData({ ...recipeData, ingredients: updatedItems });
        alert('Ingredient deleted successfully!');
      } else {
        alert('Failed to delete ingredient');
      }
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      alert('An error occurred while deleting the ingredient');
    }
  };
  

  return (
    <div className='UpdateRecipe' >
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>

        <div className='UpdateRecepie-add-form '>
          <label style={{ color: 'black' }}>Title:</label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className='UpdateRecepie-add-form '>
          <label style={{ color: 'black' }}>Description:</label>
          <textarea
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            rows="10" cols="50"
          />
        </div>

        <div className='UpdateRecepie-add-form-outline '>
          <label style={{ color: 'black' }}>Ingredients:</label>
          {recipeData.ingredients.map((ingredient, index) => (
            <div className='UpdateRecepie-add-form-ingre 'key={index}>
              <input
                type="text"
                name={`name`}
                placeholder='Ingredient Name'
                defaultValue={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
             <button key={id} onClick={(e) => handleDelete(e, ingredient._id)}>Delete</button>
              <input
                type="text"
                name={`quantity`}
                placeholder='Quantity'
                defaultValue={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
            </div>
          ))}
          <button type='button' onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className='UpdateRecepie-add-form '>
          <label style={{ color:'black' }}>Instructions:</label>
          <textarea
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            rows="9" cols="5"
           
          />
        </div>

        <div className='UpdateRecepie-add-form '>
          <label style={{ color: 'black' }}>Cooking Time:</label>
          <input
            type="number"
            name="cookingTime"
            value={recipeData.cookingTime}
            onChange={handleChange}
          />
        </div>

        <div className='UpdateRecepie-add-form '>
          <label style={{ color: 'black' }}>Serving Size:</label>
          <input
            type="number"
            name="serving"
            value={recipeData.serving}
            onChange={handleChange}
          />
        </div>

        <div className='UpdateRecepie-add-form '>
  {/* <label style={{ color: 'black' }}>Image URL:</label>
  <input
    type="text"
    name="imageUrl"
    value={recipeData.imageUrl}
    onChange={handleChange}
  /> */}
  {recipeData.imageUrl && (
    <img src={recipeData.imageUrl} alt="Recipe" style={{ maxWidth: '100%' }} />
  )}
</div>
<div className='UpdateRecepie-add-form '>
  <label style={{ color: 'black' }}>Image:</label>
  <input
    type="file"
    name="imageFile"
    accept="image/*"
    onChange={handleFileChange}
  />
  {/* {selectedFile && (
    <img
      src={selectedFile}
      alt="Selected Recipe"
      style={{ maxWidth: '100%', marginTop: '10px' }}
    />
  )} */}
</div>
        <div className='UpdateRecepie-add-form '>
          <label style={{ color: 'black' }}>Category:</label>
          <input
            type="text"
            name="category"
            value={recipeData.category.category}
            onChange={handleChange}
            disabled
          />
        </div>
        

        <div className='UpdateRecepie-add-form '>
          <label style={{ color: 'black' }}>Difficulty:</label>
          <input
            type="text"
            name="difficulty"
            value={recipeData.difficulty}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}



export default EditRecipe;




