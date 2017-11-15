/**
 * Created by bassxiaosen1 on 2017/10/28.
 */
import React from "react"
import {Card,Pagination,message} from "antd"
import {getDynamic} from "../../services/services"
import DeteleConfirm  from "./DeleteConfirm"
import DynamicDetail from "./DynamicDetail"
import moment from "moment"

export default class ArticleManage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],

            pageSize:6,
            pageNum:1,
            total:6,
        }
    }

    componentDidMount=()=>{
        getDynamic(1,6)
            .then(({jsonResult})=>{
                console.log(jsonResult);
                this.setState({
                    data:jsonResult.data.list,
                    total:jsonResult.data.total
                })

            })
            .catch((err)=>{
                message.error(err)
            })
    };

    handleChangeTable=()=>{
        getDynamic(this.state.pageNum,6)
            .then(({jsonResult})=>{
                console.log(jsonResult);
                this.setState({
                    data:jsonResult.data.list,
                    total:jsonResult.data.total
                })

            })
            .catch((err)=>{
                message.error(err)
            })
    };

    style={
        container:{
            display:'flex',
            justifyContent:'flex-start',
            flexWrap:'wrap'
        },
        flexItem:{
            flexBasis:'300px',
            margin:'0 16px 16px',
        }
    };

    onChange=(page)=>{
        this.setState({
            pageNum:page
        },()=> {
            this.handleChangeTable();
        })
    }

    render=()=>{
        return(
            <div style={{width:'100%'}}>
                <div style={this.style.container}>

                    {
                        this.state.data.map((obj)=>{
                            return <Card title={obj.title}
                                         extra={
                                             <span>
                                                 <DynamicDetail title={obj.title} content={obj.content}/>
                                                  <span className="ant-divider"></span>
                                                  <DeteleConfirm dynamicId={obj.dynamicId}
                                                    handleChangeTable={this.handleChangeTable}
                                                  />
                                                 <div>发布日期：{moment.unix(obj.createTime).format("YYYY-MM-DD")}</div>
                                              </span>
                                         }
                                         style={this.style.flexItem}
                                         key={obj.dynamicId}

                            >
                                {
                                    obj.imageUrl===null?''
                                        :<img
                                              src={obj.imageUrl}
                                              style={{
                                                  display:'inline-block',
                                                  marginTop:'16px',
                                                  width:'250px',
                                                  height:'250px',
                                              }}
                                    />
                                }

                            </Card>
                        })
                    }
                </div>
                {
                    this.state.data.length!==0
                        ?<div
                            style={{
                                textAlign:'right'
                            }}
                        >
                            <Pagination
                                total={this.state.total}
                                pageSize={6}
                                onChange={this.onChange}
                                current={this.state.pageNum}
                            />
                        </div>
                        :''
                }
            </div>
        )
    }
}