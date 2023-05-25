import React from "react";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../../services/firebaseConfig";
import { Trash } from "../icons/icons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DeleteAllServers({ idserver, idstasks, idsrelation, name, data }) {
  const navigate = useNavigate();
  const idtask = idstasks;
  const idrelation = idsrelation;
  const notify = () => toast.success(`${name} fue borrado con exito!`);

  const deleteItem = () => {
    Swal.fire({
      title: `Estas seguro de borrar ${name}?`,
      text: "Esta accion no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "servers", idserver));

          idtask.forEach(async (e) => {
            await deleteDoc(doc(db, "tasks", e.id));
          });

          idrelation.forEach(async (e) => {
            await deleteDoc(doc(db, "relations", e.id));
          });
          data();
          navigate("/");
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          notify();
        }, 100);
      }
    });
  };

  return (
    <div className="btn">
      <span onClick={deleteItem}>
        <Trash />
      </span>
      <ToastContainer />
    </div>
  );
}

export default DeleteAllServers;
