import React, { Component } from 'react';
import validator from 'validator';

import { Grid, Form, Button, Segment } from 'semantic-ui-react';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailValid: true
        };
    }

    validateEmail = () => {
        const { email } = this.state;
        const isEmailValid = !validator.isEmpty(email);
        this.setState({ isEmailValid });
        return isEmailValid;
    };

    emailChanged = email => this.setState({ email, isEmailValid: true });

    handleSubmit = async () => {
        const { email } = this.state;
        try {
            await this.props.forgotPassword({ email });
        } catch {
            // TODO: show error
            console.log('Something went wrong');
        }
    };

    render() {
        const { isEmailValid } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="fill">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form name="resetPasswordForm" size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                icon="at"
                                iconPosition="left"
                                placeholder="Email"
                                type="email"
                                error={!isEmailValid}
                                onChange={ev => this.emailChanged(ev.target.value)}
                                onBlur={this.validateEmail}
                            />
                            <Button type="submit" color="teal" fluid size="large" primary>
                                Send
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default ForgotPassword;
