/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import Simditor from "simditor"
import "../../../node_modules/simditor/styles/simditor.css"
import $ from "jquery"
import config from "../../../config"
const {host} = config;

export default class SimditorTextArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount = () => {
        this.initEditor();
        // $(".font-color.font-color-default").removeClass("font-color-default").addClass("font-color-8");
    };

    initEditor = () => {
        let config = {
            placeholder: this.props.placeholder,
            defaultImage: 'images/image.png',
            params: {},
            tabIndent: true,
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'ol',
                'ul',
                'blockquote',
                'code',
                'table',
                'link',
                'hr',
                'image',
                'indent',
                'outdent',
                'alignment',
            ],
            upload: {
                url: `${host}/base/api/qiniu/info`, //文件上传的接口地址
                fileKey: 'file', //服务器端获取文件数据的参数名
                connectionCount: 3,
                leaveConfirm: '正在上传文件',
                params:{
                    token:'',
                    name:'file'
                }
            },

            toolbarFloat: true,
            toolbarFloatOffset: 0,
            toolbarHidden: false,
            pasteImage: false,
            cleanPaste: false,
            textarea: $(this.refs.textarea)
        };

        this.editor = new Simditor(config);// 初始化编辑器
        this.editor.setValue(this.props.value); //编辑设置默认值

        //监听改变
        this.editor.on("valuechanged", (e, src) => {
            this.props.onChange(this.getValue());
        });

        //更改图片上传类型
        $(".simditor input[type='file']").attr('accept', 'image/jpg,image/jpeg,image/png,image/bmp');
    };

    // componentWillReceiveProps(nextProps){
    //     this.editor.setValue(nextProps.value);
    // };

    getValue = () => {
        return this.editor.getValue().trim();
        // let selectName = `#${this.props.id} .simditor`;
        // let html = $(selectName).find(".simditor-body").html();
        // console.log(html);
        // return html;
    };

    initValue=()=>{
        this.editor.setValue('');
    };

    render=()=> {
        return (
            <textarea
                id={this.props.id}
                ref="textarea"
                placeholder="请输入内容"/>
        );
    }

}