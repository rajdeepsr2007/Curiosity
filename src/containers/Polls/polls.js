import React , {Component , Fragment} from 'react';
import { Redirect, Route , Switch} from 'react-router';
import HorizontalButtonGroup from '../../components/Inputs/Horizontal Button Group/horizontal-button-group';
import CreatePoll from './Create/create-poll';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../axiosInstance';
import PollParticipate from './Participate/participate';

class Polls extends Component{
   render(){

        const buttons = [
            { to : '/polls/create' , title : 'Create' },
            { to : '/polls/participate' , title : 'Participate' }
        ]

        const horizontalNavigation = (
            <HorizontalButtonGroup
            buttons={buttons}
            />
        )

        return(
            <Fragment>
                {horizontalNavigation}
                <Switch>
                    <Route path='/polls/create' component={CreatePoll} />
                    <Route path='/polls/participate' component={PollParticipate} />
                    <Redirect from='/polls' exact to='/polls/create' />
                </Switch>
            </Fragment>
        )

   }
}

export default withErrorHandler(Polls,axiosInstance);