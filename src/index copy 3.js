import React, {Component} from 'react';
import {createStore} from 'redux';

const btnScissor = document.getElementById("ss");
const btnRock = document.getElementById("rr");
const btnPaper = document.getElementById("pp");
// const btn = document.querySelectorAll("button");
const ul = document.querySelector("ul");
const myScore = document.querySelector(".myscore");
const computerScreen = document.querySelector(".computer");
const timer = document.querySelectorAll(".timer");
const btnStart = document.querySelector(".btnStart");
const btnEnd = document.querySelector(".btnEnd");
const inputGame = document.querySelector(".inputGame");
btnScissor.disabled = true;
btnRock.disabled = true;
btnPaper.disabled = true;

const WIN = "WIN";
const LOSE = "LOSE";
const DRAW = "DRAW";
const COMPUTER = "COMPUTER";
const RESET = "RESET";

const initialState = {
    score: 0,
    count: 0,
    win: 0,
    computers: '',
}

let nGame = 5;
const gameStart = function(){
    nGame = inputGame.value;
    btnScissor.disabled = false;
    btnRock.disabled = false;
    btnPaper.disabled = false;
}

const gameEnd = function(){
    const result = store.getState();
    myScore.textContent = "게임 강제종료! "+ result.count +"게임 중 현재 점수: " + result.score;
}
// let nGame = prompt('가위바위보 게임을 시작합니다! 판 수를 입력하세요: ', '');
// console.log(nGame);

export const reducer = (state=initialState, action) => {
    // console.log(action);
    switch(action.type){
        case WIN:
            return {...state, score: state.score + 1, count: state.count + 1, win: state.win + 1};
        case LOSE:
            return {...state, score: state.score - 1, count: state.count + 1};
        case DRAW:
            return {...state, score: state.score, count: state.count + 1};
        case COMPUTER:
            return {...state, computers: action.computers};
        case RESET:
            return state = initialState;
        default:
            return state;
    }
}
const store = createStore(reducer);


// setInterval(store.dispatch({type:LOSE}), 5000);

const arrayRSP = ['ss', 'rr', 'pp']; //ss:가위 rr:바위 pp:보
const computerRSP = function(){
    const random = Math.floor(Math.random()*3);
    const com = arrayRSP[random];
    return com;
}

const scoreReset = function(){
    store.dispatch({type: RESET});
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
    if(parseInt(nGame) === result.count){
        const resultPanel = "게임 종료! \n" + "총 "+ result.count +"게임 중 " + result.win+ "승을 거둬 획득한 점수: " + result.score;
        computerScreen.textContent = resultPanel;
        myScore.textContent = "";
        scoreReset()
    
    }else if(parseInt(nGame) < result.count){
        alert(nGame + '판 종료되었습니다. 판 수를 다시 입력하고 게임을 시작하세요!')
        btnScissor.disabled = true;
        btnRock.disabled = true;
        btnPaper.disabled = true;
        scoreReset()

    }else{
        myScore.textContent = "총 "+ result.count +"게임 중 현재 점수: " + result.score;
        computerScreen.textContent = "컴퓨터: " + whatcom
    }
}

store.subscribe(showResult);

const onSubmit = function(e){
    e.preventDefault();
    const result = store.getState();
    const mine = e.target.id;
    const computers = computerRSP();
    store.dispatch({type:COMPUTER, computers});
    if(mine === computers){
        store.dispatch({type:DRAW});
        console.log('비겼따');
    }else{
        if(mine+computers === "sspp"){
            store.dispatch({type:WIN});
        }if(mine+computers === "rrss"){
            store.dispatch({type:WIN});
        }if(mine+computers === "pprr"){
            store.dispatch({type:WIN});
        }if(mine+computers === "ssrr"){
            store.dispatch({type:LOSE});
        }if(mine+computers === "rrpp"){
            store.dispatch({type:LOSE});
        }if(mine+computers === "ppss"){
            store.dispatch({type:LOSE});
        }
    }
    showResult();
}

btnScissor.addEventListener("click", onSubmit);
btnRock.addEventListener("click", onSubmit);
btnPaper.addEventListener("click", onSubmit);
btnStart.addEventListener("click", gameStart);
btnEnd.addEventListener("click", gameEnd);