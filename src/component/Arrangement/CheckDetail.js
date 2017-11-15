/**
 * Created by bassxiaosen1 on 2017/11/10.
 */
import React from "react"
import {Modal,message} from "antd"
import {getCheckDetail} from "../../services/services"
import moment from "moment"


export default class CheckDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            checkMemberName:this.props.memberName,
            data:[]
        }
    }

    showModal=()=>{
        this.setState({
            visible:true
        });
        getCheckDetail({checkMemberName:this.state.checkMemberName})
            .then(({jsonResult})=>{
                console.log(jsonResult)
                this.setState({
                    data:jsonResult.data,
                })
            })
            .catch((err)=>{
                message.error(err)
            })
    };

    onCancel=()=>{
        this.setState({
            visible:false
        })
    };

    render=()=>{
        return (
            <span>
                <a onClick={this.showModal}>查询签到情况</a>
                <Modal visible={this.state.visible}
                        title="签到情况"
                       footer={null}
                       onCancel={this.onCancel}
                >
                    {
                        this.state.data.length===0?'暂无签到信息':
                            this.state.data.map((data)=>{
                                return(
                                    <div>
                                        签到人:{data.checkMemberName}<span className="ant-divider"></span>
                                        签到时间:{moment.unix(data.checkTime).format("YYYY-MM-DD HH:mm:ss")}
                                        签到IP:{data.checkIp}
                                    </div>
                                )
                            })
                    }
                </Modal>
            </span>
        )
    }
}