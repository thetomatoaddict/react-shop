import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import pdata from './data.js';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(pdata)
  let [seeMore, setSeeMore] = useState(2)
  let [loading, setloading] = useState(false)

  return (
    
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Link to="/" className='link'>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand></Link>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
       
          <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#pricing" className='me-3'>My Page</Nav.Link>
          <Nav.Link href="#pricing">Cart</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      

      <Routes>
        <Route path='/' element={<div><>
    <div className='main-bg'></div>
    {
      loading == true ?
      <div className='alert warning-alert'> Loading ...</div>
      : null
    }
    <div class="row p-3">
        {
        shoes.map(function(a, i){
          return(
          <Shoesitem shoes={shoes[i]} i={i+1}/>
          )
          
        })
      }
      </div>
      
      {
        seeMore < 4 ?
        <button onClick={()=>{
          setloading(true)
          axios.get('https://codingapple1.github.io/shop/data' + seeMore +'.json')
          .then((pdata2)=>{
            let copy = [...shoes, ...pdata2.data]
            setShoes(copy)
            setSeeMore(seeMore+1)
            setloading(false)
          })
          .catch(()=>{
            setloading(false)
            console.log('실패함')
          })
        }}>더보기</button>
        : null
      }
      </></div>}></Route>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}></Route>
      </Routes>

      
      
    </div>
    
  );
}

function Shoesitem(props){
  
  return(
    
  <div className="col-6 col-md-4">
    <Link to={"/detail/"+props.i} className='link'>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} className='p-img'>
      </img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      </Link>
    </div>
  )

}




export default App;
