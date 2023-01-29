import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import pdata from './data.js';
import { Route, Routes, Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(pdata)
  let [seeMore, setSeeMore] = useState(2)
  let [loading, setloading] = useState(false)
  let navigate = useNavigate()
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
          <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
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
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/event' element={<div><h4>오늘의 이벤트</h4><Outlet/></div>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path='two' element={<div>생일쿠폰 받기</div>}/>
        </Route>
      </Routes>

      
      
    </div>
    
  );
}

function Shoesitem(props){
  let detailNum = props.i - 1
  
  return(
    
  <div className="col-6 col-md-4">
    <Link to={"/detail/"+detailNum} className='link'>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} className='p-img'>
      </img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      </Link>
    </div>
  )

}





export default App;
