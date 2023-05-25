import React, { useState } from "react";
import db from "../../../services/firebaseConfig";
import { addDoc, doc, collection, updateDoc } from "firebase/firestore";
import Modals from "../../../common/modals/modal";
import Delete from "../../../common/actions/delete";
import { ToastContainer, toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import "./relations.css";

function RelationWith({ id, name, relation, company }) {
  const relations = relation;
  const notify = () => {
    toast.success("Operacion exitosa!");
    console.log("Me ejecute");
  };

  const [serverRelation1, setServerRelation] = useState("");
  const [descritpion, setDescritpion] = useState("");
  const [addNumbers, setAddNumbers] = useState(0);

  const [idRef, setId] = useState("");

  const render = relation.length >= 1;

  const handlerServer = (event) => {
    setServerRelation(event.target.value);
  };

  const handlerDescription = (event) => {
    setDescritpion(event.target.value);
  };

  const cleanInputs = () => {
    setServerRelation("");
    setDescritpion("");
  };

  const saveData = async () => {
    try {
      await addDoc(collection(db, "relations"), {
        idPrimary: id,
        serverName: name,
        serverRelation: serverRelation1,
        description: descritpion,
      });
      cleanInputs();
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    const docRef = doc(db, "relations", idRef);

    await updateDoc(docRef, {
      description: descritpion,
    });
    notify();
  };

  const addNumber = () => {
    const number = addNumbers + 1;
    setAddNumbers(number);
    console.log(addNumbers);
  };

  return (
    <>
      <div className="container card mt-3 mb-5 bg-grey">
        <div className="d-flex ">
          <h4 className="mt-3 text-start">Relaciones</h4>
          <span
            className="btns  material-symbols-outlined inline relationAdd"
            data-bs-toggle="modal"
            data-bs-target="#relationModals"
          >
            add_circle
          </span>
          <div
            className="modal fade"
            id="relationModals"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 fw-bolder"
                    id="exampleModalLabel"
                  >
                    Nueva relación
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  <>
                    <div className="text-start fw-bolder">Empresa</div>
                    <div className="input-group mb-3">
                      <span className="input-group-text  fw-bold">
                        {company}
                      </span>
                      <span className="input-group-text">&rArr;</span>

                      <span className="input-group-text fw-bold">{name}</span>
                      <span className="input-group-text">&rArr;</span>
                      <input
                        className="form-control"
                        onChange={handlerServer}
                      />
                    </div>
                    <div className="fw-bolder mb-3 text-start">
                      ¿De que manera estan relacionados?
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="¿De que manera estan relacionados?"
                      onChange={handlerDescription}
                      value={descritpion}
                    ></textarea>
                    <div className="btn-group-vertical mt-5">
                      <button
                        type="submit"
                        className="btnSave1"
                        onClick={saveData}
                        data-bs-dismiss="modal"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline btnClose1 mt-2"
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        {render
          ? relations.map(({ id, serverName, serverRelation, description }) => (
              <Accordion defaultActiveKey="0">
                <Accordion.Item className="mb-2" eventKey={addNumbers}>
                  <Accordion.Header>
                    {serverName}
                    <span className="ms-4 me-4">&rArr;</span>
                    {serverRelation}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="text-start ">
                      {description}

                      <div className="icons">
                        <div className="btn">
                          <span
                            onClick={() => {
                              setDescritpion(description);
                              setId(id);
                            }}
                            className="btns  material-symbols-outlined inline"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            edit
                          </span>
                        </div>
                        <span>
                          <Delete
                            id={id}
                            name={serverRelation}
                            collection={"relations"}
                          />
                        </span>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5 fw-bolder"
                              id="exampleModalLabel"
                            >
                              Editar relación
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body ">
                            <>
                              <div className="text-start fw-bolder">
                                Empresa
                              </div>
                              <div className="input-group mb-3">
                                <span className="input-group-text  fw-bold">
                                  {company}
                                </span>
                                <span className="input-group-text">&rArr;</span>

                                <span className="input-group-text fw-bold">
                                  {serverName}
                                </span>
                                <span className="input-group-text">&rArr;</span>
                                <span className="input-group-text fw-bold">
                                  {serverRelation}
                                </span>
                              </div>
                              <div className="fw-bolder mb-3 text-start">
                                ¿De que manera estan relacionados?
                              </div>
                              <textarea
                                className="form-control"
                                placeholder="¿De que manera estan relacionados?"
                                onChange={handlerDescription}
                                value={descritpion}
                              ></textarea>
                              <div className="btn-group-vertical mt-5">
                                <button
                                  type="submit"
                                  className="btnSave1"
                                  onClick={updateData}
                                  data-bs-dismiss="modal"
                                >
                                  Guardar
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline btnClose1 mt-2"
                                  data-bs-dismiss="modal"
                                >
                                  Cerrar
                                </button>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          : <h5 className="text-start mt-4 mb-4">Aun no hay relaciones...</h5>}
        <ToastContainer />
      </div>
    </>
  );
}

export default RelationWith;
