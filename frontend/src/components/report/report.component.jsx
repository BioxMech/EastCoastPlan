import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import ReportItem from "./reportItem.component";

class Report extends React.Component {
	constructor() {
		super();
		this.state = {
			reportList: [],
			facilityList: [],
		};
	}

	componentDidMount() {
		axios.get(`http://localhost:8000/api/reports`).then((response) => {
			this.setState({ reportList: response.data.data.reports });
			// console.log(response.data.data.reports)
		});

		axios.get(`http://localhost:8000/api/facilities`).then((res) => {
			const facilityList = res.data.data.schedules;
			this.setState({ facilityList });
			// console.log(facilityList)
		});
	}

	render() {
		return (
			<Box my={3} mx={3}>
				<Paper elevation={5}>
					<Box px={2} py={2}>
						<Typography align="center" variant="h2">
							Reports
						</Typography>
						<br />
						<Grid container spacing={2}>
							{this.state.reportList.map((report) => (
								<ReportItem key={report.report_id} report={report} />
							))}
						</Grid>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default Report;
