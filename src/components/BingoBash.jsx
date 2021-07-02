import React, {Component, Fragment } from 'react';
import '../App.css';
import BingoClues from './BingoClues';

var JSONData = require('./HelperFiles/BingoObject.json')

class BingoBash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSONData,
            ready: true
        }

        this.startTheBash = this.startTheBash.bind(this);
        this.readJSON = this.readJSON.bind(this);
        this.writeJSON = this.writeJSON.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    async componentDidMount() {
        this.readJSON();
        console.log('async', this.state.data.family)
    }

    startTheBash(e) {
        e.target.classList.add('hidden');
        let firstClue = document.getElementById('0')
        console.log('firstClue', firstClue)
        document.getElementById('0').classList.remove('hidden')
    }

    readJSON() {
        let obj = this.state.data;
        let family = obj.family
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
        obj.family = shuffledFamily;
        this.setState({data: [obj]})
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
                <h1>Starley Family Bingo Bash</h1>
                <button className='start-btn' onClick={(e)=>{this.startTheBash(e)}}>Start the Bash</button>
                {this.state.ready ? this.state.data.family.map((person,i) => {
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