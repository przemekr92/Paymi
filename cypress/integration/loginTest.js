/// <reference types="cypress" />

import {SignInPage} from "../pages/signin"
import {AccountsPage} from "../pages/accounts"


const signInPage = new SignInPage();
const accountsPage = new AccountsPage();

const baseUrl = 'https://staging.paymi.com/';
const correctMail = ""; //paste correct e-mail here
const correctPassword = "" //paste correct password here
const incorrectPassword = 'testpass'
const invalidEmail = 'testemail.com'

it('Login to Paymi test', function(){

    cy.visit(baseUrl);
    signInPage.enterEmail(correctMail);
    signInPage.enterPassword(correctPassword)
    signInPage.clickSubmit()
    cy.get(accountsPage.accountsDropdown).should('contain.text','My Account')
    cy.location().should((loc) => {

        expect(loc.pathname).to.eq('/dashboard/accounts')

      })
})

it('Login with Enter test', function(){
    cy.visit(baseUrl);
    signInPage.enterEmail(correctMail);
    signInPage.enterPassword(correctPassword + '{enter}')

    cy.get(accountsPage.accountsDropdown).should('contain.text','My Account')
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/dashboard/accounts')
      })
})

it('Login fail empty values', function(){
    cy.visit(baseUrl);
    signInPage.clickSubmit()
    cy.get(signInPage.emailError).should('be.visible')
    cy.get(signInPage.passwordError).should('be.visible')
    cy.get(signInPage.emailLabel).parent().should('have.class','has-error')
    cy.get(signInPage.passwordLabel).parent().should('have.class','has-error')

    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/users/sign_in')
      })
})

it('LogIn fail wrong password', function(){
    cy.visit(baseUrl);
    signInPage.enterEmail(correctMail);
    signInPage.enterPassword(incorrectPassword)
    signInPage.clickSubmit()


    cy.get(signInPage.errorBox).should('be.visible')
    cy.get(signInPage.emailLabel).parent().should('not.have.class','has-error')
    cy.get(signInPage.passwordLabel).parent().should('not.have.class','has-error')
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/users/sign_in')
      })
})

it('LogIn fail email structure not valid', function(){
    cy.visit(baseUrl);
    signInPage.enterEmail(invalidEmail);
    signInPage.enterPassword(incorrectPassword)
    signInPage.clickSubmit()


    cy.get(signInPage.emailLabel).parent().should('have.class','has-error')
    cy.get(signInPage.passwordLabel).parent().should('not.have.class','has-error')
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/users/sign_in')
      })
})

it('LogIn success after fail', function(){
    cy.visit(baseUrl);
    signInPage.clickSubmit()

    cy.get(signInPage.emailError).should('be.visible')
    cy.get(signInPage.passwordError).should('be.visible')
    cy.get(signInPage.emailLabel).parent().should('have.class','has-error')
    cy.get(signInPage.passwordLabel).parent().should('have.class','has-error')

    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/users/sign_in')
      })

      signInPage.enterEmail(correctMail);
      signInPage.enterPassword(correctPassword)
      signInPage.clickSubmit()
      cy.get(accountsPage.accountsDropdown).should('contain.text','My Account')
      cy.location().should((loc) => { 
          expect(loc.pathname).to.eq('/dashboard/accounts')
        })
})


it('Display password test', function(){
  cy.visit(baseUrl);

  signInPage.enterPassword(incorrectPassword);
 cy.get(signInPage.passwordInput).invoke('attr', 'type').should('eq','password');
 signInPage.togglePassword();
 cy.get(signInPage.passwordInput).invoke('attr', 'type').should('eq','text');
 signInPage.togglePassword();
 cy.get(signInPage.passwordInput).invoke('attr', 'type').should('eq','password');
  cy.location().should((loc) => { 
    expect(loc.pathname).to.eq('/users/sign_in')
  })
})
