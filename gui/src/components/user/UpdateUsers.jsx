import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
  styledTable,
} from "../util/AgileStyledComponents";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Message,
  Divider,
  Input,
} from "semantic-ui-react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { FormattedMessage } from "react-intl";
import Axios from "axios";
import UserModal from "./UserModal";
import UserCredentialsModal from "./UserCredentialsModal";
import { useSelector } from "react-redux";

const UpdateUsers = (props) => {
  const [dataToRender, setDataToRender] = useState([]);
  const [selectedRowData, setRowData] = useState({});
  const [show, setShow] = useState(false);
  const [creating, setCreating] = useState();
  const [successfull, setSuccesfull] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const token = useSelector((state) => state.auth.token);

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
      setLoading(false);
    }, 500);
    const [loading, setLoading] = useState(false);

    return (
      <Input
        loading={loading}
        placeholder="Search..."
        style={{ marginLeft: "2vw", width: "12vw" }}
        value={value}
        onChange={(e) => {
          setLoading(true);
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    );
  }

  useEffect(async () => {
    const result = await Axios.get(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getAllUsers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(result.data);

    setDataToRender(result.data);
  }, []);

  const data = useMemo(() => [...dataToRender], [dataToRender]);

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="wault.table.reason" defaultMessage="Username" />
        ),
        accessor: "username",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Firstname" />
        ),
        accessor: "firstname",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.amount" defaultMessage="Lastname" />
        ),
        accessor: "lastname",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.saved" defaultMessage="Email" />
        ),
        accessor: "email",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.created" defaultMessage="Role" />
        ),
        accessor: "role",
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button.Group>
              <Button
                basic
                color="blue"
                size="mini"
                onClick={() => {
                  setShow(true);
                  setRowData(row.original);
                }}
              >
                <FormattedMessage
                  id="wault.actions.deposit"
                  defaultMessage="Update"
                />
              </Button>
              <Button
                basic
                color="orange"
                size="mini"
                onClick={() => {
                  setShowCredentials(true);
                  setRowData(row.original);
                }}
              >
                <FormattedMessage
                  id="wault.actions.deposit"
                  defaultMessage="Credentials"
                />
              </Button>
              <Button
                basic
                color="red"
                size="mini"
                loading={creating}
                onClick={() => {
                  setCreating(true);

                  console.log("Is submitting: ", creating);

                  setTimeout(() => {
                    Axios.post(
                      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/deleteUser`,
                      { ...row.original },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                      .then(async (res) => {
                        Axios.get(
                          `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getAllUsers`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                          .then((res) => {
                            setDataToRender(res.data);
                            setCreating(false);
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  }, 3000);
                }}
              >
                <FormattedMessage
                  id="wault.actions.withdraw"
                  defaultMessage="Delete"
                />
              </Button>
            </Button.Group>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <Headline>Update existing users</Headline>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <styledTable>
        <table
          {...getTableProps()}
          style={{
            width: "55vw",
            height: "15vh",
            borderCollapse: "collapse",
            marginLeft: "2vw",
            marginTop: "4vh",
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </styledTable>
      {show && (
        <UserModal
          show={show}
          setShow={setShow}
          submitting={creating}
          isSubmitting={setCreating}
          selectedRow={selectedRowData}
          setDataToRender={setDataToRender}
        />
      )}
      {showCredentials && (
        <UserCredentialsModal
          show={showCredentials}
          setShow={setShowCredentials}
          submitting={creating}
          isSubmitting={setCreating}
          selectedRow={selectedRowData}
          setDataToRender={setDataToRender}
        />
      )}
    </div>
  );
};

export default UpdateUsers;
