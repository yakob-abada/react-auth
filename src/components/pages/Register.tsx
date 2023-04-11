import React, {Component} from "react";
import {Button, Form, Alert, Row, Col} from "react-bootstrap";
import AuthService from "../../services/auth.service";

type RegisterProps = {}
type RegisterState = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    avatar?: string

    selectedFiles?: FileList

    errorMessage?: string
}

class Register extends Component<RegisterProps, RegisterState>{
    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.onSubmission = this.onSubmission.bind(this);
        this.onChangeFistName = this.onChangeFistName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChangeFistName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            firstName: event.target.value
        })
    }

    onChangeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            lastName: event.target.value
        })
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

    onChangeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            avatar: event.target.value
        })
    }

    onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.files);
        if (event.target.files !== null) {
            // Update the formData object
            this.setState({
                selectedFiles: event.target.files
            })
        }
    }

    async onSubmission(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        try {
            await AuthService.register(
                this.state.firstName,
                this.state.lastName,
                this.state.email,
                this.state.password
            )

            if (this.state.selectedFiles !== undefined) {
                await AuthService.registerImagesUpload(this.state.selectedFiles)
            }
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
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="string" name='firstName' onChange={this.onChangeFistName} value={this.state.firstName} placeholder="Enter first name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="string" name='lastName' onChange={this.onChangeLastName} value={this.state.lastName} placeholder="Enter last name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' onChange={this.onChangeEmail} value={this.state.email} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' onChange={this.onChangePassword} value={this.state.password} placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAvatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="url" name='avatar' onChange={this.onChangeAvatar} value={this.state.avatar} placeholder="Avatar url" />
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Multiple images upload</Form.Label>
                            <Form.Control type="file" multiple onChange={this.onFileChange} />
                        </Form.Group>

                        <Button onClick={this.onSubmission} variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        )
    }
}



export default Register