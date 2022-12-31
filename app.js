const lengthSlider = document.querySelector('.pass-length input');
const generateBtn = document.querySelector('.generate-btn');
const copyBtn = document.querySelector('.input-box i');
const passwordInput = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.pass-indicator');
const options = document.querySelectorAll('.option input');


const characters ={
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers:'0123456789',
    symbols:'^!$%&|[](){}:;.,*+-#@><~'
}





const generatePassword = ()=>{
    let staticPassword = '';
    let randomPassword = '';
    let passLength = lengthSlider.value;
    let excludeDuplicate = false;

    options.forEach(option =>{
        if(option.checked){
            if (option.id !== 'duplicates' && option.id !== 'spaces') {
                staticPassword += characters[option.id];
            }else if(option.id === 'spaces'){
                staticPassword += `  ${staticPassword}  `;
            }else{
                excludeDuplicate = true;
            }
        }
    })

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == ' ' ? randomPassword += randomChar : i--;
        }else{
            randomPassword += randomChar;
        }
        
    }
    passwordInput.value = randomPassword;
    
}

const updatePassIndicator =()=>{
    passIndicator.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'medium' : 'strong';
}

const updateSlider = ()=>{
    document.querySelector('.pass-length span').innerText = lengthSlider.value ;
    generatePassword();
    updatePassIndicator();
}

updateSlider()

const copyPassword = ()=>{
    navigator.clipboard.writeText(passwordInput.value);
    copyBtn.classList.toggle('fa-check');
    setTimeout(()=>{
        copyBtn.classList.toggle('fa-check')
    }, 1500)
}


copyBtn.addEventListener('click', copyPassword);
generateBtn.addEventListener('click', generatePassword);
lengthSlider.addEventListener('input', updateSlider);


















































