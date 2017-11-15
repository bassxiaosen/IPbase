/**
 * Created by bassxiaosen1 on 2017/10/28.
 */
import React from "react"
import {Upload,Input,message,Button} from "antd"
import PicturesWall from "./PicturesWall"
import SimditorTextArea from "./SimditorTextArea"
import {addDynamic} from "../../services/services"

export default class Launch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            context:'',
            imageUrl:[],

        }
    }

    InputTitle=(e)=>{
        this.setState({
            title:e.target.value,
        })
    };

    InputContext=(e)=>{
        this.setState({
            context:e.target.value,
        })
    };

    onChange=(value)=>{
        // console.log(value)
        this.setState({
            context:value
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
        const {title,context,imageUrl} = this.state;
        if(title===''){
            message.error('请输入标题');
            return false
        }
        if(context===''){
            message.error('请输入内容');
            return false
        }
        let data = {
            title:title,
            content:context,
            imageUrl:imageUrl[0],
        };
        addDynamic(data)
            .then(({jsonResult})=>{
                if(jsonResult.success===true){
                    message.success(jsonResult.msg);
                    // this.props.handleChangeTable();
                    this.setState({visible:false,title:'',context:''});
                    // this.refs.context.initValue();
                }
            })
            .catch((err)=>{
                message.error(err)
            });
        // console.log(data);

    };

    render=()=>{
        return(
            <div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    标题：<Input style={{width:'300px'}} onChange={this.InputTitle} value={this.state.title}/>
                </div>
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    项目封面：<PicturesWall handleSetImageUrl={this.handleSetImageUrl}/>
                </div>
                {/*<SimditorTextArea*/}
                    {/*id="context"*/}
                    {/*ref="context"*/}
                    {/*value={this.state.context}*/}
                    {/*onChange={this.onChange}*/}
                {/*/>*/}
                <div style={{fontSize:'16px',marginBottom:'16px'}}>
                    链接：<Input style={{width:'300px'}} onChange={this.InputContext} value={this.state.context}/>
                </div>
                <div style={{textAlign:'left',marginTop:'12px'}}>
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