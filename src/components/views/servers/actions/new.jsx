import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addDoc, collection } from "firebase/firestore";
import db from "../../../services/firebaseConfig";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { CirclePlus } from "../../../common/icons/icons";
import { ToastContainer, toast } from "react-toastify";
import "./new.css";

function New() {
  const notify = () => toast.success("Operacion exitosa!");
  const saveData = async (values, { resetForm }) => {
    setLgShow(false);
    await addDoc(collection(db, "servers"), {
      company: values.company,
      provider: values.provider,
      contact_provider: values.contact_provider,
      name: values.name,
      so: values.so,
      ip: values.ip,
      cpu: values.cpu,
      ram: values.ram,
      description: values.description,
      notes: values.notes,
    });
    resetForm();
    notify()
  };

  const validate = (values) => {
    const errors = {};
    if (values.name.length < 1)
      errors.name = "El nombre es un campo obligatorio!";
    if (values.description.length < 1)
      errors.description = "La descripción es un campo obligatorio!";
    if (values.company.length < 1)
      errors.company = "Empresa es un campo obligatorio!";
    return errors;
  };

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div className="btn">
        <span onClick={() => setLgShow(true)}>
          <CirclePlus />
        </span>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Crear nuevo servidor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              company: "",
              provider: "",
              contact_provider: "",
              name: "",
              so: "",
              ip: "",
              cpu: "",
              ram: "",
              description: "",
              notes: "",
            }}
            onSubmit={saveData}
            validate={validate}
          >
            <Form className="row g-3">
              <div className="col-md-6">
                <label className="form-label titleNew">Empresa</label>
                <Field
                  className="form-control"
                  placeholder="Empresa"
                  name="company"
                  type="text"
                  autoComplete="off"
                />
                <div className="text-danger">
                  <ErrorMessage name="company" />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">Proveedor</label>
                <Field
                  className="form-control"
                  placeholder="Proveedor"
                  name="provider"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">Contacto</label>
                <Field
                  className="form-control"
                  placeholder="Contacto del proveedor"
                  name="contact_provider"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">Nombre</label>
                <Field
                  className="form-control"
                  placeholder="Nombre del servidor"
                  name="name"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">Sistema Operativo</label>
                <Field
                  className="form-control"
                  placeholder="Sistema Operativo"
                  name="so"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">IP</label>
                <Field
                  className="form-control"
                  placeholder="IP"
                  name="ip"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">CPU</label>
                <Field
                  className="form-control"
                  placeholder="CPU"
                  name="cpu"
                  type="number"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">RAM</label>
                <Field
                  className="form-control"
                  placeholder="RAM"
                  name="ram"
                  type="number"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">Descripción</label>
                <Field
                  className="form-control"
                  placeholder="Describe la funcion de este servidor"
                  name="description"
                  as="textarea"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label titleNew">Notas</label>
                <Field
                  className="form-control"
                  placeholder="Notas de interes"
                  name="notes"
                  as="textarea"
                  autoComplete="off"
                />
              </div>
              <div className="btn-group-vertical">
                <button type="submit" className="btnSave ">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-outline btnClose mt-2"
                  onClick={() => setLgShow(false)}
                >
                  Cerrar
                </button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default New;
