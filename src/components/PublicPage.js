import React, { Component } from "react";
import TopMenu from './TopMenu.js';
import ForumOverview from "./ForumOverview"

class PublicPage extends Component {

    render() {
        return(
            <>
            <TopMenu/>
            <div>
                <ForumOverview/>
            </div>
            </>
        )
    }
}

export default PublicPage