import Login from "./pages/Login.vue";
import HomePage from "./pages/HomePage.vue";
import Usuarios from "./pages/Usuarios/Usuarios.vue";
import UsuarioFormulario from "./pages/Usuarios/UsuarioFormulario.vue";
import Livros from "./pages/Livros/Livros.vue";
import LivroFormulario from "./pages/Livros/LivroFormulario.vue";
import Estantes from "./pages/Estantes/Estantes.vue";
import EstanteFormulario from "./pages/Estantes/EstanteFormulario.vue";
import Clientes from "./pages/Clientes/Clientes.vue";
import ClienteFormulario from "./pages/Clientes/ClienteFormulario.vue";

const routes = [ 
    { path: "/", name: "Login", component: Login },
    { path: "/home", name: "Home", component: HomePage },
    { path: "/usuarios", name: "Usuarios", component: Usuarios },
    { path: "/usuario-formulario/:id?", name: "UsuarioFormulario", component: UsuarioFormulario },
    { path: "/livros", name: "Livros", component: Livros },
    { path: "/livro-formulario/:id?", name: "LivroFormulario", component: LivroFormulario },
    { path: "/estantes", name: "Estantes", component: Estantes },
    { path: "/estante-formulario/:id?", name: "EstanteFormulario", component: EstanteFormulario },
    { path: "/clientes", name: "Clientes", component: Clientes },
    { path: "/cliente-formulario/:id?", name: "ClienteFormulario", component: ClienteFormulario }
];


export default routes;