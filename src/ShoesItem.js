import './App.css';
import { Link } from 'react-router-dom';


function Shoesitem(props) {
    let detailNum = props.i - 1
  
    return (
  
      <div className="col-6 col-md-4">
        <Link to={"/detail/" + detailNum} className='link'>
          <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} className='p-img'>
          </img>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
        </Link>
      </div>
    )
  
  }

  export default Shoesitem;