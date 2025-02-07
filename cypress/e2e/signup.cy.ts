describe('Pruebas de Registro', () => {
    beforeEach(() => {
        cy.visit('/UserRegistration'); 
        // ACA LO TUVE Q HACER ASÍ PQ COMO TIENE LA MISMA RUTA CON EL LOGIN TIRABA 
        // SIEMPRE ERROR EN TODOS LOS TEST PERO PQ POR DEFECTO TESTEABA EL LOGIN
        cy.contains('Registrate').click();
        cy.get('form').should('be.visible');
         // Mock de provincias
    cy.intercept('GET', '**/api/provinces', { fixture: 'provinces.json' }).as('getProvinces');

    // Mock de ciudades (cuando se selecciona una provincia)
    cy.intercept('GET', '**/api/provinces/cities/*', { fixture: 'cities.json' }).as('getCities');

    });

    it('Debe mostrar los campos del formulario de registro', () => {
        cy.get('input[name="firstName"]').should('be.visible');
        cy.get('input[name="lastName"]').should('be.visible');
        cy.get('input[name="phone"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="street"]').should('be.visible');
        cy.get('input[name="streetNumber"]').should('be.visible');
        cy.get('select[name="province"]').should('be.visible');
        cy.get('select[name="city"]').should('be.visible');
    });

    it('Debe validar errores al dejar los campos obligatorios vacíos', () => {
        // ACA SIMULA EL TEMA DE QUE EL USUARIO TOQUE EL CAMPO PERO DESPUÉS SIGA CON OTRO SIN HABERLO COMPLETADO ANTES (LA NOTIFICACIÓN ROJA DE ABAJO)
        cy.get('input[name="firstName"]').click().blur();
        cy.get('input[name="lastName"]').click().blur();
        cy.get('input[name="phone"]').click().blur();
        cy.get('input[name="email"]').click().blur();
        cy.get('input[name="password"]').click().blur();
        cy.get('input[name="street"]').click().blur();
        cy.get('input[name="streetNumber"]').click().blur();    
        
        cy.get('#Accept').click();
    
        cy.get('.text-danger').should('contain', 'El nombre es requerido');
        cy.get('.text-danger').should('contain', 'El apellido es requerido');
        cy.get('.text-danger').should('contain', 'El teléfono es requerido');
        cy.get('.text-danger').should('contain', 'El email es obligatorio');
        cy.get('.text-danger').should('contain', 'La contraseña es requerida');
        cy.get('.text-danger').should('contain', 'La calle es requerido');
        cy.get('.text-danger').should('contain', 'El número de calle es requerido');
    });

    it('Debe mostrar error si el email es inválido', () => {
        cy.get('input[name="email"]').type('correo_invalido');
        cy.get('#Accept').click();
        cy.get('.text-danger').should('contain', 'El email debe tener un formato válido');
    });

    it('Debe mostrar error si la contraseña no cumple los requisitos', () => {
        cy.get('input[name="password"]').type('12345');
        cy.get('#Accept').click();
        cy.get('.text-danger').should('contain', 'La contraseña debe tener al menos 8 caracteres');
    });

//     it('Debe registrar un usuario correctamente con datos válidos', () => {
//     const mockProvincesResponse = [
//         { id: 1, name: 'Mendoza' },
//         { id: 2, name: 'Buenos Aires' }
//     ];

//     const mockCitiesResponse = [
//         { id: 1, name: 'Ciudad 1' },
//         { id: 2, name: 'Ciudad 2' }
//     ];

//     // Interceptamos la solicitud de provincias
//     cy.intercept('GET', '**/api/provinces', {
//         statusCode: 200,
//         body: mockProvincesResponse
//     }).as('getProvinces');

//     // Interceptamos la solicitud de ciudades (sin parámetros específicos aún)
//     cy.intercept('GET', '**/api/provinces/cities/1*', {
//         statusCode: 200,
//         body: mockCitiesResponse
//     }).as('getCities');

//     // Completar formulario con datos de prueba
//     cy.get('input[name="firstName"]').type('Juan');
//     cy.get('input[name="lastName"]').type('Pérez');
//     cy.get('input[name="phone"]').type('123456789');
//     cy.get('input[name="email"]').type('juan.perez@example.com');
//     cy.get('input[name="password"]').type('Password123!');
//     cy.get('input[name="street"]').type('Calle Falsa');
//     cy.get('input[name="streetNumber"]').type('123');

//     // Esperamos que las provincias se hayan cargado
//     cy.wait('@getProvinces');

//     // Seleccionamos una provincia
//     cy.get('#province').select('Mendoza');

//     // Ahora esperamos que se realice la solicitud de ciudades después de seleccionar la provincia
//     cy.wait('@getCities');

//     // Verificamos que el select de ciudades ahora esté visible y habilitado
//     cy.get('#city').should('be.visible').and('not.be.disabled');
  
//     // Seleccionamos una ciudad
//     cy.get('#city').select('Ciudad 1');
  
//     // Simulamos un clic en el botón de aceptar
//     cy.get('#Accept').click();
  
//     // Validamos que el usuario fue registrado con éxito
//     cy.url().should('include', '/UserRegistration');
//     cy.contains('Usuario registrado con éxito!!').should('be.visible');
// });

// it('Debe mostrar error si el email ya está registrado', () => {
//     cy.intercept('GET', '**/api/user/juan.perez@example.com', {
//         statusCode: 400,
//         body: { message: 'El email ya está registrado' }
//     }).as('emailExists');

//     cy.get('input[name="firstName"]').type('Juan');
//     cy.get('input[name="lastName"]').type('Pérez');
//     cy.get('input[name="phone"]').type('123456789');
//     cy.get('input[name="email"]').type('juan.perez@example.com');
//     cy.get('input[name="password"]').type('Password123!');
//     cy.get('input[name="street"]').type('Calle Falsa');
//     cy.get('input[name="streetNumber"]').type('123');
//     cy.get('#province').select('Mendoza');
//     cy.get('#city').select('Ciudad 1');

//     cy.get('#Accept').click();
//     cy.wait('@emailExists');

//     cy.contains('El email ya está registrado').should('be.visible');
// });
it('Debe mostrar error si no se selecciona una provincia', () => {
    cy.get('#Accept').click();
    cy.contains('Seleccione una provincia').should('be.visible');
});
// it('No debe permitir seleccionar una ciudad sin antes elegir una provincia', () => {
//     cy.get('#city').should('be.disabled');
// });


// it('Debe permitir ver la contraseña al hacer clic en el icono de ojo', () => {
//     cy.get('input[name="password"]').type('Password123!');
//     cy.get('.input-group-text').click();
//     cy.get('input[name="password"]').should('have.attr', 'type', 'text');
//     cy.get('.input-group-text').click();
//     cy.get('input[name="password"]').should('have.attr', 'type', 'password');
// });


//DEL LOGIN
// it('Should allow toggling password visibility by clicking the icon', () => {
//     cy.get('input[formControlName="password"]').type('clave_secreta');
//     cy.get('.input-group-text').click();
//     cy.get('input[formControlName="password"]').should('have.attr', 'type', 'text');
// });


});
