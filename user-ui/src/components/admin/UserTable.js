import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Table } from "semantic-ui-react";
import { data } from "react-router-dom";

function UserTable({
  users,
  userUsernameSearch,
  handleInputChange,
  handleDeleteUser,
  handleSearchUser,
}) {
  let userList;
  if (users.length === 0) {
    userList = (
      <Table.Row key="no-user">
        <Table.Cell collapsing textAlign="center" colSpan="6">
          No user
        </Table.Cell>
      </Table.Row>
    );
  } else {
    userList = users.map((user, index) => {
      return (
        <Table.Row key={user.id} data-testid="user-list">
          <Table.Cell collapsing>
            <Button
              data-testid={`delete-user-${index}`}
              circular
              color="red"
              size="small"
              icon="trash"
              disabled={user.username === "admin"}
              onClick={() => handleDeleteUser(user.username)}
            />
          </Table.Cell>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell data-testid={`user-username-${index}`}>
            {user.username}
          </Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <>
      <Form onSubmit={handleSearchUser}>
        <Input
          data-testid="user-username-search"
          action={{ icon: "search", "data-testid": "search-button" }}
          name="userUsernameSearch"
          placeholder="Search by Username"
          value={userUsernameSearch}
          onChange={handleInputChange}
        />
      </Form>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell width={3}>Username</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{userList}</Table.Body>
      </Table>
    </>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  userUsernameSearch: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleSearchUser: PropTypes.func.isRequired,
};

export default UserTable;
