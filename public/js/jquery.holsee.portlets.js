(function ($) {

  var methods = {
     init : function( options ) {
       return this.each(function(){
      
         var settings = $.extend( {
           columns: 3,
           maxPortlets: 6,
           debug: false
         }, options);
      
         var $this = $(this);
         var data = $this.data('holseePortlets');
         
         // If the plugin hasn't been initialized yet
         if ( ! data ) {
           $(this).data('holseePortlets', {
                target : $this,
                columns: new Object(),
                settings: settings,
                portlets: []
           });
           var data = $(this).data('holseePortlets');
          
           //should be responsive
           $this.addClass('holsee-portlets row-fluid');
         
           //should allow new portlet to be added  
           $this.holseePortlets('buildPortletControls')
          
           
           $this.holseePortlets('buildColumns');
           
           //Populate Portlets
           if(localStorage.holseePortlets){
             $this.find('.box').remove();
             
             if(data.settings.debug) console.log('Exists: ', localStorage.holseePortlets)
             
             var portlets = JSON.parse(localStorage.holseePortlets).states;
             $(portlets).each(function(i,e){
               $this.holseePortlets('add',e);
             });
           }
           
           // Opted for more aggressive saving
           //$(window).unload(function(){
           //  $this.holseePortlets('save');
           //});
  
           //Bind to save event on modal settings dialog
           $this.bind('settingsChanges.holseePortlets', methods._settingsChanged);
           $('#save-modal').click(function(){
             $this.trigger('settingsChanges.holseePortlets');
           });
         }
       });
     },
     destroy : function( ) {
       return this.each(function(){

         var $this = $(this),
             data = $this.data('holseePortlets');

         // Namespacing FTW
         $(window).unbind('.holseePortlets');
         $this.removeData('holseePortlets');
         
         if(localStorage.holseePortlets)
           localStorage.clear();

       });
     },
     remove : function($portlet){
       return this.each(function(){
         var $this = $(this),
             data = $this.data('holseePortlets');
         for(var i in data.portlets){
           if(data.portlets[i].attr('id') === $portlet.attr('id')){
             data.portlets.splice(i,1);
             break;
           }
         }
         $portlet.remove();
         $('button.new-portlet-btn').removeAttr('disabled');
         $this.holseePortlets('save');
       });
     },
     add : function (portletOptions) { 
       return this.each(function(){       
         var $this = $(this),
             data = $this.data('holseePortlets');
          
         var portlet = $.extend({
           title: 'New Portlet',
           column: 0,
           content: 'New portlet body',
           template: '<h4 class="box-header round-top"><span class="box-title">$TITLE</span></h4>'+
                     '<div class="box-container-toggle"><div class="box-content">$CONTENT</div></div>',
           foreground: 'black',
           background: 'white'
         }, portletOptions);    
        
         if(data.portlets.length < data.settings.maxPortlets) {  
           $this.holseePortlets('renderPortlet', portlet);
           
           if(data.portlets.length === data.settings.maxPortlets) {
             $('button.new-portlet-btn').attr('disabled', 'disabled');
           }
           
           $(".column").trigger('sortupdate');
         }
       });
     },
     renderPortlet: function(portlet) {
       return this.each(function(){
         var $this = $(this),
             data = $this.data('holseePortlets');
             
         var $box = $('<div />')
           .addClass('box')
           .uniqueId()
           .append(portlet.template
               .replace('$TITLE', portlet.title)
               .replace('$CONTENT', portlet.content)
           );
         
         //add the buttons
         $box.find('h4.box-header')
           .append(
              $("<a/>")
                .addClass('box-btn portlet-close')
                .attr('title', 'close')
                .append($('<i/>').addClass('icon-remove'))
                .click(function(){
                  $this.holseePortlets('remove', $box);
                })
           ).append(
             $("<a/>")
               .addClass('box-btn portlet-settings')
               //.attr('href', '#portlet-settings')
               .attr('title', 'settings')
               .attr('data-toggle', 'modal')
               .append($('<i/>').addClass('icon-cog'))
               .click(function () {
                 if(data.settings.debug) console.log('settings:', $box);
                 $this.holseePortlets('showSettings', $box);
               })
           );
         
         //Set colours
         $box.find('.box-content')
             .css('color', portlet.foreground)
             .css('background-color', portlet.background);
         
         data.portlets.push($box);
         
         $box.appendTo('#col-'+ portlet.column);
       });
     },
     showSettings : function ($portlet) { 
       return this.each(function(){
         var $this = $(this),
             data = $this.data('holseePortlets');
          
         //Set values
         $('#inputTitle').val($portlet.find('h4.box-header').text());
         $('#inputContent').val($portlet.find('div.box-content').html());
         $('#inputBackground').val($portlet.find('div.box-content').css('background-color'));
         $('#inputForeground').val($portlet.find('div.box-content').css('color'));    

         data.$lastPortlet = $portlet;
         $("#portlet-settings").modal();
       });
     },
     _settingsChanged: function (){
       var $this = $(this),
           data = $this.data('holseePortlets');
          
       //Set content from settings dialog
       data.$lastPortlet.find('span.box-title').html($('#inputTitle').val());      
       data.$lastPortlet.find('div.box-content').html($('#inputContent').val());
       data.$lastPortlet.find('div.box-content').css('background-color', $('#inputBackground').val());     
       data.$lastPortlet.find('div.box-content').css('color', $('#inputForeground').val());
       
       $this.holseePortlets('save');
     },
     save : function() {
       return this.each(function(){
         var $this = $(this),
             data = $this.data('holseePortlets');

         var portletStates = new Array();
         $(data.portlets).each(function (i,e){
           portletStates.push({
             title   : e.find('span.box-title').html(),
             content : e.find('div.box-content').html(),
             column  : e.closest('.column').attr('id').replace('col-',''),
             foreground : e.find('div.box-content').css('color'),
             background : e.find('div.box-content').css('background-color')
           });
         });
        
         localStorage.holseePortlets = JSON.stringify({
           columns: data.columns,
           states: portletStates
         });
         
         if(data.settings.debug) console.log('SAVED:', localStorage.holseePortlets);
       });
     },
     buildColumns : function(){
       return this.each(function(){
         var $this = $(this),
             data = $this.data('holseePortlets');
         
         //should have columns for portlets to reside in.
         var $columns = $('<div />').addClass('row-fluid');
           
         //Create Columns  
         for (var i = 0; i < data.settings.columns; i++){
            $columns.append($('<div>')
               .attr('id', 'col-'+i)
               .addClass('column span'+ 12 / data.settings.columns));
         };
  
         $this.append($columns);
         
         $(".column").sortable({
           connectWith: '.column',
           iframeFix: false,
           items:'div.box',
           opacity:0.8,
           helper:'original',
           revert:true,
           forceHelperSize:true,
           placeholder: 'box-placeholder round-all',
           forcePlaceholderSize:true,
           tolerance:'pointer'
         });
           
         // Store portlet update (move) in cookie
         $(".column").bind('sortupdate', function() {
           $('.column').each(function() {
             var thisId = $(this).attr('id');
             var collection = $(this).sortable('toArray');
             
             if(data.settings.debug) console.log(thisId, collection);
             data.columns[thisId] = collection;

             $this.holseePortlets('save');
           });
         });
       });
     },
     buildPortletControls : function(){
       return this.each(function(){
         var $this = $(this),
             data = $this.data('holseePortlets');
         
         $('button.new-portlet-btn').parent().remove();
         
         $('<button/>')
           .addClass('btn new-portlet-btn')
           .append($('<i>').addClass('icon-plus'))
           .click(function(ev) {
             $this.holseePortlets('add');
           }).appendTo($('<div />')
           .addClass('row-fluid portlet-controls')
           .prependTo($this));
       });
     }
  };

  $.fn.holseePortlets = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.holseePortlets' );
    }    
  
  };

})(jQuery);