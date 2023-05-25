import React from "react";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../../services/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";

function Delete({ id, name, collection }) {
  const notify = () =>{ toast.success(`${name} fue borrado con exito.`);
  console.log('Me ejecute desde el Delete')
}
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
          await deleteDoc(doc(db, collection, id));
          notify()
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="btn">
      <span onClick={deleteItem} className="material-symbols-outlined inline">
        delete
      </span>
      <ToastContainer />
    </div>
  );
}

export default Delete;
