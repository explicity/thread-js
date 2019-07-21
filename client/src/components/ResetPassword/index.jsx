import React, { Component } from 'react';
import validator from 'validator';

import { Grid, Form, Button, Segment } from 'semantic-ui-react';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailValid: true
        };
    }

    render() {

        return (
            <Grid textAlign="center" verticalAlign="middle" className="fill">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form name="resetPasswordForm" size="large" onSubmit={this.handleSubmit}>
                        <Segment>
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

export default ResetPassword;
