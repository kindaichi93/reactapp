
import React from "react";
import {Form, Row, Col, Input, Button, Icon, Select, InputNumber} from 'antd';
const { Option } = Select;
class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const {  form,onSearch } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form className="ant-advanced-search-form" onSubmit={onSearch}>
                <Row gutter={24}>
                    <Col span={8} key='1' style={{ display: 'block'}}>
                        <Form.Item label={`Name`}>
                            {getFieldDecorator(`name`)(<Input placeholder="Input Name" />)}
                        </Form.Item>
                    </Col>
                    <Col span={8} key='2' style={{ display: 'block',width:300 }}>
                        <Form.Item label={`Price`}>
                            {getFieldDecorator(`price`)(<InputNumber min={1} placeholder="Input Price"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8} key='3' style={{ display:  'block'  }}>
                        <Form.Item label="Status">
                            {getFieldDecorator('status')(<Select
                                showSearch
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
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                        </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;