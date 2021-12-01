import { useCallback, useEffect, useState } from "react";
import AddUsers from "./AddUsers";
import RemoveUsers from "./RemoveUsers";
import FilterUsers from "./FilterUsers";
import AddSkill from "./AddSkill";
import "./Users.css";

const UsersTable = ({ children }) => (
  <div className="users-table">{children}</div>
);

const UsersTableHeader = () => (
  <div className="users-table__header__row">
    <div className="users-table__col-header">Id</div>
    <div className="users-table__col-header">Name</div>
  </div>
);

const UserRow = ({ id, name }) => (
  <div className="users-table__row">
    <div>{id}</div>
    <div>{name}</div>

    <AddSkill></AddSkill>

  </div>
);

const fetchUsers = async () => {
  const response = await fetch("http://127.0.0.1:5000/users");
  const { items } = await response.json();
  return items;
};

const updateUsers = async () => {
  const response = await fetch("http://127.0.0.1:5000/users?skill=1");
  const { items } = await response.json();
  return items;
}
//TODO integrate updateUser function

const UsersActions = ({ children }) => (
  <div className="users-actions">{children}</div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  const loadUsers = useCallback(() => {
    fetchUsers().then(setUsers);
  }, []);
  //TODO
  useEffect(loadUsers, [loadUsers]);
  return (
    <div>
      <UsersTable>
        <UsersTableHeader />
        {users.map((user) => (
          <UserRow key={user.id} {...user} />
        ))}
      </UsersTable>
      <UsersActions>
        <AddUsers refetch={loadUsers} />
        <RemoveUsers refetch={loadUsers} />
        <FilterUsers refetch={updateUsers} />
      </UsersActions>
    </div>
  );
}
