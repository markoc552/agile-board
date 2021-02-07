import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
  StyledLabel,
  FormikWrapper,
} from "../util/AgileStyledComponents";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Message,
  Divider,
  Select,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";
import { callProjectService } from "../util/endpoints";
import Axios from "axios";
import { useSelector } from "react-redux";

const managerOptions = [
  { value: "tests", text: "Test" },
  { value: "oaksd", text: "Koko" },
];

const NewProject = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const users = [];

  const loadReportersAndAssignees = () =>
    Axios.get(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) =>
        res.data.map((user) => {
          users.push({
            value: `${user.firstname} ${user.lastname}`,
            text: `${user.firstname} ${user.lastname}`,
          });
        })
      )
      .catch((err) => console.log(err));

  useEffect(() => {
    loadReportersAndAssignees();
  }, []);

  return (
    <div>
      <Headline>Create new project</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormikWrapper style={{ padding: "50px" }}>
          <Formik
            initialValues={{}}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              setTimeout(() => {
                Axios.post(
                  `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/createProject`,
                  { ...values },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                  .then((res) => {
                    setSubmitting(false);
                    isSubmitting(false);
                    setSuccesfull(true);
                  })
                  .catch((err) => console.log(err));
              }, 2000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              /* and other goodies */
            }) => (
              <Form
                style={{
                  width: "17vw",
                  margin: "5vh auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleSubmit}
                size="large"
              >
                <StyledLabel>Project name</StyledLabel>
                <input
                  name="name"
                  placeholder="Project name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <StyledLabel>Keyword</StyledLabel>
                <input
                  name="keyword"
                  placeholder="Keyword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.keyword}
                />
                <StyledLabel>Manager</StyledLabel>
                <Select
                  placeholder="Select manager"
                  name="manager"
                  onChange={(value) =>
                    setFieldValue("manager", value.target.innerText)
                  }
                  onBlur={handleBlur}
                  options={users}
                />
                <Button
                  type="submit"
                  color="blue"
                  style={{ marginTop: "25px" }}
                  disabled={isSubmitting}
                  loading={submitting}
                >
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </FormikWrapper>
        {successfull && (
          <Message color="green" style={{ width: "25vw", height: "10vh" }}>
            <Message.Header>Successfull</Message.Header>
            <p
              style={{ fontSize: "15px", marginTop: "10px", color: "#253858" }}
            >
              Project has been successfully created!
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export default NewProject;
