let transportes = [];
let mostrador = [];
mostrador = JSON.parse(localStorage.getItem("mostrador")) || [];
const urlLocal = "transportes.json"

fetch(urlLocal)
  .then(response => response.json())
  .then(data => {
    transportes = data;
    mostrarTransportes(data);
  })
  .catch(error => console.log(error))

const contenedorTransporte = document.getElementById("contenedorTransporte");

const mostrarTransportes = (transportes) => {
  transportes.forEach((transporte) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-4", "col-md-6", "col-sm-12");
    tarjeta.innerHTML = `
                        <div class ="tarjeta">
                            <img src = "${transporte.img}" class = "tarjeta-img-top imgTransportes" alt = "${transporte.nombre}">
                            <div class = "tarjetaTexto">
                                <h5> ${transporte.nombre} </h5>
                                <p class = "text-danger"> ${transporte.precio} $ </p>
                                <p> ${transporte.pasajeros} </p>
                                <p> ${transporte.distancia} </p>
                                <button class = "btn colorBoton" id="boton${transporte.id}" > Agregar Viaje </button>
                            </div>
                        </div>
                        `;
    contenedorTransporte.appendChild(tarjeta);

    const boton = document.getElementById(`boton${transporte.id}`);
    boton.addEventListener("click", () => {
      agregarViaje(transporte.id);
      Toastify( {
        text: "Viaje Agregado",
        duration: 1000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(90deg, rgba(49,47,93,1) 0%, rgba(88,88,159,1) 70%, rgba(0,212,255,1) 100%)"
        }
      }).showToast();
    });
  });
};

const agregarViaje = (id) => {
  const transporte = transportes.find((transporte) => transporte.id === id);
  const viajeEnMostrador = mostrador.find((transporte) => transporte.id === id);
  if (viajeEnMostrador) {
    viajeEnMostrador.cantidad++;
  } else {
    mostrador.push(transporte);
  }
  precioTotal();
  localStorage.setItem("mostrador", JSON.stringify(mostrador));
};

const contenedorMostrador = document.getElementById("contenedorMostrador");
const verMostrador = document.getElementById("verMostrador");

verMostrador.addEventListener("click", () => {
  mostrarMostrador();
});

const mostrarMostrador = () => {
  contenedorMostrador.innerHTML = "";
  mostrador.forEach((transporte) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-4", "col-md-6", "col-sm-12");
    tarjeta.innerHTML = `
                        <div class ="tarjeta">
                            <img src = "${transporte.img}" class = "imgTransportes" alt = ${transporte.nombre}">
                            <div class = "tarjetaTexto">
                                <h5> ${transporte.nombre} </h5>
                                <p> <p> ${transporte.pasajeros} </p>
                                <p> ${transporte.distancia} </p>
                                <div>
                                  <p> Cantidad: ${transporte.cantidad}</p>
                                  <button class = "btn colorBoton" id = "restarViaje${transporte.id}"> - </button>
                                  <button class = "btn colorBoton" id = "sumarViaje${transporte.id}"> + </button>
                                </div>
                            </div>
                        </div>
                        `;
    contenedorMostrador.appendChild(tarjeta);

    const sumarViaje = document.getElementById(`sumarViaje${transporte.id}`);
    sumarViaje.addEventListener("click", () => {
    aumentarCantidad(transporte.id);
    Toastify( {
      text: "Viaje Agregado",
      duration: 1000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(90deg, rgba(49,47,93,1) 0%, rgba(88,88,159,1) 70%, rgba(0,212,255,1) 100%)"
      }
    }).showToast();
    });

    const restarViaje = document.getElementById(`restarViaje${transporte.id}`);
    restarViaje.addEventListener("click", () => {
    restarCantidad(transporte.id);
    Toastify( {
      text: "Viaje Eliminado",
      duration: 1000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(90deg, rgba(175,9,9,1) 0%, rgba(121,9,9,1) 70%, rgba(0,212,255,1) 100%)"
      }
    }).showToast();
    });
  });
  precioTotal();
};

const aumentarCantidad = (id) => {
  const transporte = mostrador.find((transporte) => transporte.id === id);
  transporte.cantidad++;
  localStorage.setItem("mostrador",JSON.stringify(mostrador));
  mostrarMostrador();
};

const restarCantidad = (id) => {
  const transporte = mostrador.find((transporte) => transporte.id === id);
  transporte.cantidad--;
if(transporte.cantidad === 0){
  eliminarDelMostrador(id);
}else{
  localStorage.setItem("mostrador",JSON.stringify(mostrador));
}
mostrarMostrador();
}

const eliminarDelMostrador = (id) => {
  const transporte = mostrador.find((transporte) => transporte.id === id);
  const indice = mostrador.indexOf(transporte);
  mostrador.splice(indice, 1);
  mostrarMostrador();
  localStorage.setItem("mostrador", JSON.stringify(mostrador));
};

const total = document.getElementById("total");

const precioTotal = () => {
  let totalContrato = 0;
  mostrador.forEach((transporte) => {
    totalContrato += transporte.precio * transporte.cantidad;
  });
  total.innerHTML = `Total: $${totalContrato}`;
};

const vaciarMostrador = document.getElementById("vaciarMostrador");

vaciarMostrador.addEventListener("click", () => {
  eliminarTodoElMostrador();
  Toastify( {
    text: "Viajes Eliminados",
    duration: 1000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(90deg, rgba(175,9,9,1) 0%, rgba(121,9,9,1) 70%, rgba(0,212,255,1) 100%)"
    }
  }).showToast();
});

const eliminarTodoElMostrador = () => {
  mostrador = [];
  mostrarMostrador();
  localStorage.clear();
};

const contratarViaje = document.getElementById("contratarViaje")

contratarViaje.addEventListener("click", () => {
  Swal.fire({
    title: "Contratar Viaje?",
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Servicio Contratado", '', 'success')
      eliminarTodoElMostrador();
    } else if (result.isDenied) {
      Swal.fire("Servicio No Contratado", '', 'error')
    }
  })
})
