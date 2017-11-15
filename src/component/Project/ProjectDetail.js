/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import {Modal} from "antd"
import moment from "moment"

export default class DynamicDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image:'',
            visible:false,
            viewVisible:false,
        }
    }

    showModal=()=>{this.setState({visible:true})};
    onCancel=()=>{this.setState({visible:false})};

    style={
        detailRow:{
            marginBottom:'1em',
        }
    };

    formatType=(value)=>{
        switch (value){
            case 0:
                return 'app';
                break;
            case 1:
                return '网站';
                break;
            case 2:
                return '科研类项目';
                break;
            case 3:
                return '其他';
                break;
        }

    };

    handleViewImage=(url)=>{
        this.setState({
            image:url,
            viewVisible:true
        })
    };

    handleCancel=()=>{
        this.setState({
            viewVisible:false
        })
    };

    render=()=>{
        const {image,visible,viewVisible} = this.state;
        const {content,title,projectType,images,deadLine,users} = this.props;
        return(
            <span>
                <a onClick={this.showModal}>详细内容</a>
                <Modal title="动态内容"
                       onCancel={this.onCancel}
                       visible={visible}
                       footer={null}
                       width="760px"
                >
                    <div style={this.style.detailRow}>项目名称：{title}</div>

                    <div style={this.style.detailRow}>项目封面：{
                        this.props.images.map((image)=>{
                            // console.log(image);
                            return(
                                <img key={image.id}
                                     src={image.image}
                                     onClick={this.handleViewImage.bind(this,image.image)}
                                     style={{
                                         display:'inline',
                                         marginLeft:'16px',
                                         marginRight:'16px',
                                         width:'50px',
                                         height:'50px',
                                         cursor:'pointer'
                                     }}
                                />
                            )
                        })
                    }</div>

                    <div style={this.style.detailRow}>项目类型：{this.formatType(projectType)}</div>

                    <div style={this.style.detailRow}>截止日期：{moment.unix(deadLine).format('YYYY-MM-DD')}</div>



                    <div style={this.style.detailRow}>
                        项目成员：{
                                users.map((obj)=>{
                                    // console.log(obj)
                                    if(obj.userVo){
                                         return (
                                          `${obj.userVo.memberName} `
                                         )
                                    }
                                })
                        }

                    </div>

                    <div style={this.style.detailRow}>项目详情：</div>

                    <div style={{width:'600px',margin:'0 auto'}}>
                        <div dangerouslySetInnerHTML={{__html:content}}></div>
                    </div>
                </Modal>
                <Modal footer={null} onCancel={this.handleCancel} visible={viewVisible} style={{top:'20px'}}>
                    <img alt="项目封面图片" style={{ width: '100%' }} src={image} />
                </Modal>
            </span>
        )
    }
}