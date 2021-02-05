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
  useRowSelect,
} from "react-table";
import { FormattedMessage } from "react-intl";
import { getAllProjects, callProjectService } from "../util/endpoints";
import { useSelector } from "react-redux";
import ComponentModal from "./ComponentModal";
import Axios from "axios";

const UpdateComponent = (props) => {
  const [show, setShow] = useState(false);
  const [dataToRender, setDataToRender] = useState([]);
  const [creating, setCreating] = useState(false);
  const [successfull, setSuccesfull] = useState(false);
  const [selectedRowData, setRowData] = useState({});

  const currentProject = useSelector(
    (state) => state.managment.selectedProject
  );

  const token = useSelector(state => state.auth.token)

  useEffect(async () => {
    const result = await Axios.get(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/component/getComponents`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          projectName: currentProject,
        },
      }
    );

    setDataToRender(result);
  }, []);

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
          if (count === 0) {
            setLoading(false);
          } else {
            setLoading(true);
            setValue(e.target.value);
            onChange(e.target.value);
          }
        }}
      />
    );
  }

  const data = useMemo(() => [...dataToRender], [dataToRender]);

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="wault.table.reason" defaultMessage="Name" />
        ),
        accessor: "name",
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button
              basic
              color="green"
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
              color="red"
              size="mini"
              loading={creating}
              onClick={() => {
                setCreating(true);

                console.log("Is submitting: ", creating);

                setTimeout(() => {
                  Axios.post(
                    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/component/deleteComponent`,
                    { ...row.original }
                  )
                    .then(async (res) => {
                      setDataToRender(await getAllProjects());
                      setCreating(false);
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
          </div>
        ),
      },
    ],
    []
  );

  const getTrProps = (row) => {
    console.log(row);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      getTrProps,
    },
    useFilters,
    useGlobalFilter,
    useRowSelect
  );

  return (
    <div>
      <Headline>Update existing components</Headline>

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
                <tr {...getTrProps(row.getRowProps())}>
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
        <ComponentModal
          show={show}
          setShow={setShow}
          currentProject={currentProject}
        />
      )}
    </div>
  );
};

export default UpdateComponent;
