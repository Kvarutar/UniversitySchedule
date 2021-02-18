import React from 'react';
import Header from '../header';
import AllGroupsList from '../allGroups';
import GroupSchedule from '../groupSchedule';
import ErrorMessage from '../errorMessage';
import SearchPanel from '../searchPanel';
import AllInstitutes from '../allInstitutes';
import AllDirections from '../allDirections';
import Footer from '../footer';
import '../../fonts/stylesheet.css';
import './app.css';

class App extends React.Component {
    constructor(){
        super();
        this.onCurGroupId = this.onCurGroupId.bind(this);
        this.onCurDirectionId = this.onCurDirectionId.bind(this);
        this.onCurInstituteId = this.onCurInstituteId.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    componentDidCatch(){
        this.onError();
    }

    state = {
        curGroupId: '',
        curInstituteId: 'Институт информационных технологий и автоматизации',
        curDirectionId: null,
        error: false,
        groupeNumber: ''
    }

    onUpdateSearch(term){
        this.setState({
            groupeNumber: term
        })
    }

    onCurGroupId(id){
        this.setState({
            curGroupId: id
        })
    }

    onCurInstituteId(id){
        this.setState({
            curInstituteId: id
        })
    }

    onCurDirectionId(id){
        this.setState({
            curDirectionId: id
        })
    }

    onError(){
        this.setState({
            error: true
        })
    }

    render(){
        const {curGroupId, error, groupeNumber, curDirectionId, curInstituteId} = this.state;
        
        let content = curGroupId ? <GroupSchedule curGroupId={curGroupId} onCurGroupId={this.onCurGroupId} onCurDirectionId={this.onCurDirectionId} onCurInstituteId={this.onCurInstituteId}/> : (curDirectionId || (groupeNumber !== '')) ? <AllGroupsList onCurGroupId={this.onCurGroupId} groupeNumber={groupeNumber}/> : curInstituteId ? <AllDirections onCurDirectionId={this.onCurDirectionId}/> : <AllInstitutes onCurInstituteId={this.onCurInstituteId}/>;
        
        let searchPanel = curGroupId ?  null : <SearchPanel onUpdateSearch={this.onUpdateSearch} curDirectionId={curDirectionId} curInstituteId={curInstituteId} onCurDirectionId={this.onCurDirectionId} onCurInstituteId={this.onCurInstituteId}/>

        if (error) {
            content = <ErrorMessage/>;
        }
        return(
            <div className="app">
                <Header/>
                <div className="container">
                    {searchPanel}
                    {content}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;