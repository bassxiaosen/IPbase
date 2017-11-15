/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import {Card,Pagination,message} from "antd"
import {getProject} from "../../services/services"
import DeteleConfirm  from "./DeleteConfirm"
import ProjectDetail from "./ProjectDetail"
import moment from "moment"

export default class ProjectManage extends React.Component{
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
        getProject(1,6)
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
        getProject(this.state.pageNum,6)
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
                            return <Card title={obj.projectName}
                                         extra={
                                             <span>
                                                 <ProjectDetail
                                                     title={obj.projectName}
                                                     content={obj.detail}
                                                     projectType={obj.projectType}
                                                     deadLine={obj.deadLine}
                                                     users={obj.projectTeamVoList}
                                                     images={obj.projectImageVo}
                                                 />
                                                  <span className="ant-divider"></span>
                                                  <DeteleConfirm projectId={obj.projectId}
                                                                 handleChangeTable={this.handleChangeTable}
                                                  />
                                                 <div>发布日期：{moment.unix(obj.createTime).format("YYYY-MM-DD")}</div>
                                              </span>
                                         }
                                         style={this.style.flexItem}
                                         key={obj.projectId}
                            >
                                {/*{*/}
                                    {/*obj.projectImageVo.map((image)=>{*/}
                                        {/*// console.log(image);*/}
                                        {/*return(*/}
                                            {/*<img key={image.id}*/}
                                                 {/*src={image.image}*/}
                                                 {/*style={{*/}
                                                     {/*display:'inline-block',*/}
                                                     {/*marginTop:'16px',*/}
                                                     {/*width:'250px',*/}
                                                     {/*height:'auto'*/}
                                                 {/*}}*/}
                                            {/*/>*/}
                                        {/*)*/}
                                    {/*})*/}
                                {/*}*/}
                                {
                                    obj.projectImageVo.length===0?'':
                                        <img key={obj.projectImageVo[0].id}
                                             src={obj.projectImageVo[0].image}
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