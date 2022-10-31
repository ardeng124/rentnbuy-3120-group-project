Menu bar:
- Contains links to home, categories, add listing, search, and a search bar
  - Add listing will auto navigate back to home if guest user
- Search bar displays 10 most relevant results to search and a button to view more -> navigates to search page
- Contains username and user icon - on hover:
  - Displays drop down menu containing settings, edit details, favourites, notifications, offers, log out button
    - on log out takes user to homepage 
  - on click - navigates to user profile page

Sign up:
- users can create account
- address autocomplete
  
Login:
- login with username and password
  
Homepage:
- When logged in:
  - Displays "Your feed" which includes any offers the user has made or any offers made on items the users own and their status
    - Will show max of 4 offers and 4 notifications
  - 9 of the newest listings created
- When viewing as guest
  - 9 of the newest listings created
- All items for both users and guests will display the associated image
  
Item page:
- When logged in:
  - Displays item details including item image 
    - when category is clicked it takes you to the categories page
  - Average rating star display (calculates)
  - Favourite/unfavourite button - adds to users favourites list
  - If item is available: Rent request form including start and end dates
  - Review window which includes comments and ratings by other users
  - Review creation text box and star selection - user can create a review and add a rating
    - Users can delete their own reviews
- When viewing as guest
  - Displays item details including item image 
    - when category is clicked it takes you to the categories page
  - Average rating star display (calculates) 
  - Item availability 
  - Review window which includes comments and ratings by other users

Search page:
- Allows user to search through all items
- Works by getting a list of all items and filtering to user input in search bar
- Displays each item with photo and basic details 
  - Unavailable items are greyed out but still clickable
- On click - navigate to relevant item page
- works for both guest and logged in users


Categories page:
- Displays a list of all categories
- on click - navigates to a search page that only shows items from the specified category
- works for both guest and logged in users

Add listing page:
- Allows logged in user to create a new listing
- Includes the ability to upload an image with a live preview
- All fields mandatory
- On submit navigates to the newly created items page

ModifyListingPage:
- allows the owner of an item to edit details about a listing
- Cannot change title or category
- can change availability, description, price, rent price, location
- allows item deletion

Settings page:
- Allows user to change password
- Old password must match current password
- New password must match retype
- Guests auto navigate to home

Edit details page:
- Allows user to change their profile photo, email address, or address
- Guests auto navigate to home

Favourites page:
- Displays list of items on users favourites list
- Users can remove items from favourites list on this page
- Clicking items takes user to relevant item page
- Guests auto navigate to home

Notifications page:
- Displays all offers made on items owned by user that have not been approved or denied
- approved or denied requests are hidden

Your offers page:
- displays all offers made by the current user and their status
