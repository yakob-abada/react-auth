import {Component} from "react";
import {Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AuthService, {LoggedInUserType} from "../services/auth.service";

type NavHeaderPropsType = {}
type NavHeaderStateType = {
    loggedInUser: LoggedInUserType | null
}

class NavHeader extends Component<NavHeaderPropsType, NavHeaderStateType> {
    constructor(props: NavHeaderPropsType) {
        super(props);

        const loggedInUser = AuthService.getCurrentUser()

        this.state = {
            loggedInUser: loggedInUser
        }
        this.logout = this.logout.bind(this)
    }

    logout() {
        this.setState({
            loggedInUser: null
        })

        AuthService.logout()
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            {this.state.loggedInUser ?
                                (
                                    <>
                                        <Nav.Link>Hi, {this.state.loggedInUser.firstName}</Nav.Link>
                                        <Nav.Link eventKey={2} onClick={this.logout}>
                                            Logout
                                        </Nav.Link>
                                    </>
                                )
                                :(
                                    <>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                        <Nav.Link eventKey={2} href="/register">
                                            Register
                                        </Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default NavHeader