import Axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import {
  FormikWrapper,
  Headline,
  StyledLabel,
} from "../util/AgileStyledComponents";

const NewComponent = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const createComponent = (name, setSubmitting) =>
    Axios.post(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/component/createComponent`,
      { name: name, projectName: props.currentProject },
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

  return (
    <div>
      <Headline>Create new component</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormikWrapper style={{ padding: "50px" }}>
          <Formik
            initialValues={{}}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              setTimeout(() => {
                createComponent(values.name, setSubmitting);
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
