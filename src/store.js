import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers :{
        changeName(state){
            state.age ++
        }
    }
})
export let {changeName} = user.actions

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
        {id : 1, name : 'Red Knit', count : 1},
      ] ,
    reducers : {
        plus(state,action){
            let n = state.findIndex((a)=>{ return a.id === action.payload })
            state[n].count ++
        },
        minus(state,action){
            let n = state.findIndex((a)=>{ return a.id === action.payload })
            state[n].count --
        },
        del(state,action){
            let n = state.findIndex((a)=>{ return a.id === action.payload })
            state.splice(n,1)
        },
        addcart(state, action){
            state.push(action.payload)
        }
    }
})

export let {plus, minus, del, addcart} = cart.actions

export default configureStore({
  reducer: {
    cart : cart.reducer,
    user : user.reducer
}
   
})