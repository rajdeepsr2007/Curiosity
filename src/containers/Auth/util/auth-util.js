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
        if( value.length < 6 ){
            return 'Atleast 6 characters'
        }
    }

    return false;

}