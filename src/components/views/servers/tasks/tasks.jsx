import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Modals from "../../../common/modals/modal";
import Delete from "../../../common/actions/delete";
import { collection, addDoc } from "firebase/firestore";
import db from "../../../services/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import './tasks.css'

function Task({ id, name, tasksData }) {
  const tasks = tasksData;
  const [ticket, setTicket] = useState("");
  const [issue, setIssue] = useState("");

  const [task, setTask] = useState("");
  const [tech, setTech] = useState("");

  const date = new Date().toLocaleDateString("es-ar");
  const now = new Date().toLocaleTimeString("es-ar");
  const render = tasks.length >= 1;

  const notify = () => {
    toast.success("Operacion exitosa!");
    console.log("Me ejecute");
  };

  const handlerTicket = (event) => {
    setTicket(event.target.value);
  };
  const handlerIssue = (event) => {
    setIssue(event.target.value);
  };

  const cleanInputs = () => {
    setTicket("");
    setIssue("");
  };

  const saveData = async () => {
    await addDoc(collection(db, "tasks"), {
      idPrimary: id,
      server_name: name,
      task: task,
      ticket: `https://${ticket}`,
      date: date,
      issue: issue,
      tech: tech,
      hour: now,
    });
    cleanInputs();
    notify();
  };

  return (
    <>
      <div className="container card mt-3 bg-grey">
        <div className="d-flex">
          <h4 className="mt-3 text-start">Tickets</h4>
          <span
            className="btns  material-symbols-outlined inline taskAdd"
            data-bs-toggle="modal"
            data-bs-target="#taskModal"
          >
            add_circle
          </span>
        </div>
        <div
          className="modal fade"
          id="taskModal"
          tabIndex="-1"
          aria-labelledby="taskModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 fw-bolder"
                  id="exampleModalLabel1"
                >
                  Cargar ticket asociado
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
                  <p className="text-start">
                    Ingrese URL de ticket asociado a:{" "}
                    <strong>{`${name}`}</strong>
                  </p>
                  <div className="fw-bolder text-start">Asunto</div>
                  <input
                    className="form-control mb-3 mt-2"
                    type="text"
                    onChange={handlerIssue}
                    value={issue}
                  />
                  <div className="fw-bolder text-start">Ticket asociado</div>
                  <input
                    className="form-control mb-3 mt-2"
                    type="text"
                    onChange={handlerTicket}
                    value={ticket}
                  />
                  <div className="btn-group-vertical mt-3">
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
        <Table className="table">
          <thead>
            <tr>
              <th>Asunto</th>
              <th>Ticket</th>
            </tr>
          </thead>

          {render ? (
            tasks.map(({ id, issue, ticket }) => (
              <tbody key={id}>
                <tr>
                  <td className="fw-bolder">{issue}</td>
                  <td>
                    <a href={ticket} target="_blank" rel="noopener noreferrer">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </a>
                  </td>
                  <td>
                    <Delete id={id} name={issue} collection={"tasks"} />
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td>No hay datos</td>
                <td>No hay datos</td>
              </tr>
            </tbody>
          )}
        </Table>
        <ToastContainer />
      </div>
    </>
  );
}

export default Task;
