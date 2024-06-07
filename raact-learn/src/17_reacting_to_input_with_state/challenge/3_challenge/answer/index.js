// 리액트 state 변수에 대응
let firstName = '';
let lastName = '';
let isRead = true;

// 이벤트 핸들러 : 버튼 클릭
function handleFormSubmit(e) {
    e.preventDefault();
    setIsRead(!isRead);
}

// 이벤트 핸들러 : firstName 인풋 입력
function handleFirstNameChange(e) {
    setFirstName(e.target.value)
}

// 이벤트 핸들러 : lastName 인풋 입력
function handleLastNameChange(e) {
    setLastName(e.target.value);
}

// 리액트 setter 함수에 대응
function setIsRead(value) {
    isRead = value;
    updateDOM();
}

// 리액트 setter 함수에 대응
function setFirstName(value) {
    firstName = value;
    updateDOM();
}

// 리액트 setter 함수에 대응
function setLastName(value) {
    lastName = value;
    updateDOM();
}

// UI 업데이트
function updateDOM() {
    if(isRead) {
        button.textContent = 'Edit Profile';
        // input 숨기기, text 보이기
        show(firstNameText);
        show(lastNameText);
        hide(firstNameInput);
        hide(lastNameInput);
    } else {
        button.textContent = 'Save Profile';
        // input 보이기, text 숨기기
        show(firstNameInput);
        show(lastNameInput);
        hide(firstNameText);
        hide(lastNameText);
    }
    // 텍스트 라벨 업데이트
    helloText.textContent = (`Hello ${firstName} ${lastName}!`);
    firstNameText.textContent = firstName;
    lastNameText.textContent = lastName;
}

function hide(el) {
    el.style.display = 'none';
}

function show(el) {
    el.style.display = '';
}

let form = document.getElementById('form');
let profile = document.getElementById('profile');
let button = document.getElementById('button');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
