const baseURL = process.env.CURIOSITY_IP ?
                "http://" + process.env.CURIOSITY_IP + ":" + process.env.CURIOSITY_PORT
                :"http://localhost:8000"
                ;

export default baseURL;