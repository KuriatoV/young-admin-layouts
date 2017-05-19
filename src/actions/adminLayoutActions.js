import { fetcher,fetchToState} from 'react-isomorphic-tools'

export const testLayout = (layout)=>async (dispatch)=> {
  await dispatch({
    type: 'TEST_LAYOUT_UPDATE',
    layout
  })
}

export const updateLayoutSettings = (newItems)=>async (dispatch)=> {
    await dispatch({
               type: 'UPDATE_LAYOUT_SETTINGS',
               newItems
           })
     }
export const updateLayoutSettingsJSON = (newItems)=>async (dispatch)=> {
    await dispatch({
               type: 'UPDATE_LAYOUT_SETTINGS_JSON',
               newItems
           })
     }
export const calculateCurrentLayout = (categoryItems)=>async (dispatch)=> {
    await dispatch({
               type: 'CALCULATE_CURRENT_LAYOUT',
               payload: categoryItems
           })
     }
export const setCurrentLayout = (name,cols,breakpoint)=>async (dispatch)=> {
    await dispatch({
               type: 'SET_CURRENT_LAYOUT',
               payload: {name,cols,breakpoint}
           })
     }
export const setNewSettings = (settings)=>async (dispatch)=> {
    await dispatch({
               type: 'SET_NEW_SETTINGS',
               settings
           })
     }
     export const saveLayouts = (data,id) => async (dispatch) => {
         try{
             const response =await fetcher('/discounts-set-layout-settings', {
                 params: {
                     ...data
                 },
                 method: 'POST'
             })
             //
             await fetchToState(`/discounts/category/${id}/?&pagination-off=1`, {key: 'discountsAdmin'});
             dispatch({
                 type: 'SAVE_LAYOUTS_SUCCESS',

             })
          }
         catch (e){
             dispatch({
                 type: 'SAVE_LAYOUTS_ERROR',
                 payload: e
             })

         }
     }
     export const changeActiveCategory = (id) => async (dispatch) => {
      //  console.log('changeActiveCategory works',id);
       const URL=`/discounts/category/${id}/?&pagination-off=1`;

       await dispatch(fetchToState(URL, {key: 'discountsAdmin'}));
         try{
           await dispatch(fetchToState(URL, {key: 'discountsAdmin'}));
             dispatch({
                 type: 'CHANGE_CATEGORY_SUCCESS',
                 payload: id
             })
          }
         catch (e){
             dispatch({
                 type: 'CHANGE_CATEGORY_ERROR',
                 payload: e
             })

         }
     }