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

const UpdateProjects = (props) => {
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
      projectName: "marko",
      keyword: "marko2",
      manager: "marko3",
    },
    {
      projectName: "test",
      keyword: "marko2",
      manager: "marko3",
    },
  ];

  const data = useMemo(() => dataToFilter, []);

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="wault.table.reason" defaultMessage="Project name" />
        ),
        accessor: "projectName",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Keyword" />
        ),
        accessor: "keyword",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.amount" defaultMessage="Manager" />
        ),
        accessor: "manager",
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button basic color="blue" size="mini">
              <FormattedMessage
                id="wault.actions.deposit"
                defaultMessage="Go to"
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
      <Headline>Currently participating projects</Headline>

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

export default UpdateProjects;
