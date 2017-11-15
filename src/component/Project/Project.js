/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import {Card,Tabs,message} from "antd"
import ProjectManage from "./ProjectManage"
import Launch from "./Launch"
import cookie from "js-cookie"
import {getUploadToken} from "../../services/services"

const TabPane = Tabs.TabPane;

export default class Project extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    onChange=(key)=>{
        console.log(key);
        if(key==='project'){
            this.refs.project.handleChangeTable();
        }
    };

    // componentDidMount=()=>{
    //     getUploadToken()
    //         .then(({jsonResult})=>{
    //             console.log(jsonResult)
    //         })
    //         .catch((err)=>{
    //             message.error(err)
    //         })
    // }

    render=()=>{
        return(
            <div>
                <Tabs onChange={this.onChange}>
                    <TabPane tab="项目管理" key="project">
                        <ProjectManage
                            ref="project"
                        />
                    </TabPane>
                    <TabPane tab="发布" key="launch">
                        <Launch/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}