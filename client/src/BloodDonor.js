import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider, Checkbox, Button, AutoComplete, DatePicker, Alert, Modal } from 'antd';
import moment from 'moment';
import axios from 'axios';
import 'antd/dist/antd.css';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { MonthPicker, RangePicker } = DatePicker;

const gender = [{
    value: 'Male',
    label: 'Male',

}, {
    value: 'Female',
    label: 'Female',

},
{
    value: 'Others',
    label: 'Others',

}];

// Name, Age, Gender, Place, Bloodgrp

class BloodDonorForm extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            credentialsThere: '',
            loading: false,
            isDisabled: false,
            copied: false,
            flag: -1,
            details: []
        };

    }

    handleOnLoad = () => {
            }

    componentWillMount() {
        window.addEventListener('load', this.handleOnLoad);
    }
    componentDidUpdate() {
        window.addEventListener('load', this.handleOnLoad);

    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
             

            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    onCopy = () => {
        this.setState({ copied: true });
    };


    render() {

        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        let credentialsThere = this.state.credentialsThere;
        let copied = this.state.copied;


        let alertSpan = null;
        let copiedSpan = null;
        let copiedSpan1 = null;
      
        
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select date!' }],
        };
        
        return (
            <div>
                    <h1 style={{ marginTop: "10px", textAlign: "center" }}>Register To Get Credentials</h1>
                    <Divider />
                    <Form onSubmit={this.handleSubmit} style={{
                        marginRight: "20%",
                        marginLeft: "5%",
                        marginTop: "20px"
                    }}>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    Full Name&nbsp;
              <Tooltip title="Please enter the same name as in your Voter ID Card.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your Full Name!', whitespace: true }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Gender"
                        >
                            {getFieldDecorator('gender', {
                                initialValue: ['Male'],
                                rules: [{ type: 'array', required: true, message: 'Please select your gender!' }]
                            })(
                                <Cascader options={gender} key={gender} />
                                )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    Date of Birth&nbsp;
              <Tooltip title="Please enter your DOB as in your Voter ID Card.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('date', config)(
                                <DatePicker />
                            )}
                        </FormItem>

                        
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    Voter ID Number&nbsp;
              <Tooltip title="Please enter the Voter ID Number as in your Voter ID Card.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('voterId', {
                                rules: [{ required: true, message: 'Please input your voter ID Number!' }, { pattern: '^[A-Z]{3}[0-9]{7}$', message: 'Please input valid voter ID Number!' }],
                            })(
                                <Input style={{ width: '100%' }} />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="E-mail"
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'The e-mail entered is not valid!',
                                }, {
                                    required: true, message: 'Please input your E-mail!',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Phone Number"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' }, { pattern: '^((\\+91-?)|0)?[0-9]{10}$', message: 'Please input a valid phone number!' }],
                            })(
                                <Input addonBefore="+91" style={{ width: '100%' }} />
                                )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={this.state.isDisabled} loading={this.state.loading}>
                                Get Voting Credentials
                        </Button>
                        </FormItem>

                        
                    </Form>
                    <div style={styles.msg}>
                        <div style={{ width: '50%' }}>
                            {alertSpan}
                            {copiedSpan}
                        </div>
                    </div>
                </div>
          

          
        );
    }
}

const styles = {
    msg: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
}

const BloodDonor = Form.create()(BloodDonorForm);

export default BloodDonor;