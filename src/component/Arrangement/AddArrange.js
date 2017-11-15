/**
 * Created by bassxiaosen1 on 2017/10/29.
 */
import React from "react"
import {Modal,Button,Form,Input,Radio,TimePicker,Select,message} from "antd"
import {addArrange,getAllUser} from "../../services/services"

const FormItem = Form.Item;
const Option = Select.Option;

const AddModal = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form , members} = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="添加值班安排"
                okText="添加"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="签到时间">
                        {getFieldDecorator('checkTime', {
                            rules: [{ required: true, message: '请输入签到时间' }],
                        })(
                            <TimePicker format={"HH:mm"}/>
                        )}
                    </FormItem>
                    <FormItem label="值班时间">
                        {getFieldDecorator('attendTime', {
                            rules: [{ required: true, message: '请选择值班时间' }],
                        })(
                            <Select>
                                <Option value="星期一">星期一</Option>
                                <Option value="星期二">星期二</Option>
                                <Option value="星期三">星期三</Option>
                                <Option value="星期四">星期四</Option>
                                <Option value="星期五">星期五</Option>
                                <Option value="星期六">星期六</Option>
                                <Option value="星期日">星期日</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="值班人员" className="collection-create-form_last-form-item">
                        {getFieldDecorator('attendMemberIds', {
                            rules: [{ required: true, message: '请添加成员' }],
                        })(
                            <Select
                                mode="multiple"
                            >
                                {
                                    members.map((obj)=>(
                                        <Option key={obj.userId} value={obj.userId}>{obj.memberName}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

export default class AddArrange extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            members:[],
        }
    }

    showModal=()=>{
        this.setState({
            visible:true
        })
    };

    onCancel=()=>{
        this.setState({
            visible:false
        })
    };

    onOk=()=>{
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.checkTime = values.checkTime.format("HH:mm");
            console.log('Received values of form: ', values);
            addArrange(values)
                .then(({jsonResult})=>{
                    if(jsonResult.success){
                        this.props.handleChangeTable();
                    }
                })
                .catch(err=>message.error(err));

            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = (form) => {
        this.form = form;
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
                <Button onClick={this.showModal} type="primary" size="large">添加安排</Button>
                <AddModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onCreate={this.onOk}
                    members={this.state.members}
                />
            </div>
        )
    }
}