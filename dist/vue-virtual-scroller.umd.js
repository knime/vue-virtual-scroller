(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["vue-virtual-scroller"] = {}, global.vue));
})(this, (function (exports, vue) { 'use strict';

  var config = {
    itemsLimit: 1000
  };

  function getInternetExplorerVersion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    } // other browser


    return -1;
  }

  let isIE;

  function initCompat () {
    if (!initCompat.init) {
      initCompat.init = true;
      isIE = getInternetExplorerVersion() !== -1;
    }
  }

  var script$3 = {
    name: 'ResizeObserver',

    props: {
      emitOnMount: {
        type: Boolean,
        default: false,
      },

      ignoreWidth: {
        type: Boolean,
        default: false,
      },

      ignoreHeight: {
        type: Boolean,
        default: false,
      },
    },

    emits: [
      'notify',
    ],

    mounted () {
      initCompat();
      vue.nextTick(() => {
        this._w = this.$el.offsetWidth;
        this._h = this.$el.offsetHeight;
        if (this.emitOnMount) {
          this.emitSize();
        }
      });
      const object = document.createElement('object');
      this._resizeObject = object;
      object.setAttribute('aria-hidden', 'true');
      object.setAttribute('tabindex', -1);
      object.onload = this.addResizeHandlers;
      object.type = 'text/html';
      if (isIE) {
        this.$el.appendChild(object);
      }
      object.data = 'about:blank';
      if (!isIE) {
        this.$el.appendChild(object);
      }
    },

    beforeUnmount () {
      this.removeResizeHandlers();
    },

    methods: {
      compareAndNotify () {
        if ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) || (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) {
          this._w = this.$el.offsetWidth;
          this._h = this.$el.offsetHeight;
          this.emitSize();
        }
      },

      emitSize () {
        this.$emit('notify', {
          width: this._w,
          height: this._h,
        });
      },

      addResizeHandlers () {
        this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);
        this.compareAndNotify();
      },

      removeResizeHandlers () {
        if (this._resizeObject && this._resizeObject.onload) {
          if (!isIE && this._resizeObject.contentDocument) {
            this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
          }
          this.$el.removeChild(this._resizeObject);
          this._resizeObject.onload = null;
          this._resizeObject = null;
        }
      },
    },
  };

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-b329ee4c");

  vue.pushScopeId("data-v-b329ee4c");
  const _hoisted_1$1 = {
    class: "resize-observer",
    tabindex: "-1"
  };
  vue.popScopeId();

  const render$2 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1))
  });

  script$3.render = render$2;
  script$3.__scopeId = "data-v-b329ee4c";
  script$3.__file = "src/components/ResizeObserver.vue";

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function processOptions(value) {
    var options;

    if (typeof value === 'function') {
      // Simple options (callback-only)
      options = {
        callback: value
      };
    } else {
      // Options object
      options = value;
    }

    return options;
  }
  function throttle(callback, delay) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var timeout;
    var lastState;
    var currentArgs;

    var throttled = function throttled(state) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      currentArgs = args;
      if (timeout && state === lastState) return;
      var leading = options.leading;

      if (typeof leading === 'function') {
        leading = leading(state, lastState);
      }

      if ((!timeout || state !== lastState) && leading) {
        callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
      }

      lastState = state;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
        timeout = 0;
      }, delay);
    };

    throttled._clear = function () {
      clearTimeout(timeout);
      timeout = null;
    };

    return throttled;
  }
  function deepEqual(val1, val2) {
    if (val1 === val2) return true;

    if (_typeof(val1) === 'object') {
      for (var key in val1) {
        if (!deepEqual(val1[key], val2[key])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  var VisibilityState = /*#__PURE__*/function () {
    function VisibilityState(el, options, vnode) {
      _classCallCheck(this, VisibilityState);

      this.el = el;
      this.observer = null;
      this.frozen = false;
      this.createObserver(options, vnode);
    }

    _createClass(VisibilityState, [{
      key: "createObserver",
      value: function createObserver(options, vnode) {
        var _this = this;

        if (this.observer) {
          this.destroyObserver();
        }

        if (this.frozen) return;
        this.options = processOptions(options);

        this.callback = function (result, entry) {
          _this.options.callback(result, entry);

          if (result && _this.options.once) {
            _this.frozen = true;

            _this.destroyObserver();
          }
        }; // Throttle


        if (this.callback && this.options.throttle) {
          var _ref = this.options.throttleOptions || {},
              _leading = _ref.leading;

          this.callback = throttle(this.callback, this.options.throttle, {
            leading: function leading(state) {
              return _leading === 'both' || _leading === 'visible' && state || _leading === 'hidden' && !state;
            }
          });
        }

        this.oldResult = undefined;
        this.observer = new IntersectionObserver(function (entries) {
          var entry = entries[0];

          if (entries.length > 1) {
            var intersectingEntry = entries.find(function (e) {
              return e.isIntersecting;
            });

            if (intersectingEntry) {
              entry = intersectingEntry;
            }
          }

          if (_this.callback) {
            // Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
            var result = entry.isIntersecting && entry.intersectionRatio >= _this.threshold;
            if (result === _this.oldResult) return;
            _this.oldResult = result;

            _this.callback(result, entry);
          }
        }, this.options.intersection); // Wait for the element to be in document

        vue.nextTick(function () {
          if (_this.observer) {
            _this.observer.observe(_this.el);
          }
        });
      }
    }, {
      key: "destroyObserver",
      value: function destroyObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        } // Cancel throttled call


        if (this.callback && this.callback._clear) {
          this.callback._clear();

          this.callback = null;
        }
      }
    }, {
      key: "threshold",
      get: function get() {
        return this.options.intersection && typeof this.options.intersection.threshold === 'number' ? this.options.intersection.threshold : 0;
      }
    }]);

    return VisibilityState;
  }();

  function beforeMount(el, _ref2, vnode) {
    var value = _ref2.value;
    if (!value) return;

    if (typeof IntersectionObserver === 'undefined') {
      console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill');
    } else {
      var state = new VisibilityState(el, value, vnode);
      el._vue_visibilityState = state;
    }
  }

  function updated(el, _ref3, vnode) {
    var value = _ref3.value,
        oldValue = _ref3.oldValue;
    if (deepEqual(value, oldValue)) return;
    var state = el._vue_visibilityState;

    if (!value) {
      unmounted(el);
      return;
    }

    if (state) {
      state.createObserver(value, vnode);
    } else {
      beforeMount(el, {
        value: value
      }, vnode);
    }
  }

  function unmounted(el) {
    var state = el._vue_visibilityState;

    if (state) {
      state.destroyObserver();
      delete el._vue_visibilityState;
    }
  }

  var ObserveVisibility = {
    beforeMount: beforeMount,
    updated: updated,
    unmounted: unmounted
  };

  // Fork of https://github.com/olahol/scrollparent.js to be able to build with Rollup

  const regex = /(auto|scroll)/;
  function parents(node, ps) {
    if (node.parentNode === null) {
      return ps;
    }
    return parents(node.parentNode, ps.concat([node]));
  }
  const style = function (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
  };
  const overflow = function (node) {
    return style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x');
  };
  const scroll = function (node) {
    return regex.test(overflow(node));
  };
  function getScrollParent(node) {
    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
      return;
    }
    const ps = parents(node.parentNode, []);
    for (let i = 0; i < ps.length; i += 1) {
      if (scroll(ps[i])) {
        return ps[i];
      }
    }
    return document.scrollingElement || document.documentElement;
  }

  const props = {
    items: {
      type: Array,
      required: true
    },
    keyField: {
      type: String,
      default: 'id'
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    },
    listTag: {
      type: String,
      default: 'div'
    },
    itemTag: {
      type: String,
      default: 'div'
    }
  };
  function simpleArray() {
    return this.items.length && typeof this.items[0] !== 'object';
  }

  let supportsPassive = false;
  if (typeof window !== 'undefined') {
    supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}
  }

  let uid = 0;

  var script$2 = {
    name: 'RecycleScroller',

    components: {
      ResizeObserver: script$3,
    },

    directives: {
      ObserveVisibility,
    },

    props: {
      ...props,

      itemSize: {
        type: Number,
        default: null,
      },

      gridItems: {
        type: Number,
        default: undefined,
      },

      itemSecondarySize: {
        type: Number,
        default: undefined,
      },

      minItemSize: {
        type: [Number, String],
        default: null,
      },

      numItemsAbove: {
        type: Number,
        default: 0,
      },

      numItemsBelow: {
        type: Number,
        default: 0,
      },

      emptyItem: {
        type: Object,
        default: undefined,
      },

      sizeField: {
        type: String,
        default: 'size',
      },

      typeField: {
        type: String,
        default: 'type',
      },

      buffer: {
        type: Number,
        default: 200,
      },

      pageMode: {
        type: Boolean,
        default: false,
      },

      prerender: {
        type: Number,
        default: 0,
      },

      emitUpdate: {
        type: Boolean,
        default: false,
      },

      skipHover: {
        type: Boolean,
        default: false,
      },

      listTag: {
        type: String,
        default: 'div',
      },

      itemTag: {
        type: String,
        default: 'div',
      },

      listClass: {
        type: [String, Object, Array],
        default: '',
      },

      itemClass: {
        type: [String, Object, Array],
        default: '',
      },
    },

    emits: [
      'resize',
      'visible',
      'hidden',
      'update',
      'scroll-start',
      'scroll-end',
    ],

    data () {
      return {
        pool: [],
        totalSize: 0,
        ready: false,
        hoverKey: null,
      }
    },

    computed: {

      emptySize () {
        return this.itemSize || this.emptyItem.size || this.minItemSize || 0
      },

      sizes () {
        const spaceAbove = this.emptySize * this.numItemsAbove;
        if (this.itemSize === null) {
          const sizes = {
            '-1': { accumulator: spaceAbove },
          };
          const items = this.items;
          const field = this.sizeField;
          const minItemSize = this.minItemSize;
          let computedMinSize = 10000;
          let accumulator = spaceAbove;
          let current;
          for (let i = 0, l = items.length; i < l; i++) {
            current = items[i][field] || minItemSize;
            if (current < computedMinSize) {
              computedMinSize = current;
            }
            accumulator += current;
            sizes[i] = { accumulator, size: current };
          }
          // eslint-disable-next-line
          this.$_computedMinItemSize = computedMinSize;
          return sizes
        }
        return []
      },

      simpleArray,
    },

    watch: {
      items () {
        this.updateVisibleItems(true);
      },

      pageMode () {
        this.applyPageMode();
        this.updateVisibleItems(false);
      },

      sizes: {
        handler () {
          this.updateVisibleItems(false);
        },
        deep: true,
      },

      gridItems () {
        this.updateVisibleItems(true);
      },

      itemSecondarySize () {
        this.updateVisibleItems(true);
      },
    },

    created () {
      this.$_startIndex = 0;
      this.$_endIndex = 0;
      this.$_views = new Map();
      this.$_unusedViews = new Map();
      this.$_scrollDirty = false;
      this.$_lastUpdateScrollPosition = 0;

      // In SSR mode, we also prerender the same number of item for the first render
      // to avoir mismatch between server and client templates
      if (this.prerender) {
        this.$_prerender = true;
        this.updateVisibleItems(false);
      }

      if (this.gridItems && !this.itemSize) {
        console.error('[vue-recycle-scroller] You must provide an itemSize when using gridItems');
      }
    },

    mounted () {
      this.applyPageMode();
      this.$nextTick(() => {
        // In SSR mode, render the real number of visible items
        this.$_prerender = false;
        this.updateVisibleItems(true);
        this.ready = true;
      });
    },

    activated () {
      const lastPosition = this.$_lastUpdateScrollPosition;
      if (typeof lastPosition === 'number') {
        this.$nextTick(() => {
          this.scrollToPosition(lastPosition);
        });
      }
    },

    beforeUnmount () {
      this.removeListeners();
    },

    methods: {
      addView (pool, index, item, key, type) {
        const nr = vue.markRaw({
          id: uid++,
          index,
          used: true,
          key,
          type,
        });
        const view = vue.shallowReactive({
          item,
          position: 0,
          nr,
        });
        pool.push(view);
        return view
      },

      unuseView (view, fake = false) {
        const unusedViews = this.$_unusedViews;
        const type = view.nr.type;
        let unusedPool = unusedViews.get(type);
        if (!unusedPool) {
          unusedPool = [];
          unusedViews.set(type, unusedPool);
        }
        unusedPool.push(view);
        if (!fake) {
          view.nr.used = false;
          view.position = -9999;
          this.$_views.delete(view.nr.key);
        }
      },

      handleResize () {
        this.$emit('resize');
        if (this.ready) this.updateVisibleItems(false);
      },

      handleScroll (event) {
        if (!this.$_scrollDirty) {
          this.$_scrollDirty = true;
          requestAnimationFrame(() => {
            this.$_scrollDirty = false;
            const { continuous } = this.updateVisibleItems(false, true);

            // It seems sometimes chrome doesn't fire scroll event :/
            // When non continous scrolling is ending, we force a refresh
            if (!continuous) {
              clearTimeout(this.$_refreshTimout);
              this.$_refreshTimout = setTimeout(this.handleScroll, 100);
            }
          });
        }
      },

      handleVisibilityChange (isVisible, entry) {
        if (this.ready) {
          if (isVisible || entry.boundingClientRect.width !== 0 || entry.boundingClientRect.height !== 0) {
            this.$emit('visible');
            requestAnimationFrame(() => {
              this.updateVisibleItems(false);
            });
          } else {
            this.$emit('hidden');
          }
        }
      },

      updateVisibleItems (checkItem, checkPositionDiff = false) {
        const itemSize = this.itemSize;
        const gridItems = this.gridItems || 1;
        const itemSecondarySize = this.itemSecondarySize || itemSize;
        const minItemSize = this.$_computedMinItemSize;
        const typeField = this.typeField;
        const keyField = this.simpleArray ? null : this.keyField;
        const items = this.items;
        const count = items.length + this.numItemsAbove + this.numItemsBelow;
        const sizes = this.sizes;
        const views = this.$_views;
        const unusedViews = this.$_unusedViews;
        const pool = this.pool;
        let startIndex, endIndex;
        let totalSize;
        let visibleStartIndex, visibleEndIndex;

        const computePosition = (i) => {
          if (i < this.numItemsAbove - 1) {
            return (i + 1) * this.emptySize
          } else if (i < count - this.numItemsBelow) {
            return sizes[i - this.numItemsAbove].accumulator
          } else {
            return sizes[items.length - 1].accumulator + ((i + 1) - (this.numItemsAbove + items.length)) * this.emptySize
          }
        };

        if (!count) {
          startIndex = endIndex = visibleStartIndex = visibleEndIndex = totalSize = 0;
        } else if (this.$_prerender) {
          startIndex = visibleStartIndex = 0;
          endIndex = visibleEndIndex = Math.min(this.prerender, items.length);
          totalSize = null;
        } else {
          const scroll = this.getScroll();

          // Skip update if use hasn't scrolled enough
          if (checkPositionDiff) {
            let positionDiff = scroll.start - this.$_lastUpdateScrollPosition;
            if (positionDiff < 0) positionDiff = -positionDiff;
            if ((itemSize === null && positionDiff < minItemSize) || positionDiff < itemSize) {
              return {
                continuous: true,
              }
            }
          }
          this.$_lastUpdateScrollPosition = scroll.start;

          const buffer = this.buffer;
          scroll.start -= buffer;
          scroll.end += buffer;

          // account for leading slot
          let beforeSize = 0;
          if (this.$refs.before) {
            beforeSize = this.$refs.before.scrollHeight;
            scroll.start -= beforeSize;
          }

          // account for trailing slot
          if (this.$refs.after) {
            const afterSize = this.$refs.after.scrollHeight;
            scroll.end += afterSize;
          }

          // Variable size mode
          if (itemSize === null) {
            let h;
            let a = 0;
            let b = count - 1;
            let i = ~~(count / 2);
            let oldI;

            // Searching for startIndex
            do {
              oldI = i;
              h = computePosition(i);
              if (h < scroll.start) {
                a = i;
              } else if (i < count - 1 && computePosition(i + 1) > scroll.start) {
                b = i;
              }
              i = ~~((a + b) / 2);
            } while (i !== oldI)
            i < 0 && (i = 0);
            startIndex = i;

            // For container style
            totalSize = sizes[items.length - 1].accumulator + this.numItemsBelow * this.emptySize;

            // Searching for endIndex
            for (endIndex = i; endIndex < count && computePosition(endIndex) < scroll.end; endIndex++);
            if (endIndex === -1) {
              endIndex = count - 1;
            } else {
              endIndex++;
              // Bounds
              endIndex > count && (endIndex = count);
            }

            // search visible startIndex
            for (visibleStartIndex = startIndex; visibleStartIndex < count && (beforeSize + computePosition(visibleStartIndex)) < scroll.start; visibleStartIndex++);

            // search visible endIndex
            for (visibleEndIndex = visibleStartIndex; visibleEndIndex < count && (beforeSize + computePosition(visibleEndIndex)) < scroll.end; visibleEndIndex++);
          } else {
            // Fixed size mode
            startIndex = ~~(scroll.start / itemSize * gridItems);
            const remainer = startIndex % gridItems;
            startIndex -= remainer;
            endIndex = Math.ceil(scroll.end / itemSize * gridItems);
            visibleStartIndex = Math.max(0, Math.floor((scroll.start - beforeSize) / itemSize * gridItems));
            visibleEndIndex = Math.floor((scroll.end - beforeSize) / itemSize * gridItems);

            // Bounds
            startIndex < 0 && (startIndex = 0);
            endIndex > count && (endIndex = count);
            visibleStartIndex < 0 && (visibleStartIndex = 0);
            visibleEndIndex > count && (visibleEndIndex = count);

            totalSize = Math.ceil(count / gridItems) * itemSize;
          }
        }

        if (endIndex - startIndex > config.itemsLimit) {
          this.itemsLimitError();
        }
        this.totalSize = totalSize;

        let view;

        const continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex;

        if (this.$_continuous !== continuous) {
          if (continuous) {
            views.clear();
            unusedViews.clear();
            for (let i = 0, l = pool.length; i < l; i++) {
              view = pool[i];
              this.unuseView(view);
            }
          }
          this.$_continuous = continuous;
        } else if (continuous) {
          for (let i = 0, l = pool.length; i < l; i++) {
            view = pool[i];
            if (view.nr.used) {
              // Update view item index
              if (checkItem) {
                const index = items.findIndex(
                  item => keyField ? item[keyField] === view.item[keyField] : item === view.item,
                );
                view.nr.index = index === -1 ? index : index + this.numItemsAbove;
              }

              // Check if index is still in visible range
              if (
                view.nr.index === -1 ||
                view.nr.index < startIndex ||
                view.nr.index >= endIndex
              ) {
                this.unuseView(view);
              }
            }
          }
        }

        const unusedIndex = continuous ? null : new Map();

        let item, type, unusedPool;
        let v, key, checkSize;
        for (let i = startIndex; i < endIndex; i++) {
          if (i < this.numItemsAbove || i >= count - this.numItemsBelow) {
            item = { id: `emptyItem-${i - this.numItemsAbove}`, ...this.emptyItem };
            checkSize = false;
          } else {
            item = items[i - this.numItemsAbove];
            checkSize = true;
          }
          key = keyField ? item[keyField] : item;
          if (key == null) {
            throw new Error(`Key is ${key} on item (keyField is '${keyField}')`)
          }
          view = views.get(key);

          if (checkSize && !itemSize && !sizes[i - this.numItemsAbove].size) {
            if (view) this.unuseView(view);
            continue
          }

          // No view assigned to item
          if (!view) {
            if (i === items.length - 1) this.$emit('scroll-end');
            if (i === 0) this.$emit('scroll-start');

            type = item[typeField];
            unusedPool = unusedViews.get(type);

            if (continuous) {
              // Reuse existing view
              if (unusedPool && unusedPool.length) {
                view = unusedPool.pop();
                view.item = item;
                view.nr.used = true;
                view.nr.index = i;
                view.nr.key = key;
                view.nr.type = type;
              } else {
                view = this.addView(pool, i, item, key, type);
              }
            } else {
              // Use existing view
              // We don't care if they are already used
              // because we are not in continous scrolling
              v = unusedIndex.get(type) || 0;

              if (!unusedPool || v >= unusedPool.length) {
                view = this.addView(pool, i, item, key, type);
                this.unuseView(view, true);
                unusedPool = unusedViews.get(type);
              }

              view = unusedPool[v];
              view.item = item;
              view.nr.used = true;
              view.nr.index = i;
              view.nr.key = key;
              view.nr.type = type;
              unusedIndex.set(type, v + 1);
              v++;
            }
            views.set(key, view);
          } else {
            view.nr.used = true;
            view.item = item;
          }

          // Update position
          if (itemSize === null) {
            view.position = computePosition(i - 1);
            view.offset = 0;
          } else {
            view.position = Math.floor(i / gridItems) * itemSize;
            view.offset = (i % gridItems) * itemSecondarySize;
          }
        }

        this.$_startIndex = startIndex;
        this.$_endIndex = endIndex;

        if (this.emitUpdate) this.$emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex);

        // After the user has finished scrolling
        // Sort views so text selection is correct
        clearTimeout(this.$_sortTimer);
        this.$_sortTimer = setTimeout(this.sortViews, 300);

        return {
          continuous,
        }
      },

      getListenerTarget () {
        let target = getScrollParent(this.$el);
        // Fix global scroll target for Chrome and Safari
        if (window.document && (target === window.document.documentElement || target === window.document.body)) {
          target = window;
        }
        return target
      },

      getScroll () {
        const { $el: el, direction } = this;
        const isVertical = direction === 'vertical';
        let scrollState;

        if (this.pageMode) {
          const bounds = el.getBoundingClientRect();
          const boundsSize = isVertical ? bounds.height : bounds.width;
          let start = -(isVertical ? bounds.top : bounds.left);
          let size = isVertical ? window.innerHeight : window.innerWidth;
          if (start < 0) {
            size += start;
            start = 0;
          }
          if (start + size > boundsSize) {
            size = boundsSize - start;
          }
          scrollState = {
            start,
            end: start + size,
          };
        } else if (isVertical) {
          scrollState = {
            start: el.scrollTop,
            end: el.scrollTop + el.clientHeight,
          };
        } else {
          scrollState = {
            start: el.scrollLeft,
            end: el.scrollLeft + el.clientWidth,
          };
        }

        return scrollState
      },

      applyPageMode () {
        if (this.pageMode) {
          this.addListeners();
        } else {
          this.removeListeners();
        }
      },

      addListeners () {
        this.listenerTarget = this.getListenerTarget();
        this.listenerTarget.addEventListener('scroll', this.handleScroll, supportsPassive
          ? {
              passive: true,
            }
          : false);
        this.listenerTarget.addEventListener('resize', this.handleResize);
      },

      removeListeners () {
        if (!this.listenerTarget) {
          return
        }

        this.listenerTarget.removeEventListener('scroll', this.handleScroll);
        this.listenerTarget.removeEventListener('resize', this.handleResize);

        this.listenerTarget = null;
      },

      scrollToItem (index) {
        let scroll;
        if (this.itemSize === null) {
          scroll = index > 0 ? this.sizes[index - 1].accumulator : 0;
        } else {
          scroll = Math.floor(index / this.gridItems) * this.itemSize;
        }
        this.scrollToPosition(scroll);
      },

      scrollToPosition (position) {
        const direction = this.direction === 'vertical'
          ? { scroll: 'scrollTop', start: 'top' }
          : { scroll: 'scrollLeft', start: 'left' };

        let viewport;
        let scrollDirection;
        let scrollDistance;

        if (this.pageMode) {
          const viewportEl = getScrollParent(this.$el);
          // HTML doesn't overflow like other elements
          const scrollTop = viewportEl.tagName === 'HTML' ? 0 : viewportEl[direction.scroll];
          const bounds = viewportEl.getBoundingClientRect();

          const scroller = this.$el.getBoundingClientRect();
          const scrollerPosition = scroller[direction.start] - bounds[direction.start];

          viewport = viewportEl;
          scrollDirection = direction.scroll;
          scrollDistance = position + scrollTop + scrollerPosition;
        } else {
          viewport = this.$el;
          scrollDirection = direction.scroll;
          scrollDistance = position;
        }

        viewport[scrollDirection] = scrollDistance;
      },

      itemsLimitError () {
        setTimeout(() => {
          console.log('It seems the scroller element isn\'t scrolling, so it tries to render all the items at once.', 'Scroller:', this.$el);
          console.log('Make sure the scroller has a fixed height (or width) and \'overflow-y\' (or \'overflow-x\') set to \'auto\' so it can scroll correctly and only render the items visible in the scroll viewport.');
        });
        throw new Error('Rendered items limit reached')
      },

      sortViews () {
        this.pool.sort((viewA, viewB) => viewA.index - viewB.index);
      },
    },
  };

  const _hoisted_1 = {
    key: 0,
    ref: "before",
    class: "vue-recycle-scroller__slot"
  };
  const _hoisted_2 = {
    key: 1,
    ref: "after",
    class: "vue-recycle-scroller__slot"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ResizeObserver = vue.resolveComponent("ResizeObserver");
    const _directive_observe_visibility = vue.resolveDirective("observe-visibility");

    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["vue-recycle-scroller", {
        ready: $data.ready,
        'page-mode': $props.pageMode,
        [`direction-${_ctx.direction}`]: true,
      }]),
      onScrollPassive: _cache[0] || (_cache[0] = (...args) => ($options.handleScroll && $options.handleScroll(...args)))
    }, [
      (_ctx.$slots.before)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
            vue.renderSlot(_ctx.$slots, "before")
          ], 512 /* NEED_PATCH */))
        : vue.createCommentVNode("v-if", true),
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.listTag), {
        ref: "wrapper",
        style: vue.normalizeStyle({ [_ctx.direction === 'vertical' ? 'minHeight' : 'minWidth']: $data.totalSize + 'px' }),
        class: vue.normalizeClass(["vue-recycle-scroller__item-wrapper", $props.listClass])
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.pool, (view) => {
            return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.itemTag), vue.mergeProps({
              key: view.nr.id,
              style: $data.ready ? {
            transform: `translate${_ctx.direction === 'vertical' ? 'Y' : 'X'}(${view.position}px) translate${_ctx.direction === 'vertical' ? 'X' : 'Y'}(${view.offset}px)`,
            width: $props.gridItems ? `${_ctx.direction === 'vertical' ? $props.itemSecondarySize || $props.itemSize : $props.itemSize}px` : undefined,
            height: $props.gridItems ? `${_ctx.direction === 'horizontal' ? $props.itemSecondarySize || $props.itemSize : $props.itemSize}px` : undefined,
          } : null,
              class: ["vue-recycle-scroller__item-view", [
            $props.itemClass,
            {
              hover: !$props.skipHover && $data.hoverKey === view.nr.key
            },
          ]]
            }, vue.toHandlers($props.skipHover ? {} : {
            mouseenter: () => { $data.hoverKey = view.nr.key; },
            mouseleave: () => { $data.hoverKey = null; },
          })), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default", {
                  item: view.item,
                  index: view.nr.index,
                  active: view.nr.used
                })
              ]),
              _: 2 /* DYNAMIC */
            }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["style", "class"]))
          }), 128 /* KEYED_FRAGMENT */)),
          vue.renderSlot(_ctx.$slots, "empty")
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["style", "class"])),
      (_ctx.$slots.after)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "after")
          ], 512 /* NEED_PATCH */))
        : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_ResizeObserver, { onNotify: $options.handleResize }, null, 8 /* PROPS */, ["onNotify"])
    ], 34 /* CLASS, HYDRATE_EVENTS */)), [
      [_directive_observe_visibility, $options.handleVisibilityChange]
    ])
  }

  script$2.render = render$1;
  script$2.__file = "src/components/RecycleScroller.vue";

  function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1);},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e);}),(n.get("*")||[]).slice().map(function(n){n(t,e);});}}}

  var script$1 = {
    name: 'DynamicScroller',

    components: {
      RecycleScroller: script$2,
    },

    provide () {
      if (typeof ResizeObserver !== 'undefined') {
        this.$_resizeObserver = new ResizeObserver(entries => {
          requestAnimationFrame(() => {
            if (!Array.isArray(entries)) {
              return
            }
            for (const entry of entries) {
              if (entry.target) {
                const event = new CustomEvent(
                  'resize',
                  {
                    detail: {
                      contentRect: entry.contentRect,
                    },
                  },
                );
                entry.target.dispatchEvent(event);
              }
            }
          });
        });
      }

      return {
        vscrollData: this.vscrollData,
        vscrollParent: this,
        vscrollResizeObserver: this.$_resizeObserver,
      }
    },

    inheritAttrs: false,

    props: {
      ...props,

      minItemSize: {
        type: [Number, String],
        required: true,
      },
    },

    emits: [
      'resize',
      'visible',
    ],

    data () {
      return {
        vscrollData: {
          active: true,
          sizes: {},
          validSizes: {},
          keyField: this.keyField,
          simpleArray: false,
        },
      }
    },

    computed: {
      simpleArray,

      itemsWithSize () {
        const result = [];
        const { items, keyField, simpleArray } = this;
        const sizes = this.vscrollData.sizes;
        const l = items.length;
        for (let i = 0; i < l; i++) {
          const item = items[i];
          const id = simpleArray ? i : item[keyField];
          let size = sizes[id];
          if (typeof size === 'undefined' && !this.$_undefinedMap[id]) {
            size = 0;
          }
          result.push({
            item,
            id,
            size,
          });
        }
        return result
      },
    },

    watch: {
      items () {
        this.forceUpdate(false);
      },

      simpleArray: {
        handler (value) {
          this.vscrollData.simpleArray = value;
        },
        immediate: true,
      },

      direction (value) {
        this.forceUpdate(true);
      },

      itemsWithSize (next, prev) {
        const scrollTop = this.$el.scrollTop;

        // Calculate total diff between prev and next sizes
        // over current scroll top. Then add it to scrollTop to
        // avoid jumping the contents that the user is seeing.
        let prevActiveTop = 0; let activeTop = 0;
        const length = Math.min(next.length, prev.length);
        for (let i = 0; i < length; i++) {
          if (prevActiveTop >= scrollTop) {
            break
          }
          prevActiveTop += prev[i].size || this.minItemSize;
          activeTop += next[i].size || this.minItemSize;
        }
        const offset = activeTop - prevActiveTop;

        if (offset === 0) {
          return
        }

        this.$el.scrollTop += offset;
      },
    },

    beforeCreate () {
      this.$_updates = [];
      this.$_undefinedSizes = 0;
      this.$_undefinedMap = {};
      this.$_events = mitt();
    },

    activated () {
      this.vscrollData.active = true;
    },

    deactivated () {
      this.vscrollData.active = false;
    },

    unmounted () {
      this.$_events.all.clear();
    },

    methods: {
      onScrollerResize () {
        const scroller = this.$refs.scroller;
        if (scroller) {
          this.forceUpdate();
        }
        this.$emit('resize');
      },

      onScrollerVisible () {
        this.$_events.emit('vscroll:update', { force: false });
        this.$emit('visible');
      },

      forceUpdate (clear = true) {
        if (clear || this.simpleArray) {
          this.vscrollData.validSizes = {};
        }
        this.$_events.emit('vscroll:update', { force: true });
      },

      scrollToItem (index) {
        const scroller = this.$refs.scroller;
        if (scroller) scroller.scrollToItem(index);
      },

      getItemSize (item, index = undefined) {
        const id = this.simpleArray ? (index != null ? index : this.items.indexOf(item)) : item[this.keyField];
        return this.vscrollData.sizes[id] || 0
      },

      scrollToBottom () {
        if (this.$_scrollingToBottom) return
        this.$_scrollingToBottom = true;
        const el = this.$el;
        // Item is inserted to the DOM
        this.$nextTick(() => {
          el.scrollTop = el.scrollHeight + 5000;
          // Item sizes are computed
          const cb = () => {
            el.scrollTop = el.scrollHeight + 5000;
            requestAnimationFrame(() => {
              el.scrollTop = el.scrollHeight + 5000;
              if (this.$_undefinedSizes === 0) {
                this.$_scrollingToBottom = false;
              } else {
                requestAnimationFrame(cb);
              }
            });
          };
          requestAnimationFrame(cb);
        });
      },
    },
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_RecycleScroller = vue.resolveComponent("RecycleScroller");

    return (vue.openBlock(), vue.createBlock(_component_RecycleScroller, vue.mergeProps({
      ref: "scroller",
      items: $options.itemsWithSize,
      "min-item-size": $props.minItemSize,
      direction: _ctx.direction,
      "key-field": "id",
      "list-tag": _ctx.listTag,
      "item-tag": _ctx.itemTag
    }, _ctx.$attrs, {
      onResize: $options.onScrollerResize,
      onVisible: $options.onScrollerVisible
    }), {
      default: vue.withCtx(({ item: itemWithSize, index, active }) => [
        vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps({
            item: itemWithSize.item,
            index,
            active,
            itemWithSize
          })))
      ]),
      before: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "before")
      ]),
      after: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "after")
      ]),
      empty: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "empty")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["items", "min-item-size", "direction", "list-tag", "item-tag", "onResize", "onVisible"]))
  }

  script$1.render = render;
  script$1.__file = "src/components/DynamicScroller.vue";

  var script = {
    name: 'DynamicScrollerItem',

    inject: [
      'vscrollData',
      'vscrollParent',
      'vscrollResizeObserver',
    ],

    props: {
      // eslint-disable-next-line vue/require-prop-types
      item: {
        required: true,
      },

      watchData: {
        type: Boolean,
        default: false,
      },

      /**
       * Indicates if the view is actively used to display an item.
       */
      active: {
        type: Boolean,
        required: true,
      },

      index: {
        type: Number,
        default: undefined,
      },

      sizeDependencies: {
        type: [Array, Object],
        default: null,
      },

      emitResize: {
        type: Boolean,
        default: false,
      },

      tag: {
        type: String,
        default: 'div',
      },
    },

    emits: [
      'resize',
    ],

    computed: {
      id () {
        if (this.vscrollData.simpleArray) return this.index
        // eslint-disable-next-line no-prototype-builtins
        if (this.item.hasOwnProperty(this.vscrollData.keyField)) return this.item[this.vscrollData.keyField]
        throw new Error(`keyField '${this.vscrollData.keyField}' not found in your item. You should set a valid keyField prop on your Scroller`)
      },

      size () {
        return (this.vscrollData.validSizes[this.id] && this.vscrollData.sizes[this.id]) || 0
      },

      finalActive () {
        return this.active && this.vscrollData.active
      },
    },

    watch: {
      watchData: 'updateWatchData',

      id () {
        if (!this.size) {
          this.onDataUpdate();
        }
      },

      finalActive (value) {
        if (!this.size) {
          if (value) {
            if (!this.vscrollParent.$_undefinedMap[this.id]) {
              this.vscrollParent.$_undefinedSizes++;
              this.vscrollParent.$_undefinedMap[this.id] = true;
            }
          } else {
            if (this.vscrollParent.$_undefinedMap[this.id]) {
              this.vscrollParent.$_undefinedSizes--;
              this.vscrollParent.$_undefinedMap[this.id] = false;
            }
          }
        }

        if (this.vscrollResizeObserver) {
          if (value) {
            this.observeSize();
          } else {
            this.unobserveSize();
          }
        } else if (value && this.$_pendingVScrollUpdate === this.id) {
          this.updateSize();
        }
      },
    },

    created () {
      if (this.$isServer) return

      this.$_forceNextVScrollUpdate = null;
      this.updateWatchData();

      if (!this.vscrollResizeObserver) {
        for (const k in this.sizeDependencies) {
          this.$watch(() => this.sizeDependencies[k], this.onDataUpdate);
        }

        this.vscrollParent.$_events.on('vscroll:update', this.onVscrollUpdate);
      }
    },

    mounted () {
      if (this.vscrollData.active) {
        this.updateSize();
        this.observeSize();
      }
    },

    beforeUnmount () {
      this.vscrollParent.$_events.off('vscroll:update', this.onVscrollUpdate);
      this.unobserveSize();
    },

    methods: {
      updateSize () {
        if (this.finalActive) {
          if (this.$_pendingSizeUpdate !== this.id) {
            this.$_pendingSizeUpdate = this.id;
            this.$_forceNextVScrollUpdate = null;
            this.$_pendingVScrollUpdate = null;
            this.computeSize(this.id);
          }
        } else {
          this.$_forceNextVScrollUpdate = this.id;
        }
      },

      updateWatchData () {
        if (this.watchData && !this.vscrollResizeObserver) {
          this.$_watchData = this.$watch('item', () => {
            this.onDataUpdate();
          }, {
            deep: true,
          });
        } else if (this.$_watchData) {
          this.$_watchData();
          this.$_watchData = null;
        }
      },

      onVscrollUpdate ({ force }) {
        // If not active, sechedule a size update when it becomes active
        if (!this.finalActive && force) {
          this.$_pendingVScrollUpdate = this.id;
        }

        if (this.$_forceNextVScrollUpdate === this.id || force || !this.size) {
          this.updateSize();
        }
      },

      onDataUpdate () {
        this.updateSize();
      },

      computeSize (id) {
        this.$nextTick(() => {
          if (this.id === id) {
            const width = this.$el.offsetWidth;
            const height = this.$el.offsetHeight;
            this.applySize(width, height);
          }
          this.$_pendingSizeUpdate = null;
        });
      },

      applySize (width, height) {
        const size = ~~(this.vscrollParent.direction === 'vertical' ? height : width);
        if (size && this.size !== size) {
          if (this.vscrollParent.$_undefinedMap[this.id]) {
            this.vscrollParent.$_undefinedSizes--;
            this.vscrollParent.$_undefinedMap[this.id] = undefined;
          }
          this.vscrollData.sizes[this.id] = size;
          this.vscrollData.validSizes[this.id] = true;
          if (this.emitResize) this.$emit('resize', this.id);
        }
      },

      observeSize () {
        if (!this.vscrollResizeObserver || !this.$el.parentNode) return
        this.vscrollResizeObserver.observe(this.$el.parentNode);
        this.$el.parentNode.addEventListener('resize', this.onResize);
      },

      unobserveSize () {
        if (!this.vscrollResizeObserver) return
        this.vscrollResizeObserver.unobserve(this.$el.parentNode);
        this.$el.parentNode.removeEventListener('resize', this.onResize);
      },

      onResize (event) {
        const { width, height } = event.detail.contentRect;
        this.applySize(width, height);
      },
    },

    render () {
      return vue.h(this.tag, this.$slots.default())
    },
  };

  script.__file = "src/components/DynamicScrollerItem.vue";

  function IdState ({
    idProp = vm => vm.item.id
  } = {}) {
    const store = vue.reactive({});

    // @vue/component
    return {
      data() {
        return {
          idState: null
        };
      },
      created() {
        this.$_id = null;
        if (typeof idProp === 'function') {
          this.$_getId = () => idProp.call(this, this);
        } else {
          this.$_getId = () => this[idProp];
        }
        this.$watch(this.$_getId, {
          handler(value) {
            this.$nextTick(() => {
              this.$_id = value;
            });
          },
          immediate: true
        });
        this.$_updateIdState();
      },
      beforeUpdate() {
        this.$_updateIdState();
      },
      methods: {
        /**
         * Initialize an idState
         * @param {number|string} id Unique id for the data
         */
        $_idStateInit(id) {
          const factory = this.$options.idState;
          if (typeof factory === 'function') {
            const data = factory.call(this, this);
            store[id] = data;
            this.$_id = id;
            return data;
          } else {
            throw new Error('[mixin IdState] Missing `idState` function on component definition.');
          }
        },
        /**
         * Ensure idState is created and up-to-date
         */
        $_updateIdState() {
          const id = this.$_getId();
          if (id == null) {
            console.warn(`No id found for IdState with idProp: '${idProp}'.`);
          }
          if (id !== this.$_id) {
            if (!store[id]) {
              this.$_idStateInit(id);
            }
            this.idState = store[id];
          }
        }
      }
    };
  }

  function registerComponents(app, prefix) {
    app.component(`${prefix}recycle-scroller`, script$2);
    app.component(`${prefix}RecycleScroller`, script$2);
    app.component(`${prefix}dynamic-scroller`, script$1);
    app.component(`${prefix}DynamicScroller`, script$1);
    app.component(`${prefix}dynamic-scroller-item`, script);
    app.component(`${prefix}DynamicScrollerItem`, script);
  }
  const plugin = {
    // eslint-disable-next-line no-undef
    version: "2.0.0-beta.3",
    install(app, options) {
      const finalOptions = Object.assign({}, {
        installComponents: true,
        componentsPrefix: ''
      }, options);
      for (const key in finalOptions) {
        if (typeof finalOptions[key] !== 'undefined') {
          config[key] = finalOptions[key];
        }
      }
      if (finalOptions.installComponents) {
        registerComponents(app, finalOptions.componentsPrefix);
      }
    }
  };

  exports.DynamicScroller = script$1;
  exports.DynamicScrollerItem = script;
  exports.IdState = IdState;
  exports.RecycleScroller = script$2;
  exports["default"] = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue-virtual-scroller.umd.js.map
