/**
 * Created by bassxiaosen1 on 2017/10/28.
 */
import React from "react"
import {Table,message} from "antd"
import {getArrange} from "../../services/services"
import AddArrange  from "./AddArrange"
import DeleteConfirm from "./DeleteConfirm"
import EditArrange from "./EditArrange"
import CheckDetail from "./CheckDetail"


export default class Arrangement extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            pageNum:1,
            pageSize:8,
            total:8,
        }
    }

    componentDidMount=()=>{
        getArrange(1,8)
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
    }

    handleChangeTable=()=>{
        getArrange(this.state.pageNum,8)
            .then(({jsonResult})=>{
                // console.log(jsonResult);
                this.setState({
                    data:jsonResult.data.list,
                    total:jsonResult.data.total
                })
            })
            .catch((err)=>{
                message.error(err)
            })
    };

    render=()=>{
        const columns = [{
            title:'时间',
            key:'attendTime',
            dataIndex:'attendTime',
        },{
            title:'值班人员',
            key:'people',
            render:(text,record)=>(
                <span>{text.userVo.memberName}</span>
            )
        },{
            title:'签到时间',
            key:'checkTime',
            dataIndex:'checkTime'
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <CheckDetail memberName={text.userVo.memberName}/>
                    <span className="ant-divider"></span>
                    <EditArrange attendId={text.attendId} text={text} handleChangeTable={this.handleChangeTable}/>
                    <span className="ant-divider"></span>
                    <DeleteConfirm attendId={text.attendId} handleChangeTable={this.handleChangeTable}/>
                </span>
            )
        }];

        const pagination={
            pageSize:8,
            total:this.state.total,
            onChange:(pageNum)=>{
                this.setState({
                    pageNum:pageNum
                });
                // console.log(pageNum);
                this.handleChangeTable(this.state.pageNum)
            },
        };

        return(
            <div>
                <div>
                    <AddArrange handleChangeTable={this.handleChangeTable}/>
                </div>
                <Table
                    style={{
                        marginTop:'12px'
                    }}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={"attendId"}
                    pagination={pagination}
                />
            </div>
        )
    }
}