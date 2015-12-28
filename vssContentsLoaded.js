var vssContentsLoadedApp = angular.module('vssContentsLoaded', []);

vssContentsLoadedApp.run(function($rootScope, contentsLoaded) {
    $rootScope.$on("$includeContentLoaded", function(event_, templateName){

        var fileName = templateName.split('/').pop();
        var file = fileName.split('.').shift();
        var event = file + '-loaded';
        $rootScope.$broadcast(event);
        contentsLoaded.addLoadedContent(event);
    });
});

/**
 * This service give the possibility to execute some callbacks when a resource will be ( or is already ) loaded
 * This one was created because if a resource is loaded between the config and the app.controller function, then
 * even if the resource is already loaded the event listener will not be executed ( because the event was already
 * broadcasted )
 */
vssContentsLoadedApp.service('contentsLoaded', function() {

    var loadedContents = {};
    var whenLoadedCallbacks = {};

    this.when = function(name, callback) {
        whenLoadedCallbacks[name] = callback;
        this.checkLoaded(name);
    };

    this.checkLoaded = function(name) {
        if (loadedContents[name] && whenLoadedCallbacks[name]) {
            this.executeCallback(name);
        }
    };

    this.executeCallback = function(name) {
        (whenLoadedCallbacks[name])();
    };

    this.isContentLoaded = function(name) {
        return !!loadedContents[name];
    };

    this.addLoadedContent = function (name) {
        loadedContents[name] = true;
        this.checkLoaded(name);
    };

});
