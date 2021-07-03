import React, {Component, Fragment } from 'react';
import '../App.css';

class Refresh extends Component {
    constructor(props) {
        super(props);

        this.refreshPage = this.refreshPage.bind();
    }

    refreshPage () {
        window.location.reload();
    }

    render() {
        return (
            <Fragment>
                <div className="restart-div hidden">
                    <h1>Looks like we have seen a question from every family member!</h1>
                    <button className='restart-btn' onClick={()=>{this.refreshPage()}}>Restart the game with new questions?</button>
                </div>
            </Fragment>
        )
    }
}

export default Refresh;