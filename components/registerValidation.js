function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Please fill your email."

    }else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match."

    }else {
        error.email = ""
    }

    if(values.username === ""){
        error.username = "Please fill your username."

    }else{
        error.username = ""
    }
    
    if(values.password === ""){
        error.password = "Please fill your password."

    }else if(!password_pattern.test(values.password)){
        error.password = "Password Didn't match."
        console.log(password_pattern.test(values.password))

    }else {
        error.password =""
    }
    return error
}

export default Validation;