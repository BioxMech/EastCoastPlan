import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
	Paper,
	FormControl,
	FormLabel,
	InputLabel,
	Input,
	FormHelperText,
	Box,
	Button,
	Radio,
	FormControlLabel,
	RadioGroup,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			acc_type: "user",
			disabled: true,
			show: false,
			emailCheck: false,
			emailError: false,
			emailText: "We'll never share your email.",
			passwordVerified: false,
			passwordError: false,
			passwordText: "Your password will be encrypted.",
			loading: false,
		};

		this.handleAccType = this.handleAccType.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleEmailCheck = this.handleEmailCheck.bind(this);
		this.handlePasswordVerification = this.handlePasswordVerification.bind(
			this
		);
	}

	handleAccType(event) {
		this.setState({ acc_type: event.target.value });
	}

	handleEmail(event) {
		this.setState({ email: event.target.value });
		if (this.state.password != "") {
			this.setState({ disabled: false });
		}
	}

	handlePassword(event) {
		this.setState({ password: event.target.value });
		if (this.state.email != "") {
			this.setState({ disabled: false });
		}
	}

	handleEmailCheck(event) {
		axios
			.get(`http://localhost:8000/api/users/${event.target.value}`)
			.then((response) => {
				var acc_type = response.data.data.account_type;
				console.log(acc_type);
				this.setState({
					emailError: false,
					emailText: "We'll never share your email.",
					acc_type: acc_type,
				});
				if (this.state.password != "") {
					this.setState({ disabled: false });
				}
			})
			.catch((error) => {
				this.setState({
					emailError: true,
					emailText: "Invalid Email!!",
					disabled: true,
				});
			});
	}

	//  Extreme efficient password checker
	handlePasswordVerification(event) {
		var json = { password: event.target.value };
		axios
			.post(`http://localhost:8000/api/users/verify/${this.state.email}`, json)
			.then((response) => {
				console.log(this.state.email);
				if (response.data.result === false) {
					this.setState({
						passwordError: true,
						passwordText: "Incorrect Password.",
					});
				} else {
					this.setState({
						passwordError: false,
						passwordText: "Your password will be encrypted.",
					});
					if (this.state.email != "") {
						this.setState({ disabled: false });
					}
				}
			})
			.catch(function (error) {
				if (error.response) {
					this.setState({
						passwordError: true,
						passwordText: "Invalid Email!!",
						disabled: true,
					});
				}
			});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ loading: true });
		var email = event.target[0].value;
		var password = event.target[1].value;
		var acc_type = this.state.acc_type;
		var json = {
			password: password,
			account_type: acc_type,
		};
		axios
			.post(`http://localhost:8000/api/users/verify/${this.state.email}`, json)
			.then((response) => {
				if (response.data.result == false) {
					this.setState({
						passwordError: true,
						passwordText: "Incorrect Password.",
						loading: false,
					});
				} else {
					this.setState({
						passwordError: false,
						passwordText: "Your password will be encrypted.",
					});
					if (this.state.email !== "") {
						localStorage.setItem("email", email);
						localStorage.setItem("acc_type", acc_type);
						window.location.reload(false);
					} else {
						this.setState({
							emailError: true,
							emailText: "Invalid Email!!",
							disabled: true,
							loading: false,
						});
					}
				}
			})
			.catch(function (error) {
				if (error.response) {
					this.setState({
						passwordError: true,
						passwordText: "Invalid Email!!",
						disabled: true,
						show: true,
						loading: false,
					});
				}
			});

		// axios.post(`http://localhost:5001/users/${email}`, json)
		//   .then(response => {
		//     localStorage.setItem("login", {email:email, acc_type:acc_type})
		//     window.location.reload(false)
		//   })
		//   .catch(error => {
		//     if (error.response.status == 400) {
		//       this.setState({show:true, disabled:true})

		//     }
		//   })
	}

	render() {
		return (
			<Paper elevation={3}>
				<Box ml={3} py={3}>
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
						<Box>
							<FormControl required error={this.state.emailError}>
								<InputLabel htmlFor="my-input">Email address</InputLabel>
								<Input
									id="my-input"
									aria-describedby="my-helper-text"
									type="email"
									onChange={this.handleEmail}
									onBlur={this.handleEmailCheck}
									required
								/>
								<FormHelperText id="my-helper-text">
									{this.state.emailText}
								</FormHelperText>
							</FormControl>
						</Box>
						<Box>
							<FormControl required error={this.state.passwordError}>
								<InputLabel htmlFor="my-input">Password</InputLabel>
								<Input
									id="my-input"
									aria-describedby="my-helper-text"
									type="password"
									onChange={this.handlePassword}
									required
								/>
								<FormHelperText id="my-helper-text">
									{" "}
									{this.state.passwordText}{" "}
								</FormHelperText>
							</FormControl>
						</Box>
						{/* <Box mt={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup row aria-label="acc_type" name="acc_type" value={this.state.acc_type} onChange={this.handleAccType}>
                  <FormControlLabel value="user" control={<Radio />} label="User" />
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                </RadioGroup>
              </FormControl>
            </Box> */}
						<Box mt={3}>
							{this.state.loading ? (
								<Fade
									in={this.state.loading}
									style={{
										transitionDelay: this.state.loading ? "300ms" : "0ms",
									}}
									unmountOnExit
								>
									<Button variant="contained" disabled>
										LOGIN{" "}
										<CircularProgress
											size="25px"
											style={{ marginLeft: "10px" }}
										/>
									</Button>
								</Fade>
							) : (
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={this.state.disabled}
								>
									LOGIN
								</Button>
							)}
							{/* <Button 
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.state.disabled}
              >
                LOGIN
              </Button> */}
						</Box>
						{this.state.show ? (
							<Box>Invalid Email Address / Password</Box>
						) : (
							<span></span>
						)}
					</form>
				</Box>
			</Paper>
		);
	}
}

export default withRouter(SignIn);
