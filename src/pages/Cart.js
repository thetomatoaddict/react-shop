import { useEffect, useState } from 'react';
import { Nav, Table, Button} from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import './../App.css';
import {plus, minus, del} from './../store.js'
function Cart(){
    let cart = useSelector((state)=>{return state.cart})
    let user = useSelector((state)=>{return state.user})
    let dispatch = useDispatch()
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                    {
                        cart.map(function(a,i){
                            i++
                            let id = a.id + 1
                            return (
                                <tr>
                                    <td>{i}</td>
                                    <td><img src={'https://codingapple1.github.io/shop/shoes' + id + '.jpg'} className='thumnail'/></td>
                                    <td>{a.name}</td>
                                    <td>{a.count}</td>
                                    <td>
                                    <button onClick={()=>{
                                        if (cart[i-1].count > 0){
                                        dispatch(minus(a.id))
                                        }
                                    }}>-</button><span> </span>
                                    <button onClick={()=>{
                                        dispatch(plus(a.id))
                                    }}>+</button>
                                    <button onClick={()=>{
                                        dispatch(del(a.id))
                                    }}>삭제</button>
                                        </td>
                                </tr>
                            )

                        })
                    }
                

            </tbody>
        </Table> 
    )
}

export default Cart;