import { slowCypressDown } from "cypress-slow-down";

// Ralentit chaque commande de 50 ms en mode interactif (npm run cypress)
if (Cypress.config("isInteractive")) {
  slowCypressDown(50);
}
