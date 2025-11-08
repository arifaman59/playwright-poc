Feature: Login Feature

  As a User
  I want to login to my sauceDemo account
  So that I can place an order

#  @regression
#  Scenario: verify order functionality
#    Given I navigate to the "saucedemo" website
#    And I confirm the page title is "Swag Labs"
#    Then I enter "username" as "standard_user"
#    Then I enter "password" as "secret_sauce"
#    And I click the "login-button"
#    And I am in the "inventory" page
#    And I added the following products to cart
#      | product                           |
#      | Test.allTheThings() T-Shirt (Red) |
#      | Sauce Labs Backpack               |
#      | Sauce Labs Onesie                 |
#    And I click the "cart-button"
#    And I am in the "cart" page
#    And I can see all the selected products on the page
#    And I click the "checkout-button"
#    And I am in the "checkout" page
#    And I enter "first-name" as "Arif"
#    And I enter "last-name" as "Aman"
#    And I enter "zip-code" as "3030"
#    And I click the "continue-button"
#    And I am in the "checkout-step-two" page
#    And I can see all the selected products on the page
#    And I click the "finish-button"
#    And I am in the "checkout-complete" page
#    And I can see the text "Thank you for your order!"
#    And I click the "backHome-button"
#    And I am in the "inventory" page

  @smart
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
    And I click the "shopping-cart-link" button
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


#  @ai
#  Scenario: Test Lotto.com website - pageTitle
#    Given I navigate to the "https://www.thelott.com/" website
#    Then I click the "Find a store" button
#    And I am in the "find-a-store" page
#    And I confirm the page title is "Find a Store | Australia's Official Lotteries | The Lott"


#  @ai
#  Scenario: Test Lotto.com website - pageTitle
#    Given I navigate to the "https://www.thelott.com/" website
#    And I confirm the page title is "The Lott - Official Home of Australian Lotteries"
#    And I click the "Buy now" button
#    And I confirm the page title is "Play an Oz Lotto entry"
#    And the "Syndicates" button is visible
#    And I click the "Results" link
#    And I click the "Syndicates" button
#    And I click the "Syndicate search" button
#    And I click the "Synd, No." button
#    And I type "Username" as "arifaman59"
#    And I type "Password" as "test1234"
#    Then I click the "Log in" button
#    And "_loginError" "message" is displayed


