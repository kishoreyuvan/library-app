"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('library-app/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _emberfireAdaptersFirebase) {
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({});
});
define('library-app/app', ['exports', 'ember', 'library-app/resolver', 'ember-load-initializers', 'library-app/config/environment'], function (exports, _ember, _libraryAppResolver, _emberLoadInitializers, _libraryAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _libraryAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _libraryAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _libraryAppResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _libraryAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('library-app/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiComponentsToriiIframePlaceholder) {
  exports['default'] = _toriiComponentsToriiIframePlaceholder['default'];
});
define('library-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('library-app/controllers/signup', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    validequal: _ember['default'].computed('password', 'confirmpassword', function () {
      return this.get('password') === this.get('confirmpassword');
    }),
    validempty: _ember['default'].computed.notEmpty('password'),
    validlength: _ember['default'].computed.gte('password', 8),
    valids: _ember['default'].computed.and('validempty', 'validequal', 'validlength'),
    valid: _ember['default'].computed.not('valids')
  });
});
define('library-app/helpers/app-version', ['exports', 'ember', 'library-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _libraryAppConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _libraryAppConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('library-app/helpers/number', ['exports', 'ember'], function (exports, _ember) {
  exports.number = number;

  function number(params /*, hash*/) {
    return Number(params) + 1;
  }

  exports['default'] = _ember['default'].Helper.helper(number);
});
define('library-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('library-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('library-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'library-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _libraryAppConfigEnvironment) {
  var _config$APP = _libraryAppConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('library-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('library-app/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('library-app/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('library-app/initializers/export-application-global', ['exports', 'ember', 'library-app/config/environment'], function (exports, _ember, _libraryAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_libraryAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _libraryAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_libraryAppConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('library-app/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('library-app/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _toriiBootstrapSession, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _toriiBootstrapSession['default'])(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('library-app/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'library-app/config/environment'], function (exports, _toriiBootstrapTorii, _toriiConfiguration, _libraryAppConfigEnvironment) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiConfiguration.configure)(_libraryAppConfigEnvironment['default'].torii || {});
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports['default'] = initializer;
});
define('library-app/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("library-app/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('library-app/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/router-dsl-ext'], function (exports, _toriiBootstrapRouting, _toriiConfiguration, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = applicationInstance.get('router');
      var setupRoutes = function setupRoutes() {
        var authenticatedRoutes = router.router.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('library-app/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _toriiLibContainerUtils, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('library-app/models/book', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    releasedyear: _emberData['default'].attr('number'),
    author: _emberData['default'].attr('string'),
    noofbooks: _emberData['default'].attr('number'),
    check: _ember['default'].computed('noofbooks', function () {
      return this.get('noofbooks') === 0;
    })
  });
});
define('library-app/models/booking', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    releasedyear: _emberData['default'].attr('number'),
    author: _emberData['default'].attr('string'),
    time: _emberData['default'].attr('string'),
    idno: _emberData['default'].attr()
  });
});
define('library-app/models/feeds', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    message: _emberData['default'].attr('string'),
    check1: _ember['default'].computed.notEmpty('email'),
    check2: _ember['default'].computed.notEmpty('message'),
    check3: _ember['default'].computed.and('check1', 'check2'),
    check: _ember['default'].computed.not('check3')
  });
});
define('library-app/models/returned', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    releasedyear: _emberData['default'].attr('number'),
    author: _emberData['default'].attr('string'),
    ontime: _emberData['default'].attr('string'),
    offtime: _emberData['default'].attr('string'),
    buyer: _emberData['default'].attr('string')
  });
});
define('library-app/models/user', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    department: _emberData['default'].attr('string'),
    year: _emberData['default'].attr('number'),
    email: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    confirmpassword: _emberData['default'].attr('string'),
    books: _emberData['default'].hasMany('booking'),
    returns: _emberData['default'].hasMany('returned')
  });
});
define('library-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('library-app/router', ['exports', 'ember', 'library-app/config/environment'], function (exports, _ember, _libraryAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _libraryAppConfigEnvironment['default'].locationType,
    rootURL: _libraryAppConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('feedback');
    this.route('login');
    this.route('signup');
    this.route('account');
    this.route('secure', { path: '/:user_id' }, function () {
      this.route('list');
      this.route('reserved');
      this.route('returned');
    });
    this.route('admin', function () {
      this.route('users');
      this.route('books');
      this.route('details');
      this.route('feeds');
      this.route('add');
    });
    this.route('about');
  });

  exports['default'] = Router;
});
define('library-app/routes/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('library-app/routes/account', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('library-app/routes/admin/add', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    },
    model: function model() {
      return this.store.createRecord('book');
    },

    actions: {

      saveLibrary: function saveLibrary(newLibrary) {
        var _this = this;

        var post = this.store.peekRecord('user', this.get('session.uid'));
        var mail = post.get('email');
        if (mail === 'eeekishoredon555@gmail.com') {
          newLibrary.save().then(function () {
            return _this.transitionTo('admin.books');
          });
        } else {
          alert('You Are Not An Admin');
        }
      },

      willTransition: function willTransition() {
        this.controller.get('model').rollbackAttributes();
      }
    }
  });
});
define('library-app/routes/admin/books', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    },
    model: function model() {
      return this.store.findAll('book');
    }
  });
});
define('library-app/routes/admin/details', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    },
    model: function model() {
      return this.store.findAll('returned');
    }
  });
});
define('library-app/routes/admin/feeds', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    },
    model: function model() {
      return this.store.findAll('feeds');
    }
  });
});
define('library-app/routes/admin/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    },
    model: function model() {
      return this.store.findAll('user');
    }
  });
});
define('library-app/routes/application', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        actions: {
            logout: function logout() {
                this.get('session').close().then((function () {
                    this.transitionTo('application');
                }).bind(this));
            }
        }
    });
});
define('library-app/routes/feedback', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('feeds');
    },
    actions: {
      save: function save(feed) {
        var _this = this;

        feed.save().then(function () {
          _this.get('controller').set('response', 'Thank you Visit Again');
        });
      },
      willTransition: function willTransition() {
        this.controller.get('model').rollbackAttributes();
      }
    }
  });
});
define('library-app/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('login');
    }
  });
});
define('library-app/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      login: function login() {
        var controller = this.get('controller');
        var email = controller.get('userEmail');
        var password = controller.get('userPassword');
        this.get('session').open('firebase', {
          provider: 'password',
          email: email,
          password: password
        }).then((function () {
          this.get('controller').set('userEmail', '');
          this.get('controller').set('userPassword', '');
          this.transitionTo('account');
        }).bind(this));
      }
    }
  });
});
define('library-app/routes/secure', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    },
    model: function model(params) {
      return this.store.findRecord('user', params.user_id);
    }
  });
});
define('library-app/routes/secure/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('library-app/routes/secure/list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('book');
    },
    actions: {
      book: function book(_book) {
        var post = this.store.peekRecord('user', this.get('session.uid'));
        var booking = this.store.createRecord('booking');
        booking.set('name', _book.get('name'));
        booking.set('releasedyear', _book.get('releasedyear'));
        booking.set('author', _book.get('author'));
        var time = new Date();
        booking.set('time', time);
        booking.set('idno', _book.get('id'));
        booking.save();
        post.get('books').pushObject(booking);
        post.save().then(function () {
          var x = _book.get('noofbooks') - 1;
          _book.set('noofbooks', x);
          _book.save();
        });
      }
    }
  });
});
define('library-app/routes/secure/reserved', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findRecord('user', this.get('session.uid'), { include: 'books' });
    },
    actions: {
      returns: function returns(book) {
        var post = this.store.peekRecord('user', this.get('session.uid'));
        post.get('books').removeObject(book);
        var returns = this.store.createRecord('returned');
        returns.set('name', book.get('name'));
        returns.set('releasedyear', book.get('releasedyear'));
        returns.set('author', book.get('author'));
        returns.set('ontime', book.get('time'));
        returns.set('buyer', post.get('name'));
        var time = new Date();
        returns.set('offtime', time);
        returns.save();
        post.get('returns').pushObject(returns);
        post.save();
        var x = this.store.peekRecord('book', book.get('idno'));
        var y = x.get('noofbooks');
        x.set('noofbooks', y + 1);
        x.save();
      }
    }
  });
});
define('library-app/routes/secure/returned', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findRecord('user', this.get('session.uid'), { include: 'returns' });
    }
  });
});
define('library-app/routes/signup', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    firebaseApp: _ember['default'].inject.service(),

    actions: {
      signup: function signup() {
        var _this = this;

        var controller = this.get('controller');
        var name = controller.name;
        var department = controller.department;
        var year = controller.year;
        var email = controller.email;
        var password = controller.password;
        var ref = this.get('firebaseApp').auth();

        ref.createUserWithEmailAndPassword(email, password).then(function (userData) {
          var user = _this.get('store').createRecord('user', {
            id: userData.uid,
            name: name,
            department: department,
            year: year,
            email: email
          });
          user.save().then(function () {
            _this.get('controller').set('name', '');
            _this.get('controller').set('department', '');
            _this.get('controller').set('year', '');
            _this.get('controller').set('email', '');
            _this.get('controller').set('password', '');
            _this.get('controller').set('confirmpassword', '');
            _this.transitionTo('login');
          });
        });
      }

    }
  });
});
define('library-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('library-app/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _emberfireServicesFirebaseApp) {
  exports['default'] = _emberfireServicesFirebaseApp['default'];
});
define('library-app/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _emberfireServicesFirebase) {
  exports['default'] = _emberfireServicesFirebase['default'];
});
define('library-app/services/popup', ['exports', 'torii/services/popup'], function (exports, _toriiServicesPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesPopup['default'];
    }
  });
});
define('library-app/services/torii-session', ['exports', 'torii/services/session'], function (exports, _toriiServicesSession) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesSession['default'];
    }
  });
});
define('library-app/services/torii', ['exports', 'torii/services/torii'], function (exports, _toriiServicesTorii) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesTorii['default'];
    }
  });
});
define("library-app/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "izl5tFqW", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"display1\"],[\"flush-element\"],[\"text\",\"About ACLM\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"ACLM is Stands for Accet college of Library Management\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"A library is a collection of sources of information and similar resources,\\n   made accessible to a defined community for reference or borrowing.[1]\\n    It provides physical or digital access to material, and may be a physical building or room,\\n    or a virtual space, or both.[2] A library's collection can include books, periodicals, newspapers,\\n     manuscripts, films, maps, prints, documents, microform, CDs, cassettes, videotapes, DVDs, Blu-ray Discs,\\n      e-books, audiobooks, databases, and other formats. Libraries range in size from a few shelves of books to several million items.\\n       In Latin and Greek, the idea of a bookcase is represented by Bibliotheca and Bibliothēkē (Greek: βιβλιοθήκη):\\n        derivatives of these mean library in many modern languages\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
define("library-app/templates/account", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Lrb1CLHm", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\" Accetian Library Welcomes You ...\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"secure\",[\"get\",[\"session\",\"uid\"]]],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Click to View your Account \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/account.hbs" } });
});
define("library-app/templates/admin/add", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hHDRWKGg", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"text-center\"],[\"flush-element\"],[\"text\",\"Add Book in Library\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-horizontal\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[\"get\",[\"model\",\"name\"]],\"form-control\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Released Year\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"number\",[\"get\",[\"model\",\"releasedyear\"]],\"form-control\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Author\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[\"get\",[\"model\",\"author\"]],\"form-control\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"No of Books\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"number\",[\"get\",[\"model\",\"noofbooks\"]],\"form-control\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-offset-2 col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveLibrary\",[\"get\",[\"model\"]]]],[\"flush-element\"],[\"text\",\"Add Book\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/admin/add.hbs" } });
});
define("library-app/templates/admin/books", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hXjZe9Qx", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"List of Available Books\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"panel-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"library\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Released Year: \"],[\"append\",[\"unknown\",[\"library\",\"releasedyear\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Author: \"],[\"append\",[\"unknown\",[\"library\",\"author\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"No of Books:\"],[\"append\",[\"unknown\",[\"library\",\"noofbooks\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-footer text-right\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"library\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/admin/books.hbs" } });
});
define("library-app/templates/admin/details", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QCGV8wvA", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-bordered \"],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"S.no\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Customer\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Released year\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Author\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Booked Time\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Returned Time\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"number\"],[[\"get\",[\"index\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"buyer\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"releasedyear\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"author\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"ontime\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"offtime\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/admin/details.hbs" } });
});
define("library-app/templates/admin/feeds", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OQ8P9+2x", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-bordered \"],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"S.no\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Message\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"number\"],[[\"get\",[\"index\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"message\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/admin/feeds.hbs" } });
});
define("library-app/templates/admin/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3T+OPJan", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-bordered \"],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"S.no\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Department\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Year\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"number\"],[[\"get\",[\"index\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"department\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"year\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/admin/users.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lQZ5Gmh3", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"static-attr\",\"style\",\"font-size:20px;font-family:cursive;background-image: url('/hmk1.jpg');\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"text-center\"],[\"static-attr\",\"style\",\"text-shadow:2px 2px 5px;color:#ffffff\"],[\"flush-element\"],[\"text\",\"Accetians Booklet\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,8],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"min-height:500px;\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Add Book\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Feedbacks\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Details\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Books\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Feedback\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"About\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Home\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-inverse\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"comment\",\" Brand and toggle get grouped for better mobile display \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#bs-example-navbar-collapse-1\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"navbar-brand\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"ACLM\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"comment\",\" Collect the nav links, forms, and other content for toggling \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"bs-example-navbar-collapse-1\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"block\",[\"link-to\"],[\"account\"],[[\"tagName\"],[\"li\"]],7],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"about\"],[[\"tagName\"],[\"li\"]],6],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"feedback\"],[[\"tagName\"],[\"li\"]],5],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n       \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"\\n           Admin\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"caret\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"block\",[\"link-to\"],[\"admin.users\"],[[\"tagName\"],[\"li\"]],4],[\"text\",\"\\n          \"],[\"block\",[\"link-to\"],[\"admin.books\"],[[\"tagName\"],[\"li\"]],3],[\"text\",\"\\n           \"],[\"block\",[\"link-to\"],[\"admin.details\"],[[\"tagName\"],[\"li\"]],2],[\"text\",\"\\n           \"],[\"block\",[\"link-to\"],[\"admin.feeds\"],[[\"tagName\"],[\"li\"]],1],[\"text\",\"\\n            \"],[\"block\",[\"link-to\"],[\"admin.add\"],[[\"tagName\"],[\"li\"]],0],[\"text\",\"\\n         \"],[\"close-element\"],[\"text\",\"\\n       \"],[\"close-element\"],[\"text\",\"\\n     \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n           \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"logout\"]],[\"flush-element\"],[\"text\",\"Logout\"],[\"close-element\"],[\"text\",\"\\n       \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"comment\",\" /.navbar-collapse \"],[\"text\",\"\\n  \"],[\"close-element\"],[\"comment\",\" /.container-fluid \"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/feedback", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "sSD2P3Mk", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"text-center\"],[\"flush-element\"],[\"text\",\"We Will Touch With You\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-horizontal container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-2 control-label\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-10\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[\"get\",[\"model\",\"email\"]],\"form-control\"]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-2 control-label\"],[\"flush-element\"],[\"text\",\"Message\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-10\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[\"get\",[\"model\",\"message\"]],\"form-control\"]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn btn-primary btn-block\"],[\"dynamic-attr\",\"disabled\",[\"unknown\",[\"model\",\"check\"]],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"save\",[\"get\",[\"model\"]]]],[\"flush-element\"],[\"text\",\"Feed\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"response\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-success\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"response\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/feedback.hbs" } });
});
define("library-app/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "i5sr8ulL", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
define("library-app/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "w8uLgvyq", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-horizontal outline\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputEmail3\"],[\"static-attr\",\"class\",\"col-sm-5 control-label\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"email\",\"form-control\",\"inputEmail3\",[\"get\",[\"userEmail\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputPassword3\"],[\"static-attr\",\"class\",\"col-sm-5 control-label\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"password\",\"form-control\",\"inputPassword3\",[\"get\",[\"userPassword\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-offset-5 col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-success\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"login\"]],[\"flush-element\"],[\"text\",\"Log in\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"block\",[\"link-to\"],[\"signup\"],null,0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/login.hbs" } });
});
define("library-app/templates/secure", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hMGW4NM2", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"display-1\"],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n   Hello \"],[\"append\",[\"unknown\",[\"model\",\"name\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"h3\"],[\"flush-element\"],[\"text\",\"Department of \"],[\"append\",[\"unknown\",[\"model\",\"department\"]],false],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"well\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-pills\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"secure.reserved\"],[[\"tagName\"],[\"li\"]],2],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"secure.returned\"],[[\"tagName\"],[\"li\"]],1],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"secure.list\"],[[\"tagName\"],[\"li\"]],0],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Book Search\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Returned Books\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Reserved Books\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/secure.hbs" } });
});
define("library-app/templates/secure/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "O4rrH/xy", "block": "{\"statements\":[[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/secure/index.hbs" } });
});
define("library-app/templates/secure/list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UeR+mP0r", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"List of Available Books\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"panel-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"library\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Released Year: \"],[\"append\",[\"unknown\",[\"library\",\"releasedyear\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Author: \"],[\"append\",[\"unknown\",[\"library\",\"author\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"No of Books:\"],[\"append\",[\"unknown\",[\"library\",\"noofbooks\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-footer text-right\"],[\"flush-element\"],[\"text\",\"\\n       \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-success\"],[\"dynamic-attr\",\"disabled\",[\"unknown\",[\"library\",\"check\"]],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"book\",[\"get\",[\"library\"]]]],[\"flush-element\"],[\"text\",\"Book\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"library\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/secure/list.hbs" } });
});
define("library-app/templates/secure/reserved", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "TOXMbNCM", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-bordered \"],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"S.no\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Released Year\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Author\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Time\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Action\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"books\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"number\"],[[\"get\",[\"index\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"releasedyear\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"author\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"time\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"returns\",[\"get\",[\"item\"]]]],[\"flush-element\"],[\"text\",\"Return\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/secure/reserved.hbs" } });
});
define("library-app/templates/secure/returned", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "VC2mZLHz", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-bordered \"],[\"static-attr\",\"style\",\"color:#ffffff\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"S.no\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Released Year\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Author\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Booked Time\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Returned Time\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"returns\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"number\"],[[\"get\",[\"index\"]]],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"releasedyear\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"author\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"ontime\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"offtime\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/secure/returned.hbs" } });
});
define("library-app/templates/signup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "z/ew/sj/", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-horizontal\"],[\"static-attr\",\"style\",\"color:#ffffff;\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputEmail3\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"string\",\"form-control\",\"inputEmail3\",[\"get\",[\"name\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputPassword3\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Department\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"string\",\"form-control\",\"inputPassword3\",[\"get\",[\"department\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputPassword4\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Year\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"number\",\"form-control\",\"inputPassword4\",[\"get\",[\"year\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputPassword5\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"email\",\"form-control\",\"inputPassword5\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputPassword6\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"password\",\"form-control\",\"inputPassword6\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"text-muted\"],[\"flush-element\"],[\"text\",\"Password must contain 8 letters\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"inputPassword7\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Confirm Password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\"],[\"password\",\"form-control\",\"inputPassword7\",[\"get\",[\"confirmpassword\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-offset-2 col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-success\"],[\"dynamic-attr\",\"disabled\",[\"unknown\",[\"valid\"]],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signup\"]],[\"flush-element\"],[\"text\",\"Join\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "library-app/templates/signup.hbs" } });
});
define('library-app/torii-adapters/application', ['exports', 'ember', 'emberfire/torii-adapters/firebase'], function (exports, _ember, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({
    firebase: _ember['default'].inject.service()
  });
});
define('library-app/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('library-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'library-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("library-app/app")["default"].create({"name":"library-app","version":"0.0.0+"});
}

/* jshint ignore:end */
//# sourceMappingURL=library-app.map
