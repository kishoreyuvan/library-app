"use strict";



define('library-app/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
define('library-app/app', ['exports', 'library-app/resolver', 'ember-load-initializers', 'library-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  Ember.MODEL_FACTORY_INJECTIONS = true;

  App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('library-app/components/notification-container', ['exports', 'ember-cli-notifications/components/notification-container'], function (exports, _notificationContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notificationContainer.default;
    }
  });
});
define('library-app/components/notification-message', ['exports', 'ember-cli-notifications/components/notification-message', 'library-app/config/environment'], function (exports, _notificationMessage, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var config = _environment.default['ember-cli-notifications'] || {};

  exports.default = _notificationMessage.default.extend({
    icons: config.icons || 'svg',
    svgs: {
      'success': 'success',
      'warning': 'warning',
      'info': 'info',
      'error': 'error'
    }
  });
});
define('library-app/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiIframePlaceholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _toriiIframePlaceholder.default;
});
define('library-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('library-app/controllers/admin/details', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    Users: Ember.computed.oneWay('model'),
    actions: {
      filterUser: function filterUser() {
        var filtername = this.get('filtername');
        var users = this.get('model');
        users = users.content.filter(function (obj) {
          return obj._data.buyer.indexOf(filtername) !== -1;
        });
        this.set('Users.content', users);
      }
    }
  });
});
define('library-app/controllers/list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    book: 'Book'
  });
});
define('library-app/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    notifications: Ember.inject.service('notification-messages'),
    actions: {
      login: function login() {
        var _this = this;

        this.set('progress', 'Loading');
        this.get('session').open('firebase', {
          provider: 'password',
          email: this.get('email'),
          password: this.get('password')
        }).then(function () {
          _this.set('progress', '');
          _this.transitionToRoute('account');
        }).catch(function (error) {
          _this.get('notifications').error('' + error, {
            autoClear: true,
            clearDuration: 3000
          });
          _this.set('progress', false);
        });
      }
    }
  });
});
define('library-app/controllers/secure/list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    notifications: Ember.inject.service('notification-messages'),
    actions: {
      book: function book(_book) {
        var _this = this;

        var post = this.store.peekRecord('user', this.get('session.uid'));
        var booking = this.store.createRecord('booking');
        this.set('isloading', true);
        var time = new Date();
        booking.setProperties({
          name: _book.get('name'),
          releasedyear: _book.get('releasedyear'),
          author: _book.get('author'),
          time: time.toDateString(),
          idno: _book.get('id')
        });
        booking.save().then(function () {
          _this.get('notifications').success('Booked successfully!', {
            autoClear: true,
            clearDuration: 1200
          });
        }).catch(function (error) {
          _this.get('notifications').error('' + error.message, {
            autoClear: true,
            clearDuration: 1200
          });
        });
        post.get('books').pushObject(booking);
        post.save().then(function () {
          var x = _book.get('noofbooks') - 1;
          _book.set('noofbooks', x);
          _book.save().then(function () {
            _this.set('isloading', false);
          });
        });
      }
    }
  });
});
define('library-app/controllers/secure/reserved', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    notifications: Ember.inject.service('notification-messages'),
    actions: {
      returns: function returns(book) {
        var _this = this;

        var post = this.store.peekRecord('user', this.get('session.uid'));
        post.get('books').removeObject(book);
        var returns = this.store.createRecord('returned');
        var time = new Date();
        returns.setProperties({
          name: book.get('name'),
          releasedyear: book.get('releasedyear'),
          author: book.get('author'),
          ontime: book.get('time'),
          buyer: post.get('name'),
          offtime: time.toDateString()
        });
        returns.save();
        post.get('returns').pushObject(returns);
        post.save().then(function () {
          _this.get('notifications').success('Returned successfully!', {
            autoClear: true,
            clearDuration: 1200
          });
        }).catch(function (error) {
          _this.get('notifications').error('' + error.message, {
            autoClear: true,
            clearDuration: 1200
          });
        });

        var x = this.store.peekRecord('book', book.get('idno'));
        var y = x.get('noofbooks');
        x.set('noofbooks', y + 1);
        x.save();
      }
    }
  });
});
define('library-app/controllers/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    notifications: Ember.inject.service('notification-messages'),
    firebaseApp: Ember.inject.service(),
    progress: false,
    success: false,
    isPasswordsEqual: Ember.computed('password', 'confirmpassword', function () {
      if (this.get('password') === this.get('confirmpassword')) {
        return this.get('password').length !== 0;
      }
      return false;
    }),

    actions: {
      signup: function signup() {
        var _this = this;

        if (!this.get('isPasswordsEqual')) {
          this.get('notifications').warning('Passwords Should be Equal', {
            autoClear: true,
            clearDuration: 3000
          });
        } else {
          var ref = this.get('firebaseApp').auth();
          var Data = this.getProperties(['email', 'password', 'name', 'department', 'year']);
          this.set('progress', true);
          ref.createUserWithEmailAndPassword(Data.email, Data.password).then(function (userData) {
            var user = _this.get('store').createRecord('user', {
              id: userData.uid,
              name: Data.name,
              department: Data.department,
              year: Data.year,
              email: Data.email
            });
            user.save().then(function () {
              _this.setProperties({
                progress: false,
                success: true,
                name: '',
                department: '',
                year: '',
                email: '',
                password: '',
                confirmpassword: ''
              });
              _this.get('notifications').success('Account Created successfully!', {
                autoClear: true,
                clearDuration: 1200
              });
              _this.transitionToRoute('login');
            });
          }).catch(function (error) {
            _this.get('notifications').error('' + error, {
              autoClear: true,
              clearDuration: 3000
            });
            _this.set('progress', false);
          });
        }
      }
    }
  });
});
define('library-app/helpers/app-version', ['exports', 'library-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('library-app/helpers/inline-svg', ['exports', 'ember-inline-svg/helpers/inline-svg', 'library-app/svgs'], function (exports, _inlineSvg, _svgs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = void 0;
  if (Ember.Helper && Ember.Helper.helper) {
    helper = Ember.Helper.helper(function (_ref, options) {
      var _ref2 = _slicedToArray(_ref, 1),
          path = _ref2[0];

      return (0, _inlineSvg.inlineSvg)(_svgs.default, path, options);
    });
  } else {
    helper = Ember.Handlebars.makeBoundHelper(function (path, options) {
      return (0, _inlineSvg.inlineSvg)(_svgs.default, path, options.hash || {});
    });
  }

  exports.default = helper;
});
define('library-app/helpers/local-class', ['exports', 'ember-css-modules/helpers/local-class'], function (exports, _localClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _localClass.default;
    }
  });
  Object.defineProperty(exports, 'localClass', {
    enumerable: true,
    get: function () {
      return _localClass.localClass;
    }
  });
});
define('library-app/helpers/number', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.number = number;
  function number(params /*, hash*/) {
    return Number(params) + 1;
  }

  exports.default = Ember.Helper.helper(number);
});
define('library-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('library-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('library-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'library-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('library-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('library-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('library-app/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
define('library-app/initializers/export-application-global', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
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

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
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

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('library-app/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _redirectHandler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _redirectHandler.default.handle(window).catch(function () {
        application.advanceReadiness();
      });
    }
  };
});
define('library-app/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _session, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _configuration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _session.default)(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('library-app/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'library-app/config/environment'], function (exports, _torii, _configuration, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _configuration.configure)(_environment.default.torii || {});
      (0, _torii.default)(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports.default = initializer;
});
define('library-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/notifications', ['exports', 'ember-cli-notifications/services/notification-messages-service'], function (exports, _notificationMessagesService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        name: 'notification-messages-service',

        initialize: function initialize() {
            var application = arguments[1] || arguments[0];
            if (Ember.Service) {
                application.register('service:notification-messages', _notificationMessagesService.default);
                application.inject('component:notification-container', 'notifications', 'service:notification-messages');
                application.inject('component:notification-message', 'notifications', 'service:notification-messages');
                return;
            }
            application.register('notification-messages:service', _notificationMessagesService.default);

            ['controller', 'component', 'route', 'router', 'service'].forEach(function (injectionTarget) {
                application.inject(injectionTarget, 'notifications', 'notification-messages:service');
            });
        }
    };
});
define('library-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("library-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('library-app/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/compat/get-router-instance', 'torii/compat/get-router-lib', 'torii/router-dsl-ext'], function (exports, _routing, _configuration, _getRouterInstance, _getRouterLib) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _configuration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = (0, _getRouterInstance.default)(applicationInstance);
      var setupRoutes = function setupRoutes() {
        var routerLib = (0, _getRouterLib.default)(router);
        var authenticatedRoutes = routerLib.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _routing.default)(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('library-app/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _containerUtils, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _configuration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _containerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('library-app/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    releasedyear: _emberData.default.attr('number'),
    author: _emberData.default.attr('string'),
    noofbooks: _emberData.default.attr('number'),
    check: Ember.computed('noofbooks', function () {
      return this.get('noofbooks') === 0;
    })
  });
});
define('library-app/models/booking', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    releasedyear: _emberData.default.attr('number'),
    author: _emberData.default.attr('string'),
    time: _emberData.default.attr('string'),
    idno: _emberData.default.attr()
  });
});
define('library-app/models/feeds', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr('string'),
    message: _emberData.default.attr('string'),
    check1: Ember.computed.notEmpty('email'),
    check2: Ember.computed.notEmpty('message'),
    check3: Ember.computed.and('check1', 'check2'),
    check: Ember.computed.not('check3')
  });
});
define('library-app/models/returned', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    releasedyear: _emberData.default.attr('number'),
    author: _emberData.default.attr('string'),
    ontime: _emberData.default.attr('string'),
    offtime: _emberData.default.attr('string'),
    buyer: _emberData.default.attr('string')
  });
});
define('library-app/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    department: _emberData.default.attr('string'),
    year: _emberData.default.attr('number'),
    email: _emberData.default.attr('string'),
    password: _emberData.default.attr('string'),
    confirmpassword: _emberData.default.attr('string'),
    books: _emberData.default.hasMany('booking'),
    returns: _emberData.default.hasMany('returned')
  });
});
define('library-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('library-app/router', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
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

  exports.default = Router;
});
define('library-app/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('login');
      }
    }
  });
});
define('library-app/routes/account', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {

      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('library-app/routes/admin/add', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    notifications: Ember.inject.service('notification-messages'),
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

        var UserId = this.get('session.uid');
        var post = this.store.peekRecord('user', UserId);
        var mail = post.get('email');
        if (mail === 'eeekishoredon555@gmail.com') {
          newLibrary.save().then(function () {
            _this.transitionTo('admin.books');
            _this.get('notifications').success('Added successfully!', {
              autoClear: true,
              clearDuration: 1200
            });
          });
        } else {
          this.get('notifications').success('You Are Not An Admin! <br> Please Contact your Admin.', {
            autoClear: true,
            clearDuration: 1200,
            htmlContent: true
          });
        }
      },
      willTransition: function willTransition() {
        this.controller.get('model').rollbackAttributes();
      }
    }
  });
});
define('library-app/routes/admin/books', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
define('library-app/routes/admin/details', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
define('library-app/routes/admin/feeds', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
define('library-app/routes/admin/users', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
define('library-app/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      return this.get('session').fetch().catch(function () {});
    },

    actions: {
      logout: function logout() {
        var _this = this;

        this.get('session').close().then(function () {
          _this.transitionTo('application');
        });
      }
    }
  });
});
define('library-app/routes/feedback', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    notifications: Ember.inject.service('notification-messages'),
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('login');
      }
    },
    model: function model() {
      return this.store.createRecord('feeds');
    },

    actions: {
      save: function save(feed) {
        var _this = this;

        feed.save().then(function () {
          _this.get('notifications').info('Thanks For Your Feedback!', {
            autoClear: true,
            clearDuration: 1200
          });
          _this.controller.setProperties({
            'model.email': '',
            'model.message': ''
          });
        });
      }
    }
  });
});
define('library-app/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('login');
      } else {
        this.transitionTo('account');
      }
    }
  });
});
define('library-app/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      if (this.get('session.isAuthenticated')) {
        this.transitionTo('account');
      }
    },
    resetController: function resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          email: '', password: '', error: ''
        });
      }
    }
  });
});
define('library-app/routes/secure', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
define('library-app/routes/secure/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('library-app/routes/secure/list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('book');
    }
  });
});
define('library-app/routes/secure/reserved', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findRecord('user', this.get('session.uid'), {
        include: 'books'
      });
    }
  });
});
define('library-app/routes/secure/returned', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findRecord('user', this.get('session.uid'), {
        include: 'returns'
      });
    }
  });
});
define('library-app/routes/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    resetController: function resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          success: false
        });
      }
    }
  });
});
define('library-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('library-app/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
define('library-app/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
define('library-app/services/notification-messages-service', ['exports', 'ember-cli-notifications/services/notification-messages-service'], function (exports, _notificationMessagesService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notificationMessagesService.default;
    }
  });
});
define('library-app/services/popup', ['exports', 'torii/services/popup'], function (exports, _popup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popup.default;
    }
  });
});
define('library-app/services/torii-session', ['exports', 'torii/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _session.default;
    }
  });
});
define('library-app/services/torii', ['exports', 'torii/services/torii'], function (exports, _torii) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _torii.default;
    }
  });
});
define("library-app/svgs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "close": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 26 26\" width=\"1024\" height=\"1024\" fill=\"#FFF\"><path d=\"M21.734 19.64l-2.097 2.094a.983.983 0 0 1-1.395 0L13 16.496l-5.238 5.238a.988.988 0 0 1-1.399 0l-2.097-2.093a.988.988 0 0 1 0-1.399L9.504 13 4.266 7.762a.995.995 0 0 1 0-1.399l2.097-2.097a.988.988 0 0 1 1.399 0L13 9.508l5.242-5.242a.983.983 0 0 1 1.395 0l2.097 2.093a.996.996 0 0 1 .004 1.403L16.496 13l5.238 5.242a.988.988 0 0 1 0 1.399z\"/></svg>",
    "error": "<svg fill=\"#FFF\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"/></svg>",
    "info": "<svg fill=\"#FFF\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z\"/></svg>",
    "success": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 611.99 611.99\"><path d=\"M589.105 80.63c-30.513-31.125-79.965-31.125-110.478 0L202.422 362.344l-69.061-70.438c-30.513-31.125-79.965-31.125-110.478 0-30.513 31.125-30.513 81.572 0 112.678l124.29 126.776c30.513 31.125 79.965 31.125 110.478 0l331.453-338.033c30.515-31.125 30.515-81.572.001-112.697z\" fill=\"#FFF\"/></svg>",
    "warning": "<svg fill=\"#FFF\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/></svg>"
  };
});
define("library-app/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xZItQu4u", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"h1\"],[9,\"class\",\"display1\"],[7],[0,\"About ACLM\"],[8],[0,\"\\n\"],[6,\"p\"],[7],[0,\"ACLM is Stands for Accet college of Library Management\"],[8],[0,\"\\n\"],[6,\"p\"],[7],[0,\"A library is a collection of sources of information and similar resources,\\n   made accessible to a defined community for reference or borrowing.[1]\\n    It provides physical or digital access to material, and may be a physical building or room,\\n    or a virtual space, or both.[2] A library's collection can include books, periodicals, newspapers,\\n     manuscripts, films, maps, prints, documents, microform, CDs, cassettes, videotapes, DVDs, Blu-ray Discs,\\n      e-books, audiobooks, databases, and other formats. Libraries range in size from a few shelves of books to several million items.\\n       In Latin and Greek, the idea of a bookcase is represented by Bibliotheca and Bibliothēkē (Greek: βιβλιοθήκη):\\n        derivatives of these mean library in many modern languages\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
define("library-app/templates/account", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gqOeyxbg", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n\"],[6,\"h1\"],[7],[0,\" Accetian Library Welcomes You ...\"],[8],[0,\"\\n  \"],[6,\"span\"],[9,\"style\",\"cursor:pointer; color:#ffd800;\"],[7],[4,\"link-to\",[\"secure\",[20,[\"session\",\"uid\"]]],[[\"tagName\"],[\"span\"]],{\"statements\":[[0,\" Click to View your Account \"]],\"parameters\":[]},null],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/account.hbs" } });
});
define("library-app/templates/admin/add", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JlLJB3Ty", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"h2\"],[9,\"class\",\"text-center\"],[7],[0,\"Add Book in Library\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"form\"],[9,\"class\",\"form-horizontal\"],[3,\"action\",[[19,0,[]],\"saveLibrary\",[20,[\"model\"]]],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"Name\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"text\",[20,[\"model\",\"name\"]],\"form-control\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"Released Year\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"number\",[20,[\"model\",\"releasedyear\"]],\"form-control\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"Author\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"text\",[20,[\"model\",\"author\"]],\"form-control\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"col-sm-4 control-label\"],[7],[0,\"No of Books\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-6\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"number\",[20,[\"model\",\"noofbooks\"]],\"form-control\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-4 col-sm-6\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-primary btn-default\"],[7],[0,\"Add Book\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/add.hbs" } });
});
define("library-app/templates/admin/books", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q7xOMD2d", "block": "{\"symbols\":[\"library\"],\"statements\":[[6,\"h2\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"List of Available Books\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"panel panel-primary\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-heading\"],[7],[0,\"\\n      \"],[6,\"h3\"],[9,\"class\",\"panel-title\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-body\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Released Year: \"],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Author: \"],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"No of Books:\"],[1,[19,1,[\"noofbooks\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-footer text-right\"],[7],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/books.hbs" } });
});
define("library-app/templates/admin/details", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LjzCtxb3", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"row form-group\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"col-sm-offset-3 col-sm-6\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"input-group\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"text\",\"form-control\",[20,[\"filtername\"]],\"Search for User\"]]],false],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"input-group-btn\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"btn btn-default\"],[9,\"type\",\"button\"],[3,\"action\",[[19,0,[]],\"filterUser\"]],[7],[0,\"Go!\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[2,\" /input-group \"],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Customer\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Released year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Booked Time\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Returned Time\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"Users\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"buyer\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"ontime\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"offtime\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/details.hbs" } });
});
define("library-app/templates/admin/feeds", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UoLuVgAI", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Message\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"email\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"message\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/feeds.hbs" } });
});
define("library-app/templates/admin/users", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "n0Hdqa2u", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Department\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Email\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"department\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"year\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"email\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/users.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jSAtEb51", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n\"],[1,[25,\"notification-container\",null,[[\"position\",\"zindex\"],[\"top-right\",\"9999\"]]],false],[0,\"\\n\"],[6,\"h1\"],[9,\"class\",\"text-center\"],[9,\"style\",\"text-shadow:2px 2px 5px;color:#ffffff\"],[7],[0,\"Accetians Booklet\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[6,\"nav\"],[9,\"class\",\"navbar navbar-inverse\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n    \"],[2,\" Brand and toggle get grouped for better mobile display \"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"navbar-toggle collapsed\"],[9,\"data-toggle\",\"collapse\"],[9,\"data-target\",\"#bs-example-navbar-collapse-1\"],[9,\"aria-expanded\",\"false\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[0,\"Toggle navigation\"],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"class\",\"navbar-brand\"],[9,\"href\",\"#\"],[7],[0,\"ACLM\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[2,\" Collect the nav links, forms, and other content for toggling \"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"collapse navbar-collapse\"],[9,\"id\",\"bs-example-navbar-collapse-1\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n          \"],[4,\"link-to\",[\"account\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"#\"],[7],[0,\"Home\"],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",[\"about\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"#\"],[7],[0,\"About\"],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",[\"feedback\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"#\"],[7],[0,\"Feedback\"],[8]],\"parameters\":[]},null],[0,\"\\n       \"],[6,\"li\"],[9,\"class\",\"dropdown\"],[7],[0,\"\\n         \"],[6,\"a\"],[9,\"class\",\"dropdown-toggle\"],[9,\"data-toggle\",\"dropdown\"],[9,\"role\",\"button\"],[9,\"aria-haspopup\",\"true\"],[9,\"aria-expanded\",\"false\"],[7],[0,\"\\n           Admin\"],[6,\"span\"],[9,\"class\",\"caret\"],[7],[8],[0,\"\\n         \"],[8],[0,\"\\n         \"],[6,\"ul\"],[9,\"class\",\"dropdown-menu\"],[7],[0,\"\\n         \"],[4,\"link-to\",[\"admin.users\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Users\"],[8]],\"parameters\":[]},null],[0,\"\\n          \"],[4,\"link-to\",[\"admin.books\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Books\"],[8]],\"parameters\":[]},null],[0,\"\\n           \"],[4,\"link-to\",[\"admin.details\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Details\"],[8]],\"parameters\":[]},null],[0,\"\\n           \"],[4,\"link-to\",[\"admin.feeds\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Feedbacks\"],[8]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"admin.add\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Add Book\"],[8]],\"parameters\":[]},null],[0,\"\\n         \"],[8],[0,\"\\n       \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav navbar-right\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"\\n           \"],[6,\"button\"],[9,\"class\",\"btn btn-sm btn-danger\"],[3,\"action\",[[19,0,[]],\"logout\"]],[7],[0,\"Logout\"],[8],[0,\"\\n       \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[8],[2,\" /.container-fluid \"],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"style\",\"min-height:500px;\"],[7],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/feedback", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hdNmnMwo", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"h2\"],[9,\"class\",\"text-center\"],[7],[0,\"We Will Touch With You\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"form\"],[9,\"class\",\"form-horizontal container\"],[3,\"action\",[[19,0,[]],\"save\",[20,[\"model\"]]],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-group row\"],[7],[0,\"\\n  \"],[6,\"label\"],[9,\"class\",\"col-md-2 control-label\"],[7],[0,\"Email\"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-md-8\"],[7],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"email\",[20,[\"model\",\"email\"]],\"form-control\",true]]],false],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-group row\"],[7],[0,\"\\n  \"],[6,\"label\"],[9,\"class\",\"col-md-2 control-label\"],[7],[0,\"Message\"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-md-8\"],[7],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"required\"],[\"text\",[20,[\"model\",\"message\"]],\"form-control\",true]]],false],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"form-group row\"],[7],[0,\"\\n  \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"col-md-offset-5 col-md-2 btn btn-primary\"],[7],[0,\"Feed\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/feedback.hbs" } });
});
define("library-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "F4Vxv6xQ", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
define("library-app/templates/loading", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hkPfZwfa", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"spinner\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect1\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect2\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect3\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect4\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"rect5\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/loading.hbs" } });
});
define("library-app/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "g6vIxXR7", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"progress\"]]],null,{\"statements\":[[0,\" \"],[12,\"loading\",[]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[6,\"form\"],[9,\"class\",\"form-horizontal outline\"],[3,\"action\",[[19,0,[]],\"login\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputEmail3\"],[9,\"class\",\"col-sm-5 control-label\"],[7],[0,\"Email\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-3\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"email\",\"form-control\",\"inputEmail3\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword3\"],[9,\"class\",\"col-sm-5 control-label\"],[7],[0,\"Password\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-3\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"password\",\"form-control\",\"inputPassword3\",[20,[\"password\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-5 col-sm-10\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-success\"],[7],[0,\"Log in\"],[8],[0,\"\\n      \"],[4,\"link-to\",[\"signup\"],null,{\"statements\":[[6,\"button\"],[9,\"class\",\"btn btn-primary\"],[7],[0,\"Sign Up\"],[8]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/login.hbs" } });
});
define("library-app/templates/secure", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yOVLo8zg", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[9,\"class\",\"display-1\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n   Hello \"],[6,\"b\"],[9,\"class\",\"text-primary\"],[7],[1,[20,[\"model\",\"name\"]],false],[0,\"!\"],[8],[6,\"br\"],[7],[8],[0,\"\\n   \"],[6,\"br\"],[7],[8],[0,\"\\n   \"],[6,\"div\"],[9,\"class\",\"h3\"],[7],[0,\"Department of \"],[6,\"b\"],[9,\"class\",\"text-warning\"],[7],[1,[20,[\"model\",\"department\"]],false],[8],[8],[0,\"\\n \"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"well well-lg\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-xs-6 col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"thumbnail\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"secure.reserved\"],null,{\"statements\":[[0,\"      \"],[6,\"img\"],[9,\"src\",\"/images/book.png\"],[9,\"style\",\"height:100px;width:auto;\"],[9,\"alt\",\"...\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"caption text-center\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"Reserved Books\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-xs-6 col-md-4\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"thumbnail\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"secure.returned\"],null,{\"statements\":[[0,\"      \"],[6,\"img\"],[9,\"src\",\"/images/return.png\"],[9,\"style\",\"height:100px;width:auto;\"],[9,\"alt\",\"...\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"caption text-center\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"Returned Books\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"col-xs-6 col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"thumbnail\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"secure.list\"],null,{\"statements\":[[0,\"      \"],[6,\"img\"],[9,\"src\",\"/images/list.png\"],[9,\"style\",\"height:100px;width:auto;\"],[9,\"alt\",\"...\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"caption text-center\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"Book Search\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure.hbs" } });
});
define("library-app/templates/secure/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wco6ZOAG", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/index.hbs" } });
});
define("library-app/templates/secure/list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VSrUoY2W", "block": "{\"symbols\":[\"library\"],\"statements\":[[6,\"h2\"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"List of Available Books\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"isloading\"]]],null,{\"statements\":[[6,\"h1\"],[9,\"class\",\"text-center text-info\"],[7],[0,\"Loading... Please Wait...\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"panel panel-primary\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-heading\"],[7],[0,\"\\n      \"],[6,\"h3\"],[9,\"class\",\"panel-title\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-body\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Released Year: \"],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Author: \"],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"No of Books:\"],[1,[19,1,[\"noofbooks\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-footer text-right\"],[7],[0,\"\\n       \"],[6,\"button\"],[9,\"class\",\"btn btn-sm btn-success\"],[10,\"disabled\",[19,1,[\"check\"]],null],[3,\"action\",[[19,0,[]],\"book\",[19,1,[]]]],[7],[0,\"Book\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/list.hbs" } });
});
define("library-app/templates/secure/reserved", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dR/esi3c", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Released Year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Time\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Action\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"books\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"time\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[6,\"button\"],[9,\"class\",\"btn btn-sm btn-danger\"],[3,\"action\",[[19,0,[]],\"returns\",[19,1,[]]]],[7],[0,\"Return\"],[8],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/reserved.hbs" } });
});
define("library-app/templates/secure/returned", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2MDNV2gy", "block": "{\"symbols\":[\"item\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"table-responsive\"],[7],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"table table-bordered \"],[9,\"style\",\"color:#ffffff\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"S.no\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Released Year\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Booked Time\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Returned Time\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"returns\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[1,[25,\"number\",[[19,2,[]]],null],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"releasedyear\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"author\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"ontime\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"offtime\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/secure/returned.hbs" } });
});
define("library-app/templates/signup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yjxODbJi", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"progress\"]]],null,{\"statements\":[[0,\" \"],[12,\"loading\",[]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[6,\"form\"],[9,\"class\",\"form-horizontal\"],[9,\"style\",\"color:#ffffff;\"],[3,\"action\",[[19,0,[]],\"signup\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputEmail3\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Name\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"string\",\"form-control\",\"inputEmail3\",[20,[\"name\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword3\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Department\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"string\",\"form-control\",\"inputPassword3\",[20,[\"department\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword4\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Year\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"number\",\"form-control\",\"inputPassword4\",[20,[\"year\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword5\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Email\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"email\",\"form-control\",\"inputPassword5\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword6\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Password\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"password\",\"form-control\",\"inputPassword6\",[20,[\"password\"]],true]]],false],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"text-warning\"],[7],[0,\"Strong Password must contain 6 letters\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"for\",\"inputPassword7\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Confirm Password\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-9\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"value\",\"required\"],[\"password\",\"form-control\",\"inputPassword7\",[20,[\"confirmpassword\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-2 col-sm-10\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-success\"],[7],[0,\"Sign Up\"],[8],[0,\"\\n      \"],[4,\"link-to\",[\"login\"],null,{\"statements\":[[6,\"button\"],[9,\"class\",\"btn btn-primary\"],[7],[0,\"Go to Login\"],[8]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/signup.hbs" } });
});
define('library-app/torii-adapters/application', ['exports', 'emberfire/torii-adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
define('library-app/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});


define('library-app/config/environment', [], function() {
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
  require("library-app/app")["default"].create({"name":"library-app","version":"0.0.0+16d98612"});
}
//# sourceMappingURL=library-app.map
