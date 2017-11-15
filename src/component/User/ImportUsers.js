/**
 * Created by bassxiaosen1 on 2017/10/28.
 */
import React from "react";
import {Upload,Button,message,Icon} from "antd"
import cookie from "js-cookie"
import config from "../../../config"
const {host} = config;

export default class ImportUsers extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }


    render=()=>{
        const props = {
            name: 'file',
            action: `${host}/base/api/qiniu/info`,
            headers: {
                token:cookie.get('token')
            },
            onChange:(info)=> {
                const {response} = info.file;
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if(response.success!==true){
                        message.error('导入失败'+response.msg);
                    }else{
                        message.success(`${info.file.name} file uploaded successfully`);
                        this.props.handleChangeTable();
                    }
                } else if (info.file.status === 'error') {
                    message.error(`导入失败`);
                }
            },
        };

        return(
            <div
                style={{
                    textAlign:'center'
                }}
            >
                <Upload {...props}>
                    <Button type="primary" size={"large"}>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </div>
        )
    }
}