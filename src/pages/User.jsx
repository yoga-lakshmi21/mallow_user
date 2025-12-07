import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Popconfirm } from "antd";
import { SearchOutlined, TableOutlined, BarsOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser, setSearch } from "../redux/user";
import Card from '../pages/Card'
import '../css/User.css';

const User = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const { list, search } = useSelector((state) => state.users);

  const filteredUsers = list.filter((u) =>
    `${u.firstname} ${u.lastname} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAdd = (values) => {
    form.resetFields();
    dispatch(addUser(values));
    setIsModalOpen(false);
  };

  const openEdit = (record) => {
    setEditData(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const saveEdit = (values) => {
    dispatch(updateUser({ ...values, id: editData.id }));
    setEditData(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (img) => (
        <img
          src={img && img.startsWith("http") ? img : "https://via.placeholder.com/50"}
          width={45}
          style={{ borderRadius: "50%" }}
          alt=""
        />
      )
    },
    { title: "Email", dataIndex: "email" },
    { title: "First Name", dataIndex: "firstname" },
    { title: "Last Name", dataIndex: "lastname" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button onClick={() => openEdit(record)} style={{ marginRight: 5 }}>Edit</Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure to delete this user?"
            onConfirm={() => dispatch(deleteUser(record.id))}
            onCancel={() => setIsModalOpen(false)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger >Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "auth/logout" });
  };

  const handleCreate = () => {
    form.resetFields();
    setIsModalOpen(true);
    setIsEditing(false)
  }

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
              <Input placeholder="input search text" onChange={(e) => dispatch(setSearch(e.target.value))} className='search_bar' suffix={<SearchOutlined />} />
              <Button type="primary" className='create_btn' onClick={() => handleCreate()}>Create User</Button>
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
                dataSource={filteredUsers}
                pagination={{ pageSize: 5 }}
                rowKey="id"
              />
            )}
            {activeTab === "card" && (
              <Card users={filteredUsers} onEdit={openEdit} onDelete={(id) => dispatch(deleteUser(id))} />
            )}
          </div>
        </div>
        <Modal
          title={isEditing ? "Edit User" : "Create New User"}
          open={isModalOpen}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          width={400}
          okText="Submit"
        >
          <Form
            form={form}
            name="user"
            layout="vertical"
            onFinish={editData ? saveEdit : handleAdd}
          >
            <Form.Item label="first Name" name="firstname">
              <Input placeholder="Please enter first name" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastname">
              <Input placeholder="Please enter last name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Please enter email" />
            </Form.Item>

            <Form.Item label='images' name='image'>
              <Input placeholder="Please enter profile image link" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default User;
