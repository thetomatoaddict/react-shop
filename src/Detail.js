import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import pdata from './data.js';
import { Route, Routes, Link, useParams } from 'react-router-dom';


function Detail(props){
    let {id} = useParams();
    let copy = Number(id) + 1
    let [alert, setalert] = useState(true)
  
    useEffect(()=>{
      let a = setTimeout(()=>{setalert(false)}, 2000)
  
      return ()=>{
        clearTimeout(a) 
      }
    }, [])
  
    return(
      <div className="container">
        {
          alert == true ? 
          <div className='alert alert-warning'>
            2초 이내 구매시 할인
            </div>
            : null
        }
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

  export default Detail