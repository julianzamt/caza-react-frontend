import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import CreateForm from "../components/CreateForm";
import DocumentacionCreateForm from "../components/DocumentacionCreateForm";
import DocumentacionEditForm from "../components/DocumentacionEditForm";
import EditForm from "../components/EditForm";
import Button from "react-bootstrap/Button";
import "./Admin.css";
import AppContext from "../context/AppContext";

const Admin = () => {
  const [formType, setFormType] = useState("");
  const [feedback, setFeedback] = useState(false);
  const [section, setSection] = useState("");

  const context = useContext(AppContext);

  const handleClick = event => {
    const formTypeSelection = event.target.id;
    console.log(formTypeSelection);
    console.log(section);
    setFeedback("");
    // special cases
    if (section === "documentacion") {
      if (formTypeSelection === "createForm") {
        return setFormType("documentacionCreateForm");
      } else if (formTypeSelection === "editForm") {
        return setFormType("documentacionEditForm");
      }
    }
    // regular cases
    setFormType(formTypeSelection);
  };

  const handleChange = event => {
    setSection(event.target.value);
    setFormType("");
    setFeedback("");
  };

  return (
    <div className="admin__container">
      <h2 className="text-center">Admin</h2>
      <h6 className="text-right mt-2 mb-2">Hola, {context.username}.</h6>
      <Form>
        <Form.Label htmlFor="section">Elegí una sección:</Form.Label>
        <Form.Control as="select" onChange={handleChange} name="section" id="section" value={section}>
          <option value="">---</option>
          <option value="obras">Obras</option>
          <option value="proyectos">Proyectos</option>
          <option value="equipamientos">Equipamientos</option>
          <option value="productos">Producto</option>
          <option value="documentacion">Documentación</option>
          <option value="nosotras">Nosotras</option>
        </Form.Control>
      </Form>
      {section && (
        <div>
          <h1 style={{ textTransform: "capitalize", textAlign: "center", margin: "0.5em" }}>{section}</h1>
          <div className="admin__button-container">
            <Button id="createForm" onClick={handleClick}>
              Crear nueva entrada
            </Button>
            <Button id="editForm" onClick={handleClick}>
              Editar entrada
            </Button>
          </div>
        </div>
      )}
      {formType === "createForm" && <CreateForm section={section} setFeedback={setFeedback} setFormType={setFormType} />}
      {formType === "documentacionCreateForm" && <DocumentacionCreateForm section={section} setFeedback={setFeedback} setFormType={setFormType} />}
      {formType === "editForm" && <EditForm setFeedback={setFeedback} section={section} setFormType={setFormType} />}
      {formType === "documentacionEditForm" && <DocumentacionEditForm setFeedback={setFeedback} section={section} setFormType={setFormType} />}
      {<div>{feedback}</div>}
    </div>
  );
};

export default Admin;
