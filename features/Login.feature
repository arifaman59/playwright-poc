Feature: Login Feature

  As a User
  I want to login to my sauceDemo account
  So that I can place an order

  @regression
  Scenario: verify order functionality
    Given I navigate to the "saucedemo" website
    And I confirm the page title is "Swag Labs"
    Then I enter "username" as "standard_user"
    Then I enter "password" as "secret_sauce"
    And I click the "login-button"
    And I am in the "inventory" page
    And I added the following products to cart
      | product                           |
      | Test.allTheThings() T-Shirt (Red) |
      | Sauce Labs Backpack               |
      | Sauce Labs Onesie                 |
    And I click the "cart-button"
    And I am in the "cart" page
    And I can see all the selected products on the page
    And I click the "checkout-button"
    And I am in the "checkout" page
    And I enter "first-name" as "Arif"
    And I enter "last-name" as "Aman"
    And I enter "zip-code" as "3030"
    And I click the "continue-button"
    And I am in the "checkout-step-two" page
    And I can see all the selected products on the page
    And I click the "finish-button"
    And I am in the "checkout-complete" page
    And I can see the text "Thank you for your order!"
    And I click the "backHome-button"
    And I am in the "inventory" page

  @ai
  Scenario: verify order functionality
    Given I navigate to the "saucedemo" website
    And I confirm the page title is "Swag Labs"
    Then I type "Username" as "standard_user"
    Then I type "Password" as "secret_sauce"
    And I click the "Login" button
    And I am in the "inventory" page
    And I added the following products to cart
      | product                           |
      | Test.allTheThings() T-Shirt (Red) |
      | Sauce Labs Backpack               |
      | Sauce Labs Onesie                 |
    And I click the "#shopping-cart-link" button
    And I am in the "cart" page
    And I can see all the selected products on the page
    And I click the "Checkout" button
    And I am in the "checkout" page
    And I type "First Name" as "Arif"
    And I type "Last Name" as "Aman"
    And I type "Zip/Postal Code" as "3030"
    And I click the "Continue" button
    And I am in the "checkout-step-two" page
    And I can see all the selected products on the page
    And I click the "Finish" button
    And I am in the "checkout-complete" page
    And I can see the text "Thank you for your order!"
    And I click the "Back Home" button
    And I am in the "inventory" page
    And I click the "Open Menu" button
    And I click the "Logout" link
    And I confirm the page title is "Swag Labs"


