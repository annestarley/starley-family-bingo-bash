import React, {Component, Fragment } from 'react';
import '../App.css';

class BingoClues extends Component {
    constructor(props) {
        super(props);

        this.revealImg = this.revealImg.bind()
    }

    revealImg (e) {
        console.log(e.target)
        if (!e.target.classList.contains('hidden')) e.target.classList.add('hidden');
        let sib = e.target.nextSibling;
        if (sib.classList.contains('hidden')) sib.classList.remove('hidden');
    }

    render() {
        console.log('PROPS',this.props)
        return (
            <Fragment>
                <div className='bingo-clue hidden' id={this.props.i}>
                    <h1>Hint: {this.props.data.unused[0]}...</h1>
                    <button className="reveal-btn" onClick={(e)=>{this.revealImg(e)}}>Reveal...</button>
                    <div className="reveal hidden">
                        <img src={this.props.data.image} alt='Bingo image.' className='bingo-img'/>
                        <h2>{this.props.name}</h2>
                        <button onClick={()=>{this.handleClues()}} className="next-btn">NEXT CLUE</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default BingoClues;