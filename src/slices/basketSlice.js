import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items=[...state.items,action.payload]
    },
    removeFromBasket: (state, action) => {
      const index=state.items.findIndex(item=>item.id===action.payload.id)
      let newBasket=[...state.items];
      if(index>=0){
        newBasket.splice(index,1)
      }else{
        console.warn("Can not remove unexisting item!!")
      }
      state.items = newBasket;
      
      // we didn't use the code below fliter because if there is more than 1 quantity from an item it will remove it all
      // state.items=state.items.filter(item=>item.id!==action.payload.id)
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total,item)=>total+item.price,0);

export default basketSlice.reducer;
