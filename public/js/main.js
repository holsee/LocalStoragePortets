var AppRouter = Backbone.Router.extend({

    routes: {
        "" : "home",
        "portlets" : "portlets"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },
    
    portlets : function () {
      if (!this.portletsView) {
          this.portletsView = new PortletsView();
      }
      $('#content').html(this.portletsView.el);
      this.headerView.selectMenuItem('portlets-menu');
    }
});

utils.loadTemplate(['HomeView', 'HeaderView', 'PortletsView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});