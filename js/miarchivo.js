let eleccion = true;
let continuar = true;
let envio = 0;
let precioProducto = 0;
const productosAgregados = [];
const productos = [];
let posicionLS = 0;

//Se obtiene desde localStorage todos los productos considerados anteriormente
const prodDesdeObj = JSON.parse(localStorage.getItem("productos"))

//Se crea función constructora de objeto Producto
function Producto (id, nombre, precio){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
}

//Se crea arreglo de productos, donde por defecto ya tendrá ciertos productos
const producto1 = new Producto (1,"Figura Plástico derretida",4000);
const producto2 = new Producto (2,"Homero Simpson",6000);
const producto3 = new Producto (3,"Bob Esponja",10000);
const producto4 = new Producto (4,"Calamardo",8500);
const producto5 = new Producto (5,"Goku",15000);

productos[0] = producto1;
productos[1] = producto2;
productos[2] = producto3;
productos[3] = producto4;
productos[4] = producto5;

let cantidad = 0;

function calcularPrecioTotal (precio, cantidad){
    precioTotal = precioTotal + (precio * cantidad)
}

let contador = 1;

const seleccionar = document.getElementById("seleccionar");
const regiones = document.getElementsByClassName("region");
let valueRegion;
let precioEnvio = 0; //simil a variable envio
let mensaje;
let ingresado = false;

document.getElementById("region")?.addEventListener('change', (event) => {
    valueRegion = event.target.value

    //Si mensaje del valor de costo de envío ya está mostrado en HTML, debe borrarlo primero para mostrar el siguiente
    ingresado == true && mensaje.remove();
    ingresado = false;

    if (valueRegion == "metropolitana"){
        precioEnvio = 2000;
    }
    if (valueRegion == "valpoohigins"){
        precioEnvio = 4000;
    }
    if (valueRegion == "otrasregiones"){
        precioEnvio = 8000;
    }

    mensaje = document.createElement("p");
    mensaje.innerText = "El precio del envío es " + precioEnvio;
    seleccionar.append (mensaje)
    ingresado = true;
    return precioEnvio;
})

const agregarCantidad = document.getElementById("prod");
const cantidadfigder = document.getElementById("cantidadfigder")
const formControl = document.getElementsByClassName("form-control")
let precioTotalSinEnvio;
let precioTotalConEnvio;
let precioTotal;
let calculoIngresado = false;

agregarCantidad?.addEventListener ('submit', (e) =>{
    e.preventDefault();
    let precioSinEnvio = 0;
    
    for (let i=0; i<productos.length; i++){
    cantidad = formControl[i].value;
    precioProducto = productos [i].precio;
    precioSinEnvio = precioSinEnvio + (precioProducto * cantidad)
    }
    
    //Si ya aparece mensaje con respecto a si la suma fue exitosa, se debe eliminar para evitar duplicidad del mensaje
    if (calculoIngresado == true){
        precioTotalSinEnvio.remove();
        precioTotalConEnvio.remove();
        calculoIngresadoIngresado = false;
    }

    precioTotalSinEnvio = document.createElement("p");
    precioTotalSinEnvio.innerText = "El precio total sin envío es " + precioSinEnvio;
    agregarCantidad.append (precioTotalSinEnvio);
    precioTotal = precioSinEnvio + precioEnvio;
    precioTotalConEnvio = document.createElement("p");
    precioTotalConEnvio.innerText = "El precio total con envío es " + precioTotal;
    agregarCantidad.append (precioTotalConEnvio);
    calculoIngresado = true;

})

const listaProductos = document.getElementById("listaproductos");

let aviso;
let productoIngresado = false;

const agregarProducto = document.getElementById("formulario");
const nombreProducto = document.getElementById("nombreproducto");
const valorProducto = document.getElementById("valorproducto")

for (i=5; i<prodDesdeObj.length; i++){
    productos[i] = prodDesdeObj[i];
    const prodDesdeLS = document.createElement('li');
    prodDesdeLS.innerHTML = "Nombre Producto: " + prodDesdeObj[i].nombre + "; Costo: " + prodDesdeObj[i].precio + '<div class="mb-2 mt-2"> <label for="nuevo" class="form-label">Cantidad</label> <input type="text" class="form-control" id="nuevo" placeholder="Ej: 10" name="nuevo"> </div>'
    listaProductos.append(prodDesdeLS);
}

agregarProducto?.addEventListener ('submit', (e) =>{

    e.preventDefault();
    const nuevoNombreProducto = nombreProducto.value;
    const nuevoValorProducto = parseInt (valorProducto.value);

    //Revisará previamente si el producto existe en el sistema
    const encontrado = productos.some ((el) => el.nombre == nuevoNombreProducto);

    //Si ya se muestra que el producto se ingresó por HTML, se borrará ese mensaje para ser reemplazado por otro
    productoIngresado == true && aviso.remove();
    productoIngresado = false;

    if (encontrado == false){
        //Si el producto no existe, lo agregará en el sistema

        let posicionArrayProductos= productos.length
        productos [posicionArrayProductos] = new Producto (posicionArrayProductos + 1, nuevoNombreProducto, nuevoValorProducto);

        //Mostrará por HTML que el producto fue agregado exitosamente
        aviso = document.createElement("p");
        aviso.innerText = "Producto ingresado exitosamente en el sistema";

        //Mostrará por HTML el producto que se agregó, debajo de los existentes
        agregarProducto.append (aviso);
        const li = document.createElement('li');
        li.innerHTML = "Nombre Producto: " + productos[posicionArrayProductos].nombre + "; Costo: " + productos[posicionArrayProductos].precio + '<div class="mb-2 mt-2"> <label for="nuevo" class="form-label">Cantidad</label> <input type="text" class="form-control" id="nuevo" placeholder="Ej: 10" name="nuevo"> </div>'
        listaProductos.append(li);
        productosAgregados[posicionLS] = productos[posicionArrayProductos];
        posicionLS++;

        Swal.fire({
            icon: "success",
            title: "Excelente!",
            text: "Producto agregado con éxito",
        });

        //Luego de agregar nuevo producto en arreglo Productos, el nuevo producto se almacenará en el localStorage
        const prodEnJson = JSON.stringify(productos);
        localStorage.setItem("productos", prodEnJson)

    }else{

        //Si el producto existe en el sistema, no lo agregará y enviará un mensaje de que ya existe
        aviso = document.createElement("p");
        aviso.innerText = "Producto ya se encuentra ingresado en el sistema";
        agregarProducto.append (aviso);

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Producto ya se encuentra ingresado en el sistema",
        });
    }

    productoIngresado = true;
    return productos;
});

const seleccionarRegion = document.getElementById("regionvalpo")

function validarFormulario (e){
    e.preventDefault();
}