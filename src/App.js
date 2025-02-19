import React, {useEffect, useState} from 'react';
import './App.css';
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Avatar} from "primereact/avatar";
import {Tag} from "primereact/tag";
import {getUsers} from "./services";
import * as PropTypes from "prop-types";

function ProfileCard({selectedUser}) {
    return <div className="profile-card">
        <Avatar image={selectedUser.pic} size="xlarge" shape="circle" style={{alignSelf: "center"}}/>
        <Tag>{`Nombre: ${selectedUser.name}`}</Tag>
        <Tag>{`Apellido: ${selectedUser.lastName}`}</Tag>
        <Tag>{`DNI: ${selectedUser.dni}`}</Tag>
        <Tag>{`Estado Civil: ${selectedUser.civilStatus}`}</Tag>
        <Tag>{`Codigo Postal: ${selectedUser.postalCode}`}</Tag>
    </div>;
}

ProfileCard.propTypes = {selectedUser: PropTypes.arrayOf(PropTypes.any)};

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [profileCardVisible, setProfileCardVisible] = useState(false);

    useEffect(() => {
        getUsers().then(users => setUsers(users));
    }, []);

    const showUserProfileCard = user => {
        setSelectedUser(user)
        setProfileCardVisible(true);
    };

    const imageBodyTemplate = (user) => {
        return <Avatar image={user.pic} size="xlarge" shape="circle" onClick={() => showUserProfileCard(user)} />
    };

  return (
      <PrimeReactProvider>
          <Dialog visible={profileCardVisible} style={{width: '300px'}} onHide={() => setProfileCardVisible(false)}>
              <ProfileCard selectedUser={selectedUser}/>
          </Dialog>
          <div className="App">
              <div className="card">
                  <DataTable value={users} tableStyle={{minWidth: '50rem'}} stripedRows>
                      <Column className="pic-column" body={imageBodyTemplate} header=""></Column>
                      <Column field="name" header="Nombre"></Column>
                      <Column field="lastName" header="Apellido"></Column>
                      <Column field="dni" header="DNI"></Column>
                      <Column field="civilStatus" header="Estado Civil"></Column>
                      <Column field="postalCode" header="Codigo Postal"></Column>
                  </DataTable>
              </div>
          </div>
      </PrimeReactProvider>
  );
}

export default App;
