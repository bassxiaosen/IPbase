/**
 * Created by bassxiaosen1 on 2017/10/31.
 */
import React from "react"
import {Modal,message} from "antd"
import {deleteArrange} from "../../services/services"

export default class DeleteConfirm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            id:this.props.attendId
        }
    }

    handleDelete=(id)=>{
        deleteArrange(id)
            .then(({jsonResult})=>{if (jsonResult.success===true){message.success(jsonResult.msg);this.props.handleChangeTable()}})
            .catch((err)=>message.error(err))
    }

    handleClick=(e)=>{
        e.preventDefault();
        const {id} = this.state;
        const handleDelete=this.handleDelete;
        Modal.confirm({
            title:'删除成员',
            content:'确定删除此安排？删除后无法撤回！',
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