/**
 * Created by bassxiaosen1 on 2017/10/31.
 */
import React from "react"
import { Upload, Icon, Modal } from 'antd';

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => {
        let imageUrl=[];
        // console.log(fileList);
        fileList.map((obj)=>{
            if(obj.response!==undefined){
                imageUrl.push(obj.response.file_path);
            }
        });
        // console.log(imageUrl);
        this.props.handleSetImageUrl(imageUrl);
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon
                    style={{
                        fontSize:'28px',
                        color:'#999'
                    }}
                    type="plus" />
                <div style={{
                    marginTop:'8px',
                    fontSize:'12px',
                    color:"#666"
                }}>上传封面</div>
            </div>
        );
        return (
            <div className="clearfix" style={{display:'inline-block'}}>
                <Upload
                    action="http://139.199.220.49:8888/base/api/qiniu/info"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}