import Vente from "views/Vente.js";
import Auth from "views/Auth.js";

var routes = [
  {
    path: "/vente",
    name: "Caisse",
    icon: "tim-icons icon-laptop",
    component: Vente,
    layout: "/admin"
  },
  {
    path: "/",
    name: "Deconnexion",
    icon: "tim-icons icon-user-run",
    component: Auth,
    layout: ""
  },
];
export default routes;
