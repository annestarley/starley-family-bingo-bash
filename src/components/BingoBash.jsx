import React, {Component, Fragment } from 'react';
import '../App.css';
import BingoClues from './BingoClues';
import Refresh from './Refresh';

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
        this.saveBlob = this.saveBlob.bind(this);
    }

    componentDidMount() {
        this.readJSON();
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

    startTheBash(e, iteration = 0) {
        let startButton = document.querySelector('.start-btn');
        if (!startButton.classList.contains('hidden')) startButton.classList.add('hidden');
        let firstQuestion = document.getElementById('0section');
        if (firstQuestion.classList.contains('hidden')) firstQuestion.classList.remove('hidden');
    }

    hideStartButton () {
        let startButton = document.querySelector('.start-btn');
        if (!startButton.classList.contains('hidden')) startButton.classList.add('hidden');
        let firstQuestion = document.getElementById('0section');
        if (firstQuestion.classList.contains('hidden')) firstQuestion.classList.remove('hidden');
    }

    revealImg (e) {
        if (!e.target.classList.contains('hidden')) e.target.classList.add('hidden');
        let sib = e.target.nextSibling;
        if (sib.classList.contains('hidden')) sib.classList.remove('hidden');
    }

    nextQuestion(e) {
        let personArr = JSON.parse(e.target.name);
        let iteration = e.target.id;
        this.writeJSON(personArr, iteration);

        let currentQuestion = document.getElementById(`${iteration}section`);

        if (!currentQuestion.classList.contains('hidden')) currentQuestion.classList.add('hidden');

        if (document.getElementById(`${parseInt(iteration) + 1}section`)) {
            let nextQuestion = document.getElementById(`${parseInt(iteration) + 1}section`);
            if (nextQuestion.classList.contains('hidden')) nextQuestion.classList.remove('hidden');

        } else {
            let restartDiv = document.querySelector('.restart-div');
            if (restartDiv.classList.contains('hidden')) restartDiv.classList.remove('hidden');
        }
    }

    writeJSON(personArr, iteration) {
        let name = personArr.name;
        let newFamily = this.state.family;
        let person = this.state.family[iteration][name];

        person.used.push(person.unused[0]);
        person.unused.shift();
        newFamily[iteration][name] = person;

        this.setState({family: newFamily})
        console.log(name, 'NEW STATE', this.state)
        // WRITE TO JSON

        let newData = JSON.stringify(this.state.family, null, 2);
        let blob = new Blob([newData], {type: 'application/json'});
        let blobURL = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = blobURL;
        console.log('BLOB', blob)

        // saveAs(blob, './HelperFiles/BingoObject.json');
        // this.saveBlob(blob, 'BingoObject.json');
    }

    saveBlob(blob, fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
    
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h1>Starley Baby</h1>
                    <img src="/images/logo.png" alt="" />
                </div>
                <button className='start-btn' onClick={(e)=>{this.startTheBash(e)}}>Start the Game</button>
                {this.state.family ? this.state.family.map((person,i) => {
                    for (let name in person) {
                        let data = person[name]
                        return <BingoClues name={name} data={data} i={i} revealImg={(e) => {this.revealImg(e)}} nextQuestion={(e) => {this.nextQuestion(e)}}/>
                    }
                }): ''}
                <Refresh />
            </Fragment>
        )
    }
}

export default BingoBash;