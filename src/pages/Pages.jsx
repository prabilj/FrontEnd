import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import { Route, Routes, useLocation } from 'react-router-dom';
import Searched from './Searched';
import Recipe from './Recipe';
import AddRecipe from './AddRecipe/AddRecipe';

import { AnimatePresence } from 'framer-motion';
import SignIn from './login/signin';
import Signup from './login/signup';
import PrivateRoutes from '../PrivateRoute/Privateroute';
import UpdateProfile from '../components/UpdateProfile';
import MyRecipes from '../components/MyRecipe';
import UpdateRecipe from '../components/UpdateRecipe';
import EditRecipe from '../components/UpdateRecipe';
import Footer from '../components/footer';

function Pages() {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home/>} />
            <Route path='/cuisine/:type' element={<Cuisine />} />
            <Route path='/searched/:search' element={<Searched />} />
            <Route path='/recipe/:id' element={<Recipe />} />
            {/* <Route path='/recepie/add' element = {<AddRecipe/>}/> */}
            <Route path='/signin' element = {<SignIn/>}/>
            <Route path='/signup' element = {<Signup/>}/>
            <Route  path='/UpdateProfile' element ={<UpdateProfile/>}/>
            <Route path='/MyRecipes' element ={<MyRecipes/>}/>
            <Route path='/EditRecipe/:id' element ={<EditRecipe/>}/>

            <Route path='/Footer' element ={<Footer/>}/>


            <Route element={<PrivateRoutes/>}>

            <Route path='/recepie/add' element = {<AddRecipe/>}/>
            </Route>
        </Routes>
        </AnimatePresence>
        
    )
}

export default Pages