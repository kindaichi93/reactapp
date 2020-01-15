import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Table, Divider, Tag, Button, Modal, Form, Input, Radio, InputNumber, Select,} from 'antd';
import CollectionsPage from "./CollectionsPage";

const {Option} = Select;
const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please input the title of collection!'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Price">
                            {getFieldDecorator('price')(<InputNumber min={1}/>)}
                        </Form.Item>
                        <Form.Item label="Status">
                            {getFieldDecorator('status')(<Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Select a person"
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            newData: {
                id: '',
                name: '',
                price: '',
                status: '',
            }
        }
    }

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let data = this.state.data;
            let length = data.length + 1;
            let {newData} = this.state;
            newData.id = length;
            newData.name = values.name;
            newData.price = values.price;
            newData.status = values.status;
            this.setState({newData})
            axios.post('http://5d75320ad5d3ea001425b1ed.mockapi.io/products', this.state.newData).then((response) => {
                let {data} = this.state;
                data.push(response.data);
                this.setState({data});
            })
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    componentWillMount() {
        axios.get('http://5d75320ad5d3ea001425b1ed.mockapi.io/products').then((response) => {
            this.setState({
                data: response.data
            });
        })
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: text => <a>{!text ? 'true' : 'false'}</a>,
            },
        ];

        const data = this.state.data;
        return (
            <div className="App">
                <h1>Crud Example</h1>
                <Button type="primary" onClick={this.showModal}>
                    New Collection
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table columns={columns} dataSource={data}
                       pagination={{defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}}/>
            </div>
        );
    }

}

export default App;
