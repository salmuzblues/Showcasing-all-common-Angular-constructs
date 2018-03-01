
// A method
function MyDataServices() {
    return {
        getWorlds: function getWorlds() {
            return ["this world", "another world"];
        }
    };
}

// another method
function DemoController(worldsService) {
    var vm = this;
    vm.messages = worldsService.getWorlds().map(function (w) {
        return "Hello, " + w + "!";
    });
}

// method
function startup($rootScope, $window){

    $window.alert("Hello, user! Loading worlds...." );
    $rootScope.hasStarted = true;
}

// this is angular.module
/* angular.module(...) used with an array as the second argument creates a new module. This array is used
to supply a list of module dependencies. In this example we chain calls on the result of the module(...)
function;*/

angular.module("myDemoApp", [/*module dependencies go here*/ ])
 // .service(...) creates an Angular Service and returns the module for chaining;
 .service("worldsService", [MyDataServices])
 // .controller(...) creates an Angular Controller and returns the module for chaining;
 .controller("demoController", ["worldsService", DemoController])
    //.config(...) Use this method to register work which needs to be performed on module loading.
 .config(function () {
     console.log('configuring application');

 })
  /* .run(...) makes sure code is run at startup time and takes an array of items as a parameter. Use this
method to register work which should be performed when the injector is done loading all modules. */
    .run(["$rootScope", "$window", startup]);

    /*the first item is letting Angular know that the startup function requires the built-in $rootScope service
      to be injected as an argument;
      the second item is letting Angular know that the startup function requires the built-in $window service
      to be injected as an argument;
      the last item in the array, startup, is the actual function to run on startup; */