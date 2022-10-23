import React from "react";
import "../assets/style.css";

const character = ({data}) => {
    return (
        <div className="wrapper">
            {data.map((data) => {
                return (
                    <div className="list" key={data.id}>
                        <img src={data.image} alt={data.name}/>
                        <p>{data.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default character;