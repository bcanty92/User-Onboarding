import React, { useState, useEffect } from "react";
import "./Forms.css";
import * as yup from "yup";
import axios from "axios";
import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

//creating a blue print for yup to validate my form
const formSchema = yup.object().shape({
  name: yup.string().required("you need to input your name"),
  email: yup
    .string()
    .email("E-mail is not valid")
    .required("E-mail is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "password must be at least 8 characters"),
  terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

//start of my function
export default function Forms() {
  //sets up user state
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    terms: false
  });
  //sets up error state
  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });
  //state for the button to be disabled or not
  const [disabled, setDisabled] = useState(true);
  //state for users so I can post
  const [users, setUsers] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setDisabled(!valid);
    });
  }, [formState]);

  //function to see if each element in the form is valid
  const validate = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  //a function to reset state.
  const clearForm = () => {
    setFormState({ name: "", email: "", password: "", terms: false });
  };

  //a function for when sumbit is clicked prevents the page from reloading
  //and uses the function created earlier to reset the state
  const handleSubmit = e => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState).then(res => {
      setUsers([...users, res.data]);
      console.log(res.data);
    });

    clearForm();
  };

  //on change function
  const handleChange = e => {
    e.persist();

    validate(e);

    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormState({ ...formState, [e.target.name]: value });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row style={{ margin: "0 25%" }}>
            <Label htmlFor="name">Name: </Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name:  "
              value={formState.name}
              onChange={handleChange}
              data-cy="name-input"
            />
            {errorState.name.length > 0 ? (
              <p className="errors">{errorState.name}</p>
            ) : null}
            
          </Row>
        </FormGroup>
        <FormGroup>
          <Row style={{ margin: "0 25%" }}>
            <Label htmlFor="email">Email: </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email: "
              value={formState.email}
              onChange={handleChange}
              data-cy="email-input"
            />
            {errorState.email.length > 0 ? (
              <p className="errors">{errorState.email}</p>
            ) : null}
          </Row>
        </FormGroup>
        <FormGroup>
          <Row style={{ margin: "0 25%" }}>
            <Label htmlFor="password">Password: </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password: "
              value={formState.password}
              onChange={handleChange}
              data-cy="password-input"
            />
            {errorState.password.length > 0 ? (
              <p className="errors">{errorState.password}</p>
            ) : null}
          </Row>
        </FormGroup>
        <FormGroup>
          <Row style={{ margin: "0 30%" }}>
            <Label htmlFor="terms">Terms and conditions</Label>
            <Input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formState.terms}
              onChange={handleChange}
              data-cy="checkbox"
            />
            {errorState.terms.length > 0 ? (
              <p className="errors" style={{margin:"7% 0 0 -35%"}}>{errorState.terms}</p>
            ) : null}
          </Row>
        </FormGroup>
        <Button type="submit" disabled={disabled} data-cy="submit" >
          Save info
        </Button>
      </Form>

      <div>
        {users.map(member => {
          return <pre>{JSON.stringify(member, null, 2)}</pre>;
        })}
      </div>
    </Container>
  );
}