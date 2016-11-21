(function() {

  var store = {
    au: null,
    br: null,
    ca: null,
    fr: null,
    us: null
  }


  var usersApp = {

    // START APP
    init: function() {
      // FIND HTML ELEMENTS
      this.$cards = $('#cards');
      this.$country = $('#country');
      this.$nav = $('#nav');
      this.$navLinks = $('#nav a');
      this.$australia = $('#australia');
      this.$brazil = $('#brazil');
      this.$canada = $('#canada');
      this.$france = $('#france');
      this.$us = $('#us')

      // GRAB HTML TEMPLATE AND CREATE CARD
      this.$userTemplateHTML = $('#user_template').html();
      this.createCard = Handlebars.compile(this.$userTemplateHTML);

      // POPULATE MAIN PAGE WITH USERS
      this.getData('au');

      // ACTIVATE NAVIGATION TABS
      this.switchNav();
    },



    // CLICK EVENTS FOR NAVIGATION TABS
    switchNav: function() {
      var that = this;

      // CLICK EVENTS FOR NAVIGATION TABS
      this.$nav.on('click', 'a', function() {

        // CLEAR SELECTED CLASS AND INSERT IT INTO CLICKED LINK
        that.$navLinks.removeClass('selected');
        $(this).addClass('selected');

        // GET TEXT VALUE OF CLICK EVENT AND INSERT INTO PAGE TITLE
        var country = $(this).text();
        that.$country.text(country);

        // GET ID OF CLICK EVENT
        var id = $(this).attr('id');

        // IF STORED DATA IS AVAILABLE, CREATE CARDS
        if (store[id]) {
          that.createCards(id);
        }
        // IF THERE IS NOT STORED DATA, REQUEST DATA
        else {
          that.getData(id);
        }
      })
    },



    // REQUEST DATA FROM RANDOMUSER.ME
    getData: function(nat) {
      // *** ADD LOADING SPINNER ***
      $.ajax({
        url: 'https://randomuser.me/api/?results=12&nat=' + nat,
        dataType: 'json',
      })
      .done(function(response) {
        // GET DATA AND STORE IN store{} OBJECT
        store[nat] = response.results;

        // USE DATA AND CREATE USER CARDS
        this.createCards(nat);
      }.bind(this));
    },
      // .done((this.createCards).bind(this));



    // GET DATA FROM THE REQUEST AND RUN createUserCard()
    createCards: function(nat) {
      this.$cards.empty();
      var userInfo = store[nat];

      for (i = 0; i < userInfo.length; i++) {
        this.createUserCard(userInfo[i]);
      }
    },



    // TAKE REQUESTED DATA AND INSERT INTO CARD TEMPLATE
    createUserCard: function(user) {
      var userCard = this.createCard({
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
      this.$cards.append(userCard);
    }
  }

  usersApp.init();

})()