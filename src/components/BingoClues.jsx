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
                <div className='bingo-clue hidden' id={this.props.i + 'section'}>
                    <h1>Hint: {this.props.data.unused[0]}...</h1>
                    <button className="reveal-btn" onClick={(e)=>{this.props.revealImg(e)}}>Reveal...</button>
                    <div className="reveal hidden">
                        <img src={this.props.data.image} alt='Bingo image.' className='bingo-img'/>
                        <h2>{this.props.name}</h2>
                        <button onClick={(e)=>{this.props.nextQuestion(e)}} className="next-btn" id={this.props.i}>NEXT CLUE</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default BingoClues;