export const checkInputValidity = (value , rules) => {
    if( rules.isFilled ){
        if( value === '' ){
            return 'Please fill out this field'
        }
    }

    if( rules.isEmail ){
        if( !value.includes('@') ){
            return 'Invalid Email Address'
        }
    }

    if( rules.passwordStrength ){
        if( value.length < 8 ){
            return 'Atleast 8 characters'
        }
        let capitalLetters = false , digits = false , specialCharacters = false;
        for( let i=0; i<value.length ; i++ ){
            if( value[i] >= 'A' && value[i]<='Z' ){
                capitalLetters = true;
            }
            if( value[i] >='0' && value[i] <= '9' ){
                digits = true;
            }
            if( value[i] < 'A' && value[i] > 'Z' && value[i] < '0' && value[i] > '9' && value[i] < 'a' && value[i] > 'z'){
                specialCharacters = true;
            }
        }

        if( !capitalLetters || !digits || !specialCharacters ){
            return 'A-Z , 0-9 , special character'
        }
    
    }

    return false;

}