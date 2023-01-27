import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import pdata from './data.js';
import { Route, Routes, Link, useParams } from 'react-router-dom';


function Detail(props){
    let {id} = useParams();
    let copy = Number(id) + 1
    let [alert, setalert] = useState(true)
    let [tab, setTab] = useState(1)
    let [fade, setfade] = useState('')
  
    useEffect(()=>{
      let a = setTimeout(()=>{setalert(false)}, 2000)
      setfade('fadeinend')
  
      return ()=>{
        clearTimeout(a)
        setfade('')
      }
    }, [])
  
    return(
      <div className={"container fadeinstart " + fade}>
        {
          alert == true ? 
          <div className='alert alert-warning'>
            2초 이내 구매시 할인
            </div>
            : null
        }
    <div className="row">
      <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes" + copy + ".jpg"} width="100%"/>
      </div>
      <div className="col-md-6">
        <h4 className="pt-5">{props.shoes[id].title}</h4>
        <p>{props.shoes[id].content}</p>
        <p>{props.shoes[id].price}</p>
        <button className="btn btn-danger">주문하기</button> 
      </div>
      <div>
        <Nav fill variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>{setTab(1)}}>탭 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1"onClick={()=>{setTab(2)}}>탭 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2"onClick={()=>{setTab(3)}}>탭 3</Nav.Link>
          </Nav.Item>
        </Nav>  
      </div>
      <Modal tab={tab}/>
      
    </div>
  </div>
    )
  }

  function Modal(props){
    if (props.tab == 1) {
      return <div className='pt-3'>
          <h4>모달내용 1</h4>
        </div>
    }
    if (props.tab == 2) {
      return <div className='pt-3'>
          <h4>모달내용 2</h4>
        </div>
    }
    if (props.tab == 3) {
      return <div className='pt-3'>
          <h4>모달내용 3</h4>
        </div>
    }
      
    
  }

  export default Detail;