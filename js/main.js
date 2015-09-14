$(function() {
    function loadFile(id){
        if(!!id){
            require(['js/tabsFiles/'+id+'.js'],function (View) {
                var tab = document.getElementById('tab'), view;
                if(tab.hasChildNodes()) tab.removeChild(tab.childNodes[0]);
                view = new View({model:tabs});
                tab.appendChild(view.render().el);
            });
        }
    }

    var Tab = Backbone.Model.extend();
    var Tabs = Backbone.Collection.extend({
        model: Tab,
        url: 'jsonFiles/tabs.json'
    });
    var TabView = Backbone.View.extend({
        el: '#tabTemplate',
        template: _.template($('#tabsTemplate').html()),
        render: function(){
            _.each(this.model.models, function (tab) {
                var tabsTemplate = this.template(tab.toJSON());
                $(this.el).append(tabsTemplate);
            }, this);
            return this;
        }
    });
    var tabs =  new Tabs();
    var tabsView =  new TabView({model:tabs});
    var Router = Backbone.Router.extend({
        routes: {
            ":id": "tab"
        },
        tab: function(id){
            loadFile(id);
        }
    });
    new Router();
    Backbone.history.start();

    tabs.fetch({
        success: function () {
            if(!Backbone.history.fragment){
                //change url and load file
                Backbone.history.navigate(tabs.models[0].id);
                loadFile(tabs.models[0].id);
            }
            tabsView.render();
        }
    })
});