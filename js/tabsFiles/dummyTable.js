define([''], function(Bakbone) {
    return Backbone.View.extend({
        render: function() {
            this.$el.html('<table><tr><td>Dummy</td><td>Table</td></tr></table>');
            return this;
        }
    })
});