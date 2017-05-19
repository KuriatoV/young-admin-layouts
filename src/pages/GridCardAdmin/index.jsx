import React from 'react'
import GridCardAdmin from '../../components/GridCardAdmin/GridCardAdmin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {openModal, closeModal,preload} from 'react-isomorphic-tools'

@preload(
  ({fetchToState})=>{
  return Promise.all([
    fetchToState('/discounts-categories', {key: 'discountsCategories'}),
    // fetchToState('/discounts/category/1/?&pagination-off=1', {key: 'discountsAdmin'}),

])},
{alwaysReload: true}
)

@connect(state => ({
    discountsCategories:state.getIn(['fetchData','discountsCategories','response']),
    }), dispatch => ({
    actions: bindActionCreators({
        openModal,
        closeModal,
    }, dispatch)
}))
export default class GridCardAdminPage extends React.Component {

    render() {
        return (
            <GridCardAdmin {...this.props} />
        )
    }
}
