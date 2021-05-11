import React from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Grid, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Rating from "@material-ui/lab/Rating";

import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
	withStyles,
} from "@material-ui/core/styles";

import "./facilityItem.styles.scss";

class FacilityItem extends React.Component {
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
		var time =
			today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

		this.state = {
			facility: props.facility,
			disabled: false,
			availability: props.facility.availability,
			anchorEl: null,
			date: date,
			time: time,
			message: "",
			open: false,
      openAvailability: false,
			rating: 5,
      reason: ''
		};

		this.handleUnavailability = this.handleUnavailability.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCloseSelect = this.handleCloseSelect.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseAvailability = this.handleDialogCloseAvailability.bind(this);
    this.handleDialogClickAvailbility = this.handleDialogClickAvailbility.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this);
	}

	componentDidMount() {
		if (this.state.availability === "No") {
			this.setState({ disabled: true });
		}

		axios
			.get(
				`http://localhost:8000/api/reports/${this.props.facility.facility_id}`
			)
			.then((response) => {
				const rate =
					this.state.rating - response.data.data.reports.length * 0.2;
				this.setState({ rating: rate });
			})
			.catch((error) => {});
	}

	handleUnavailability(event) {
    event.preventDefault();

    // Creating a notification
    var json = {
			message: this.state.reason,
      account_type: localStorage.getItem("acc_type"),
      facility_name: this.state.facility.facility_name
		};
    axios
			.post(
				`http://localhost:8000/api/notifications/${localStorage.getItem("acc_type") == "admin" ? "admin" : "user"}`, json
			)
			.then((response) => {
        // Update Availability
        var availabilityJson = {
          availability: this.state.availability == "Yes" ? "No" : "Yes"
        };
        axios
          .put(
            `http://localhost:8000/api/updateavailability/${this.state.facility.facility_id}`, availabilityJson
          )
          .then((response) => {
            // console.log(response.data)
            const availability = this.state.availability == "Yes" ? "No" : "Yes";
            this.setState({
              openAvailability: false,
              disabled: !this.state.disabled,
              availability: availability
            });
          })
          .catch((error) => {
            this.setState({ disabled: true });
          });
			})
			.catch((error) => {
        this.setState({ disabled: true });
			});

    
	}

	handleClick(event) {
		this.setState({ anchorEl: event.currentTarget });
	}

	handleClose() {
		this.setState({ anchorEl: null });
	}

	handleSelect(event) {
		this.setState({ message: event.target.value });
	}

	handleDialogClose = () => {
		this.setState({ open: false });
	};

	handleDialogCloseAvailability = () => {
		this.setState({ openAvailability: false, reason: '' });
	};

  handleDialogClickAvailbility(event) {
    this.setState({ openAvailability: true, reason: '' });
  };

  handleChangeReason(event) {
    this.setState({ reason:event.target.value })
  }

	handleCloseSelect(event) {
		const message = event.target.textContent;
		this.setState({ anchorEl: null, message: event.target.textContent });
		const date = this.state.date.split("-").join("");
		const time = this.state.time.split(":").join("");
		var json = {
			date: date,
			facility_id: String(this.state.facility.facility_id),
			message: message,
			time: time,
			facility_name: this.state.facility.facility_name,
		};

		axios
			.post(`http://localhost:8000/api/createreport`, json)
			.then((response) => {
				axios
					.get(
						`http://localhost:8000/api/reports/${this.props.facility.facility_id}`
					)
					.then((response) => {
						const rate =
							this.state.rating - 1 * 0.2;
						this.setState({ rating: rate, open: true });
					})  
					.catch((error) => {});
			})
			.catch((error) => {
				// console.log(error);
        alert("Unable to send your report. Please send an email to the admin. Thank you.")
			});
	}

  
	render() {
		let theme = createMuiTheme();
		theme = responsiveFontSizes(theme);
		const acc_type = localStorage.getItem("acc_type") || null;

		const ColorButton = withStyles((theme) => ({
			root: {
				color: theme.palette.getContrastText(green[500]),
				backgroundColor: green[500],
				"&:hover": {
					backgroundColor: green[700],
				},
			},
		}))(Button);

		return (
			<Paper elevation={5} className="content">
				<Box mx={2}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							<img src={this.state.facility.image_url} className="image test"  alt="...Loading" />
						</Grid>
						<Grid item xs={12} sm={8} className="description">
							<ThemeProvider theme={theme}>
								<Typography variant="h4">
									{this.state.facility.facility_name}
								</Typography>
								<Typography variant="h6" className="location">
									{this.state.facility.location}{" "}
									<Rating
										name="size-small"
										size="small"
										readOnly
										value={this.state.rating}
										precision={0.2}
									/>
								</Typography>
								<Typography variant="h6">
									SGD${this.state.facility.price}
								</Typography>
								<Typography variant="h7">
									Suspendisse condimentum ipsum a finibus sollicitudin. Vestibulum ultricies, tortor quis ornare tempus, lacus risus dapibus justo, vel semper quam nunc eget ex. Sed in ligula	mollis, pharetra lorem eget, fringilla elit. Sed faucibus elit in urna cursus posuere.
								</Typography>
							</ThemeProvider>
							<Box spacing={3} mt={1}>
								<Button
									size="small"
									variant="contained"
									color="primary"
									disabled={this.state.disabled}
									href={ window.location.pathname +	"/" +	this.state.facility.facility_name	}
								>
									BOOK
								</Button>
								{
                  acc_type ?
                    acc_type == "admin" ? (
                      this.state.disabled ? (
                        <Box component="span" ml={2}>
                          <ColorButton
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={this.handleDialogClickAvailbility}
                          >
                            Mark Available
                          </ColorButton>
                        </Box>
                      ) : 
                      (
                        <Box component="span" ml={2}>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={this.handleDialogClickAvailbility}
                          >
                            Mark Unavailable
                          </Button>
                        </Box>
                      )
                    ) : (
                    <Box component="span" ml={2}>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={this.handleClick}
                      >
                        REPORT FACILITY
                      </Button>
                    </Box>
                    )
                  :
                  null
								}
							</Box>

							{
                this.state.disabled ? 
                (
                  <Box mt={1}>
                    <Typography color="secondary">
                      Currently Unavailable
                    </Typography>
                  </Box>
                ) 
                : 
                null
              }

							<Menu
								id="simple-menu"
								anchorEl={this.state.anchorEl}
								keepMounted
								open={Boolean(this.state.anchorEl)}
								onChange={this.handleSelect}
								onClose={this.handleClose}
							>
								<MenuItem onClick={this.handleCloseSelect} value="Broken Chair">
									Broken Chair
								</MenuItem>
								<MenuItem onClick={this.handleCloseSelect} value="Broken Roof">
									Broken Roof
								</MenuItem>
								<MenuItem
									onClick={this.handleCloseSelect}
									value="Poor Cleanliness"
								>
									Poor Cleanliness
								</MenuItem>
							</Menu>
  
							<Dialog
								open={this.state.open}
								onClose={this.handleDialogClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">
									Reported Successfully!!
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										We will get to it immediately. As for now, please enjoy our
										other available areas / facilities.
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleDialogClose} color="primary">
										Close
									</Button>
								</DialogActions>
							</Dialog>

              <Dialog
                open={this.state.openAvailability}
                onClose={this.handleDialogClickAvailbility}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">Confirmation of {this.state.facility.facility_name}'s Availability</DialogTitle>
                <form onSubmit={this.handleUnavailability}>
                  <DialogContent>
                    {
                      this.state.availability == "Yes" ?
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to mark this facility, <strong>{this.state.facility.facility_name}, <span style={{color:'red'}}>unavailable</span> ?</strong>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="message"
                            label={
                              this.state.openAvailability ?
                              "Message (Reason for marking unavailable)"
                              :
                              "Message (Reason for marking available)"
                            }
                            type="message"
                            fullWidth
                            onChange={this.handleChangeReason}
                          />
                      </DialogContentText>
                      :
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to mark this facility, <strong>{this.state.facility.facility_name}, <span style={{color:'green'}}>available</span> ?</strong>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="message"
                            label={
                              this.state.openAvailability ?
                              "Message (Reason for marking unavailable)"
                              :
                              "Message (Reason for marking available)"
                            }
                            type="message"
                            fullWidth
                            onChange={this.handleChangeReason}
                          />
                      </DialogContentText>
                    }
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleDialogCloseAvailability} variant="contained" color="secondary">
                      NO
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={this.state.reason === "" ? true : false}>
                      YES
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		);
	}
}

export default FacilityItem;
