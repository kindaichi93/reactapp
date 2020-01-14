import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Table, Divider, Tag,Button,Modal } from 'antd';
import WrappedRegistrationForm from "./WrappedRegistrationForm";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            showModal:false,
        }
    }
    toggleModal =()=>{
        this.setState({
            showModal:true,
        })
    }
    handleOk = e => {
        this.setState({
            showModal: false,
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });
    };
    componentWillMount() {
        axios.get('http://5d75320ad5d3ea001425b1ed.mockapi.io/products').then((response)=>{
            this.setState({
               data:response.data
            });
        })
    }

    render()
{
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
            render: text => <a>{!text ? 'true':'false'}</a>,
        },
    ];

    const data = this.state.data;
    return (
        <div className="App">
            <h1>Crud Example</h1>
            <Button onClick={this.toggleModal} type="primary">Add </Button>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}} />
            <Modal
                title="Basic Modal"
                visible={this.state.showModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
             <WrappedRegistrationForm/>
            </Modal>
        </div>
    );
}

}

export default App;
