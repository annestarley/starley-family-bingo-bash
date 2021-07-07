import React, {Component, Fragment } from 'react';
import '../App.css';

class BingoClues extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className='bingo-clue hidden' id={this.props.i + 'section'}>
                    <h1>Hint: {this.props.data.unused[0]}...</h1>
                    <button className="reveal-btn" id={this.props.i} onClick={(e)=>{this.props.revealImg(e)}}>Reveal...</button>
                    <div className="reveal hidden">
                        <img src={this.props.data.image} alt='Bingo image.' className='bingo-img' id={this.props.i + 'bingo-img'}/>
                        <h2><span className="hearts">&#9829;</span>  {this.props.name}  <span className="hearts">&#9829;</span></h2>
                        <button onClick={(e)=>{this.props.nextQuestion(e)}} className="next-btn" id={this.props.i} name={JSON.stringify(this.props)}>NEXT CLUE</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default BingoClues;