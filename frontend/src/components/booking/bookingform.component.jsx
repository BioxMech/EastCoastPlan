import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";

import Cards from "react-credit-cards";
import "./bookingform.styles.scss";
import "react-credit-cards/es/styles-compiled.css";

class BookingForm extends React.Component {
	constructor(props) {
		super(props);

		var today = new Date();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		if (month < 10) {
			month = "0" + (today.getMonth() + 1);
		}

		if (day < 10) {
			day = "0" + today.getDate();
		}

		var date = today.getFullYear() + "-" + month + "-" + day;
		var path = window.location.pathname
			.replaceAll("%20", "_")
			.split("/")
			.splice(2, 4)
			.join("/");

		this.state = {
			facilityInfo: [],
			date: date,
			facilityName: props.facilityName,
			scheduleID: props.scheduleID,
			price: props.price,
			timeslots: [],
			todayTimeSlots: [],
			path: path,
			checker: false,
			disabled: true,
			loading: false,
			month: 0,
			year: 0,
			start: "",
			end: "",
			cvc: "",
			expiry: "",
			focus: "",
			name: "",
			number: "",
			submitLoading: false,
			cardFail: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		// try {
		//   if (this.state.timeslots[0].start.slice(0,10) == this.state.date) {
		//     this.setState({checker:true, disabled:false})
		//   }
		// }
		// catch(error) {
		//   setTimeout(() => {
		//     if (this.state.timeslots[0].start.slice(0,10) == this.state.date) {
		//       this.setState({checker:true, disabled:false})
		//     }
		//   }, 2500)
		// }
	}

	handleInputFocus = (e) => {
		this.setState({ focus: e.target.name });
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name == "name") {
			this.setState({ [name]: value });
		} else if (!isNaN(value)) {
			this.setState({ [name]: value });
		}
		console.log({ [name]: value });
	};

	componentDidMount() {
		axios
			.get(`http://localhost:8000/api/getslots/${this.state.path}`)
			.then((response) => {
				this.setState({ timeslots: response.data.data });
				if (this.state.timeslots[0].start.slice(0, 10) == this.state.date) {
					this.setState({ checker: true, disabled: false });
				}
			});
	}

	handleSelect(event) {
		this.setState({
			start: event.target.value.split("-")[0],
			end: event.target.value.split("-")[1],
		});
		console.log("Start + ", event.target.value.split("-")[0]);
		console.log("End + ", event.target.value.split("-")[1]);
	}

	handleChange(event) {
		this.setState({ date: event.target.value });
		console.log(event.target.value);
		setTimeout(() => {
			// console.log(this.state.date)
			var json = {
				from: this.state.date,
			};

			axios
				.post(`http://localhost:8000/api/getslots/${this.state.path}`, json)
				.then((response) => {
					this.setState({ timeslots: response.data.data });
				});

			this.setState({ loading: true });
		}, 100);

		setTimeout(() => {
			if (this.state.timeslots[0].start.slice(0, 10) == this.state.date) {
				this.setState({ checker: true, disabled: false });
			} else {
				this.setState({ checker: false, disabled: true });
			}
			this.setState({ loading: false });
		}, 2555);
	}

	handleSubmit(event) {
		this.setState({ submitLoading: true });
		event.preventDefault();
		const month = this.state.expiry.slice(0, 2);
		const year = "20" + this.state.expiry.slice(2, 4);

		const booking_id =
			this.props.internal_name + this.state.date + this.state.start;

		const start = this.state.date + " " + this.state.start;
		const finish = this.state.date + " " + this.state.end;

		var json = {
			schedule_id: String(this.props.scheduleID),
			facility_id: String(this.props.facilityInfo.facility_id),
			resource_id: this.props.internal_name,
			user_id: 42,
			full_name: this.state.name,
			date: this.state.date,
			start: start,
			finish: finish,
			price: this.props.price,
			creditCard: this.state.number,
			expMonth: month,
			expYear: year,
			cvv: this.state.cvc,
		};

		console.log(json);
		axios
			.post(`http://localhost:8000/api/makebooking/${booking_id}`, json)
			.then((response) => {
				console.log(response);
				console.log("successful");
				setTimeout(() => {
					window.location.replace("/success");
				}, 5000);
			})
			.catch((error) => {
				console.log(error);
				this.setState({ submitLoading: false, cardFail: true });
			});
	}

	render() {
		return (
			<div id="PaymentForm">
				<Cards
					cvc={this.state.cvc}
					expiry={this.state.expiry}
					focused={this.state.focus}
					name={this.state.name}
					number={this.state.number}
				/>
				<form onSubmit={this.handleSubmit}>
					<Box my={2}>
						<TextField
							id="standard-error"
							label="Name"
							name="name"
							onChange={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
					</Box>
					<Box my={2}>
						<b>Price: SGD${this.props.price}</b>
					</Box>
					<Box my={2}>
						<TextField
							id="date"
							label="Date"
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.date}
							onChange={this.handleChange}
						/>
					</Box>
					<Box my={2}>
						{this.state.loading ? (
							<Fade
								in={this.state.loading}
								style={{
									transitionDelay: this.state.loading ? "300ms" : "0ms",
								}}
								unmountOnExit
							>
								<CircularProgress />
							</Fade>
						) : (
							<FormControl>
								<InputLabel
									shrink
									id="demo-simple-select-placeholder-label-label"
								>
									Timeslots
								</InputLabel>
								<Select
									labelId="demo-simple-select-placeholder-label-label"
									id="demo-simple-select-placeholder-label"
									// value={age}
									onChange={this.handleSelect}
									displayEmpty
								>
									{this.state.checker ? (
										this.state.timeslots
											.filter(
												(tsDetails) =>
													tsDetails.start.slice(0, 10) == this.state.date
											)
											.map((timeslotDetails) => {
												let date = timeslotDetails.start.slice(0, 10);
												let start_time =
													timeslotDetails.start.slice(11) + ":00";
												let end_time = timeslotDetails.finish.slice(11) + ":00";
												let timeslot = `${date} ${start_time}-${end_time}`;
												return (
													<MenuItem value={start_time + "-" + end_time}>
														{timeslot}
													</MenuItem>
												);
											})
									) : (
										<MenuItem value="">
											<em>--- No available timeslots ---</em>
										</MenuItem>
									)}
								</Select>
								<FormHelperText>Label + placeholder</FormHelperText>
							</FormControl>
						)}
					</Box>
					<Box my={2}>
						<TextField
							required
							type="text"
							id="card_number"
							label="Card Number"
							name="number"
							inputProps={{ maxLength: 16 }}
							value={this.state.number}
							onChange={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
						<Box>
							<TextField
								required
								type="text"
								id="expiry"
								name="expiry"
								label="Valid thru"
								value={this.state.expiry}
								onChange={this.handleInputChange}
								onFocus={this.handleInputFocus}
								inputProps={{ maxLength: 4 }}
							/>
							<Box component="span" ml={2}>
								<TextField
									required
									type="text"
									id="cvc"
									name="cvc"
									label="CVC"
									pattern="\d{3,4}"
									value={this.state.cvc}
									onChange={this.handleInputChange}
									onFocus={this.handleInputFocus}
									inputProps={{ maxLength: 3 }}
								/>
							</Box>
						</Box>
					</Box>
					<Box my={2}>
						{this.state.submitLoading ? (
							<Fade
								in={this.state.submitLoading}
								style={{
									transitionDelay: this.state.submitLoading ? "300ms" : "0ms",
								}}
								unmountOnExit
							>
								<Button variant="contained" disabled={this.state.disabled}>
									BOOK NOW{" "}
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
								BOOK NOW
							</Button>
						)}

						{this.state.cardFail ? <h1> You failed to make payment </h1> : null}
						{/* <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.disabled}
          >
          
            BOOK NOW
          </Button> */}
					</Box>
				</form>
			</div>
		);
	}
}

export default BookingForm;
