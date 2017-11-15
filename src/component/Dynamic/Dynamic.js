/**
 * Created by bassxiaosen1 on 2017/10/28.
 */
import React from "react"
import {Card,Tabs,message} from "antd"
import ArticleManage from "./ArticleManage"
import Launch from "./Launch"
import cookie from "js-cookie"
import {getUploadToken} from "../../services/services"

const TabPane = Tabs.TabPane;

export default class Dynamic extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    onChange=(key)=>{
        console.log(key);
        if(key==='article'){
            this.refs.article.handleChangeTable();
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
                    <TabPane tab="文章管理" key="article">
                        <ArticleManage
                            ref="article"
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