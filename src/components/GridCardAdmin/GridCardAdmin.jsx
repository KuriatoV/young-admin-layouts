import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as adminLayoutActions from '../../actions/adminLayoutActions'
import {Responsive,WidthProvider } from 'react-grid-layout'
import ReactGridLayout  from 'react-grid-layout';
import adminGrid from './adminGrid.sass'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {isImmutable} from 'immutable'

@connect(state => ({
categoriesList:state.getIn(['adminLayout','categoriesList']),
categoryItems:state.getIn(['adminLayout','categoryItems']),
itemsSettings:state.getIn(['adminLayout','itemsSettings']),
newItemsSettings:state.getIn(['adminLayout','newItemsSettings']),
currentLayout:state.getIn(['adminLayout','currentLayout']),
currentCategory:state.getIn(['adminLayout','currentCategory']),
layout:state.getIn(['adminLayout','layout']),
}), dispatch => ({
  actions: bindActionCreators({
    ...adminLayoutActions,
    },dispatch
  )
}))

export default class GridAdminComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    };
    this.props.actions.loadCategoriesList();
  }

generateLayoutsSettings= (items)=>()=>{
 let itemsArr=[];
 items.map(it=>{
  let layout_settings={
    lg:this.layoutFromCols(6,items).find(f=>f.num==it.id),
    md:this.layoutFromCols(3,items).find(f=>f.num==it.id),
    sm:this.layoutFromCols(2,items).find(f=>f.num==it.id),
    xs:this.layoutFromCols(1,items).find(f=>f.num==it.id)
  }
  itemsArr.push({id:it.id,order_num:it.order_num,layout_settings:JSON.stringify(layout_settings)})
})
  this.props.actions.setNewSettings(itemsArr);
 }

layoutFromCols= (cols,items)=>{
  let layoutArr=[];
  let counterX=0;
  let counterY=0;
  items.map((item, i)=>{
  if (i!=0){counterX+=Math.floor(12/cols)}
  if (counterX==12){counterY+=Math.floor(12/cols);counterX=0}
  layoutArr.push({num:`${item.id}`,i:`${i}`,x:counterX, y:counterY, w: Math.floor(12/cols), h: Math.floor(12/cols) })  });
    return layoutArr
  }


// generateLayout= ()=>{
//   const {categoryItems,currentLayout} =this.props
//   //  let cols=currentLayout.get('cols') // here fix
//   let layoutArr=[];
//   let counterX=0;
//   let counterY=0;
//   categoryItems.map((item, i)=>{
//   let lol=JSON.parse(item.get('layout_settings'))[currentLayout.get('name')]
//   layoutArr.push(lol)
//  });
//     return layoutArr
//   }

saveChangesToLayout=()=>(e)=>{
this.props.actions.updateLayoutSettings();
}

onLayoutChange= ()=>(layout)=>{
  let layoutName=this.props.currentLayout.get('name');
  this.props.layout[layoutName] && this.props.actions.updateLayout(layout,layoutName)

}


saveLayouts= ()=>()=>{
  const {currentCategory,layout,categoryItems}=this.props


  let itemsJSON=[];
  let items=categoryItems;
  if (items.length){
    items.map((it,idx)=>{
    let layout_settings=JSON.parse(it.layout_settings);
    Object.keys(layout_settings).map(each=>layout_settings[each]=layout[each][idx])
    itemsJSON.push({id:it.id,order_num:it.order_num,layout_settings:JSON.stringify(layout_settings)})
   })

  }
  this.props.actions.saveLayouts(itemsJSON,currentCategory)
}

setLayout= (colsCount,l_name,breakpoint)=>(e)=>{
  this.props.actions.setCurrentLayout(l_name,colsCount,breakpoint);
}
choseCategory= (category)=>()=>{
  let id=category.get('id');
  this.props.actions.changeActiveCategory(id);
}
  render() {
    const {
      itemsSettings,
      newItemsSettings,
      categoryItems,
      currentLanguage,
      discountFilter,
      currentLayout,
      categoriesList,
      currentCategory,
      layout
    }=this.props
  //  const {currentCategory} =this.state


    return(
      <div className='admin-grid-wrapper'>
        <div className='admin-grid'>
          {categoriesList && categoriesList.map(category=>{return(
            <div
              key={category.get('id')}
              className={currentCategory==category.get('id') ? 'admin-grid__category-item--active' :'admin-grid__category-item'}
              onClick={this.choseCategory(category)}>
              {category.get('title').toUpperCase()}
            </div>
          )
          })}
        </div>
        <div>
          <span
            className={currentLayout.get('name')=='lg' ? 'admin-grid__screen-button--active':'admin-grid__screen-button'}
            onClick={this.setLayout(6,'lg',1200)}>
            Large screen
          </span>
          <span
            className={currentLayout.get('name')=='md' ? 'admin-grid__screen-button--active':'admin-grid__screen-button'}
            onClick={this.setLayout(3,'md',900)}>
            Medium screen
          </span>
          <span
            className={currentLayout.get('name')=='sm' ? 'admin-grid__screen-button--active':'admin-grid__screen-button'}
            onClick={this.setLayout(2,'sm',600)}>
            Small screen
          </span>
          <span
            className={currentLayout.get('name')=='xs' ? 'admin-grid__screen-button--active':'admin-grid__screen-button'}
            onClick={this.setLayout(1,'xs',400)}>
            Extra small screen
          </span>

          {/* <div>Current layout ,{currentLayout.get('name') }  cols={currentLayout.get('cols')}</div>
          <div>Current breakpoint {currentLayout.get('breakpoint')}</div> */}
          {/* <button onClick={this.saveChangesToLayout(currentLayout.get('name'))}>save layout for {currentLayout.get('breakpoint')}///{currentLayout.get('name')}</button> */}
          {/* <button onClick={this.generateLayoutsSettings(categoryItems)}>GENERATE DEFAULT LAYOUT SETTINGS </button> */}
        </div>
        <div className='admin-grid__save-button--wrapper'>
          {  categoriesList && categoriesList.find(category=>category.get('id')==currentCategory) &&
            <button onClick={this.saveLayouts()} className='admin-grid__save-button' >
              SAVE LAYOUTS FOR  <span className='admin-grid__save-button--text'>{categoriesList.find(category=>category.get('id')==currentCategory).get('title').toUpperCase()}</span>
            </button>
          }

        </div>
        { <div style={{width:`${currentLayout.get('breakpoint')}px`,margin:'0 auto'}}>
          <ReactGridLayout
            // className='layout'
            rowHeight={100}
            // margin={[5, 5]}
            width={currentLayout.get('breakpoint')}
            onLayoutChange={this.onLayoutChange()}
            layout={layout[currentLayout.get('name')]}
          >
            {categoryItems &&
              categoryItems.map((item,i)=>{
                let size=item.image_size_type;
                return(
                  <div
                    className='card'
                    key={i}
                    style={{background:`${size==1 ? 'purple' : size==2 ? 'skyblue': size==3 ? 'orange': 'red'}` }}
                  >
                    {/* {this.dataGrid(item.toJS(),currentLayout.toJS(),i,itemsSettings).generated ? <p>AUTOGENERATED</p>: <p>ITS OK</p>} */}
                    <p>item id =>{item.id}</p>
                    <p>id of mapping {i}</p>
                    {/* <img  className='card__img' src={`/uploads/${item.get('image')}`}  alt={item.get('image')} /> */}
                    <div className='card__hover'>
                      <div className='card__hover-bottom'>
                        <div className='card__hover-center'>
                          <span className='card__hover-title'>When you order with them in-store</span>
                          <button type='button' className='button button--block card__button'>Redeem Online</button>
                        </div>
                      </div>
                    </div>
                    <span className='card__figcaption'>10% Of At</span>
                  </div>
                )
              })}
          </ReactGridLayout>
        </div>
        }
      </div>

    )
  }
}
