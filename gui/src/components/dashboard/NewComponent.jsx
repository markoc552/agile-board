import React, { useState } from "react";
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


const NewComponent = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);

  return (
    <div>
      <Headline>Create new component</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormikWrapper style={{ padding: "50px" }}>
          <Formik
            initialValues={{}}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              console.log(values, props.currentProject)

              setTimeout(() => {
                Axios.post(
                  `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/component/createComponent`,
                  { name: values.name, projectName: props.currentProject }
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
                <StyledLabel>Component name</StyledLabel>
                <input
                  name="name"
                  placeholder="Component name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
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
              Component has been successfully created!
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export default NewComponent;
