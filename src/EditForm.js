import React from "react";
import {Button, Modal, Form, Input, Radio, InputNumber, Select} from 'antd';
const { Option } = Select;
const EditForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onEdit, form,editData } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Edit Form"
                    okText="Edit"
                    onCancel={onCancel}
                    onOk={onEdit}
                >
                    <Form layout="vertical">
                        <Form.Item label="ID">
                            {getFieldDecorator('id', {
                                initialValue:editData.id,
                            })(<Input disabled={true} />)}
                        </Form.Item>
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                initialValue:editData.name,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input  />)}
                        </Form.Item>
                        <Form.Item label="Price">
                            {getFieldDecorator('price',{
                                initialValue:editData.price,
                                rules: [{ required: true, message: 'Please input the price' }],
                            })(<InputNumber min={1} />)}
                        </Form.Item>
                        <Form.Item label="Status">
                            {getFieldDecorator('status',{
                                initialValue:editData.status === false ? 'false' : 'true',
                                rules: [{ required: true, message: 'Please input the status' }],
                            })(<Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="true">True</Option>
                                <Option value="false">False</Option>
                            </Select>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


export default EditForm;