import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";

class ReportItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			report: this.props.report,
			report_id: this.props.report.report_id,
			anchorEl: null,
			open: false,
			id: undefined,
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleDelete(event) {
		var json = {
			date: this.state.report.date,
			time: this.state.report.time,
			message: this.state.report.message,
			facility_id: this.state.report.facility_id,
		};
		axios
			.delete(`http://localhost:8000/api/report/${this.state.report_id}`, json)
			.then((response) => {
				// window.location.replace("/report")
				// console.log(response.data.data.reports)
				this.setState({ open: false });
			})
			.catch((error) => {
				alert("Report failed to delete. Please report to the admins.");
			});
	}

	handleClick(event) {
		this.setState({ anchorEl: event.currentTarget, open: true });
		console.log("click");
	}

	handleClose() {
		this.setState({ anchorEl: null, open: false });
	}

	render() {
		return (
			<Grid item xs={12} sm={6} md={4}>
				<Card>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							Report #{this.state.report.report_id}
						</Typography>
						<Typography variant="h5" component="h2">
							{this.state.report.facility_name}
						</Typography>
						<Typography color="textSecondary">
							{this.state.report.date} {this.state.report.time}
						</Typography>
						<Typography variant="body2" component="p">
							{this.state.report.message}
							<br />
							{/* <Rating name="size-medium" readOnly defaultValue={Math.random()*10/2 + 1} /> */}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" onClick={this.handleClick}>
							Delete
						</Button>
					</CardActions>

					<Popover
						id={this.state.id}
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						onClose={this.handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
					>
						<Box m={2}>
							<Typography variant="h7">
								<strong>Are you sure?</strong>
							</Typography>
							<Box my={1}>
								<Box component="span" mx={3}>
									<Button
										variant="contained"
										color="secondary"
										onClick={this.handleDelete}
									>
										Delete
									</Button>
								</Box>
							</Box>
						</Box>
					</Popover>
				</Card>
			</Grid>
		);
	}
}

export default ReportItem;
