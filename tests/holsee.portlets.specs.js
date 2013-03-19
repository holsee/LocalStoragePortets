describe("jquery.holseePortlets", function() {
  var portlets;
  
  beforeEach(function() {
    portlets = $('<div>').holseePortlets();
  });
  
  afterEach(function(){
    portlets.holseePortlets('destroy');
  });
  
  describe('portlet should have', function(){
    var portlet, data;
    var options = {
      title: 'test portlet title'
    };
    beforeEach(function(){
      portlets.holseePortlets('add', options);
      data = $(portlets).data('holseePortlets');
      portlet = data.portlets[0];
      console.log(portlet)
    });
    
    describe('optional title bar', function(){
      it('that is optional', function(){
      });
      
      it('with title text', function(){
        expect($('.box-title', portlet).html()).toEqual(options.title)
      });
  
      it('with x icon for closing portlet', function(){
        expect($('a.portlet-close > i', portlet).hasClass('icon-remove')).toBe(true);
      });
  
      it('with gear icon for accessing settings', function(){
        expect($('a.portlet-settings > i', portlet).hasClass('icon-cog')).toBe(true);
      });
  
      it('with cursor set to indicate portlet can be moved', function(){
        expect($('h4:first', portlet).hasClass('box-header')).toBe(true); //.css('cursor')).toEqual('move');
      });    
    });
  
    it('content area', function(){
      
    });
  
    it('should have border between title bar and content area', function(){
    
    });
  
    it('border between title bar and content area', function(){
    
    });
  
    it('outside border with rounded corners', function(){
    
    });
  
    it('are render according to settings', function(){
    
    });
  
    it('have responsive layout', function(){
    
    });
  
    it('can be rearranged on page', function(){
    
    });
  
    it('can be closed using the X icon to remove them from the page', function(){
    
    });
    
    it('remember the presence, settings and position of each portlet next time it is accessed', function(){
    
    });
    
  });
  
  describe('add portlet button', function () {
    it('adds portlet to the page if there are currently less than 6 on the page', function(){

    });
  });
  
  describe('portlet settings that', function(){
  
    it('is modal', function(){
    
    });
  
    it('is middle of browser', function(){
    
    });
  
    it('dims the background while the dialog is displayed', function(){
    
    });
  
    it('allows setting the title, content, foreground color and background color of the portlet', function(){
    
    });
    
    it('has save and cancel buttons', function(){
    
    });
  });
});