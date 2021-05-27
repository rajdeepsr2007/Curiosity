import React , {Component}  from 'react';
import {Switch , Route , Redirect} from 'react-router-dom';
import AddQuestion from './Add Question/add-question';
import QuestionComplete from './Question Complete/question-complete';

class Question extends Component{
    render(){
        return(
            <Switch>
                <Route path="/question/add" exact component={AddQuestion} />
                <Route path="/question/:id" exact component={QuestionComplete} />
                <Redirect to="/home" />
            </Switch>
        )
    }
}

export default Question;