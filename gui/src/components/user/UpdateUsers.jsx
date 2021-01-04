import React, { useState, useMemo } from "react";
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

const NewUser = (props) => {
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
      setLoading(false)
    }, 500);
    const [loading, setLoading] = useState(false)

    return (
      <Input
        loading={loading}
        placeholder="Search..."
        style={{marginLeft: "2vw", width: "12vw"}}
        value={value}
        onChange={(e) => {
          setLoading(true)
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    );
  }

  const dataToFilter = [
    {
      username: "marko",
      firstname: "marko2",
      lastname: "marko3",
      email: "marko@krko.ss",
      role: "admin",
    },
    {
      username: "test",
      firstname: "marko2",
      lastname: "marko3",
      email: "marko@krko.ss",
      role: "admin",
    },
  ];

  const data = useMemo(() => dataToFilter, []);

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
            <Button basic color="green" size="mini">
              <FormattedMessage
                id="wault.actions.deposit"
                defaultMessage="Update"
              />
            </Button>
            <Button basic color="red" size="mini">
              <FormattedMessage
                id="wault.actions.withdraw"
                defaultMessage="Delete"
              />
            </Button>
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
    </div>
  );
};

export default NewUser;
