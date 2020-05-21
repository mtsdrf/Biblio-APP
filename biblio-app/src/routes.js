import Login from "./pages/Login.vue";
import HomePage from "./pages/HomePage.vue";
import Usuarios from "./pages/Usuarios/Usuarios.vue";
import UsuarioFormulario from "./pages/Usuarios/UsuarioFormulario.vue";
import Livros from "./pages/Livros.vue";
import Estantes from "./pages/Estantes.vue";

const routes = [
    { path: "/", name: "Login", component: Login },
    { path: "/home", name: "Home", component: HomePage },
    { path: "/usuarios", name: "Usuarios", component: Usuarios },
    { path: "/usuario-formulario/:id?", name: "UsuarioFormulario", component: UsuarioFormulario },
    { path: "/livros", name: "Livros", component: Livros },
    { path: "/estantes", name: "Estantes", component: Estantes }
];

export default routes;