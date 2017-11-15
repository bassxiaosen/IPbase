/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import {Upload,Input,message,Button,Select,DatePicker} from "antd"
import PicturesWall from "./PicturesWall"
const Option = Select.Option;

import SimditorTextArea from "./SimditorTextArea"
import {addProject,getAllUser} from "../../services/services"

export default class Launch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            projectName:'',
            detail:'',
            projectType:'',
            deadLine:'',
            userIds:[],
            imageUrl:[],

            members:[],
        }
    }

    InputTitle=(e)=>{
        this.setState({
            projectName:e.target.value,
        })
    };

    InputType=(value)=>{
        this.setState({
            projectType:value
        })
    };

    InputDate=(dateMoment,dateString)=>{
        console.log(dateString);
        let date = new Date(dateString)/1000;
        this.setState({
            deadLine:date,
        })
    };

    InputUsers=(value)=>{
        console.log(value);
        this.setState({
            userIds:value
        })
    };

    onChangeDetail=(value)=>{
        // console.log(value)
        this.setState({
            detail:value
        })
    };

    handleSetImageUrl=(value)=>{
      this.setState({
          imageUrl:value
      },()=>{
          console.log(this.state.imageUrl)
      })
    };

    onOk=()=>{
        const {detail,projectName,projectType,deadLine,userIds,imageUrl} = this.state;
        if(projectName===''){
            message.error('请输入名称');
            return false
        }
        if(detail===''){
            message.error('请输入内容');
            return false
        }
        if(projectType===''){
            message.error('请选择类型');
            return false
        }
        if(deadLine===''){
            message.error('请选择日期');
            return false
        }
        if(userIds.length===0){
            message.error('请选择成员');
            return false
        }
        let data = {
            projectName:projectName,
            detail:detail,
            projectType:projectType,
            deadLine:deadLine,
            userIds:userIds,
            imageUrl:imageUrl,
        };
        console.log(data)
        addProject(data)
            .then(({jsonResult})=>{
                if(jsonResult.success===true){
                    message.success(jsonResult.msg);
                    // this.props.handleChangeTable();
                    this.setState({visible:false,projectName:'',context:''});
                    this.refs.context.initValue();
                }
            })
            .catch((err)=>{
                message.error(err)
            });
        // console.log(data);
    };

    componentDidMount=()=>{
        getAllUser()
            .then(({jsonResult})=>{
                console.log(jsonResult);
                this.setState({
                    members:jsonResult.data,
                })
            })
            .catch((err)=>{
                message.error(err);
            })
    }

    render=()=>{
        return(
            <div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    项目名称：<Input style={{width:'300px'}} onChange={this.InputTitle} value={this.state.projectName}/>
                </div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    项目封面：<PicturesWall handleSetImageUrl={this.handleSetImageUrl}/>
                </div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    项目类型：<Select style={{width:'300px'}} onChange={this.InputType} value={this.state.projectType}>
                                 <Option value="0">app</Option>
                                 <Option value="1">网站</Option>
                                 <Option value="2">科研类项目</Option>
                                 <Option value="3">其他</Option>
                            </Select>
                </div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    截止日期：<DatePicker style={{width:'300px'}} onChange={this.InputDate}/>
                </div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    项目成员：<Select
                                mode="multiple"
                                onChange={this.InputUsers}
                                style={{width:'300px'}}
                            >
                                {
                                    this.state.members.map((obj)=>(
                                        <Option key={obj.userId} value={obj.userId}>{obj.memberName}</Option>
                                    ))
                                }
                            </Select>
                </div>
                <SimditorTextArea
                    id="context"
                    ref="context"
                    value={this.state.detail}
                    onChange={this.onChangeDetail}
                />
                <div style={{textAlign:'right',marginTop:'12px'}}>
                    <Button onClick={this.onOk}
                            size="large"
                            type={"primary"}
                    >
                        发布
                    </Button>
                </div>
            </div>
        )
    }
}