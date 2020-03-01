import React, {Component} from 'react';
import {createStore} from 'redux';

const btnScissor = document.getElementById("ss");
const btnRock = document.getElementById("rr");
const btnPaper = document.getElementById("pp");
// const btn = document.querySelectorAll("button");
const ul = document.querySelector("ul");
const myScore = document.querySelector(".myscore");
const computerScreen = document.querySelector(".computer");

const WIN = "WIN";
const LOSE = "LOSE";
const DRAW = "DRAW";

const initialState = [{
    score: 0,
    count: 0,
    whatcom: '',
}]

const reducer = (state=initialState, action) => {
    // console.log(action);
    switch(action.type){
        case WIN:
            return [...state, {score: action.score+1, count:action.count+1, whatcom: action.whatcom}]
        case LOSE:
            return [...state, {score: action.score+1, count:action.count-1, whatcom: action.whatcom}]
        case DRAW:
            return [...state, {score: action.score+1, count:action.count+1, whatcom: action.whatcom}]
        default:
            return state;
    }
}
const store = createStore(reducer);

const winGame = function(score, count, text){
    return {
        type: WIN,
        score: score+1,
        count: count+1,
        whatcom: text
    }
}
const loseGame = function(score, count, text){
    return {
        type: WIN,
        score: score-1,
        count: count+1,
        whatcom: text
    }
}
const drawGame = function(score, count, text){
    return {
        type: WIN,
        score: score,
        count: count+1,
        whatcom: text
    }
}

const arrayRSP = ['ss', 'rr', 'pp']; //ss:가위 rr:바위 pp:보
const computerRSP = function(){
    const random = Math.floor(Math.random()*3);
    const com = arrayRSP[random];
    // dispatch 컴퓨터가 낸거 
    return com;
}

const showResult = function(){
    const result = store.getState();
    console.log(result);
}
store.subscribe(showResult);

const onSubmit = function(e){
    e.preventDefault();
    const result = store.getState();
    const mine = e.target.id;
    const computers = computerRSP();
    if(mine === computers){
        store.dispatch({type:DRAW, score:result.score, count: result.count, whatcom: computers});
        console.log('비겼따');
    }else{
        if(mine+computers === "sspp"){
            store.dispatch({type:WIN,score:result.score, count: result.count, computers});
            console.log(mine+computers + '이겼따');
        }if(mine+computers === "rrss"){
            store.dispatch({type:WIN,score:result.score, count: result.count, computers});
            console.log(mine+computers + '이겼따');
        }if(mine+computers === "pprr"){
            store.dispatch({type:WIN,score:result.score, count: result.count, computers});
            console.log(mine+computers + '이겼따');
        }if(mine+computers === "ssrr"){
            store.dispatch({type:LOSE, score:result.score, count: result.count,computers});
            console.log(mine+computers + '졌다');
        }if(mine+computers === "rrpp"){
            store.dispatch({type:WIN, score:result.score, count: result.count,computers});
            console.log(mine+computers + '졌다');
        }if(mine+computers === "ppss"){
            store.dispatch({type:WIN, score:result.score, count: result.count,computers});
            console.log(mine+computers + '졌다');
        }
    }
    showResult();
}

btnScissor.addEventListener("click", onSubmit);
btnRock.addEventListener("click", onSubmit);
btnPaper.addEventListener("click", onSubmit);
