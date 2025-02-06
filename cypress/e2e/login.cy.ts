describe('Pruebas de Login', () => {
    beforeEach(() => {
      cy.visit('/UserRegistration'); // Visita la página de login antes de cada prueba
    });

    it('Debe mostrar los campos de email y contraseña', () => {
        cy.get('input[formControlName="email"]').should('be.visible');
        cy.get('input[formControlName="password"]').should('be.visible');
    });
      
    it('Debe validar errores al dejar los campos vacíos', () => {
        cy.get('#logIn').click(); // Intenta hacer login sin llenar los campos
        cy.get('.text-danger').should('contain', 'El email es requerido');
        cy.get('.text-danger').should('contain', 'La contraseña es requerida');
    });
      
    it('Debe mostrar error si el email es inválido', () => {
        cy.get('input[formControlName="email"]').type('correo_invalido');
        cy.get('#logIn').click();
        cy.get('.text-danger').should('contain', 'El email debe tener un formato válido.');
    });
      
    it('Debe mostrar error si las credenciales son incorrectas', () => {
        cy.get('input[formControlName="email"]').type('usuario@correo.com');
        cy.get('input[formControlName="password"]').type('clave_incorrecta');
        cy.get('#logIn').click();
      
        cy.get('.text-danger').should('contain', 'El mail o la contraseña es incorrecto');
    });
      
  
    // it('Debe permitir iniciar sesión con credenciales correctas', () => {
    //   cy.intercept('GET', '**/assets/data.json', { fixture: 'data.json' }).as('loginRequest');
  
    //   cy.fixture('data.json').then((user) => {
    //     cy.get('input[formControlName="email"]').type(user.email);
    //     cy.get('input[formControlName="password"]').type('clave_correcta');
    //   });
    //   cy.get('#logIn').click();
    //   cy.wait('@loginRequest');

    //   cy.url().should('eq', Cypress.config().baseUrl + '/');
    // });
});

