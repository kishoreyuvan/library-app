"use strict";



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
define('library-app/controllers/list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    book: 'Book'
  });
});
define('library-app/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    progress: ''
  });
});
define('library-app/controllers/signup', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    progress: '',
    validequal: _ember['default'].computed('password', 'confirmpassword', function () {
      return this.get('password') === this.get('confirmpassword');
    }),
    validempty: _ember['default'].computed.notEmpty('password'),
    valids: _ember['default'].computed.and('validempty', 'validequal'),
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

  var name = undefined,
      version = undefined;
  if (_libraryAppConfigEnvironment['default'].APP) {
    name = _libraryAppConfigEnvironment['default'].APP.name;
    version = _libraryAppConfigEnvironment['default'].APP.version;
  }

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
define('library-app/initializers/data-adapter', ['exports'], function (exports) {
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
define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
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
define('library-app/initializers/injectStore', ['exports'], function (exports) {
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
define('library-app/initializers/store', ['exports'], function (exports) {
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
define('library-app/initializers/transforms', ['exports'], function (exports) {
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
define("library-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _emberDataInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInitializeStoreService["default"]
  };
});
define('library-app/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/compat/get-router-instance', 'torii/compat/get-router-lib', 'torii/router-dsl-ext'], function (exports, _toriiBootstrapRouting, _toriiConfiguration, _toriiCompatGetRouterInstance, _toriiCompatGetRouterLib, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = (0, _toriiCompatGetRouterInstance['default'])(applicationInstance);
      var setupRoutes = function setupRoutes() {
        var routerLib = (0, _toriiCompatGetRouterLib['default'])(router);
        var authenticatedRoutes = routerLib.authenticatedRoutes;
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
define('library-app/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
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
        beforeModel: function beforeModel() {
            return this.get('session').fetch()['catch'](function () {});
        },
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
          _this.get('controller').set('response', 'Thank you For your Feedback');
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
        controller.set('progress', 'Loading');
        this.get('session').open('firebase', {
          provider: 'password',
          email: email,
          password: password
        }).then((function () {
          this.get('controller').set('userEmail', '');
          this.get('controller').set('userPassword', '');
          controller.set('progress', '');
          this.transitionTo('account');
        }).bind(this))['catch'](function (error) {
          controller.set('error', error);
          controller.set('progress', '');
          controller.set('userEmail', '');
          controller.set('userPassword', '');
        });
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
        var _this = this;

        var post = this.store.peekRecord('user', this.get('session.uid'));
        var booking = this.store.createRecord('booking');
        this.get('controller').set('isloading', true);
        booking.set('name', _book.get('name'));
        booking.set('releasedyear', _book.get('releasedyear'));
        booking.set('author', _book.get('author'));
        var time = new Date();
        booking.set('time', time.toDateString());
        booking.set('idno', _book.get('id'));
        booking.save();
        post.get('books').pushObject(booking);
        post.save().then(function () {
          var x = _book.get('noofbooks') - 1;
          _book.set('noofbooks', x);
          _book.save().then(function () {
            _this.get('controller').set('isloading', false);
          });
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
        returns.set('offtime', time.toDateString());
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
        controller.set('progress', true);
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
            controller.set('progress', false);
            controller.set('success', true);
            _ember['default'].run.later(function () {
              _this.transitionTo('login');
            }, 500);
          });
        })['catch'](function (error) {
          controller.set('error', error);
          controller.set('progress', false);
          controller.set('email', '');
          controller.set('password', '');
          controller.set('confirmpassword', '');
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
  exports["default"] = Ember.HTMLBars.template({ "id": "xZItQu4u", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"h1\"],[9,\"class\",\"display1\"],[7],[0,\"About ACLM\"],[8],[0,\"\\n\"],[6,\"p\"],[7],[0,\"ACLM is Stands for Accet college of Library Management\"],[8],[0,\"\\n\"],[6,\"p\"],[7],[0,\"A library is a collection of sources of information and similar resources,\\n   made accessible to a defined community for reference or borrowing.[1]\\n    It provides physical or digital access to material, and may be a physical building or room,\\n    or a virtual space, or both.[2] A library's collection can include books, periodicals, newspapers,\\n     manuscripts, films, maps, prints, documents, microform, CDs, cassettes, videotapes, DVDs, Blu-ray Discs,\\n      e-books, audiobooks, databases, and other formats. Libraries range in size from a few shelves of books to several million items.\\n       In Latin and Greek, the idea of a bookcase is represented by Bibliotheca and Bibliothēkē (Greek: βιβλιοθήκη):\\n        derivatives of these mean library in many modern languages\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
define("library-app/templates/account", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gqOeyxbg", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n\"],[6,\"h1\"],[7],[0,\" Accetian Library Welcomes You ...\"],[8],[0,\"\\n  \"],[6,\"span\"],[9,\"style\",\"cursor:pointer; color:#ffd800;\"],[7],[4,\"link-to\",[\"secure\",[20,[\"session\",\"uid\"]]],[[\"tagName\"],[\"span\"]],{\"statements\":[[0,\" Click to View your Account \"]],\"parameters\":[]},null],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/account.hbs" } });
});
define("library-app/templates/admin/add", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "M6JqIreE", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"h2\"],[9,\"class\",\"text-center\"],[7],[0,\"Add Book in Library\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-horizontal\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"Name\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\"],[\"text\",[20,[\"model\",\"name\"]],\"form-control\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"Released Year\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\"],[\"number\",[20,[\"model\",\"releasedyear\"]],\"form-control\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"Author\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\"],[\"text\",[20,[\"model\",\"author\"]],\"form-control\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"No of Books\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\"],[\"number\",[20,[\"model\",\"noofbooks\"]],\"form-control\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-4 col-sm-6\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-primary btn-default\"],[3,\"action\",[[19,0,[]],\"saveLibrary\",[20,[\"model\"]]]],[7],[0,\"Add Book\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/add.hbs" } });
});
define("library-app/templates/admin/books", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Q7xOMD2d", "block": "{\"symbols\":[\"library\"],\"statements\":[[6,\"h2\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"List of Available Books\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"panel panel-primary\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-heading\"],[7],[0,\"\\n      \"],[6,\"h3\"],[9,\"class\",\"panel-title\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-body\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Released Year: \"],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Author: \"],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"No of Books:\"],[1,[19,1,[\"noofbooks\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-footer text-right\"],[7],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/books.hbs" } });
});
define("library-app/templates/admin/details", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "12JYQHkN", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Customer\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Released year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Booked Time\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Returned Time\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"buyer\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"ontime\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"offtime\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/details.hbs" } });
});
define("library-app/templates/admin/feeds", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UoLuVgAI", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Message\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"email\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"message\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/feeds.hbs" } });
});
define("library-app/templates/admin/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "n0Hdqa2u", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Department\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Email\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"department\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"year\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"email\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/users.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QJSR7o+0", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n\"],[6,\"h1\"],[9,\"class\",\"text-center\"],[9,\"style\",\"text-shadow:2px 2px 5px;color:#ffffff\"],[7],[0,\"Accetians Booklet\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[6,\"nav\"],[9,\"class\",\"navbar navbar-inverse\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n    \"],[2,\" Brand and toggle get grouped for better mobile display \"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"navbar-toggle collapsed\"],[9,\"data-toggle\",\"collapse\"],[9,\"data-target\",\"#bs-example-navbar-collapse-1\"],[9,\"aria-expanded\",\"false\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[0,\"Toggle navigation\"],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"class\",\"navbar-brand\"],[9,\"href\",\"#\"],[7],[0,\"ACLM\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[2,\" Collect the nav links, forms, and other content for toggling \"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"collapse navbar-collapse\"],[9,\"id\",\"bs-example-navbar-collapse-1\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n          \"],[4,\"link-to\",[\"account\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"#\"],[7],[0,\"Home\"],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",[\"about\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"#\"],[7],[0,\"About\"],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",[\"feedback\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"#\"],[7],[0,\"Feedback\"],[8]],\"parameters\":[]},null],[0,\"\\n       \"],[6,\"li\"],[9,\"class\",\"dropdown\"],[7],[0,\"\\n         \"],[6,\"a\"],[9,\"class\",\"dropdown-toggle\"],[9,\"data-toggle\",\"dropdown\"],[9,\"role\",\"button\"],[9,\"aria-haspopup\",\"true\"],[9,\"aria-expanded\",\"false\"],[7],[0,\"\\n           Admin\"],[6,\"span\"],[9,\"class\",\"caret\"],[7],[8],[0,\"\\n         \"],[8],[0,\"\\n         \"],[6,\"ul\"],[9,\"class\",\"dropdown-menu\"],[7],[0,\"\\n         \"],[4,\"link-to\",[\"admin.users\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Users\"],[8]],\"parameters\":[]},null],[0,\"\\n          \"],[4,\"link-to\",[\"admin.books\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Books\"],[8]],\"parameters\":[]},null],[0,\"\\n           \"],[4,\"link-to\",[\"admin.details\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Details\"],[8]],\"parameters\":[]},null],[0,\"\\n           \"],[4,\"link-to\",[\"admin.feeds\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Feedbacks\"],[8]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"admin.add\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Add Book\"],[8]],\"parameters\":[]},null],[0,\"\\n         \"],[8],[0,\"\\n       \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav navbar-right\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"\\n           \"],[6,\"button\"],[9,\"class\",\"btn btn-sm btn-danger\"],[3,\"action\",[[19,0,[]],\"logout\"]],[7],[0,\"Logout\"],[8],[0,\"\\n       \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[8],[2,\" /.container-fluid \"],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"style\",\"min-height:500px;\"],[7],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/feedback", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "AmcQXJQg", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"h2\"],[9,\"class\",\"text-center\"],[7],[0,\"We Will Touch With You\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"response\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"col-md-offset-2 col-md-8 alert alert-success text-center\"],[7],[1,[18,\"response\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"form\"],[9,\"class\",\"form-horizontal container\"],[3,\"action\",[[19,0,[]],\"save\",[20,[\"model\"]]],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-group row\"],[7],[0,\"\\n  \"],[6,\"label\"],[9,\"class\",\"col-md-2 control-label\"],[7],[0,\"Email\"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-md-8\"],[7],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"email\",[20,[\"model\",\"email\"]],\"form-control\",true]]],false],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-group row\"],[7],[0,\"\\n  \"],[6,\"label\"],[9,\"class\",\"col-md-2 control-label\"],[7],[0,\"Message\"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-md-8\"],[7],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"text\",[20,[\"model\",\"message\"]],\"form-control\",true]]],false],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-group row\"],[7],[0,\"\\n  \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"col-md-offset-5 col-md-2 btn btn-primary\"],[7],[0,\"Feed\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/feedback.hbs" } });
});
define("library-app/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "F4Vxv6xQ", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
define("library-app/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hkPfZwfa", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"spinner\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect1\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect2\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect3\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect4\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect5\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/loading.hbs" } });
});
define("library-app/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "U9NIeBce", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"progress\"]]],null,{\"statements\":[[12,\"loading\",[]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[20,[\"error\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"text-center text-danger\"],[7],[1,[18,\"error\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"form\"],[9,\"class\",\"form-horizontal outline\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputEmail3\"],[9,\"class\",\"col-sm-5 control-label\"],[7],[0,\"Email\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-3\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\"],[\"email\",\"form-control\",\"inputEmail3\",[20,[\"userEmail\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword3\"],[9,\"class\",\"col-sm-5 control-label\"],[7],[0,\"Password\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-3\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\"],[\"password\",\"form-control\",\"inputPassword3\",[20,[\"userPassword\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-5 col-sm-10\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-success\"],[3,\"action\",[[19,0,[]],\"login\"]],[7],[0,\"Log in\"],[8],[0,\"\\n      \"],[4,\"link-to\",[\"signup\"],null,{\"statements\":[[6,\"button\"],[9,\"class\",\"btn btn-primary\"],[7],[0,\"Sign Up\"],[8]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/login.hbs" } });
});
define("library-app/templates/secure", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yOVLo8zg", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[9,\"class\",\"display-1\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n   Hello \"],[6,\"b\"],[9,\"class\",\"text-primary\"],[7],[1,[20,[\"model\",\"name\"]],false],[0,\"!\"],[8],[6,\"br\"],[7],[8],[0,\"\\n   \"],[6,\"br\"],[7],[8],[0,\"\\n   \"],[6,\"div\"],[9,\"class\",\"h3\"],[7],[0,\"Department of \"],[6,\"b\"],[9,\"class\",\"text-warning\"],[7],[1,[20,[\"model\",\"department\"]],false],[8],[8],[0,\"\\n \"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"well well-lg\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-xs-6 col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"thumbnail\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"secure.reserved\"],null,{\"statements\":[[0,\"      \"],[6,\"img\"],[9,\"src\",\"/images/book.png\"],[9,\"style\",\"height:100px;width:auto;\"],[9,\"alt\",\"...\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"caption text-center\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"Reserved Books\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-xs-6 col-md-4\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"thumbnail\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"secure.returned\"],null,{\"statements\":[[0,\"      \"],[6,\"img\"],[9,\"src\",\"/images/return.png\"],[9,\"style\",\"height:100px;width:auto;\"],[9,\"alt\",\"...\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"caption text-center\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"Returned Books\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-xs-6 col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"thumbnail\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"secure.list\"],null,{\"statements\":[[0,\"      \"],[6,\"img\"],[9,\"src\",\"/images/list.png\"],[9,\"style\",\"height:100px;width:auto;\"],[9,\"alt\",\"...\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"caption text-center\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"Book Search\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure.hbs" } });
});
define("library-app/templates/secure/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wco6ZOAG", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/index.hbs" } });
});
define("library-app/templates/secure/list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "VSrUoY2W", "block": "{\"symbols\":[\"library\"],\"statements\":[[6,\"h2\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"List of Available Books\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"isloading\"]]],null,{\"statements\":[[6,\"h1\"],[9,\"class\",\"text-center text-info\"],[7],[0,\"Loading... Please Wait...\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"panel panel-primary\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-heading\"],[7],[0,\"\\n      \"],[6,\"h3\"],[9,\"class\",\"panel-title\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-body\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Released Year: \"],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Author: \"],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"No of Books:\"],[1,[19,1,[\"noofbooks\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-footer text-right\"],[7],[0,\"\\n       \"],[6,\"button\"],[9,\"class\",\"btn btn-sm btn-success\"],[10,\"disabled\",[19,1,[\"check\"]],null],[3,\"action\",[[19,0,[]],\"book\",[19,1,[]]]],[7],[0,\"Book\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/list.hbs" } });
});
define("library-app/templates/secure/reserved", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "dR/esi3c", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Released Year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Time\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Action\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"books\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"time\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[6,\"button\"],[9,\"class\",\"btn btn-sm btn-danger\"],[3,\"action\",[[19,0,[]],\"returns\",[19,1,[]]]],[7],[0,\"Return\"],[8],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/reserved.hbs" } });
});
define("library-app/templates/secure/returned", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2MDNV2gy", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Released Year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Booked Time\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Returned Time\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"returns\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"ontime\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"offtime\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/returned.hbs" } });
});
define("library-app/templates/signup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mzVdUMUv", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"progress\"]]],null,{\"statements\":[[12,\"loading\",[]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[20,[\"error\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"text-center text-danger\"],[9,\"style\",\"height: 100px;\"],[7],[1,[18,\"error\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[20,[\"success\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"text-center text-success\"],[9,\"style\",\"height: 100px;\"],[7],[0,\"Account Activated Successfully..\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[6,\"form\"],[9,\"class\",\"form-horizontal\"],[9,\"style\",\"color:#ffffff;\"],[3,\"action\",[[19,0,[]],\"signup\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputEmail3\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Name\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"string\",\"form-control\",\"inputEmail3\",[20,[\"name\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword3\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Department\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"string\",\"form-control\",\"inputPassword3\",[20,[\"department\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword4\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Year\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"number\",\"form-control\",\"inputPassword4\",[20,[\"year\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword5\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Email\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"email\",\"form-control\",\"inputPassword5\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword6\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Password\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"password\",\"form-control\",\"inputPassword6\",[20,[\"password\"]],true]]],false],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"text-warning\"],[7],[0,\"Strong Password must contain 8 letters\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword7\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Confirm Password\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"password\",\"form-control\",\"inputPassword7\",[20,[\"confirmpassword\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-2 col-sm-10\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-success\"],[3,\"action\",[[19,0,[]],\"signup\"]],[7],[0,\"Join\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/signup.hbs" } });
});
define('library-app/torii-adapters/application', ['exports', 'emberfire/torii-adapters/firebase'], function (exports, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({});
});
define('library-app/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});


define('library-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'library-app';
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

});

if (!runningTests) {
  require("library-app/app")["default"].create({"name":"library-app","version":"0.0.0+ed039729"});
}
//# sourceMappingURL=library-app.map
