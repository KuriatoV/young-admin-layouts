import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import GridCardAdmin from './pages/GridCardAdmin'

export const routes = (
    <Route path='/' component={App} name='Head'>
      <IndexRoute component={GridCardAdmin}/>
    </Route>
)
