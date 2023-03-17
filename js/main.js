class Transporte {
  constructor(id, nombre, precio, pasajeros, distancia, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.pasajeros = pasajeros;
    this.distancia = distancia;
    this.img = img;
    this.cantidad = 1;
  }
}

const combi = new Transporte(
  1,
  "Combi",
  12000,
  "Max 13 Pasajeros",
  "Menos de 20km",
  "img/combi.jpg"
);
const minibus = new Transporte(
  2,
  "Minibus",
  16000,
  "Max 19 Pasajeros",
  "Menos de 20km",
  "img/minibus.jpg"
);
const combiLargaDistancia = new Transporte(
  3,
  "Combi Larga Distancia",
  32000,
  "Max 13 Pasajeros",
  "Más de 20km",
  "img/combi.jpg"
);
const minibusLargaDistancia = new Transporte(
  4,
  "Minibus Larga Distancia",
  40000,
  "Max 19 Pasajeros",
  "Más de 20km",
  "img/minibus.jpg"
);
const taxiPremium = new Transporte(
  5,
  "Taxi Premium",
  5000,
  "Max 4 Pasajeros",
  "Dentro de la Ciudad",
  "img/taxi-premium.jpg"
);
const taxiComfort = new Transporte(
  6,
  "Taxi Comfort",
  6000,
  "Max 4 Pasajeros",
  "Dentro de la ciudad",
  "img/taxi-comfort.jpg"
);

const transportes = [
  combi,
  minibus,
  combiLargaDistancia,
  minibusLargaDistancia,
  taxiPremium,
  taxiComfort
];
console.log(transportes);

let mostrador = [];

if (localStorage.getItem("mostrador")) {
  mostrador = JSON.parse(localStorage.getItem("mostrador"));
}

const contenedorTransporte = document.getElementById("contenedorTransporte");

const mostrarTransportes = () => {
  transportes.forEach((transporte) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-xl-3", "col-md-6", "col-sm-12");
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
        text: "Viaje agregado",
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

mostrarTransportes();

const agregarViaje = (id) => {
  const viajeEnMostrador = mostrador.find((transporte) => transporte.id === id);
  if (viajeEnMostrador) {
    viajeEnMostrador.cantidad++;
  } else {
    const transporte = transportes.find((transporte) => transporte.id === id);
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
    tarjeta.classList.add("col-xl-3", "col-md-6", "col-sm-12");
    tarjeta.innerHTML = `
                        <div class ="tarjeta">
                            <img src = "${transporte.img}" class = "imgTransportes" alt = ${transporte.nombre}">
                            <div>
                                <h5> ${transporte.nombre} </h5>
                                <p> <p> ${transporte.pasajeros} </p>
                                <p> ${transporte.distancia} </p>
                                <div class = "tarjetaCantidad">
                                  <p class = "cantidad"> Cantidad: ${transporte.cantidad}</p>
                                  <button class = "btn btnCantidad" id = "sumarViaje${transporte.id}"> + </button>
                                  <button class = "btn btnCantidad" id = "restarViaje${transporte.id}"> - </button>
                                </div>
                            </div>
                        </div>
                        `;
    contenedorMostrador.appendChild(tarjeta);

    const sumarViaje = document.getElementById(`sumarViaje${transporte.id}`);
    sumarViaje.addEventListener("click", () => {
    aumentarCantidad(transporte.id);
    });

    const restarViaje = document.getElementById(`restarViaje${transporte.id}`);
    restarViaje.addEventListener("click", () => {
    restarCantidad(transporte.id);
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
      eliminarDelMostrador();
    } else if (result.isDenied) {
      Swal.fire("Servicio No Contratado", '', 'error')
    }
  })
})
