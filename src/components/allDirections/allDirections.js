import React from 'react';

let AllDirections = ({onCurDirectionId}) => {
    const directions = [
        {
            name: 'Автоматизация технологических процессов и производств',
            id: 'Автоматизация технологических процессов и производств'
        },
        {
            name: 'Технологические машины и оборудование',
            id: 'Технологические машины и оборудование'
        },
        {
            name: 'Прикладная информатика',
            id: 'Прикладная информатика'
        },
        {
            name: 'Информационные системы и технологии',
            id: 'Информационные системы и технологии'
        },
        {
            name: 'Стандартизация и метрология',
            id: 'Стандартизация и метрология'
        },
        {
            name: 'Информационная безопасность',
            id: 'Информационная безопасность'
        },
        {
            name: 'Прикладная информатика в экономике',
            id: 'Прикладная информатика в экономике'
        },
    ]

    let renderItem = (arr) => {
        return arr.map((item) => {
            const {name, id} = item;
            return (
                <li key={getRandomId()}
                    className="directions"
                    onClick={() => onCurDirectionId(id)}>
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

    let data = renderItem(directions);

    return(
        <div className="groups">
            <div className="course">  </div>
            <ul className="group__list">
                {data}
            </ul>
        </div>
    )
}

export default AllDirections;