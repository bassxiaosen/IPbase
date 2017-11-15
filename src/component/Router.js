/**
 * Created by bassxiaosen1 on 2017/10/21.
 */
import React from "react"
import {Router,Route,hashHistory} from "react-router"
import App from "./App"
import Login from "./Login/Login"
import User from "./User/User"
import Arrangement from "./Arrangement/Arrangement"
import Dynamic from "./Dynamic/Dynamic"
import Project from "./Project/Project"

import cookie from "js-cookie"



export default class Routers extends React.Component{
    checkAuth=(nextState,replace)=>{
        if(!cookie.get('token')){
            // Redirect to Login
            replace({ pathname: '/' })
        }
    };

    render(){
        return(
            <Router history={hashHistory}>
                <Route path="/login" component={Login}></Route>
                <Route path="/" component={Login}></Route>
                <Route path="/app" breadcrumbName="" component={App} onEnter={this.checkAuth}>
                    <Route path="/user"    breadcrumbName="用户列表" component={User}/>
                    <Route path="/arrange" breadcrumbName="值班安排" component={Arrangement}/>
                    <Route path="/dynamic" breadcrumbName="动态管理" component={Dynamic}/>
                    <Route path="/project" breadcrumbName="项目管理" component={Project}/>
                </Route>
            </Router>
        )
    }
}