import React from 'react';

let AllInstitutes = ({onCurInstituteId}) => {

    const institutes = [
        {
            name: 'Институт информационных технологий и автоматизации',
            id: 'Институт информационных технологий и автоматизации'
        },
        {
            name: 'Институт информационных технологий и автоматизации',
            id: 'Институт информационных технологий и автоматизации'
        },
        {
            name: 'Институт информационных технологий и автоматизации',
            id: 'Институт информационных технологий и автоматизации'
        },
        {
            name: 'Институт информационных технологий и автоматизации',
            id: 'Институт информационных технологий и автоматизации'
        },
        {
            name: 'Институт информационных технологий и автоматизации',
            id: 'Институт информационных технологий и автоматизации'
        },
    ]

    let renderItem = (arr) => {
        return arr.map((item) => {
            const {name, id} = item;
            return (
                <li key={getRandomId()}
                    className="institute"
                    onClick={() => onCurInstituteId(id)}>
                    {name}
                </li>
            )
        })
    }

    function getRandomId(max = 123, min = 97){
        let randId = '';
        for (let i = 0; i < 5; i++){
            let rand = Math.round((min - 0.5 + Math.random() * (max - min + 1)));
            randId += String.fromCharCode(rand);
        }
        return randId;
    }

    let data = renderItem(institutes);

    return (
        <div className="groups">
            <div className="course">  </div>
            <ul className="group__list">
                {data}
            </ul>
        </div>
    )
}

export default AllInstitutes;