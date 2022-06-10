window.addEventListener('load', function(){
    
    const arrowLeft = document.querySelector('#carrousel-arrow-left')
    const arrowRight = document.querySelector('#carrousel-arrow-right')
    const carrouselImgs = document.querySelectorAll('.carrousel-container img')
    
    const form = this.document.querySelector('form')
    const choiceWeek = this.document.querySelector('#week')
    const choiceDay = this.document.querySelector('#day')
    const email = this.document.querySelector('#mail')
    const emailError = this.document.querySelector('#mail-error')
    
    const captcha = this.document.querySelector('#confirmation-captcha')
    const captchaSubmit = this.document.querySelector('.captcha-submit')
    const captchaParameter = this.document.querySelector('.captcha')
    const captchaResult = this.document.querySelector('.captcha-result')
    const captchaError = this.document.querySelector('#captcha-error')
    
    const emailMsg = this.document.querySelector('#confirmation-email')
    const emailTxt = this.document.querySelector('#email')
    const emailContainer = this.document.querySelector('.confirmation-container')




    function sliding() {
        carrouselImgs.forEach(img=> {
            if(img.classList.contains('sliding-right')){
                img.classList.add('sliding-left')
                img.classList.remove('sliding-right')
            }else if (img.classList.contains('sliding-left')){
                img.classList.add('sliding-right')
                img.classList.remove('sliding-left')
            }else{
                img.classList.add('sliding-left')
            }
        })
    }
    
    function formValidation(){
        let errors = false

        if(email.value === ''){
            emailError.innerText = "Write an email"            
            errors = true
            return errors
        }
        if( email.value.indexOf('@')<0 || email.value.indexOf('.com')<0 ){
            emailError.innerText = "Write a valid email"
            errors=true
            return errors
        }
        if(!choiceDay.checked && !choiceWeek.checked){
            emailError.innerText = "Select one option"
            errors=true
            return errors
        }
        
    }

    function captchaValidation(){
        let error = false
        if(captchaResult.value === captchaParameter.innerText){
            captcha.style.display='none'
            emailTxt.innerHTML=`To: ${email.value} <br><br>Every Friday night, we will deliver one <span>Pizza of the ${choiceWeek.checked ? 'Week' : 'Day'}</span>!`
            emailMsg.style.display='flex'
        }else{
            captchaError.innerText = "Wrong Captcha"
            error = true
        }
        return error
    }

    arrowLeft.addEventListener('click',sliding)
    arrowRight.addEventListener('click',sliding)

    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const isError = formValidation()

        if(!isError){
            captcha.style.display='flex'
        }
    })

    captchaSubmit.addEventListener('click', captchaValidation)

    email.addEventListener('focus',()=>{
        emailError.innerText=''
    })
    captchaResult.addEventListener('focus',()=>{
        captchaError.innerText=''
    })

    emailMsg.addEventListener('click', ()=> {
        emailMsg.style.display='none'
    })

    emailContainer.addEventListener('click',(e)=>e.stopPropagation())


})