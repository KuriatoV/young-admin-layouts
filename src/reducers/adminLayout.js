import { fromJS,Map } from 'immutable';

const initialState=fromJS({
  currentLayout:{name:'lg',cols:6,breakpoint:1200},
  currentCategory:0,
  categoriesList:[],
  categoryItems:[],
  itemsSettings:[],
  newItemsSettings:[],
  layout:{
    lg:[],
    md:[],
    sm:[],
    xs:[]
   }
});

export default (state = initialState, action)=>{
    switch (action.type){

        case 'LOAD_CATEGORIES_LIST_SUCCESS':{
        return state.set('categoriesList',fromJS(action.payload))
        }
        case 'CHANGE_CATEGORY_SUCCESS':{
          return state.set('currentCategory',action.payload).set('categoryItems',action.categoryItems)
        }
        case 'GET_CURRENT_LAYOUT':{
          let layout={lg:[],md:[],sm:[],xs:[] };
          action.payload.map((item,i)=>{
          Object.keys(layout).map(each=>{
            layout[each].push(JSON.parse(item.layout_settings)[each])
          })
          })
         return state.set('layout',layout)
        }
        case 'UPDATE_LAYOUT':{
          let layout=state.get('layout');
          layout[action.layoutName]=action.layout;
         return state.set('layout',layout)
        }

        case 'SET_CURRENT_LAYOUT':{
        return state.set('currentLayout',Map(action.payload))
        }
        case 'SAVE_LAYOUTS_SUCCESS':{
         return initialState.set('categoriesList',state.get('categoriesList'))
        }
        default:
            return state
    }
}
