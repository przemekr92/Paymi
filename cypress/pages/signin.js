export class SignInPage{

    usernameInput = '#user_email'
    passwordInput = '#user_password'
    submitBtn = '#log_in'
    errorBox = 'ul.error-box__errors li'
    emailError = '#email-error .error-text' //.email-error
    passwordError = '#password-error .error-text' //.password-error
    emailLabel = '#email-label'
    passwordLabel = '#password-label'
    togglePasswordBtn = '.toggle-password'

    enterEmail(mail){
        cy.get(this.usernameInput).type(mail);
    }
    enterPassword(password){
        cy.get(this.passwordInput).type(password)
    }
    clickSubmit(){
        cy.get(this.submitBtn).click();
    }
    togglePassword(){
        cy.get(this.togglePasswordBtn).click();
    }
}