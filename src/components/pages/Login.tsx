import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert, Form} from "react-bootstrap";
import {Button} from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import {withRouter} from "../common/with-router";

type LoginProps = any
type LoginState = {
    email: string,
    password: string
    errorMessage?: string
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.onSubmission = this.onSubmission.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: event.target.value
        })
    }

    onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.target.value
        })
    }

    async onSubmission(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        try {
            await AuthService.login(this.state.email, this.state.password)

            this.props.router.navigate("/");
            window.location.reload();
        } catch (e) {
            if (e instanceof Error) {
                this.setState({
                    errorMessage: e.message
                })
            }
        }
    }

    render() {
        return (
            <Row>
                <Col></Col>
                <Col>
                    {this.state.errorMessage &&
                        <Alert key="danger" variant="danger">
                            {this.state.errorMessage}
                        </Alert>
                    }
                    <Form style={{borderRadius: '1rem solid black', maxWidth: '500px'}}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' onChange={this.onChangeEmail} value={this.state.email} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' onChange={this.onChangePassword} value={this.state.password}  placeholder="Password" />
                        </Form.Group>
                        <Button onClick={this.onSubmission} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        )
    }
}

export default withRouter(Login)