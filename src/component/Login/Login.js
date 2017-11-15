/**
 * Created by bassxiaosen1 on 2017/10/23.
 */
import React from "react"
import {hashHistory} from "react-router"
import { Form, Icon, Input, Button,message,Switch } from 'antd';
import {login} from "../../services/services"
import cookie from "js-cookie"

const FormItem = Form.Item;



class LoginForm extends React.Component{
    constructor(){
        super();
        this.state={
            checked:false,
        }
    }

    style={
        wrapper:{
            height:'100vh',
            width:'100%',
            backgroundColor:"#c7f7f9"
        },
        loginForm:{
            width:'300px',
            height:'300px',
            position:"absolute",
            margin:'auto',
            left:'0',
            right:'0',
            top:'0',
            bottom:'0'
        }
    };


    handleLogin=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            console.log(values)
            if(!err){
                console.log("received",values)
                login(values)
                    .then(({jsonResult})=>{
                        console.log(jsonResult);
                        // console.log(jsonResult.data.token);
                        // console.log(cookie.get('token'))
                        cookie.set('token',jsonResult.data.token);
                        cookie.set('userName',jsonResult.data.user.memberName);
                        message.success('登录成功')
                        hashHistory.push("/user")
                    })
                    .catch(err=>message.error(err))
            }
        })
    };

    onChange=(checked)=>{
        this.setState({
            checked:checked
        })
    };

    render(){
        let { getFieldDecorator } = this.props.form;
        return(
            <div style={this.style.wrapper}>
                <Form onSubmit={this.handleLogin} style={this.style.loginForm}>
                    <div
                        style={{
                            width:'300px',
                            marginBottom:'12px',
                            fontSize:'36px',
                        }}
                    >学生创新实践基地</div>
                    <div style={{
                        width:'300px',
                        marginBottom:'12px',
                        fontSize:'18px',
                        textAlign:'center'
                    }}>
                        切换
                        {
                            this.state.checked
                                ? '手机'
                                : '用户名'
                        }登录<Switch
                            onChange={this.onChange}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="cross" />}
                        />
                    </div>
                    {
                        this.state.checked
                            ? <div>
                                <FormItem>
                                    {getFieldDecorator('memberName', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                            </div>
                            : <div>
                            <FormItem>
                                {getFieldDecorator('phoneNumber', {
                                    rules: [{ required: true, message: '请输入手机号!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机号" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                        </div>
                    }
                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                            登 录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const Login = Form.create()(LoginForm);

export default  Login