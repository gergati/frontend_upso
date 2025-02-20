export interface Products {
    cantidad:    number;
    cliente:     Cliente;
    descripcion: string;
    marca:       string;
    nombreProd:  string;
    precio:      string;
    producto_id: number;
    usuario:     Usuario;
}

export interface Cliente {
    cliente_id: number;
    nombre:     string;
}

export interface Usuario {
    nombre:     string;
    usuario_id: string;
}
