import React, { Component } from "react";
import TopMenu from "./TopMenu";
import ForumOverview from "./ForumOverview"

class PrivatePage extends Component {

    render() {
        console.log("showing private page")
        return(
            <>
            <TopMenu/>
            <div className="page-content" id="PrivatePage">
                <ForumOverview/>
            </div>
            </>
        )
    }
}

export default PrivatePage