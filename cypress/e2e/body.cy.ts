describe('E2E Test para el BodyComponent', () => {
    beforeEach(() => {
      cy.visit('/'); // Visita la página principal de la aplicación
    });
  
    it('Debería cargar todos los productos desde la base de datos', () => {
      cy.get('.products-container').should('be.visible');
      cy.get('#product').should('have.length.greaterThan', 0); // Verifica que haya productos
    });
  
    it('Debería mostrar los detalles de un producto al hacer clic', () => {
        // Selecciona el primer producto de la lista
        cy.get('.products-container .card').first().within(() => {
          cy.get('h1.card-title').should('exist'); 
          cy.get('h3.card-text').should('exist');  
          cy.get('h2.card-text').should('exist');  
          cy.get('.btn-warning').click();  // ESTE ES EL BOTON DE VER EL PRODUCTO "Ver producto"
        });
      

        cy.url().should('match', /\/product\/[a-f0-9]{24}$/); // ACA VERIFICA EL TEMA DE LA URL CUADO APRETAMOS PARA VER SOLO UN PRODUCTO /product/{productId}"
      
        cy.get('.card-img-top').should('exist'); 
        cy.get('.card-title').should('exist');   
        cy.get('.card-text').should('exist');   
        cy.get('h2.card-text').should('contain', 'Precio:');  
      
        cy.get('#Añadir').should('exist');  
      });
  });
  