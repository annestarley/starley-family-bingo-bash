import React, {Component, Fragment } from 'react';
import '../App.css';

class BingoClues extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log('PROPS',this.props)
        return (
            <Fragment>
                <div className='bingo-clue hidden' id={this.props.i}>
                    <h1>Hint: {this.props.data.unused[0]} - {this.props.name}</h1>
                    <img src={this.props.data.image} alt='Bingo image.' className='bingo-img'/>
                    <button onClick={()=>{this.handleClues()}}>Next Clue</button>
                </div>
            </Fragment>
        )
    }
}

export default BingoClues;