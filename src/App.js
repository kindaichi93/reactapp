import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Table, Divider, Tag, Button, Modal, Form, Input, Radio, InputNumber, Select, Popconfirm, message} from 'antd';
import CollectionCreateForm from "./CollectionsPage";
import EditForm from "./EditForm";
import WrappedAdvancedSearchForm from "./SearchForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            editVisible: false,
            newData: {
                id: '',
                name: '',
                price: '',
                status: '',
            },
            editData: {
                id: '',
                name: '',
                price: null,
                status: null,
            },
        }
    }

    showModal = () => {
        this.setState({visible: true});
    };
    showEditModal = () => {
        this.setState({editVisible: true});
    }
    handleCancel = () => {
        this.setState({visible: false});
    };
    handleEditCancel = () => {
        this.setState({editVisible: false});
    }
    handleCreate = () => {
        const {form} = this.formRef.props;

        form.validateFields((err, values) => {
            if (err) {
                console.log(err);
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
    refreshPage = () => {
        axios.get('http://5d75320ad5d3ea001425b1ed.mockapi.io/products').then((response) => {
            this.setState({
                data: response.data
            });
        })
    }
    handleEditSubmit = () => {
        const {form} = this.formRefEdit.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {name, price} = values;
            let status = (values.status == 'true');
            axios.put('http://5d75320ad5d3ea001425b1ed.mockapi.io/products/' + values.id, {
                name,
                price,
                status
            }).then((response) => {
                this.refreshPage();
            })
            form.resetFields();
            this.setState({editVisible: false});
        });
    };
    handleSearch = (e) => {
        e.preventDefault();
        const {form} = this.formRefSearch.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.get('http://5d75320ad5d3ea001425b1ed.mockapi.io/products').then((response) => {
                this.setState({
                    data: response.data.filter(item => {
                        let checkPrice = true;
                        if (values.compare == "less" && values) {
                            checkPrice = (item.price < values.price);
                        }
                        if (values.compare =="greater" && values){
                            checkPrice =  (item.price > values.price);
                        }
                     return    item.name.toLowerCase().includes(values.name.toLowerCase()) && checkPrice && item.status.toString().includes(values.status)
                    })
                });
            })


        });
    };
    handleEdit = record => {
        this.setState({editData: record}, () => {
            this.showEditModal();
        });
    }
    handleDelete = record => {
        axios.delete('http://5d75320ad5d3ea001425b1ed.mockapi.io/products/' + record.id).then((response) => {
            this.refreshPage();
            message.success('Delete Success !');
        })
    }
    handleCancelDelete = () => {
        message.error('Cancel Delete');
    }
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    editFormRef = editFormRef => {
        this.formRefEdit = editFormRef;
    };
    searchFormRef = searchFormRef => {
        this.formRefSearch = searchFormRef;
    };

    componentWillMount() {
        this.refreshPage();
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
                render: text => <span>{text ? 'true' : 'false'}</span>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
        <a onClick={() => {
            this.handleEdit(record)
        }}>Edit</a>
        <Divider type="vertical"/>
      <Popconfirm
          title="Are you sure delete this product ?"
          onConfirm={() => {
              this.handleDelete(record)
          }}
          onCancel={() => {
              this.handleCancelDelete()
          }}
          okText="Yes"
          cancelText="No"
      >
    <a href="#">Delete</a>
  </Popconfirm>
      </span>
                ),
            },
        ];

        const data = this.state.data;
        return (
            <div className="App">
                <h1>Crud Example</h1>
                <WrappedAdvancedSearchForm
                    onSearch={this.handleSearch}
                    wrappedComponentRef={this.searchFormRef}
                />
                <Button type="primary" onClick={this.showModal}>
                    New Product
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <EditForm
                    wrappedComponentRef={this.editFormRef}
                    visible={this.state.editVisible}
                    editData={this.state.editData}
                    onCancel={this.handleEditCancel}
                    onEdit={this.handleEditSubmit}
                />
                <Table columns={columns} dataSource={data}
                       pagination={{defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}}/>
            </div>
        );
    }

}

export default App;
