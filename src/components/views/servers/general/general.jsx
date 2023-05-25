import React from "react";
import { Table } from "react-bootstrap";
import "./general.css";

function General({
  name,
  company,
  contact_provider,
  provider,
  so,
  ip,
  cpu,
  ram,
  description,
  notes,
}) {
  return (
    <>
      <div className="mt-3 ">
        <div className="card bg-grey ">
          <Table className="table-borderless ">
            <thead>
              <tr>
                <td className="fw-bold text-start fs-5"><h4>Información</h4></td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Empresa</td>
                <td className="text-start">
                  {company ? company : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Proveedor</td>
                <td className="text-start">
                  {provider ? provider : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Contacto</td>
                <td className="text-start">
                  {contact_provider
                    ? contact_provider
                    : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Nombre</td>
                <td className="text-start">
                  {name ? name : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">S.O</td>
                <td className="text-start">
                  {so ? so : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Direccion IP</td>
                <td className="text-start">
                  {ip ? ip : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">CPU</td>
                <td className="text-start">
                  {cpu ? cpu : "No hay datos registrados"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">RAM</td>
                <td className="text-start">
                  {ram ? ram : "No hay datos registrados"} GB
                </td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </Table>
          <div className="  mt-2 ms-2">
            <p className="fw-bold text-start ">Descripción</p>
            <p className="text-start mb-5 ">
              {description ? description : "No hay datos registrados"}
            </p>
          </div>
          <div className="ms-2">
            <p className="fw-bold text-start">Notas</p>
            <p className="text-start mb-5">
              {notes ? notes : "No hay datos registrados"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default General;
