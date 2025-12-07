import React from 'react';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {  Button, Popconfirm } from "antd";
import "../css/Card.css";

const Card = ({ users, onEdit, onDelete }) => {

    return (
        <div className="userGrid">
            {users.map((u) => (
                <div className="userCard" key={u.id}>
                    <div className="overlay">
                        <Button className="editBtn" 
                         onClick={() => onEdit(u)}  
                        style={{ marginRight: 5 }}><EditOutlined /></Button>
                        <Popconfirm
                            title="Delete User"
                            description="Are you sure to delete this user?"
                            onConfirm={() => onDelete(u.id)} 
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger className="deleteBtn"><DeleteOutlined /></Button>
                        </Popconfirm>
                    </div>
                    <img src={u.image} alt="User" className="avatar" />
                    <h3>{u.firstname}</h3>
                    <p>{u.email}</p>
                </div>
            ))}
        </div>
    )
}

export default Card