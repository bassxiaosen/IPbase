/**
 * Created by bassxiaosen1 on 2017/10/28.
 */
import React from "react"
import {Modal} from "antd"

export default class DynamicDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    showModal=()=>{this.setState({visible:true})};
    onCancel=()=>{this.setState({visible:false})};

    render=()=>{
        const {content,title} = this.props;
        return(
            <span>
                <a onClick={this.showModal}>详细内容</a>
                <Modal title="动态内容"
                       onCancel={this.onCancel}
                       visible={this.state.visible}
                       footer={null}
                       width="760px"
                >
                    <div>动态标题：{title}</div>
                    <div>动态内容：</div>

                    <div style={{width:'600px',margin:'0 auto'}}>
                        <div dangerouslySetInnerHTML={{__html:content}}></div>
                    </div>
                </Modal>
            </span>
        )
    }
}