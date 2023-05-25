import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import db from "../services/firebaseConfig";
import General from "../views/servers/general/general";
import Menu from "../views/menu/menu";
import Task from "../views/servers/tasks/tasks";
import Edit from "../views/servers/actions/edit";
import RelationWith from "../views/servers/relationWith/relationWith";
import "./style.css";
import { ArrowBackIcon } from "../common/icons/icons";
import DeleteAllServers from "../common/actions/deleteAllServers";

function GetDataDetails() {
  const [serverDetail, setServerDetail] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [relation, setRelation] = useState([]);
  const [loading, setLoading] = useState();
  const { iditem } = useParams();

  useEffect(() => {
    setLoading(true);

    //Details of server
    const serverDetail = doc(db, "servers", iditem);
    getDoc(serverDetail).then((e) => {
      setServerDetail({ id: e.id, ...e.data() });
    });
    //Data of Tasks
    const query_tasks = query(
      collection(db, "tasks"),
      where("idPrimary", "==", iditem)
    );

    onSnapshot(query_tasks, (querySnapshot) => {
      const taskAdd = [];
      querySnapshot.forEach((doc) => {
        taskAdd.push({ id: doc.id, ...doc.data() });
      });
      setTasks(taskAdd);
    });
    //Data of Relations
    const query_relation = query(
      collection(db, "relations"),
      where("idPrimary", "==", iditem)
    );

    onSnapshot(query_relation, (querySnapshot) => {
      const relationAdd = [];
      querySnapshot.forEach((doc) => {
        relationAdd.push({ id: doc.id, ...doc.data() });
      });
      setRelation(relationAdd);
      setLoading(false);
    });
  }, []);

  const dataServer = () => {
    const serverDetail = doc(db, "servers", iditem);
    getDoc(serverDetail).then((e) => {
      setServerDetail({ id: e.id, ...e.data() });
    });
  };

  return (
    <div>
      <Menu />
      {loading ? (
        <div className="d-flex justify-content-center alignCenter">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="finder">
            <div className="arrowBack container">
              <div className=" nameServer ">
                <Link to={"/"}>
                  <ArrowBackIcon />
                </Link>
                <div className="ms-4 nameServer">{serverDetail.name}</div>
              </div>
              <div className="icons">
                <DeleteAllServers
                  idserver={iditem}
                  idstasks={tasks}
                  idsrelation={relation}
                  name={serverDetail.name}
                  data={dataServer}
                />
                <Edit {...serverDetail} data={dataServer} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" mt-5 text-center">
              <div className="row">
                <div className="col">
                  <General {...serverDetail} />
                </div>
                <div className="col">
                  <RelationWith
                    id={iditem}
                    name={serverDetail.name}
                    relation={relation}
                    company={serverDetail.company}
                  />
                </div>
                <div className="col">
                  <Task
                    id={iditem}
                    name={serverDetail.name}
                    tasksData={tasks}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GetDataDetails;
