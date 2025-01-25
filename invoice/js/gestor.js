import { productosOpciones } from "./products.js";
class FacturaContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/`
      <style>
         body {
          font-family: 'Arial', sans-serif;
        }
        .bg-light {
          background-color: rgb(247, 23, 23);
        }
        .fondo {
          background-image: url('img/super2.webp');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px; 
        }
        .fondo {
          background-image: url('img/super2.webp');
        }
        .card {
          background-color: rgb(255, 251, 251);
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        .card-title {
          font-size: 2rem;
          color: #2d3748;
        }
        .form-label {
          font-size: 0.9rem;
          color: #333;
        }
        .form-control {
          border-radius: 8px;
          border: 1px solid #ddd;
          padding: 10px;
          font-size: 1rem;
        }
        .form-select {
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
          padding: 10px;
        }
        .btn {
          font-size: 1rem;
          padding: 10px 20px;
          border-radius: 8px;
          transition: background-color 0.3s;
        }
        .btn-primary {
          background-color: rgb(0, 19, 102);
          color: #fff;
        }
        .btn-primary:hover {
          background-color: rgb(87, 39, 151);
        }
        .btn-success {
          background-color: rgb(0, 19, 102);
          color: #fff;
        }
        .btn-success:hover {
          background-color: rgb(156, 22, 218);
        }
        .btn-danger {
          background-color: rgb(128, 105, 102);
          color: #fff;
        }
        .btn-danger:hover {
          background-color: rgb(233, 57, 38);
        }
        .table {
          margin-top: 20px;
          width: 100%;
          border-collapse: collapse;
        }
        .table th,
        .table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .table th {
          background-color: rgb(0, 19, 102);
          color: #fff;
        }
        .table-striped tbody tr:nth-of-type(odd) {
          background-color: #f9f9f9;
        }
        .table-striped tbody tr:hover {
          background-color: #f1f1f1;
        }
        .fw-bold {
          font-weight: 600;
        }
        .text-end {
          text-align: right;
        }
        .d-grid {
          display: grid;
        }
        .eliminar {
          cursor: pointer;
        }
        .eliminar:hover {
          background-color: rgb(244, 54, 111);
          border-color: rgb(0, 0, 0);
        }
        h4 {
          color: #2d3748;
          font-size: 1.25rem;
          margin-bottom: 10px;
        }
        .container-fluid {
          padding: 30px;
        }
      </style>
      <div class="fondo">
         <div class="card shadow">
           <div class="card-body">
           <h1 class="card-title text-center">Factura</h1>
             <div class="mb-4">
               <h4>Información del Cliente</h4>
               <div class="row g-3">
                 <div class="col-md-6">
                   <label for="id-factura" class="form-label">ID Factura</label>
                   <input type="text" id="id-factura" class="form-control" readonly>
                 </div>
                 <div class="col-md-6">
                   <label for="nombre" class="form-label">Nombres</label>
                   <input type="text" id="nombre" class="form-control" placeholder="Nombres">
                 </div>
                 <div class="col-md-6">
                   <label for="apellido" class="form-label">Apellidos</label>
                   <input type="text" id="apellido" class="form-control" placeholder="Apellidos">
                 </div>
                 <div class="col-md-6">
                   <label for="direccion" class="form-label">Dirección</label>
                   <input type="text" id="direccion" class="form-control" placeholder="Dirección">
                 </div>
                 <div class="col-md-12">
                   <label for="email" class="form-label">Email</label>
                   <input type="email" id="email" class="form-control" placeholder="Correo Electrónico">
                 </div>
               </div>
             </div>
             <hr>
             <div class="mb-4">
               <h4>Productos</h4>
               <div class="row g-3">
                 <div class="col-md-6">
                   <label for="producto-select" class="form-label">Seleccionar Producto</label>
                   <select id="producto-select" class="form-select">
                     <option value="" disabled selected>Elige un producto</option>
                   </select>
                 </div>
                 <div class="col-md-3">
                   <label for="cantidad" class="form-label">Cantidad</label>
                   <input type="number" id="cantidad" class="form-control" placeholder="Cantidad">
                 </div>
               </div>
               <div class="d-grid mt-3">
                 <button id="agregar-producto" class="btn btn-primary">Agregar Producto</button>
               </div>
             </div>
             <hr>
             <div class="mb-4">
               <h4>Resumen de Compra</h4>
               <div class="table-responsive">
                 <table class="table table-striped">
                   <thead>
                     <tr>
                       <th>Código</th>
                       <th>Nombre</th>
                       <th>Valor Unitario</th>
                       <th>Cantidad</th>
                       <th>Subtotal</th>
                       <th>Acciones</th>
                     </tr>
                   </thead>
                   <tbody id="productos-lista"></tbody>
                 </table>
               </div>
             </div>
             <div class="mb-4 text-end">
               <div class="fw-bold">Subtotal: $<span id="subtotal">0.00</span></div>
               <div class="fw-bold">IVA (19%): $<span id="iva">0.00</span></div>
               <div class="fw-bold">Total: $<span id="total">0.00</span></div>
             </div>
             <div class="d-grid">
               <button id="pagar" class="btn btn-success btn-lg">Pagar</button>
             </div>
           </div>
         </div>
       </div>
    `;

    this.productos = [];
    this.productosOpciones = productosOpciones; // Importamos los productos aquí
    this.agregarProducto = this.agregarProducto.bind(this);
    this.pagar = this.pagar.bind(this);
    this.idFactura = this.generarIdFactura(); // Generamos el ID de la factura
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#id-factura').value = this.idFactura; // Mostramos el ID de la factura
    this.shadowRoot.querySelector('#agregar-producto').addEventListener('click', this.agregarProducto);
    this.shadowRoot.querySelector('#pagar').addEventListener('click', this.pagar);

    // Poblamos el select con los productos
    const productoSelect = this.shadowRoot.querySelector('#producto-select');
    this.productosOpciones.forEach(producto => {
      const option = document.createElement('option');
      option.value = producto.id;
      option.textContent = producto.nombre;
      productoSelect.appendChild(option);
    });
  }

  generarIdFactura() {
    return 'FAC-' + Math.floor(Math.random() * 1000000); // Genera un ID de factura aleatorio
  }

  agregarProducto() {
    const productoSelect = this.shadowRoot.querySelector('#producto-select').value;
    const cantidad = parseInt(this.shadowRoot.querySelector('#cantidad').value);

    if (productoSelect && cantidad > 0) {
      const productoSeleccionado = this.productosOpciones.find(p => p.id == productoSelect);
      const idProducto = this.generarIdProducto();
      const subtotal = productoSeleccionado.precio * cantidad;

      this.productos.push({
        id: idProducto,
        codigo: idProducto,
        nombre: productoSeleccionado.nombre,
        valorUnitario: productoSeleccionado.precio,
        cantidad: cantidad,
        subtotal: subtotal
      });

      this.actualizarTabla();
      this.actualizarResumen();
    } else {
      alert('Por favor, selecciona un producto y una cantidad válida.');
    }
  }

  generarIdProducto() {
    return Math.floor(Math.random() * 1000000); // Genera un número aleatorio para el ID del producto
  }

  actualizarTabla() {
    const tbody = this.shadowRoot.querySelector('#productos-lista');
    tbody.innerHTML = '';
    this.productos.forEach((producto, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.valorUnitario.toFixed(2)}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.subtotal.toFixed(2)}</td>
        <td><button data-index="${index}" class="btn btn-sm btn-danger eliminar">Eliminar</button></td>
      `;
      row.querySelector('.eliminar').addEventListener('click', () => this.eliminarProducto(index));
      tbody.appendChild(row);
    });
  }

  actualizarResumen() {
    const subtotal = this.productos.reduce((acc, p) => acc + p.subtotal, 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    this.shadowRoot.querySelector('#subtotal').textContent = subtotal.toFixed(2);
    this.shadowRoot.querySelector('#iva').textContent = iva.toFixed(2);
    this.shadowRoot.querySelector('#total').textContent = total.toFixed(2);
  }

  eliminarProducto(index) {
    this.productos.splice(index, 1);
    this.actualizarTabla();
    this.actualizarResumen();
  }

  pagar() {
    const total = parseFloat(this.shadowRoot.querySelector('#total').textContent);

    if (total > 0) {
      alert(`¡Pago realizado exitosamente! Total: $${total.toFixed(2)}`);
      this.productos = [];
      this.shadowRoot.querySelector('#producto-select').value = '';
      this.shadowRoot.querySelector('#cantidad').value = '';
      this.shadowRoot.querySelector('#subtotal').textContent = '0.00';
      this.shadowRoot.querySelector('#iva').textContent = '0.00';
      this.shadowRoot.querySelector('#total').textContent = '0.00';
      this.actualizarTabla();
    } else {
      alert('No hay productos en la factura para pagar.');
    }
  }
}
customElements.define('factura-container', FacturaContainer);
