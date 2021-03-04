import React, { Component } from 'react';
import { Typography, Grid, Button } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import {Create} from "@material-ui/icons";

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
        }
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.getRoomDetails();
    }

    getRoomDetails = async () => {
        const response = await fetch('/api/get-room' + '?code=' + this.roomCode);
        if (!response.ok) {
            this.props.leaveRoomCallback();
            this.props.history.push('/');
        }
        const data = await response.json();
        this.setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
        });
    }

    leaveButtonPressed = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch('/api/leave-room', requestOptions);
        this.props.leaveRoomCallback();
        this.props.history.push("/");
    }

    updateShowSettings = (value) => {
        this.setState({
            showSettings: value,
        })
    }

    renderSettings = () => {
        return (
            <Grid container spacing={1} align={"center"}>
                <Grid item xs={12}>
                    <CreateRoomPage
                        update={true}
                        votesToSkip={this.state.votesToSkip}
                        guestCanPause={this.state.guestCanPause}
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => this.updateShowSettings(false)}
                    >Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderSettingsButton = () => {
        return(
            <Grid item xs={12}>
                <Button variant={"contained"} color={"primary"} onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        )
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings()
        }
        return(
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant={"h4"} component={"h4"}>
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"}>
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"}>
                        Guest Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"}>
                        Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12}>
                    <Button variant={"contained"} color={"secondary"} onClick={this.leaveButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>

        );
    }
}

export default Room;