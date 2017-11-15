/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import {Modal,message} from "antd"
import {deleteProject} from "../../services/services"

export default class DeleteConfirm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            id:this.props.projectId
        }
    }

    handleDelete=(id)=>{
        const obj={
            projectIds:[id]
        };
        deleteProject(obj)
            .then(({jsonResult})=>{if (jsonResult.success===true){message.success(jsonResult.msg);this.props.handleChangeTable()}})
            .catch((err)=>message.error(err))
    }

    handleClick=(e)=>{
        e.preventDefault();
        const {id} = this.state;
        const handleDelete=this.handleDelete;
        Modal.confirm({
            title:'删除项目',
            content:'确定删除此项目？删除后无法撤回！',
            onOk:handleDelete.bind(this,id),
        })
    };


    render=()=>{
        return(
            <span>
            <a onClick={this.handleClick}>删除</a>
            </span>
        )

    }
}