import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import pdata from './data.js';
import { Route, Routes, Link, useParams } from 'react-router-dom';

function App() {
  let [shoes] = useState(pdata)

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
    <div class="row p-3">
        {
        shoes.map(function(a, i){
          return(
          <Shoesitem shoes={shoes[i]} i={i+1}/>
          )
          
        })
      }

      </div>
      </></div>}></Route>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}></Route>
      </Routes>

      
      
    </div>
    
  );
}

function Shoesitem(props){
  
  return(
    
  <div className="col-6 col-md-4">
    <Link to="/detail" className='link'>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} className='p-img'>
      </img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      </Link>
    </div>
  )

}

function Detail(props){
  let {id} = useParams();
  let copy = Number(id) + 1
  return(
    <div className="container">
  <div className="row">
    <div className="col-md-6">
      <img src={"https://codingapple1.github.io/shop/shoes" + copy + ".jpg"} width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">{props.shoes[id].title}</h4>
      <p>{props.shoes[id].content}</p>
      <p>{props.shoes[id].price}</p>
      <button className="btn btn-danger">주문하기</button> 
    </div>
  </div>
</div>
  )
}


export default App;
