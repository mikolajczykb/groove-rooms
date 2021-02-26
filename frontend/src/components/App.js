import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/user-in-room');
        const data = await response.json();
        this.setState({
            roomCode: data.code,
        })
    }

    render() {
        return(<div class="center">
            <Router>
                <Switch>
                    <Route exact path='/' render={() => {
                        return this.state.roomCode ? <Redirect to={`/room/${this.state.roomCode}`}/> : <HomePage/>
                    }} />
                    <Route path='/join' component={RoomJoinPage} />
                    <Route path='/create' component={CreateRoomPage} />
                    <Route path='/room/:roomCode' component={Room} />
                </Switch>
            </Router>
        </div>);
    }
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);