import React, { Component } from "react";
import LeftPanel from "../../components/LeftPanel";
import Center from "../../components/Center";
import RightPanel from "../../components/RightPanel";
import "./style.css";

class Dashboard extends Component {
    state =  {
        panels: [
            "col-lg-2",
            "col-lg-2"
        ]
    }

    changeLeft = (event) => {
        event.preventDefault();

        if (this.state.panels[0]) {
            this.setState({
                panels: [
                    "",
                    this.state.panels[1]
                ]
            })
        } else {
            this.setState({
                panels: [
                    "col-lg-2",
                    this.state.panels[1]
                ]
            });
        }
    }

    changeRight = (event) => {
        event.preventDefault();

        if (this.state.panels[1]) {
            this.setState({
                panels: [
                    this.state.panels[0],
                    ""
                ]
            })
        } else {
            this.setState({
                panels: [
                    this.state.panels[0],
                    "col-lg-2"
                ]
            });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={this.state.panels[0]} id="left-panel">
                        <LeftPanel />
                    </div>
                    <div className="col" id="center-body">
                        <button id="left-control" onClick={this.changeLeft}>click</button>
                        <button id="right-control" onClick={this.changeRight}>click</button>
                        <Center />
                    </div>
                    <div className={this.state.panels[1]} id="right-panel">
                        <RightPanel />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;