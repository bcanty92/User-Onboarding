describe('Testing our Form', () =>{
    beforeEach(function () {
        cy.visit('http://localhost:3000');
    });

    it('Get the name input and input the name', () =>{
        cy.get('[data-cy="name-input"]')
        .type("Brittany Canty")
        .should("have.value", "Brittany Canty")
        .clear();
        cy.contains("you need to input your name");
        cy.get('[data-cy="submit"]').should('be.disabled')
    });

    it('Get the email and input the email', () =>{
        cy.get('[data-cy="email-input"]')
        .type("email@email.com")
        .should('have.value', 'email@email.com')
        .clear()
        .type("email.com")
        .should('have.value', 'email.com');
        cy.contains("E-mail is not valid");
        cy.get('[data-cy="email-input"]')
        .clear();
        cy.contains('E-mail is required');
        cy.get('[data-cy="submit"]').should('be.disabled')
    });

    it('Get password attribute and inputs password', () =>{
        cy.get('[data-cy="password-input"]')
        .type("password")
        .should("have.value", "password")
        .clear()
        .type("123456")
        .should('have.value', '123456');
        cy.contains("password must be at least 8 characters");
        cy.get('[data-cy="password-input"]')
        .clear();
        cy.contains("Password is required");
        cy.get('[data-cy="submit"]').should('be.disabled')
    });

    it('Gets the checkbox attribute of terms and checks the box', () =>{
        cy.get('[data-cy="checkbox"]')
        .check()
        .should('be.checked')
        .uncheck();
        cy.contains("Please agree to terms of use");
        cy.get('[data-cy="submit"]').should('be.disabled')
    })

    it('Testing the Submit button', () => {
        cy.get('[data-cy="name-input"]')
        .type("Brittany")
        .should("have.value", "Brittany");
        cy.get('[data-cy="email-input"]')
        .type("email@email.com")
        .should('have.value', 'email@email.com');
        cy.get('[data-cy="password-input"]')
        .type("password")
        .should("have.value", "password");
        cy.get('[data-cy="checkbox"]')
        .check()
        .should('be.checked');
        cy.get('[data-cy="submit"]')
        .click();
    })
     
});