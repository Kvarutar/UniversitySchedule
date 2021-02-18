import React from 'react';
import './allGroups.css';
//import scheduleData from '../../services/scheduleData'

const AllGroupsList = ({onCurGroupId, groupeNumber}) => {
    
    const allGroups = [
        {
            id: "2-МД-15",
            name: "2-МД-15"
        },
        {
            id: "2-МД-16",
            name: "2-МД-16"
        },
        {
            id: "2-МД-17",
            name: "2-МД-17"
        },
        {
            id: "2-МД-18",
            name: "2-МД-18"
        },
        {
            id: "2-МД-19",
            name: "2-МД-19"
        },
        {
            id: "2-МД-20",
            name: "2-МД-20"
        },
        {
            id: "2-МД-21",
            name: "2-МД-21"
        },
        {
            id: "2-МД-22",
            name: "2-МД-22"
        }
    ]

    function searchGroupe(allGroups, term){
        if (term.lenght === 0){
            return allGroups;
        }

        return allGroups.filter((item) => {
            return item.name.indexOf(term) > -1;
        })
    }


    function renderItems(arr) {

        let trueGroups = searchGroupe(arr, groupeNumber);

        return trueGroups.map((item) => {
            const {id} = item;
            const {name} = item;
            
            return (
                <li key={id}
                    className='group'
                    onClick={() => onCurGroupId(id)}>
                {name}
                </li>
            )
        }) 
    }

    let data = renderItems(allGroups);

    return(
        <div className="groups">
            <div className="course">1 Курс</div>
            <ul className="group__list">
                {data}
            </ul>
        </div>
    )

}

export default AllGroupsList;