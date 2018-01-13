'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rss = require('rss');

var _rss2 = _interopRequireDefault(_rss);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _internals = require('./internals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicPath = './public';

// A default function to transform query data into feed entries.
var serialize = function serialize(_ref) {
  var _ref$query = _ref.query,
      site = _ref$query.site,
      allMarkdownRemark = _ref$query.allMarkdownRemark;
  return allMarkdownRemark.edges.map(function (edge) {
    return (0, _extends3.default)({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      url: site.siteMetadata.siteUrl + edge.node.fields.slug,
      guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
      custom_elements: [{ 'content:encoded': edge.node.html }]
    });
  });
};

exports.onPostBuild = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2, pluginOptions) {
    var graphql = _ref2.graphql;

    var options, newFeeds, _loop, i;

    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            delete pluginOptions.plugins;

            /*
             * Run the site settings query to gather context, then
             * then run the corresponding feed for each query.
             */
            options = (0, _extends3.default)({}, _internals.defaultOptions, pluginOptions);

            if (!('query' in options)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return (0, _internals.runQuery)(graphql, options.query);

          case 5:
            options.query = _context2.sent;

          case 6:
            newFeeds = typeof options.feeds === 'function' ? options.feeds({ query: options.query }) : options.feeds;
            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
              var _options$newFeeds$i, setup, locals, feed, serializer, items;

              return _regenerator2.default.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!newFeeds[i].query) {
                        _context.next = 5;
                        break;
                      }

                      _context.next = 3;
                      return (0, _internals.runQuery)(graphql, newFeeds[i].query);

                    case 3:
                      newFeeds[i].query = _context.sent;


                      if (options.query) {
                        newFeeds[i].query = (0, _lodash2.default)(options.query, newFeeds[i].query);
                        delete options.query;
                      }

                    case 5:
                      _options$newFeeds$i = (0, _extends3.default)({}, options, newFeeds[i]), setup = _options$newFeeds$i.setup, locals = (0, _objectWithoutProperties3.default)(_options$newFeeds$i, ['setup']);
                      feed = new _rss2.default(setup(locals, i));
                      serializer = newFeeds[i].serialize && typeof newFeeds[i].serialize === 'function' ? newFeeds[i].serialize : serialize;
                      items = serializer(locals);


                      items.forEach(function (i) {
                        return feed.item(i);
                      });
                      _context.next = 12;
                      return (0, _internals.writeFile)(_path2.default.join(publicPath, newFeeds[i].output), feed.xml());

                    case 12:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, undefined);
            });
            _context2.t0 = _regenerator2.default.keys(newFeeds);

          case 9:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 14;
              break;
            }

            i = _context2.t1.value;
            return _context2.delegateYield(_loop(i), 't2', 12);

          case 12:
            _context2.next = 9;
            break;

          case 14:
            return _context2.abrupt('return', _promise2.default.resolve());

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();
