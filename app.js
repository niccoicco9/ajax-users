var $cards = $('#cards');
var $country = $('#country');
var $nav = $('#nav');
var $navLinks = $('#nav a');
var $australia = $('#australia');
var $brazil = $('#brazil');
var $canada = $('#canada');
var $france = $('#france');
var $us = $('#us')

// GRAB HTML TEMPLATE AND CREATE CARD
var $userTemplateHTML = $('#user_template').html();
var createCard = Handlebars.compile($userTemplateHTML);



// REQUEST DATA FROM RANDOMUSER.ME
function getData(nat) {
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=' + nat,
    dataType: 'json',
  })
  .done(createCards);
}

getData('au');

// CLICK EVENTS FOR NAVIGATION TABS
$nav.on('click', 'a', function() {
  $cards.empty();

  // REMOVE SELECTED CLASS FROM ALL LINKS
  $navLinks.removeClass('selected');
  // INSERT SELECTED CLASS FOR SELECTED LINK
  $(this).addClass('selected');

  // GET TEXT VALUE OF CLICK EVENT AND INSERT INTO PAGE TITLE
  var country = $(this).text();
  $country.text(country);

  // GET ID OF CLICK EVENT AND REQUEST DATA FOR THAT ID
  var id = $(this).attr('id');
  getData(id);
})



// TAKE REQUESTED DATA AND INSERT INTO CARD TEMPLATE
function createUserCard(user) {
  var userCard = createCard({
    user_image: user.picture.large,
    first_name: user.name.first,
    last_name: user.name.last,
    user_email: user.email,
    user_phone: user.cell,
    user_street: user.location.street,
    user_city: user.location.city,
    user_postcode: user.location.postcode,
    user_state: user.location.state
  })

  // TAKE USER TEMPLATE AND INSERT INTO HTML PAGE
  $cards.append(userCard);
}



// GET DATA FROM THE REQUEST AND INSERT INTO USER TEMPLATE
function createCards(data) {
  var userInfo = data.results;

  for (i = 0; i < userInfo.length; i++) {
    createUserCard(userInfo[i]);
  }
}