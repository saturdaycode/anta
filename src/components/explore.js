import React from 'react'

export const Explore = (props) => {
    return (
        <>
            <select>
                <option></option>
            </select>
            <input type="search" onChange={props.onChange}/>
            <button onClick={props.onClick}>Explore</button>
        </>
    )
}