import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import pdata from './data.js';
import { Route, Routes, Link, useParams, Outlet, useNavigate, json } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Shoesitem from './ShoesItem';
import axios from 'axios';

function App() {

  useEffect(() => {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])


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
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
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
              shoes.map(function (a, i) {
                return (
                  <Shoesitem shoes={shoes[i]} i={i + 1} />
                )

              })
            }
          </div>

          {
            seeMore < 4 ?
              <button onClick={() => {
                setloading(true)
                axios.get('https://codingapple1.github.io/shop/data' + seeMore + '.json')
                  .then((pdata2) => {
                    let copy = [...shoes, ...pdata2.data]
                    setShoes(copy)
                    setSeeMore(seeMore + 1)
                    setloading(false)
                  })
                  .catch(() => {
                    setloading(false)
                    console.log('?????????')
                  })
              }}>?????????</button>
              : null
          }
        </></div>}></Route>
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/event' element={<div><h4>????????? ?????????</h4><Outlet /></div>}>
          <Route path='one' element={<div>??? ????????? ???????????? ?????????</div>} />
          <Route path='two' element={<div>???????????? ??????</div>} />
        </Route>
      </Routes>



    </div>

  );
}







export default App;
