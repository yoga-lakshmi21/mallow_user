import React from 'react';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../css/Card.css";

const users = [
    { id: 1, name: "John Doe", email: "demo@mallow-tech.com", img: "https://reqres.in/img/faces/1-image.jpg" },
    { id: 2, name: "John Doe", email: "demo@mallow-tech.com", img: "https://reqres.in/img/faces/2-image.jpg" },
    { id: 3, name: "John Doe", email: "demo@mallow-tech.com", img: "https://reqres.in/img/faces/3-image.jpg" },
    { id: 4, name: "John Doe", email: "demo@mallow-tech.com", img: "https://reqres.in/img/faces/4-image.jpg" },
    { id: 5, name: "John Doe", email: "demo@mallow-tech.com", img: "https://reqres.in/img/faces/5-image.jpg" },
    { id: 6, name: "John Doe", email: "demo@mallow-tech.com", img: "https://reqres.in/img/faces/6-image.jpg" }
];

const Card = () => {
    return (
        <div className="userGrid">
            {users.map((u) => (
                <div className="userCard" key={u.id}>
                    <div className="overlay">
                        <button className="editBtn"><EditOutlined /></button>
                        <button className="deleteBtn"><DeleteOutlined /></button>
                    </div>

                    <img src={u.img} alt="User" className="avatar" />
                    <h3>{u.name}</h3>
                    <p>{u.email}</p>
                </div>
            ))}
        </div>
    )
}

export default Card