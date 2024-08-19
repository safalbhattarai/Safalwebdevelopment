

Feature: User
  Scenario Outline: Fetching User Scenario
    Given getAllData User
    And getUserById User
#    Then can Login to System

    Examples:
      | id| email | password | fullName | securityQuestion | roles |
      | 6 | jav2001@yahoo.com | jav | jav | everest | users |

#  Scenario Outline: Register User Scenario
#    Given save SystemUser
#    And Verify Id
#    Then Verify Email
#
#    Examples:
#      | id| email | password | fullName | securityQuestion | roles |
#      | 6 | jav2001@yahoo.com | jav | jav | everest | users |
#

