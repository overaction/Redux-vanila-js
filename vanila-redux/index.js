//5. 스토어 만들기 // createStore 함수를 사용함
import {createStore} from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase'); //#은 id값을 정의
const btnDecrease = document.querySelector('#decrease');

//1. 프로젝트의 상태에 변화를 일으키는 액션들을 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//2. 위의 액션 이름들을 사용하여 액션 객체를 만드는 액션 생성 함수. type값을 반드시 가져야함
const toggleSwitch = () => ({type: TOGGLE_SWITCH});
const increase = difference => ({type: INCREASE, difference});
const decrease = () => ({type: DECREASE});

//3. 초깃값 설정
const initialState = {
    toggle: false,
    counter: 0
};

//4. 변화를 일으키는 함수인 리듀서 정의
function reducer(state=initialState, action) {
    //action.type에 따라 다른 작업을 처리함
    switch(action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state;
    }
}

// 5. 함수의 피라미터에는 리듀서함수를 넣어줘야한다
const store = createStore(reducer);

// 6. 함수의 상태가 업데이트 될 때마다 호출되는 render 함수 작성
const render = () => {
    const state = store.getState();
    if(state.toggle) {
        // toggle.active 활성화
        divToggle.classList.add('active');
    }
    else {
        divToggle.classList.remove('active');
    }

    counter.innerText = state.counter;
}

render();

// 7. 구독하기. subscribe 함수를 이용해서 상태가 업데이트 될 때마다 render가 호출되도록 만듬
store.subscribe(render);
//구독취소 하려면 unsubscribe();

// 8. 액션 발생시키기(dispatch)
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
    store.dispatch(increase(2));
};

btnDecrease.onclick = () => {
    store.dispatch(decrease());
}
