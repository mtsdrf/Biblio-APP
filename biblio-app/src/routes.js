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
import Emprestimos from "./pages/Emprestimos/Emprestimos.vue";
import EmprestimoFormulario from "./pages/Emprestimos/EmprestimoFormulario.vue";
import Corredores from "./pages/Corredores/Corredores.vue";
import CorredorFormulario from "./pages/Corredores/CorredorFormulario.vue";
import Prateleiras from "./pages/Prateleiras/Prateleiras.vue";
import PrateleiraFormulario from "./pages/Prateleiras/PrateleiraFormulario.vue";

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
    { path: "/cliente-formulario/:id?", name: "ClienteFormulario", component: ClienteFormulario },
    { path: "/emprestimos", name: "Emprestimos", component: Emprestimos },
    { path: "/emprestimo-formulario/:id?", name: "EmprestimoFormulario", component: EmprestimoFormulario },
    { path: "/corredores", name: "Corredores", component: Corredores },
    { path: "/corredor-formulario/:id?", name: "CorredorFormulario", component: CorredorFormulario },
    { path: "/prateleiras", name: "Prateleiras", component: Prateleiras },
    { path: "/prateleira-formulario/:id?", name: "PrateleiraFormulario", component: PrateleiraFormulario },
];


export default routes;