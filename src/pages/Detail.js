import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import './../App.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addcart } from './../store.js'


function Detail(props) {

  let { id } = useParams();
  let copy = Number(id) + 1
  let [alert, setalert] = useState(true)
  let [tab, setTab] = useState(1)
  let [fade, setfade] = useState('')
  let dispatch = useDispatch()
  let storage = localStorage.getItem('watched')
  let watched = JSON.parse(storage)




  useEffect(() => {
    let a = setTimeout(() => { setalert(false) }, 2000)
    setfade('fadeinend')

    watched.push(id)
    watched = new Set(watched)
    watched = Array.from(watched)
    localStorage.setItem('watched', JSON.stringify(watched))

    return () => {
      clearTimeout(a)
      setfade('')
    }
  }, [])

  return (
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
          <img src={"https://codingapple1.github.io/shop/shoes" + copy + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger" onClick={() => {
            let item = { id: Number(id), name: props.shoes[Number(id)].title, count: 1 }
            dispatch(addcart(item))
            console.log(item)
          }}>주문하기</button>
        </div>
        <div>
          <Nav fill variant="tabs" defaultActiveKey="link0" className='pt-5'>
            <Nav.Item>
              <Nav.Link eventKey="link0" onClick={() => { setTab(1) }}>탭 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link1" onClick={() => { setTab(2) }}>탭 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link2" onClick={() => { setTab(3) }}>탭 3</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <Modal tab={tab} shoes={props.shoes} />

      </div>
    </div>
  )
}

function Modal(props) {
  if (props.tab == 1) {
    return <div className='pt-3'>
      <h4>{props.shoes[0].title}</h4>
    </div>
  }
  if (props.tab == 2) {
    return <div className='pt-3'>
      <h4>{props.shoes[1].title}</h4>
    </div>
  }
  if (props.tab == 3) {
    return <div className='pt-3'>
      <h4>{props.shoes[2].title}</h4>
    </div>
  }


}

export default Detail;