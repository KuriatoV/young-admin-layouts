import React from 'react'
import {ImmutableLoadingBar as LoadingBar} from 'react-redux-loading-bar'
import Helmet from 'react-helmet'
import config from '../../../config'
import {setBaseUrl, setInitPreload, fetcher, Auth} from 'react-isomorphic-tools'
//for material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const {baseUrl} = config()
setBaseUrl(baseUrl)

setInitPreload( async({dispatch})=>{
  if (Auth.isAuthenticated()) {
    const response = await fetcher('/profile')
    dispatch({
        type: 'ACCOUNT_SUCCESS',
        payload: response
    })
  }
})

class App extends React.Component {
    constructor() {
        super();
        const isDev = process.env.NODE_ENV == 'development'
        this.link = [{
            rel: 'icon',
            type: 'image/png',
            href: require('../../../assets/favicon.png'),
            sizes: '150x150'
        }]
        if (!isDev) {
            this.link.push({
                href: '/public/style.css',
                type: 'text/css',
                rel: 'stylesheet'
            })
        }

    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({
                fontFamily: 'Lato, sans-serif',
                palette: {
                    primary1Color: "#f9e200",
                    pickerHeaderColor: "#f9e200"
                },
            }, {
                avatar: {
                    borderColor: null,
                },
            })}>
            <div>
              <LoadingBar style={{
                    backgroundColor: "#f00",
                    top: 0,
                    height: "2px",
                    zIndex: "10000",
                    position: "fixed",
                    boxShadow: "1px 1px 4px 0px rgba(50, 50, 50, 0.75)"
              }}/>
              <Helmet title="Young Han Bao" link={this.link}/>
              {this.props.children}
            </div>
        </MuiThemeProvider>
        )
    }
}
export default App
