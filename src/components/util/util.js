export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const presentDate = new Date();
    const timeDifference = presentDate.getTime() - formattedDate.getTime();
    if( timeDifference < 60000 ){
        return `${Math.floor(timeDifference/1000)} seconds ago`
    }
    else if(timeDifference < 3600000){
        return `${Math.floor(timeDifference/60000)} minutes ago`
    }
    else if(timeDifference < 3600000 * 24){
        return `${Math.floor(timeDifference/(3600000))} hours ago`
    }else if(timeDifference < 360000 * 24 * 30){
        return `${Math.floor(timeDifference/(3600000*24))} days ago`
    }else if(timeDifference < 360000 * 24 * 30 * 12){
        return `${Math.floor(timeDifference/(3600*24*30))} months ago`
    }else{
        return `${Math.floor(timeDifference/36000*24*30*12)} years ago`
    }
}