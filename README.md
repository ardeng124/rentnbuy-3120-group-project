# Group Y
This is the initial README file for GROUP Y in the COMP 3120 Group Project. This README detaills the elements of the application being created by Group Y, including the team members involved in the project, the application and its intended purpose, target user group, use cases and data sources.

## Expected Delivery
Sunday 6th of November (Week 13) at 11:55pm  

## Team Members / Roles / Contact Details
---
This section details the assigned roles of each team member in Group Y. Members will assume responsibility over these development areas, but will also branch out into other areas if support from other members is needed.
| Team Member:         | Assigned Role(s):                    | Student Number: | Student Email:                          |
|----------------------|--------------------------------------|-----------------|-----------------------------------------|
| Nicholas Albert      | Frontend Design, Database management | 46469001        | Nicholas.Albert@students.mq.edu.au      |
| Raffi Tchamkertenian | Backend and Test Specialist          | 46464565        | Raffi.Tchamkertenian@students.mq.edu.au |
| Arden Gourlay        | Frontend Design                      | 46447849        | Arden.Gourlay@students.mq.edu.au        |
| Anubhav Ashish       | Backend Development                  | 45317569        | Anubhav.Ashish@students.mq.edu.au       |


## Application
---
- Name: Rent N Buy
- URL: RnB.com.au or rentnbuy.com.au
- Slogan: “A platform to list, rent, buy and critique anything”
- Purpose: This application will be designed by Group Y  to provide:
    - A platform Rent/Buying application that allows for users to rent and sell items on the site
    - Allow users to give reviews of different services and items
    - Showcasing of associated photos and description of each product

## Target Audience/Users
---
- Potential buyers of a product looking to find what other people think
- Must be 12+ to create an account. The application will filter certain features/pages depending on the users age:
    - Examples will be that it will filter movies and games of a certain rating
    - Profanity filtering for users under the age of 18

## Use Cases:
---
The ‘Rent and Buy’ web application will provide users a platform to either rent and buy their own or others Electronics, Clothing, Shoes, Accessories, Toys, Motors, Sports, Business and Industrial Supplies, Home and Garden, health and beauty, and other categories. There are three types of users: Logged In user, Guest and Administrator. The website is in a view only state when a user is not logged in.

- **User(s) can:**
    - Create or log into an account.
    - Search for items using the search tools.
    - Buy, rent and review products. 
    - Create new categories.
    - Add items to their favourites list.
    - Add items to their cart.
    - Change their password.
    - Change their profanity settings.
    - Delete their own listing, reviews and comments.
    - Follow other Users.
    - Like or dislike comments or reviews.
    - Edit Account Information
- **Guest(s) can:**
    - Create or log into an account. This will comprise of the different categories of items, the listings for each of the items posted by other people. 
    - View the website without being logged in.
    - Search for items using the search tools, however it will be at a restricted view (Profanity Filters).
    - Buy and rent products, but cannot create or critique a listing.
- **Administrator(s) can:**
    - Delete other users (has to provide a mandatory rationale)
    - Delete a listing (has to provide a mandatory rationale)
    - Block other users (has to provide a mandatory rationale)


## Minimum Viable Product (MVP)
---
This section details the features that Group Y aims to include in its MVP that will be reviewed at the end of the assessment period, including the target features, complex features that might be omitted during development and out-of-scope features that will not be included due to time constraints.

### Target Features:
---
- **User Login / Login Page (Landing Page)**
    - When a user is not logged in, automatic profanity filters will be applied to restrict content.
    - Users can sign up, login and logout
    - Users can login and checkout as a guest, which will not require any credentials or personal information. 
    - Users must be 12+ to create an account.. Users under 18 will have content and profanity filtering
- **User Account**
    - **Small user Icon in the top right corner**
        - Clicking on this will display a drop down of options (Profile Page, Settings Page, etc)
    - **Profile Page / Account Info**
        - View and Edit Account Information
    - **Settings Page**
        - User can Change their Password
        - Turn profanity on and off (This setting is only available for users 18 or over - as those under are automatically enabled)
- **Categories Pages (Displays Different Categories as Big icons (with photos))**
    - User can click on a category to navigate to its page
    - Users can create a category
    - Users can only create categories that are appropriate
- **Sell, Rent and Delete Items (Posting/Adding/Removing)**
    - Each item will have a Unique Identifier (Randomly generated Unique string (Length of x))
    - Each Item will have a button to save it for a user.
    - Publish a review
    - Filtering reviews/comments for profanity
    - Filter reviews by amount of stars / most helpful
    - Rate reviews as helpful
    - Likes and Dislikes on comments
    - Delete items, comments, reviews
    - Reporting Items
- **Add Items to Cart (Shopping Cart)**
- **Follow a seller (Like adding a friend)**
    - Notification Button
- **Item Feed (If logged in, come here)**
    - Search Bar (By Word and category)
    - First shows people following/Interested in and then the rest.
- **Search and Search Filter**
- **Favorites List**
- **Admin User**
    - Their own page to administer the application
    - Admin will have the highest privilege

### Complex Features:
---
- Auth0 - For login, users can sign up through Google. Complexity in storing user information with this method.
- Google Single Sign on 
- Payment features
- Blocking a user 
- Filter by nearby items (use of location services)
    - ‘useCurrentLocation’: Can be used for search filtering by radius

### Out of Scope Features:
---
| Feature Id | Description                        | Rationale for exclusion                                                                                                                                                                                                  |
|------------|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OOS1       | End to end payment process using a payment gateway                                      | End to end payment gateway will allow for real payments being made. Given that this is a demo application, the team does not see value in implementing this feature. There will however be a mock payment functionality. |
| OOS2       | Terms of use, legal, privacy and posting policy                                         | Given no real users will be onboarded as part of this exercise, no legal work will be undertaken.                                                                                                                        |
| OOS3       | Use of paid tiered services for hosting and building the application and its components | This is a demo app and will not have real traffic. As such, the team will not be paying for any tiered services for building the application.                                                                            |
| OOS4       | Database performance tuning                                                             | This is a demo app with no real users. Database tuning is not required for a small sample of users.                                                                                                                      |
| OOS5       | Penetration Testing and vulnerability management                                        | The team will not be pen testing as part of the MVP. They will however adhere to good design practices to ensure security of the app.                                                                                    |
| OOS6       | User experience testing                                                                 | The team will not be conducting exercises to determine user experience as part of MVP.                                                                                                                                   |

### -- Milestone information contained in [MILESTONES.md](MILESTONES.md) --
