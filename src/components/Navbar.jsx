import React ,{useState}from 'react'
import Search from '../components/Search';
import logo from "../images/Culilnaryguide.png"
import styled from 'styled-components';
import { Link ,useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



function Navbar() {
  const settoken = localStorage.getItem('token')
  const name = localStorage.getItem('name')
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear()
    navigate('/');
    handleClose();
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
 
  
    return (
       <mainNav>
         <Nav>
          <img src={logo} width='60px' alt='logo' />
          <Logo to={'/'}>Culineryguide</Logo>
          <Search />
          
         

             <button style={{padding:"10px",margin:"10px"}} ><a style={{ color: 'white',textDecoration:"none"}} href='/recepie/add'>Add Receipe</a></button>

              {!!settoken?(
                <div >
                <Avatar onClick={handleMenuOpen}>
                  {name[0].toUpperCase()}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  
                <MenuItem><Link style={{textDecoration:"none"}} to = {'/updateProfile'}> Edit Profile</Link></MenuItem>
                <MenuItem><Link style={{textDecoration:"none"}}to = {'/MyRecipes'}> My Recipes</Link></MenuItem>
                <MenuItem style={{ color: 'black'}} onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
              ):
               <LoginButton  style={{marginTop:"13px"}}
              ><a  style={{ color: 'white',textDecoration:"none"}}
              href='/signin'>Login</a></LoginButton>
              
            }
          
           
        </Nav>
       </mainNav>
    );
};

const mainNav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  `;



const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Pacifico', cursive;
  background: linear-gradient(to right, #231557 0%, #FF1361 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg{
    font-size: 2rem;
    
  
  }`;
  const LoginButton = styled.button`
  background-color: #990000; /* Red color */
  background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%); /* Gradient */
  color: white; /* White text color */
  padding: 16px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
 
`;


export default Navbar;