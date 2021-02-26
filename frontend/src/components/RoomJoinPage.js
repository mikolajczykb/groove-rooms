import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom"

class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: "",
        }
    }

    handleTextFieldChange = (e) => {
        this.setState({
            roomCode: e.target.value,
        });
    }

    roomButtonPressed = async() => {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };
        try {
            const response = await fetch('/api/join-room', requestOptions);
            if (response.ok) {
                this.props.history.push(`/room/${this.state.roomCode}`);
            } else {
                this.setState({
                    error: "Room not found."
                });
            }
        } catch(error) {
            console.log(error);
        }

    }

    render() {
        return (
          <Grid container spacing={1} align={"center"}>
              <Grid item xs={12}>
                  <Typography variant={"h4"} component={"h4"}>
                      Join a Room
                  </Typography>
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    error={this.state.error}
                    label={"Code"}
                    placeholder={"Insert Room Number"}
                    value={this.state.roomCode}
                    helperText={this.state.error}
                    variant={"outlined"}
                    onChange={this.handleTextFieldChange}
                  />
              </Grid>
              <Grid item xs={12}>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={this.roomButtonPressed}>Join Room</Button>
              </Grid>
              <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color={"secondary"}
                    to={"/"}
                    component={Link}
                  >Back</Button>
              </Grid>
          </Grid>
        );
    }
}

export default RoomJoinPage;