import React from 'react';
import './allItems.css'

let AllItems = ({onMethod, items}) => {
    let renderItem = (arr) => {
        return arr.map((item) => {
            const {name, id} = item;
            return (
                <li key={getRandomId()}
                    className="list_item"
                    onClick={() => onMethod(id)}>
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

    let data = renderItem(items);

    return(
        <div className="items">
            <ul className="item__list">
                {data}
            </ul>
        </div>
    )
}

export default AllItems;