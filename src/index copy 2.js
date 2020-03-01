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
const COMPUTER = "COMPUTER";

const initialState = {
    score: 0,
    count: 0,
    computers: '',
}

export const reducer = (state=initialState, action) => {
    // console.log(action);
    switch(action.type){
        case WIN:
            return {...state, score: state.score + 1, count: state.count + 1};
        case LOSE:
            return {...state, score: state.score - 1, count: state.count + 1};
        case DRAW:
            return {...state, score: state.score, count: state.count + 1};
        case COMPUTER:
            return {...state, computers: action.computers};
        default:
            return state;
    }
}
const store = createStore(reducer);

const arrayRSP = ['ss', 'rr', 'pp']; //ss:가위 rr:바위 pp:보
const computerRSP = function(){
    const random = Math.floor(Math.random()*3);
    const com = arrayRSP[random];
    // dispatch 컴퓨터가 낸거 
    return com;
}

const showResult = function(){
    const result = store.getState();
    let whatcom = result.computers;
    if(whatcom === "ss"){
        whatcom = "가위";
    }else if(whatcom === "rr"){
        whatcom = "바위";
    }else if(whatcom === "pp"){
        whatcom = "보";
    }
    myScore.textContent = "총 "+ result.count +"경기 중 현재 점수: " + result.score;
    computerScreen.textContent = "컴퓨터: " + whatcom
    console.log(result);
}

store.subscribe(showResult);

const onSubmit = function(e){
    e.preventDefault();
    // const result = store.getState();
    const mine = e.target.id;
    const computers = computerRSP();
    store.dispatch({type:COMPUTER, computers});
    if(mine === computers){
        store.dispatch({type:DRAW});
        console.log('비겼따');
    }else{
        if(mine+computers === "sspp"){
            store.dispatch({type:WIN});
            console.log(mine+computers + '이겼따');
        }if(mine+computers === "rrss"){
            store.dispatch({type:WIN});
            console.log(mine+computers + '이겼따');
        }if(mine+computers === "pprr"){
            store.dispatch({type:WIN});
            console.log(mine+computers + '이겼따');
        }if(mine+computers === "ssrr"){
            store.dispatch({type:LOSE});
            console.log(mine+computers + '졌다');
        }if(mine+computers === "rrpp"){
            store.dispatch({type:LOSE});
            console.log(mine+computers + '졌다');
        }if(mine+computers === "ppss"){
            store.dispatch({type:LOSE});
            console.log(mine+computers + '졌다');
        }
    }
    showResult();
}

btnScissor.addEventListener("click", onSubmit);
btnRock.addEventListener("click", onSubmit);
btnPaper.addEventListener("click", onSubmit);
