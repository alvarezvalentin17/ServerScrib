import React, { useState } from "react";
import { Table } from "react-bootstrap";
import New from "./actions/new";
import { Link } from "react-router-dom";
import "./servers.css";

function Servers({
  allServers,
  serverPagination,
  currentPage,
  prevHandler,
  nextHandler,
}) {
  const allServer = allServers;
  const serversPagination = serverPagination;
  const [search, setSearch] = useState("");
  const [finder, setFinder] = useState("");
  const render = allServers.length >= 1;

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const result = () => {
    if (!search) {
      return serversPagination;
    } else if (finder === "description") {
      return allServer.filter((e) =>
        e.description.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (finder === "provider") {
      return allServer.filter((e) =>
        e.provider.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (finder === "company") {
      return allServer.filter((e) =>
        e.company.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (finder === "notes") {
      return allServer.filter((e) =>
        e.notes.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else {
      return allServer.filter((e) =>
        e.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }
  };

  return (
    <>
      <div className="finder">
        <div className="selectcss">
          <select
            value={finder}
            onChange={(event) => setFinder(event.target.value)}
            className="form-select size-select select selectcss "
          >
            <option value="name">Nombre</option>
            <option value="provider">Proveedor</option>
            <option value="description">Descripcion</option>
            <option value="notes">Notas</option>
            <option value="company">Empresa</option>
          </select>
          <input
            className="form-control  inputcss"
            value={search}
            onChange={searcher}
            type="text"
            placeholder="Selecciona un filtro"
          />
          <div className="pru">
            <New />
          </div>
        </div>
      </div>
      <Table className="container" responsive="lg">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Proveedor</th>
            <th>Nombre</th>
            <th>IP</th>
            <th>CPU</th>
            <th>RAM</th>
            <th>Sistema Operativo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {render ? (
            result().map(
              ({ name, company, provider, cpu, ram, ip, so, id }) => (
                <tr key={id}>
                  <td>{company ? company : "N/A"}</td>
                  <td>{provider ? provider : "N/A"}</td>
                  <td>{name ? name : "N/A"}</td>
                  <td>{ip ? ip : "N/A"}</td>
                  <td>{cpu ? cpu : "N/A"}</td>
                  <td>{ram ? ram : "N/A"} </td>
                  <td>{so ? so : "N/A"}</td>
                  <td className="status">Correcto</td>
                  <td>
                    <Link to={`/server/details/${id}`}>
                      <span className="material-symbols-outlined">
                        arrow_forward_ios
                      </span>
                    </Link>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td>No hay datos</td>
              <td>No hay datos</td>
              <td>No hay datos</td>
              <td>No hay datos</td>
              <td>No hay datos</td>
              <td>No hay datos</td>
              <td>No hay datos</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ul className="pagination mt-3 center">
        <li className="">
          <p className="page card me-2 btn" onClick={prevHandler}>
            Anterior
          </p>
        </li>
        <li className="page-item">
          <p className="btn card">{currentPage}</p>
        </li>
        <li className="">
          <p className="card ms-2 btn" onClick={nextHandler}>
            Siguiente
          </p>
        </li>
      </ul>
    </>
  );
}

export default Servers;
