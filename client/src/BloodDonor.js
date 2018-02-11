import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider, Checkbox, Button, AutoComplete, DatePicker, Alert, Modal, InputNumber } from 'antd';
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

const bloodgrp = [{
    value: 'O+',
    label: 'O+',

}, {
    value: 'A+',
    label: 'A+',

},
{
    value: 'B+',
    label: 'B+',

},
{
    value: 'AB+',
    label: 'AB+',

}, {
    value: 'O-',
    label: 'O-',

}, {
    value: 'A-',
    label: 'A-',

}, {
    value: 'B-',
    label: 'B-',

}, {
    value: 'AB-',
    label: 'AB-',

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
                if(values.age >=18 && values.age<=60)
                {
                    console.log(values.bloodgroup[0]);
                    console.log(values.age[0]);
                    console.log(values.name);
                    console.log(values.place);
                    console.log(values.gender[0]);
                    axios({
                        method: 'post',
                        url: '/add-donor',
                        data: { name: values.name, age: values.age[0], place: values.place, gender: values.gender[0], blood_group: values.bloodgroup[0]  },
                        config: { headers: { 'Content-Type': 'application/json' } }
                    })
                        .then(response => {
                            console.log(response.data);
                            Modal.success({
                                title: 'Thank you for registering as a donor!',
                                content: 'Your contribution will save many lives!',
                            });
                        })
                        .catch(error => {
                            console.log('Post request to add donor failed!');
                        });





                }

                else {
                    Modal.error({
                        title: 'Please enter correct age!',
                        content: 'You must be above 18 years and below 60 years to donate blood!',
                    });
                }


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

    onChange = (value) => {
        console.log('changed', value);


    }


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
                <div style={{ backgroundColor: 'red', marginTop:-10}}>
                    <h1 style={{ marginTop: "10px", textAlign: "center",  }}>Register as a Donor</h1>
                    <Divider />
                    </div>
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
                                Age&nbsp;

                                </span>
                        )}
                    >
                        {getFieldDecorator('age', {
                            initialValue: [18],
                            rules: [{ required: true }],
                        })(
                                <InputNumber defaultValue={18} onChange={this.onChange} />   )}
                    </FormItem>



                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Place&nbsp;

                                </span>
                        )}
                    >
                        {getFieldDecorator('place', {
                            rules: [{ required: true, message: 'Please input your place of residence!', whitespace: true }],
                        })(
                            <Input />
                            )}
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="Blood Group"
                    >
                        {getFieldDecorator('bloodgroup', {
                            initialValue: ['O+'],
                            rules: [{ type: 'array', required: true, message: 'Please select your blood group!' }]
                        })(
                            <Cascader options={bloodgrp} key={bloodgrp} />
                            )}
                    </FormItem>


                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={this.state.isDisabled} loading={this.state.loading}>
                                Register
                        </Button>
                        </FormItem>


                    </Form>

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
