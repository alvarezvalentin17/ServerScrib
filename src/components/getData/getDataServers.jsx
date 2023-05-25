import React from "react";
import db from "../services/firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import Menu from "../views/menu/menu";
import Servers from "../views/servers/servers";
import "./style.css";

function GetDataServers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState();

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [serverPagination, setServerPagination] = useState([]);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "servers"), orderBy("name", "asc"));
    onSnapshot(q, (querySnapshot) => {
      const allServers = [];
      querySnapshot.forEach((doc) => {
        allServers.push({ id: doc.id, ...doc.data() });
      });
      setServers(allServers);
      setServerPagination([...allServers].splice(0, pageSize));
      setLoading(false);
    });
  }, []);

  const allServers = servers.length;

  const nextHandler = () => {
    const allElements = servers.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * pageSize;
    if (firstIndex >= allElements) return;
    const arra = [...servers].splice(firstIndex, pageSize);
    setServerPagination(arra);
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * pageSize;
    const arr = [...servers].splice(firstIndex, pageSize);
    setServerPagination(arr);
    setCurrentPage(prevPage);
  };

  return (
    <div>
      <Menu allServers={allServers} />
      {loading ? (
        <div className="d-flex justify-content-center alignCenter">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Servers
          serverPagination={serverPagination}
          allServers={servers}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default GetDataServers;
