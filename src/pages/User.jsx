import React, { useState } from "react";
import { Table, Button, Input, Avatar, Space, Modal, Form, Popconfirm } from "antd";
import { SearchOutlined, TableOutlined, BarsOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Card from '../pages/Card'
import '../css/User.css';

const User = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const confirm = e => {

  };
  const cancel = e => {

  };

  const columns = [
    {
      title: " ",
      dataIndex: "avatar",
      render: (img) => <Avatar src={img} size={45} />
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a style={{ color: "#007bff" }}>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Action",
      render: () => (
        <Space>
          <Button type="primary" className="edit_button" onClick={() => { setIsModalOpen(true); setIsEditing(true) }}>Edit</Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure to delete this user?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="delete_button">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "auth/logout" });
  };

  const token = localStorage.getItem("token");
  console.log(token, "tokendata");

  const data = [
    {
      key: 1,
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
    },
    {
      key: 2,
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
    },
    {
      key: 3,
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
    },
    {
      key: 4,
      avatar: "https://reqres.in/img/faces/4-image.jpg",
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      last_name: "Holt",
    },
    {
      key: 5,
      avatar: "https://reqres.in/img/faces/5-image.jpg",
      email: "charles.morris@reqres.in",
      first_name: "Charles",
      last_name: "Morris",
    },
  ];

  return (
    <>
      <div className="user_list">
        <p className="user_name">Elon Musk <span className="user_logout" onClick={() => handleLogout()}><LogoutOutlined /></span> </p>
      </div>
      <div className="user_profile">
        <div className="user_profile_details">
          <div className="user_details">
            <h2 className="users">Users</h2>
            <div className='user_search'>
              <Input placeholder="input search text" className='search_bar' suffix={<SearchOutlined />} />
              <Button type="primary" onClick={() => { setIsModalOpen(true); setIsEditing(false) }}>Create User</Button>
            </div>
          </div>
          <div>
            <Button className={`tab_button ${activeTab === "table" ? "active" : ""}`}
              onClick={() => setActiveTab("table")}><TableOutlined /> Table</Button>
            <Button className={`tab_button ${activeTab === "card" ? "active" : ""}`}
              onClick={() => setActiveTab("card")}><BarsOutlined />Card</Button>
            {activeTab === "table" && (
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                rowKey="key"
              />
            )}
            {activeTab === "card" && (
              <Card />
            )}
          </div>
        </div>
        <Modal
          title={isEditing ? "Edit New User" : "Create New User"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={400}
          okText="Submit"
        >
          <Form
            name="user"
            layout="vertical"
          >
            <Form.Item label="first Name" name="firstname">
              <Input placeholder="Please enter first name" />
            </Form.Item>

            <Form.Item label="Last Name" name="Lastname">
              <Input placeholder="Please enter last name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Please enter email" />
            </Form.Item>

            <Form.Item label='images' name='images'>
              <Input placeholder="Please enter profile image link" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default User;
