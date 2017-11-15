/**
 * Created by bassxiaosen1 on 2017/10/21.
 */
import React from "react"
import ReactDOM from "react-dom"
import {hashHistory} from "react-router"
import {Button,Layout,Icon,Breadcrumb,Menu,Dropdown} from "antd"
const {Header,Content,Footer,Sider} = Layout;

import cookie from "js-cookie"

export default class App extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            collapsed:false,
            current:'user'
        }
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    onClickMenu=(obj)=>{//根据key可以实现不同路由跳转
        this.setState({
            current:obj.key
        });
        console.log(obj.key);
        switch (obj.key){
            case 'user':
                hashHistory.push('/user');
                break;
            case 'arrange':
                hashHistory.push('/arrange');
                break;
            case 'dynamic':
                hashHistory.push('/dynamic');
                break;
            case 'project':
                hashHistory.push('/project');
                break;
        }
    };

    componentWillMount=()=>{
        switch (location.hash){
            case `#/user`:
                this.setState({
                    current:'user'
                });
                break;
            case `#/arrange`:
                this.setState({
                    current:'arrange'
                });
                break;
            case `#/dynamic`:
                this.setState({
                    current:'dynamic'
                });
                break;
            case `#/project`:
                this.setState({
                    current:'project'
                });
                break;
        }
    };

    // componentDidMount=()=>{
    //     console.log(this.props)
    // };

    quit=()=>{
        hashHistory.push('/');
        cookie.remove('token');
    };

    render(){
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div style={{
                        height:'32px',
                        background:"#333",
                        borderRadius:'6px',
                        margin:'16px'
                    }} />
                    <Menu theme="dark"
                          defaultSelectedKeys={['1']}
                          mode="inline"
                          onClick={this.onClickMenu}
                          selectedKeys={[this.state.current]}
                    >
                        <Menu.Item key="user">
                            <Icon type="user" />
                            <span>用户列表</span>
                        </Menu.Item>
                        <Menu.Item key="arrange">
                            <Icon type="schedule" />
                            <span>值班安排</span>
                        </Menu.Item>
                        <Menu.Item key="project">
                            <Icon type="notification" />
                            <span>发布项目</span>
                        </Menu.Item>
                        <Menu.Item key="dynamic">
                            <Icon type="code" />
                            <span>发布动态</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,display:'flex',justifyContent:'flex-end' }} >
                        <div style={{marginRight:'16px'}}>
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        <a onClick={this.quit}>退出</a>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <a className="ant-dropdown-link">
                                    {cookie.get('userName')}<Icon type="down"/>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}
                                    routes={this.props.routes}
                                    params={this.props.params}
                                    separator={''}
                        />
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {
                                this.props.children
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        学生创新实践基地 ©2017-2018 Created by Yusen
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
