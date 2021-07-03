import React, {Component, Fragment } from 'react';
import '../App.css';
import BingoClues from './BingoClues';

var JSONData = require('./HelperFiles/BingoObject.json')

class BingoBash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            family: JSONData.family
        }

        this.startTheBash = this.startTheBash.bind(this);
        this.readJSON = this.readJSON.bind(this);
        this.writeJSON = this.writeJSON.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.hideStartButton = this.hideStartButton.bind(this);
        this.revealImg = this.revealImg.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    componentDidMount() {
        this.readJSON();
        console.log('async', this.state.family)
        console.log('read json', this.readJSON())
    }

    startTheBash(e, iteration = 0) {
        console.log('bash', this.state)
        this.hideStartButton();
        this.nextQuestion(iteration);
    }

    hideStartButton () {
        let startButton = document.querySelector('.start-btn');
        if (!startButton.classList.contains('hidden')) startButton.classList.add('hidden');
        let firstQuestion = document.getElementById('0');
        if (firstQuestion.classList.contains('hidden')) firstQuestion.classList.remove('hidden');
    }

    revealImg (e) {
        console.log(e.target)
    }

    nextQuestion(iteration) {
        let currentQuestion = document.getElementById(iteration);
        console.log(currentQuestion)
    }

    readJSON() {
        let family = this.state.family
        family.forEach(person => {
            for (let name in person) {
                if (!person[name]['unused'].length) {
                    if (!person[name]['used'].length) console.log('error');
                    else {
                        let temp = person[name]['used'];
                        person[name]['unused'] = temp;
                        person[name]['used'] = [];
                    }
                }
            }
        })
        let shuffledFamily = this.shuffleArray(family);
        this.setState({family: shuffledFamily})
        return shuffledFamily;        
    }

    shuffleArray(array) {
        var currentIndex = array.length,  randomIndex;
      
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    writeJSON() {

    }

    render() {
        return (
            <Fragment>
                {console.log('inside fragment', this.state)}
                <div className="title">
                    <h1>Starley Baby</h1>
                    <img src="/images/logo.png" alt="" />
                </div>
                <button className='start-btn' onClick={(e)=>{this.startTheBash(e)}}>Start the Bash</button>
                {this.state.family ? this.state.family.map((person,i) => {
                    for (let name in person) {
                        let data = person[name]
                        return <BingoClues name={name} data={data} i={i} />
                    }
                }): ''}
            </Fragment>
        )
    }
}

export default BingoBash;