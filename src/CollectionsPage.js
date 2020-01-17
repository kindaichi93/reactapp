import React from "react";
import {Button, Modal, Form, Input, Radio, InputNumber, Select} from 'antd';
const { Option } = Select;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new product"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the name of product' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Price">
                            {getFieldDecorator('price',{
                                rules: [{ required: true, message: 'Please input the price' }],
                            })(<InputNumber min={1} />)}
                        </Form.Item>
                        <Form.Item label="Status">
                            {getFieldDecorator('status',{
                                rules: [{ required: true, message: 'Please input the status' }],
                            })(<Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select Status"
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


export default CollectionCreateForm;