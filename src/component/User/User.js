/**
 * Created by bassxiaosen1 on 2017/10/25.
 */
import React from "react"
import {Table,Modal,message,Button,Form} from "antd"
import {getUser} from "../../services/services"
import DeleteConfirm from "./DeleteConfirm"
import ImportUsers from "./ImportUsers"
import moment from "moment"

const FormItem = Form.Item;

export default class User extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],

            pageNum:1,
            pageSize:8,
            total:8,

            visible:false
        }
    }

    style={

    };



    componentDidMount=()=>{
        getUser(1,8)
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
        getUser(this.state.pageNum,8)
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

    showModal=()=>{
        this.setState({
            visible:true
        })
    };

    handleOk=()=>{
        this.setState({
            visible:false
        })
    }

    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }

    render=()=>{

        const columns = [{
            title:'姓名',
            key:'memberName',
            dataIndex:'memberName',
        },{
            title:'电话号码',
            key:'phoneNumber',
            dataIndex:'phoneNumber'
        },{
            title:'部门',
            key:'department',
            dataIndex:'department'
        },{
            title:'导入日期',
            key:'createTime',
            render:(text,record)=>(
                moment.unix(text.createTime).format("YYYY-MM-DD")
            )
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <DeleteConfirm userId={text.userId} handleChangeTable={this.handleChangeTable}/>
            )
        }];

        const pagination={
            pageSize:8,
            total:this.state.total,
            onChange:(pageNum)=>{
                // console.log(pageNum);
                this.setState({
                   pageNum:pageNum
                },()=>{
                    this.handleChangeTable(this.state.pageNum)
                });
            },
        };

        return(
            <div>
                <div>
                <Button
                    type="primary"
                    size="large"
                    onClick={this.showModal}
                >导入成员</Button>
                    <Modal
                        title={'导入成员'}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <ImportUsers handleChangeTable={this.handleChangeTable}/>
                    </Modal>
                </div>
                <Table
                    style={{
                        marginTop:'12px'
                    }}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={"userId"}
                    pagination={pagination}
                />
            </div>
        )
    }
}