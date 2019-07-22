import React, { Component } from 'react';
import validator from 'validator';

import { Grid, Form, Button, Segment, Header } from 'semantic-ui-react';

class ResetPassword extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            password: '',
            isPasswordValid: true
        };
    }

    validatePassword = () => {
        const { password } = this.state;
        const isPasswordValid = !validator.isEmpty(password);
        this.setState({ isPasswordValid });
        return isPasswordValid;
    };

    passwordChanged = password => this.setState({ password, isPasswordValid: true });

    handleSubmit = async () => {
        const { password } = this.state;
        const { id } = this.props.match.params;

        try {
            await this.props.resetPassword({ password, id });
        } catch {
            // TODO: show error
            console.log('Something went wrong');
        }
    };

    render() {
        const { isPasswordValid } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="fill">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Enter your new password
                    </Header>
                    <Form name="resetPasswordForm" size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                error={!isPasswordValid}
                                onChange={ev => this.passwordChanged(ev.target.value)}
                                onBlur={this.validatePassword}
                            />
                            <Button type="submit" color="teal" fluid size="large" primary>
                                Change password
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default ResetPassword;
