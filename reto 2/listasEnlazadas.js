const capturaValorInput = function() {
    let valoresNodos = document.getElementById("nodos").value;
    document.getElementById("nodosIngresados").innerHTML = valoresNodos;
};


function cargueImagenes(eventoSeleccionar) {
    let files = eventoSeleccionar.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        /* Cargue de sólo imagenes */
        if (!f.type.match('image.*')) {
            continue;
        }
        let cargueImagenes = new FileReader;
        /* Capturar información de la imagen: tipo, nombre, tamaño */
        cargueImagenes.onload = (function(imagenSeleccionada) {
            return function(imagen) {
                /* Crear etiqueta HTML en el DOM */
                let span = document.createElement('span');
                /* Escribimos en la etiqueta span: cargamos la imagen */
                span.innerHTML = ['<img class ="thumb" width ="100px" heigth="100px" src= " ',
                    imagen.target.result, ' "title=" ', escape(imagenSeleccionada.name),
                    ' "/> '
                ].join('');
                document.getElementById("list").insertBefore(span, null);
            };
        })(f);
		// Funcion de la API FileReader
		// Hace la lectura del contenido de un objeto Blob
		// Trabaja con el atributo result que devuelve los datos del fichero, en este caso la imagen seleccionada
		cargueImagenes.readAsDataURL(f);
    }
}
document.getElementById('files').addEventListener('change', cargueImagenes, false);

// Cargue de archivo txt
let input = myInput;
let infoArchivo = new FileReader;
input.addEventListener('change', onChange);

function onChange(event) {
	// event es el evento de click seleccion
	// targer es el tipo de archivo seleccionado
	// files[0] sólo permite el cargue de un archivo
	let archivo = event.target.files[0];
	// readAsText se utiliza para leer el contenido de los archivos 
	infoArchivo.readAsText(archivo);
	// Permite ejecutar la función onload despues de cargar el archivo
	infoArchivo.onload = onLoad;
}
// Lectura del contenido del archivo
function onLoad() {
	let contenidoTxt = infoArchivo.result;
	let lecturaLineaPorLinea = contenidoTxt.split('\n');
	let contenido = "";
	contenido += lecturaLineaPorLinea;
	document.getElementById("ver").innerHTML = contenido; 
}


class NodeClass{
	constructor(value){
		//Propiedades que tiene todo nodo
		this.value = value;
		this.next = null; //Generar el enlace entre los nodos
	}
}

class listasSimples{
	constructor(){
		//Propiedades que tiene toda lista
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	//Metodos a trabajar con listas -- SyngleLinkedList
	
	//Añadir nodos al final de la lista
	pushNode(value){
		//Instancia de la clase NodeClass
		let newNode = new NodeClass(value);
		//Validar si la lista esta vacia
		if(!this.head){
			this.head = newNode;
			this.tail = this.head;
		}else{
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	//Añadir nodos al inicio de la lista
	unshiftNode(value){
		let newNode = new NodeClass(value);
		if(!this.head){
			this.head = newNode;
			this.tail = this.head;
		}
		newNode.next = this.head;
		this.head = newNode
		this.length++;
		return this;
	}

	//Eliminar el ultimo elemento de la lista
	popNode(){
		if(!this.head) return undefined;
		//Recorrer toda la lista hasta llegar al nodo cola
		let nodoActual = this.head;
		let newTail = nodoActual;
		//Reccoremos todos los enlaces de la lista
		while(nodoActual.next){
			newTail = nodoActual;
			nodoActual = nodoActual.next;
		}
		this.tail = newTail;
		//Especificamos que es la nueva cola y se genera el enlace de next con null
		this.tail.next = null;
		this.length--;

		//Validación
		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}
		return nodoActual;
	}

	//Eliminar el primer elemento de la lista
	shiftNode(){
		if(!this.head) return undefined;
		let nodoActual = this.head;
		this.head = nodoActual.next;
		this.length--;


		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}
		return nodoActual;
	}

	//Buscar un nodo utilizando el puntero
	getValorNodo(nodoBuscado){
		if (nodoBuscado < 0 || nodoBuscado >= this.length) return null;
		let contadorNodos = 0;
		let nodoActual = this.head;

		while(contadorNodos != nodoBuscado){
			nodoActual = nodoActual.next;
			contadorNodos++;
		}
		return nodoActual;
	}

	modificarValorNodo(nodoBuscado, value){
		let encontrarNodo = this.getValorNodo(nodoBuscado);
		if (encontrarNodo) {
			encontrarNodo.value = value;
			return true;
		}
		return false;
	}

	removerNodoEnPosicion(nodoBuscado){         
		let nodoActual = this.head;         
		let nodoAnterior = null;

		if(nodoBuscado < 0 || nodoBuscado > this.length) return null;
		if(nodoBuscado === 0)this.head = nodoActual.next;
		else{
		 	for(let i = 0; i < nodoBuscado; i++){
				nodoAnterior = nodoActual;                 
				nodoActual = nodoActual.next;             
			}
			nodoAnterior.next = nodoActual.next;
		}
		this.length--;         
		return nodoActual.value;     
	}

	// ELIMINA nodos por determinado valor 
    removerNodoPorValor(value){
        let nodoActual = this.head;
        let nodoAnterior = null;

        while(nodoActual !== null){
            if(nodoActual.value === value){
                if(!nodoAnterior){
                    this.head = nodoActual.next;
                }else{
                    nodoAnterior.next = nodoActual.next;
                }
                this.length--;
                return nodoActual.value;
            }
            nodoAnterior = nodoActual;
            nodoActual = nodoActual.next;
        }
        return null;
    }

	//Insertar nuevo nodo en determinada "posicion" de la lista
	insertarNodoEnPosicion(value, nodoBuscado){
		let nuevoNodo = new NodeClass(value, null);
		let nodoActual = this.head;
		let nodoPrevio;

		if (nodoBuscado<0 || nodoBuscado > this.length) {
			return null;
		}
		if (nodoBuscado===0) {
			//this.unshiftNode(value);
			nuevoNodo.next = nodoActual;
			this.head = nuevoNodo;
		}else{
			for (var i = 0; i < nodoBuscado; i++) {
				nodoPrevio = nodoActual;
				nodoActual = nodoActual.next;
			}
			nuevoNodo.next = nodoActual;
			nodoPrevio.next = nuevoNodo;
		}
		this.length++;
		
	}	
	//Invertir la lista
	invertirLista() {
        let cabeza = this.head;
        let cola = this.tail;

        let nodoAnterior;
        let nodoActual = this.head;
        let nodoSiguiente;
        while (nodoActual != null) {
            nodoSiguiente = nodoActual.next;
            nodoActual.next = nodoAnterior;
            nodoAnterior = nodoActual;
            nodoActual = nodoSiguiente;
        }
        
        this.head = cola;
        this.tail = cabeza;
        return nodoAnterior;
    }

    //Imprimir la lista
	imprimirArrayListDefault(){
		let arregloNodos = [];
		let nodoVisitado = this.head;

		while(nodoVisitado){
			arregloNodos.push(nodoVisitado.value);
			nodoVisitado = nodoVisitado.next;
		}

		document.getElementById("ListaPorDefault").innerHTML = arregloNodos;
	}

	imprimirArrayListCreada(){
		let arregloNodos = [];
		let nodoVisitado = this.head;

		while(nodoVisitado){
			arregloNodos.push(nodoVisitado.value);
			nodoVisitado = nodoVisitado.next;
		}

		document.getElementById("listaCreada").innerHTML = arregloNodos;
	}

	imprimirArrayListActualizada(){
		let arregloNodos = [];
		let nodoVisitado = this.head;

		while(nodoVisitado){
			arregloNodos.push(nodoVisitado.value);
			nodoVisitado = nodoVisitado.next;
		}

		document.getElementById("listaActualizada").innerHTML = arregloNodos;
	}
}

let listaSimpleTest = new listasSimples();
listaSimpleTest.pushNode("8");
listaSimpleTest.unshiftNode("7"); 
listaSimpleTest.unshiftNode("6"); 
listaSimpleTest.unshiftNode("5"); 
listaSimpleTest.unshiftNode("4"); 
listaSimpleTest.unshiftNode("3"); 
listaSimpleTest.unshiftNode("2"); 
listaSimpleTest.unshiftNode("1");
listaSimpleTest.imprimirArrayListDefault();


/*--------------------------------------------------------------------------------------------------------*/


function crearlista() {
	let obtenerDatosInput = document.getElementById('nodosIngresados').value;
	let arregloInput=obtenerDatosInput.split(',');
	for (var i = 0; i < arregloInput.length; i++) {
		listaSimpleTest.pushNode(arregloInput[i]);
	}

	let obtenerNombreImgs = document.getElementById('nombreImgs').value;
	let arregloImgs=obtenerNombreImgs.split(',');
	for (var i = 0; i < arregloImgs.length; i++) {
		listaSimpleTest.pushNode(arregloImgs[i]);
	}

	let obtenerTextoTxt = document.getElementById('ver').value;
	let arregloTxt=obtenerTextoTxt.split(',');
	for (var i = 0; i < arregloTxt.length; i++) {
		listaSimpleTest.pushNode(arregloTxt[i]);
	}

	listaSimpleTest.imprimirArrayListCreada();
}


function validarOpcionLista() {
	let seleccion = document.getElementById('functionSelected').value;
	let valorNodo = document.getElementById('valorN').value;
	let posicionNodo = document.getElementById('posicionN').value;
	let inicio = document.getElementById('inicioLista').checked;
	let final = document.getElementById('finalLista').checked;

	if ((seleccion === "1") && (inicio)) {
		listaSimpleTest.unshiftNode(valorNodo);
		listaSimpleTest.imprimirArrayListActualizada();
	}else if ((seleccion === "1") && (final)) {
		listaSimpleTest.pushNode(valorNodo);
		listaSimpleTest.imprimirArrayListActualizada();
	}else if ((seleccion === "2") && (inicio)) {
		listaSimpleTest.shiftNode();
		listaSimpleTest.imprimirArrayListActualizada();
	}else if ((seleccion === "2") && (final)) {
		listaSimpleTest.popNode();
		listaSimpleTest.imprimirArrayListActualizada();
	}else if (seleccion === "3") {//ERROR
		let opcion3 = listaSimpleTest.getValorNodo(posicionNodo);
		document.getElementById("listaActualizada").innerHTML = "El valor del nodo en la posicion #"+ posicionNodo +" de la lista es: " + opcion3;
	}else if(seleccion === "4"){
		listaSimpleTest.removerNodoEnPosicion(posicionNodo);
		listaSimpleTest.imprimirArrayListActualizada();
	}else if(seleccion === "5"){
		listaSimpleTest.removerNodoPorValor(valorNodo);
		listaSimpleTest.imprimirArrayListActualizada();
	}else if(seleccion === "6"){
		listaSimpleTest.modificarValorNodo(posicionNodo, valorNodo);
		listaSimpleTest.imprimirArrayListActualizada();
	}else if(seleccion === "7"){
		listaSimpleTest.insertarNodoEnPosicion(valorNodo, posicionNodo);
		listaSimpleTest.imprimirArrayListActualizada();
	}else if(seleccion === "8"){
		listaSimpleTest.invertirLista();
		listaSimpleTest.imprimirArrayListActualizada();
	}

}

