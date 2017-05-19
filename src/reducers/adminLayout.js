import { fromJS,Map } from 'immutable';

const initialState=fromJS({
  itemsSettings:[],
  newItemsSettings:[],
  currentLayout:{name:'lg',cols:6,breakpoint:1200},
  currentCategory:0

});

export default (state = initialState, action)=>{
    switch (action.type){

        case 'SET_NEW_SETTINGS':{
        return state.set('newItemsSettings',action.settings)
        }
        case 'CHANGE_CATEGORY_SUCCESS':{
        return state.set('currentCategory',action.payload)
        }
        case 'SET_CURRENT_LAYOUT':{
        return state.set('currentLayout',Map(action.payload))
        }
        case 'UPDATE_LAYOUT_SETTINGS':{

       return state.set('itemsSettings',action.newItems)

        }
        case 'UPDATE_LAYOUT_SETTINGS_JSON':{
         return state.set('newItemsSettings',action.newItems)
        }
        case 'CALCULATE_CURRENT_LAYOUT':{
            let settings_arr=action.payload.map((item,i)=>{
              let layout_settings=JSON.parse(item.get('layout_settings'));
              //  || JSON.stringify({
              //    lg:{i:`${i}`,x:0,y:0,w:4,h:1,generated:true},
              //    md:{i:`${i}`,x:0,y:0,w:4,h:1,generated:true},
              //    sm:{i:`${i}`,x:0,y:0,w:4,h:1,generated:true},
              //    xs:{i:`${i}`,x:0,y:0,w:4,h:1,generated:true}
              //  }));
               return{id:item.get('id'),layout_settings:layout_settings,order_num:item.get('order_num')}})
            return state.set('itemsSettings',settings_arr)
        }
        default:
            return state
    }
}
