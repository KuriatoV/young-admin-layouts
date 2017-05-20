import { fromJS,Map } from 'immutable';

const initialState=fromJS({
  currentLayout:{name:'lg',cols:6,breakpoint:1200},
  currentCategory:0,
  categoriesList:[],
  categoryItems:[],
  itemsSettings:[],
  newItemsSettings:[],
  layout:{lg:[],md:[],sm:[],xs:[] }
});

export default (state = initialState, action)=>{
    switch (action.type){

        case 'reset':{
        return state
        }
        case 'LOAD_CATEGORIES_LIST_SUCCESS':{
        return state.set('categoriesList',fromJS(action.payload))
        }
        case 'SET_NEW_SETTINGS':{
        return state.set('newItemsSettings',action.settings)
        }
        case 'CHANGE_CATEGORY_SUCCESS':{
        return state.set('currentCategory',action.payload).set('categoryItems',action.categoryItems)
        }
        case 'SET_CURRENT_LAYOUT':{
        return state.set('currentLayout',Map(action.payload))
        }
        case 'UPDATE_LAYOUT_SETTINGS':{
        return state.set('itemsSettings',fromJS(action.newItems))
        }
        case 'UPDATE_LAYOUT_SETTINGS_JSON':{
         return state.set('newItemsSettings',action.newItems)
        }
        case 'SAVE_LAYOUTS_SUCCESS':{
         return state.set('categoryItems',action.payload)
        }
        case 'GET_CURRENT_LAYOUT':{

          let layout={lg:[],md:[],sm:[],xs:[] };
          action.payload.map((item,i)=>{
          Object.keys(layout).map(each=>{
            layout[each].push(JSON.parse(item.layout_settings)[each])
          })
            // layout.lg.push{JSON.parse(item.layout_settings).lg}
          })
          

         return state.set('layout',layout)
        }
        case 'CALCULATE_CURRENT_LAYOUT':{
          let settings_arr=fromJS(action.payload).map((item,i)=>{
            item=fromJS(item)
          let layout_settings=JSON.parse(item.get('layout_settings'));

             console.log(item.get('id'),layout_settings);
             return{id:item.get('id'),layout_settings:layout_settings,order_num:item.get('order_num')}
           })
          return state.set('itemsSettings',settings_arr)
        }
        default:
            return state
    }
}
