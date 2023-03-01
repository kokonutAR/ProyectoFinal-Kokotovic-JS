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

const transportes = [
  combi,
  minibus,
  combiLargaDistancia,
  minibusLargaDistancia,
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
                            <div>
                                <h5> ${transporte.nombre} </h5>
                                <p> ${transporte.precio} $ </p>
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
                                <p> ${transporte.cantidad} </p>
                                <button class = "btn colorBoton" id="Eliminar${transporte.id}"> Eliminar </button>
                            </div>
                        </div>
                        `;
    contenedorMostrador.appendChild(tarjeta);

    const boton = document.getElementById(`eliminar${transporte.id}`);
    boton.addEventListener("click", () => {
      eliminarDelMostrador(transporte.id);
    });
  });
  precioTotal();
};

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
