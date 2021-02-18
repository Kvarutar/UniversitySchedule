import React from 'react';
import './searchPanel.css';
import left from './left.svg'

class SearchPanel extends React.Component {
    constructor(props){
        super(props);
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
    }
    state = {
        term: ''
    }


    onUpdateSearch(e) {
        const term = e.target.value.toUpperCase();
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    

    render () {
        const {curDirectionId, curInstituteId, onCurInstituteId, onCurDirectionId} = this.props;
        let content = (curInstituteId && curDirectionId == null) ? curInstituteId : (curDirectionId) ? curDirectionId : 'Выберете институт';
        let func;
        if (curInstituteId && !curDirectionId) {
            func = onCurInstituteId; 
        } else if (curDirectionId) {
            func = onCurDirectionId;
        } else func = () => {};

        let bakcBtn = (curDirectionId) ? <img src={left} alt="left" className="back__button" onClick={() => func(null)}/> : null;

        

        return (
            <>
                <div className="search__panel">
                    {bakcBtn}
                    <input className="search" 
                        placeholder="Введите номер группы"
                        type="text"
                        onChange={this.onUpdateSearch}/>
                </div>
                
                <div className="text">{content}</div>
            </>
        )
    }
    
}

export default SearchPanel;