/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.4.1'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    selector    = selector === '#' ? [] : selector
    var $parent = $(document).find(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.4.1'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.4.1'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      if (typeof $next === 'object' && $next.length) {
        $next[0].offsetWidth // force reflow
      }
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    }

    var target  = $this.attr('data-target') || href
    var $target = $(document).find(target)

    if (!$target.hasClass('carousel')) return

    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.4.1'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(document).find(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(document).find(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.4.1'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector !== '#' ? $(document).find(selector) : null

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options
    this.$body = $(document.body)
    this.$element = $(element)
    this.$dialog = this.$element.find('.modal-dialog')
    this.$backdrop = null
    this.isShown = null
    this.originalBodyPad = null
    this.scrollbarWidth = 0
    this.ignoreBackdropClick = false
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION = '3.4.1'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
          this.$element[0] !== e.target &&
          !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    var scrollbarWidth = this.scrollbarWidth
    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth)
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight
        var calculatedPadding = $(element).css('padding-right')
        $(element)
          .data('padding-right', actualPadding)
          .css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')
      })
    }
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right')
      $(element).removeData('padding-right')
      element.style.paddingRight = padding ? padding : ''
    })
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
    var href = $this.attr('href')
    var target = $this.attr('data-target') ||
      (href && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7

    var $target = $(document).find(target)
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn']

  var uriAttrs = [
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ]

  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  }

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase()

    if ($.inArray(attrName, allowedAttributeList) !== -1) {
      if ($.inArray(attrName, uriAttrs) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
      }

      return true
    }

    var regExp = $(allowedAttributeList).filter(function (index, value) {
      return value instanceof RegExp
    })

    // Check if a regular expression validates the attribute.
    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true
      }
    }

    return false
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml)
    }

    // IE 8 and below don't support createHTMLDocument
    if (!document.implementation || !document.implementation.createHTMLDocument) {
      return unsafeHtml
    }

    var createdDocument = document.implementation.createHTMLDocument('sanitization')
    createdDocument.body.innerHTML = unsafeHtml

    var whitelistKeys = $.map(whiteList, function (el, i) { return i })
    var elements = $(createdDocument.body).find('*')

    for (var i = 0, len = elements.length; i < len; i++) {
      var el = elements[i]
      var elName = el.nodeName.toLowerCase()

      if ($.inArray(elName, whitelistKeys) === -1) {
        el.parentNode.removeChild(el)

        continue
      }

      var attributeList = $.map(el.attributes, function (el) { return el })
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || [])

      for (var j = 0, len2 = attributeList.length; j < len2; j++) {
        if (!allowedAttribute(attributeList[j], whitelistedAttributes)) {
          el.removeAttribute(attributeList[j].nodeName)
        }
      }
    }

    return createdDocument.body.innerHTML
  }

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.4.1'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    },
    sanitize : true,
    sanitizeFn : null,
    whiteList : DefaultWhitelist
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    var dataAttributes = this.$element.data()

    for (var dataAttr in dataAttributes) {
      if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
        delete dataAttributes[dataAttr]
      }
    }

    options = $.extend({}, this.getDefaults(), dataAttributes, options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    if (options.sanitize) {
      options.template = sanitizeHtml(options.template, options.whiteList, options.sanitizeFn)
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    if (this.options.html) {
      if (this.options.sanitize) {
        title = sanitizeHtml(title, this.options.whiteList, this.options.sanitizeFn)
      }

      $tip.find('.tooltip-inner').html(title)
    } else {
      $tip.find('.tooltip-inner').text(title)
    }

    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }

  Tooltip.prototype.sanitizeHtml = function (unsafeHtml) {
    return sanitizeHtml(unsafeHtml, this.options.whiteList, this.options.sanitizeFn)
  }

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.4.1'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    if (this.options.html) {
      var typeContent = typeof content

      if (this.options.sanitize) {
        title = this.sanitizeHtml(title)

        if (typeContent === 'string') {
          content = this.sanitizeHtml(content)
        }
      }

      $tip.find('.popover-title').html(title)
      $tip.find('.popover-content').children().detach().end()[
        typeContent === 'string' ? 'html' : 'append'
      ](content)
    } else {
      $tip.find('.popover-title').text(title)
      $tip.find('.popover-content').children().detach().end().text(content)
    }

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
        o.content.call($e[0]) :
        o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.4.1'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

    this.$target = target
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.4.1'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*! bootstrap-progressbar v0.9.0 | Copyright (c) 2012-2015 Stephan Groß | MIT license | http://www.minddust.com */
!function(t){"use strict";var e=function(n,s){this.$element=t(n),this.options=t.extend({},e.defaults,s)};e.defaults={transition_delay:300,refresh_speed:50,display_text:"none",use_percentage:!0,percent_format:function(t){return t+"%"},amount_format:function(t,e){return t+" / "+e},update:t.noop,done:t.noop,fail:t.noop},e.prototype.transition=function(){var n=this.$element,s=n.parent(),a=this.$back_text,r=this.$front_text,i=this.options,o=parseInt(n.attr("data-transitiongoal")),h=parseInt(n.attr("aria-valuemin"))||0,d=parseInt(n.attr("aria-valuemax"))||100,f=s.hasClass("vertical"),p=i.update&&"function"==typeof i.update?i.update:e.defaults.update,u=i.done&&"function"==typeof i.done?i.done:e.defaults.done,c=i.fail&&"function"==typeof i.fail?i.fail:e.defaults.fail;if(isNaN(o))return void c("data-transitiongoal not set");var l=Math.round(100*(o-h)/(d-h));if("center"===i.display_text&&!a&&!r){this.$back_text=a=t("<span>").addClass("progressbar-back-text").prependTo(s),this.$front_text=r=t("<span>").addClass("progressbar-front-text").prependTo(n);var g;f?(g=s.css("height"),a.css({height:g,"line-height":g}),r.css({height:g,"line-height":g}),t(window).resize(function(){g=s.css("height"),a.css({height:g,"line-height":g}),r.css({height:g,"line-height":g})})):(g=s.css("width"),r.css({width:g}),t(window).resize(function(){g=s.css("width"),r.css({width:g})}))}setTimeout(function(){var t,e,c,g,_;f?n.css("height",l+"%"):n.css("width",l+"%");var x=setInterval(function(){f?(c=n.height(),g=s.height()):(c=n.width(),g=s.width()),t=Math.round(100*c/g),e=Math.round(h+c/g*(d-h)),t>=l&&(t=l,e=o,u(n),clearInterval(x)),"none"!==i.display_text&&(_=i.use_percentage?i.percent_format(t):i.amount_format(e,d,h),"fill"===i.display_text?n.text(_):"center"===i.display_text&&(a.text(_),r.text(_))),n.attr("aria-valuenow",e),p(t,n)},i.refresh_speed)},i.transition_delay)};var n=t.fn.progressbar;t.fn.progressbar=function(n){return this.each(function(){var s=t(this),a=s.data("bs.progressbar"),r="object"==typeof n&&n;a&&r&&t.extend(a.options,r),a||s.data("bs.progressbar",a=new e(this,r)),a.transition()})},t.fn.progressbar.Constructor=e,t.fn.progressbar.noConflict=function(){return t.fn.progressbar=n,this}}(window.jQuery);
/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args); 
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

	
	
// Sidebar
function init_sidebar() {
// TODO: This is some kind of easy fix, maybe we can improve this
var setContentHeight = function () {
	// reset height
	$RIGHT_COL.css('min-height', $(window).height());

	var bodyHeight = $BODY.outerHeight(),
		footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
		leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
		contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

	// normalize content
	contentHeight -= $NAV_MENU.height() + footerHeight;

	$RIGHT_COL.css('min-height', contentHeight);
};

  $SIDEBAR_MENU.find('a').on('click', function(ev) {
	  console.log('clicked - sidebar_menu');
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }else
            {
				if ( $BODY.is( ".nav-sm" ) )
				{
					$SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
					$SIDEBAR_MENU.find( "li ul" ).slideUp();
				}
			}
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

// toggle small or large menu 
$MENU_TOGGLE.on('click', function() {
		console.log('clicked - menu toggle');
		
		if ($BODY.hasClass('nav-md')) {
			$SIDEBAR_MENU.find('li.active ul').hide();
			$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
		} else {
			$SIDEBAR_MENU.find('li.active-sm ul').show();
			$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
		}

	$BODY.toggleClass('nav-md nav-sm');

	setContentHeight();

	$('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
});

	// check active menu
	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

	$SIDEBAR_MENU.find('a').filter(function () {
		return this.href == CURRENT_URL;
	}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
		setContentHeight();
	}).parent().addClass('active');

	// recompute content when resizing
	$(window).smartresize(function(){  
		setContentHeight();
	});

	setContentHeight();

	// fixed sidebar
	if ($.fn.mCustomScrollbar) {
		$('.menu_fixed').mCustomScrollbar({
			autoHideScrollbar: true,
			theme: 'minimal',
			mouseWheel:{ preventDefault: true }
		});
	}
};
// /Sidebar

	var randNum = function() {
	  return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
	};


// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        
        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200); 
            $BOX_PANEL.css('height', 'auto');  
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Progressbar
if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar();
}
// /Progressbar

// Switchery
$(document).ready(function() {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery


// iCheck
$(document).ready(function() {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}



// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).load(function () {
        NProgress.done();
    });
}

	
	  //hover and retain popover when on popover content
        var originalLeave = $.fn.popover.Constructor.prototype.leave;
        $.fn.popover.Constructor.prototype.leave = function(obj) {
          var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
          var container, timeout;

          originalLeave.call(this, obj);

          if (obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover');
            timeout = self.timeout;
            container.one('mouseenter', function() {
              //We entered the actual popover – call off the dogs
              clearTimeout(timeout);
              //Let's monitor popover content instead
              container.one('mouseleave', function() {
                $.fn.popover.Constructor.prototype.leave.call(self, self);
              });
            });
          }
        };

        $('body').popover({
          selector: '[data-popover]',
          trigger: 'click hover',
          delay: {
            show: 50,
            hide: 400
          }
        });


	function gd(year, month, day) {
		return new Date(year, month - 1, day).getTime();
	}
	  
	
	function init_flot_chart(){
		
		if( typeof ($.plot) === 'undefined'){ return; }
		
		console.log('init_flot_chart');
		
		
		
		var arr_data1 = [
			[gd(2012, 1, 1), 17],
			[gd(2012, 1, 2), 74],
			[gd(2012, 1, 3), 6],
			[gd(2012, 1, 4), 39],
			[gd(2012, 1, 5), 20],
			[gd(2012, 1, 6), 85],
			[gd(2012, 1, 7), 7]
		];

		var arr_data2 = [
		  [gd(2012, 1, 1), 82],
		  [gd(2012, 1, 2), 23],
		  [gd(2012, 1, 3), 66],
		  [gd(2012, 1, 4), 9],
		  [gd(2012, 1, 5), 119],
		  [gd(2012, 1, 6), 6],
		  [gd(2012, 1, 7), 9]
		];
		
		var arr_data3 = [
			[0, 1],
			[1, 9],
			[2, 6],
			[3, 10],
			[4, 5],
			[5, 17],
			[6, 6],
			[7, 10],
			[8, 7],
			[9, 11],
			[10, 35],
			[11, 9],
			[12, 12],
			[13, 5],
			[14, 3],
			[15, 4],
			[16, 9]
		];
		
		var chart_plot_02_data = [];
		
		var chart_plot_03_data = [
			[0, 1],
			[1, 9],
			[2, 6],
			[3, 10],
			[4, 5],
			[5, 17],
			[6, 6],
			[7, 10],
			[8, 7],
			[9, 11],
			[10, 35],
			[11, 9],
			[12, 12],
			[13, 5],
			[14, 3],
			[15, 4],
			[16, 9]
		];
		
		
		for (var i = 0; i < 30; i++) {
		  chart_plot_02_data.push([new Date(Date.today().add(i).days()).getTime(), randNum() + i + i + 10]);
		}
		
		
		var chart_plot_01_settings = {
          series: {
            lines: {
              show: false,
              fill: true
            },
            splines: {
              show: true,
              tension: 0.4,
              lineWidth: 1,
              fill: 0.4
            },
            points: {
              radius: 0,
              show: true
            },
            shadowSize: 2
          },
          grid: {
            verticalLines: true,
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#fff'
          },
          colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
          xaxis: {
            tickColor: "rgba(51, 51, 51, 0.06)",
            mode: "time",
            tickSize: [1, "day"],
            //tickLength: 10,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
          },
          yaxis: {
            ticks: 8,
            tickColor: "rgba(51, 51, 51, 0.06)",
          },
          tooltip: false
        }
		
		var chart_plot_02_settings = {
			grid: {
				show: true,
				aboveData: true,
				color: "#3f3f3f",
				labelMargin: 10,
				axisMargin: 0,
				borderWidth: 0,
				borderColor: null,
				minBorderMargin: 5,
				clickable: true,
				hoverable: true,
				autoHighlight: true,
				mouseActiveRadius: 100
			},
			series: {
				lines: {
					show: true,
					fill: true,
					lineWidth: 2,
					steps: false
				},
				points: {
					show: true,
					radius: 4.5,
					symbol: "circle",
					lineWidth: 3.0
				}
			},
			legend: {
				position: "ne",
				margin: [0, -25],
				noColumns: 0,
				labelBoxBorderColor: null,
				labelFormatter: function(label, series) {
					return label + '&nbsp;&nbsp;';
				},
				width: 40,
				height: 1
			},
			colors: ['#96CA59', '#3F97EB', '#72c380', '#6f7a8a', '#f7cb38', '#5a8022', '#2c7282'],
			shadowSize: 0,
			tooltip: true,
			tooltipOpts: {
				content: "%s: %y.0",
				xDateFormat: "%d/%m",
			shifts: {
				x: -30,
				y: -50
			},
			defaultTheme: false
			},
			yaxis: {
				min: 0
			},
			xaxis: {
				mode: "time",
				minTickSize: [1, "day"],
				timeformat: "%d/%m/%y",
				min: chart_plot_02_data[0][0],
				max: chart_plot_02_data[20][0]
			}
		};	
	
		var chart_plot_03_settings = {
			series: {
				curvedLines: {
					apply: true,
					active: true,
					monotonicFit: true
				}
			},
			colors: ["#26B99A"],
			grid: {
				borderWidth: {
					top: 0,
					right: 0,
					bottom: 1,
					left: 1
				},
				borderColor: {
					bottom: "#7F8790",
					left: "#7F8790"
				}
			}
		};
        
		
        if ($("#chart_plot_01").length){
			console.log('Plot1');
			
			$.plot( $("#chart_plot_01"), [ arr_data1, arr_data2 ],  chart_plot_01_settings );
		}
		
		
		if ($("#chart_plot_02").length){
			console.log('Plot2');
			
			$.plot( $("#chart_plot_02"), 
			[{ 
				label: "Email Sent", 
				data: chart_plot_02_data, 
				lines: { 
					fillColor: "rgba(150, 202, 89, 0.12)" 
				}, 
				points: { 
					fillColor: "#fff" } 
			}], chart_plot_02_settings);
			
		}
		
		if ($("#chart_plot_03").length){
			console.log('Plot3');
			
			
			$.plot($("#chart_plot_03"), [{
				label: "Registrations",
				data: chart_plot_03_data,
				lines: {
					fillColor: "rgba(150, 202, 89, 0.12)"
				}, 
				points: {
					fillColor: "#fff"
				}
			}], chart_plot_03_settings);
			
		};
	  
	} 
	
		
	/* STARRR */
			
	function init_starrr() {
		
		if( typeof (starrr) === 'undefined'){ return; }
		console.log('init_starrr');
		
		$(".stars").starrr();

		$('.stars-existing').starrr({
		  rating: 4
		});

		$('.stars').on('starrr:change', function (e, value) {
		  $('.stars-count').html(value);
		});

		$('.stars-existing').on('starrr:change', function (e, value) {
		  $('.stars-count-existing').html(value);
		});
		
	  };
	
	
	function init_JQVmap(){

		//console.log('check init_JQVmap [' + typeof (VectorCanvas) + '][' + typeof (jQuery.fn.vectorMap) + ']' );	
		
		if(typeof (jQuery.fn.vectorMap) === 'undefined'){ return; }
		
		console.log('init_JQVmap');
	     
			if ($('#world-map-gdp').length ){
		 
				$('#world-map-gdp').vectorMap({
					map: 'world_en',
					backgroundColor: null,
					color: '#ffffff',
					hoverOpacity: 0.7,
					selectedColor: '#666666',
					enableZoom: true,
					showTooltip: true,
					values: sample_data,
					scaleColors: ['#E6F2F0', '#149B7E'],
					normalizeFunction: 'polynomial'
				});
			
			}
			
			if ($('#usa_map').length ){
			
				$('#usa_map').vectorMap({
					map: 'usa_en',
					backgroundColor: null,
					color: '#ffffff',
					hoverOpacity: 0.7,
					selectedColor: '#666666',
					enableZoom: true,
					showTooltip: true,
					values: sample_data,
					scaleColors: ['#E6F2F0', '#149B7E'],
					normalizeFunction: 'polynomial'
				});
			
			}
			
	};
			
	    
	function init_skycons(){
				
			if( typeof (Skycons) === 'undefined'){ return; }
			console.log('init_skycons');
		
			var icons = new Skycons({
				"color": "#73879C"
			  }),
			  list = [
				"clear-day", "clear-night", "partly-cloudy-day",
				"partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
				"fog"
			  ],
			  i;

			for (i = list.length; i--;)
			  icons.set(list[i], list[i]);

			icons.play();
	
	}  
	   
	   
	function init_chart_doughnut(){
				
		if( typeof (Chart) === 'undefined'){ return; }
		
		console.log('init_chart_doughnut');
	 
		if ($('.canvasDoughnut').length){
			
		var chart_doughnut_settings = {
				type: 'doughnut',
				tooltipFillColor: "rgba(51, 51, 51, 0.55)",
				data: {
					labels: [
						"Symbian",
						"Blackberry",
						"Other",
						"Android",
						"IOS"
					],
					datasets: [{
						data: [15, 20, 30, 10, 30],
						backgroundColor: [
							"#BDC3C7",
							"#9B59B6",
							"#E74C3C",
							"#26B99A",
							"#3498DB"
						],
						hoverBackgroundColor: [
							"#CFD4D8",
							"#B370CF",
							"#E95E4F",
							"#36CAAB",
							"#49A9EA"
						]
					}]
				},
				options: { 
					legend: false, 
					responsive: false 
				}
			}
		
			$('.canvasDoughnut').each(function(){
				
				var chart_element = $(this);
				var chart_doughnut = new Chart( chart_element, chart_doughnut_settings);
				
			});			
		
		}  
	   
	}
	   
	function init_gauge() {
			
		if( typeof (Gauge) === 'undefined'){ return; }
		
		console.log('init_gauge [' + $('.gauge-chart').length + ']');
		
		console.log('init_gauge');
		

		  var chart_gauge_settings = {
		  lines: 12,
		  angle: 0,
		  lineWidth: 0.4,
		  pointer: {
			  length: 0.75,
			  strokeWidth: 0.042,
			  color: '#1D212A'
		  },
		  limitMax: 'false',
		  colorStart: '#1ABC9C',
		  colorStop: '#1ABC9C',
		  strokeColor: '#F0F3F3',
		  generateGradient: true
	  };
		
		
		if ($('#chart_gauge_01').length){ 
		
			var chart_gauge_01_elem = document.getElementById('chart_gauge_01');
			var chart_gauge_01 = new Gauge(chart_gauge_01_elem).setOptions(chart_gauge_settings);
			
		}	
		
		
		if ($('#gauge-text').length){ 
		
			chart_gauge_01.maxValue = 6000;
			chart_gauge_01.animationSpeed = 32;
			chart_gauge_01.set(3200);
			chart_gauge_01.setTextField(document.getElementById("gauge-text"));
		
		}
		
		if ($('#chart_gauge_02').length){
		
			var chart_gauge_02_elem = document.getElementById('chart_gauge_02');
			var chart_gauge_02 = new Gauge(chart_gauge_02_elem).setOptions(chart_gauge_settings);
			
		}
		
		
		if ($('#gauge-text2').length){
			
			chart_gauge_02.maxValue = 9000;
			chart_gauge_02.animationSpeed = 32;
			chart_gauge_02.set(2400);
			chart_gauge_02.setTextField(document.getElementById("gauge-text2"));
		
		}
	
	
	}   
	   	   
	/* SPARKLINES */
			
		function init_sparklines() {
			
			if(typeof (jQuery.fn.sparkline) === 'undefined'){ return; }
			console.log('init_sparklines'); 
			
			
			$(".sparkline_one").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
				type: 'bar',
				height: '125',
				barWidth: 13,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 2,
				barColor: '#26B99A'
			});
			
			
			$(".sparkline_two").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
				type: 'bar',
				height: '40',
				barWidth: 9,
				colorMap: {
					'7': '#a1a1a1'	
				},
				barSpacing: 2,
				barColor: '#26B99A'
			});
			
			
			$(".sparkline_three").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
				type: 'line',
				width: '200',
				height: '40',
				lineColor: '#26B99A',
				fillColor: 'rgba(223, 223, 223, 0.57)',
				lineWidth: 2,
				spotColor: '#26B99A',
				minSpotColor: '#26B99A'
			});
			
			
			$(".sparkline11").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				height: '40',
				barWidth: 8,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 2,
				barColor: '#26B99A'
			});
			
			
			$(".sparkline22").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6], {
				type: 'line',
				height: '40',
				width: '200',
				lineColor: '#26B99A',
				fillColor: '#ffffff',
				lineWidth: 3,
				spotColor: '#34495E',
				minSpotColor: '#34495E'
			});
	
	
			$(".sparkline_bar").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
				type: 'bar',
				colorMap: {
					'7': '#a1a1a1'
				},
				barColor: '#26B99A'
			});
			
			
			$(".sparkline_area").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
				type: 'line',
				lineColor: '#26B99A',
				fillColor: '#26B99A',
				spotColor: '#4578a0',
				minSpotColor: '#728fb2',
				maxSpotColor: '#6d93c4',
				highlightSpotColor: '#ef5179',
				highlightLineColor: '#8ba8bf',
				spotRadius: 2.5,
				width: 85
			});
			
			
			$(".sparkline_line").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
				type: 'line',
				lineColor: '#26B99A',
				fillColor: '#ffffff',
				width: 85,
				spotColor: '#34495E',
				minSpotColor: '#34495E'
			});
			
			
			$(".sparkline_pie").sparkline([1, 1, 2, 1], {
				type: 'pie',
				sliceColors: ['#26B99A', '#ccc', '#75BCDD', '#D66DE2']
			});
			
			
			$(".sparkline_discreet").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 2, 4, 3, 7, 8, 9, 7, 6, 4, 3], {
				type: 'discrete',
				barWidth: 3,
				lineColor: '#26B99A',
				width: '85',
			});

			
		};   
	   
	   
	   /* AUTOCOMPLETE */
			
		function init_autocomplete() {
			
			if( typeof (autocomplete) === 'undefined'){ return; }
			console.log('init_autocomplete');
			
			var countries = { AD:"Andorra",A2:"Andorra Test",AE:"United Arab Emirates",AF:"Afghanistan",AG:"Antigua and Barbuda",AI:"Anguilla",AL:"Albania",AM:"Armenia",AN:"Netherlands Antilles",AO:"Angola",AQ:"Antarctica",AR:"Argentina",AS:"American Samoa",AT:"Austria",AU:"Australia",AW:"Aruba",AX:"Åland Islands",AZ:"Azerbaijan",BA:"Bosnia and Herzegovina",BB:"Barbados",BD:"Bangladesh",BE:"Belgium",BF:"Burkina Faso",BG:"Bulgaria",BH:"Bahrain",BI:"Burundi",BJ:"Benin",BL:"Saint Barthélemy",BM:"Bermuda",BN:"Brunei",BO:"Bolivia",BQ:"British Antarctic Territory",BR:"Brazil",BS:"Bahamas",BT:"Bhutan",BV:"Bouvet Island",BW:"Botswana",BY:"Belarus",BZ:"Belize",CA:"Canada",CC:"Cocos [Keeling] Islands",CD:"Congo - Kinshasa",CF:"Central African Republic",CG:"Congo - Brazzaville",CH:"Switzerland",CI:"Côte d’Ivoire",CK:"Cook Islands",CL:"Chile",CM:"Cameroon",CN:"China",CO:"Colombia",CR:"Costa Rica",CS:"Serbia and Montenegro",CT:"Canton and Enderbury Islands",CU:"Cuba",CV:"Cape Verde",CX:"Christmas Island",CY:"Cyprus",CZ:"Czech Republic",DD:"East Germany",DE:"Germany",DJ:"Djibouti",DK:"Denmark",DM:"Dominica",DO:"Dominican Republic",DZ:"Algeria",EC:"Ecuador",EE:"Estonia",EG:"Egypt",EH:"Western Sahara",ER:"Eritrea",ES:"Spain",ET:"Ethiopia",FI:"Finland",FJ:"Fiji",FK:"Falkland Islands",FM:"Micronesia",FO:"Faroe Islands",FQ:"French Southern and Antarctic Territories",FR:"France",FX:"Metropolitan France",GA:"Gabon",GB:"United Kingdom",GD:"Grenada",GE:"Georgia",GF:"French Guiana",GG:"Guernsey",GH:"Ghana",GI:"Gibraltar",GL:"Greenland",GM:"Gambia",GN:"Guinea",GP:"Guadeloupe",GQ:"Equatorial Guinea",GR:"Greece",GS:"South Georgia and the South Sandwich Islands",GT:"Guatemala",GU:"Guam",GW:"Guinea-Bissau",GY:"Guyana",HK:"Hong Kong SAR China",HM:"Heard Island and McDonald Islands",HN:"Honduras",HR:"Croatia",HT:"Haiti",HU:"Hungary",ID:"Indonesia",IE:"Ireland",IL:"Israel",IM:"Isle of Man",IN:"India",IO:"British Indian Ocean Territory",IQ:"Iraq",IR:"Iran",IS:"Iceland",IT:"Italy",JE:"Jersey",JM:"Jamaica",JO:"Jordan",JP:"Japan",JT:"Johnston Island",KE:"Kenya",KG:"Kyrgyzstan",KH:"Cambodia",KI:"Kiribati",KM:"Comoros",KN:"Saint Kitts and Nevis",KP:"North Korea",KR:"South Korea",KW:"Kuwait",KY:"Cayman Islands",KZ:"Kazakhstan",LA:"Laos",LB:"Lebanon",LC:"Saint Lucia",LI:"Liechtenstein",LK:"Sri Lanka",LR:"Liberia",LS:"Lesotho",LT:"Lithuania",LU:"Luxembourg",LV:"Latvia",LY:"Libya",MA:"Morocco",MC:"Monaco",MD:"Moldova",ME:"Montenegro",MF:"Saint Martin",MG:"Madagascar",MH:"Marshall Islands",MI:"Midway Islands",MK:"Macedonia",ML:"Mali",MM:"Myanmar [Burma]",MN:"Mongolia",MO:"Macau SAR China",MP:"Northern Mariana Islands",MQ:"Martinique",MR:"Mauritania",MS:"Montserrat",MT:"Malta",MU:"Mauritius",MV:"Maldives",MW:"Malawi",MX:"Mexico",MY:"Malaysia",MZ:"Mozambique",NA:"Namibia",NC:"New Caledonia",NE:"Niger",NF:"Norfolk Island",NG:"Nigeria",NI:"Nicaragua",NL:"Netherlands",NO:"Norway",NP:"Nepal",NQ:"Dronning Maud Land",NR:"Nauru",NT:"Neutral Zone",NU:"Niue",NZ:"New Zealand",OM:"Oman",PA:"Panama",PC:"Pacific Islands Trust Territory",PE:"Peru",PF:"French Polynesia",PG:"Papua New Guinea",PH:"Philippines",PK:"Pakistan",PL:"Poland",PM:"Saint Pierre and Miquelon",PN:"Pitcairn Islands",PR:"Puerto Rico",PS:"Palestinian Territories",PT:"Portugal",PU:"U.S. Miscellaneous Pacific Islands",PW:"Palau",PY:"Paraguay",PZ:"Panama Canal Zone",QA:"Qatar",RE:"Réunion",RO:"Romania",RS:"Serbia",RU:"Russia",RW:"Rwanda",SA:"Saudi Arabia",SB:"Solomon Islands",SC:"Seychelles",SD:"Sudan",SE:"Sweden",SG:"Singapore",SH:"Saint Helena",SI:"Slovenia",SJ:"Svalbard and Jan Mayen",SK:"Slovakia",SL:"Sierra Leone",SM:"San Marino",SN:"Senegal",SO:"Somalia",SR:"Suriname",ST:"São Tomé and Príncipe",SU:"Union of Soviet Socialist Republics",SV:"El Salvador",SY:"Syria",SZ:"Swaziland",TC:"Turks and Caicos Islands",TD:"Chad",TF:"French Southern Territories",TG:"Togo",TH:"Thailand",TJ:"Tajikistan",TK:"Tokelau",TL:"Timor-Leste",TM:"Turkmenistan",TN:"Tunisia",TO:"Tonga",TR:"Turkey",TT:"Trinidad and Tobago",TV:"Tuvalu",TW:"Taiwan",TZ:"Tanzania",UA:"Ukraine",UG:"Uganda",UM:"U.S. Minor Outlying Islands",US:"United States",UY:"Uruguay",UZ:"Uzbekistan",VA:"Vatican City",VC:"Saint Vincent and the Grenadines",VD:"North Vietnam",VE:"Venezuela",VG:"British Virgin Islands",VI:"U.S. Virgin Islands",VN:"Vietnam",VU:"Vanuatu",WF:"Wallis and Futuna",WK:"Wake Island",WS:"Samoa",YD:"People's Democratic Republic of Yemen",YE:"Yemen",YT:"Mayotte",ZA:"South Africa",ZM:"Zambia",ZW:"Zimbabwe",ZZ:"Unknown or Invalid Region" };

			var countriesArray = $.map(countries, function(value, key) {
			  return {
				value: value,
				data: key
			  };
			});

			// initialize autocomplete with custom appendTo
			$('#autocomplete-custom-append').autocomplete({
			  lookup: countriesArray
			});
			
		};
	   
	 /* AUTOSIZE */
			
		function init_autosize() {
			
			if(typeof $.fn.autosize !== 'undefined'){
			
			autosize($('.resizable_textarea'));
			
			}
			
		};  
	   
	   /* PARSLEY */
			
		function init_parsley() {
			
			if( typeof (parsley) === 'undefined'){ return; }
			console.log('init_parsley');
			
			$/*.listen*/('parsley:field:validate', function() {
			  validateFront();
			});
			$('#demo-form .btn').on('click', function() {
			  $('#demo-form').parsley().validate();
			  validateFront();
			});
			var validateFront = function() {
			  if (true === $('#demo-form').parsley().isValid()) {
				$('.bs-callout-info').removeClass('hidden');
				$('.bs-callout-warning').addClass('hidden');
			  } else {
				$('.bs-callout-info').addClass('hidden');
				$('.bs-callout-warning').removeClass('hidden');
			  }
			};
		  
			$/*.listen*/('parsley:field:validate', function() {
			  validateFront();
			});
			$('#demo-form2 .btn').on('click', function() {
			  $('#demo-form2').parsley().validate();
			  validateFront();
			});
			var validateFront = function() {
			  if (true === $('#demo-form2').parsley().isValid()) {
				$('.bs-callout-info').removeClass('hidden');
				$('.bs-callout-warning').addClass('hidden');
			  } else {
				$('.bs-callout-info').addClass('hidden');
				$('.bs-callout-warning').removeClass('hidden');
			  }
			};
			
			  try {
				hljs.initHighlightingOnLoad();
			  } catch (err) {}
			
		};
	   
		
		  /* INPUTS */
		  
			function onAddTag(tag) {
				alert("Added a tag: " + tag);
			  }

			  function onRemoveTag(tag) {
				alert("Removed a tag: " + tag);
			  }

			  function onChangeTag(input, tag) {
				alert("Changed a tag: " + tag);
			  }

			  //tags input
			function init_TagsInput() {
				  
				if(typeof $.fn.tagsInput !== 'undefined'){	
				 
				$('#tags_1').tagsInput({
				  width: 'auto'
				});
				
				}
				
		    };
	   
		/* SELECT2 */
	  
		function init_select2() {
			 
			if( typeof (select2) === 'undefined'){ return; }
			console.log('init_toolbox');
			 
			$(".select2_single").select2({
			  placeholder: "Select a state",
			  allowClear: true
			});
			$(".select2_group").select2({});
			$(".select2_multiple").select2({
			  maximumSelectionLength: 4,
			  placeholder: "With Max Selection limit 4",
			  allowClear: true
			});
			
		};
	   
	   /* WYSIWYG EDITOR */

		function init_wysiwyg() {
			
		if( typeof ($.fn.wysiwyg) === 'undefined'){ return; }
		console.log('init_wysiwyg');	
			
        function init_ToolbarBootstrapBindings() {
          var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
              'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
              'Times New Roman', 'Verdana'
            ],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
          $.each(fonts, function(idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
          });
          $('a[title]').tooltip({
            container: 'body'
          });
          $('.dropdown-menu input').click(function() {
              return false;
            })
            .change(function() {
              $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
            })
            .keydown('esc', function() {
              this.value = '';
              $(this).change();
            });

          $('[data-role=magic-overlay]').each(function() {
            var overlay = $(this),
              target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
          });

          if ("onwebkitspeechchange" in document.createElement("input")) {
            var editorOffset = $('#editor').offset();

            $('.voiceBtn').css('position', 'absolute').offset({
              top: editorOffset.top,
              left: editorOffset.left + $('#editor').innerWidth() - 35
            });
          } else {
            $('.voiceBtn').hide();
          }
        }

        function showErrorAlert(reason, detail) {
          var msg = '';
          if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
          } else {
            console.log("error uploading file", reason, detail);
          }
          $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
        }

       $('.editor-wrapper').each(function(){
			var id = $(this).attr('id');	//editor-one
			
			$(this).wysiwyg({
				toolbarSelector: '[data-target="#' + id + '"]',
				fileUploadError: showErrorAlert
			});	
		});
 
		
        window.prettyPrint;
        prettyPrint();
	
    };
	  
	/* CROPPER */
		
		function init_cropper() {
			
			
			if( typeof ($.fn.cropper) === 'undefined'){ return; }
			console.log('init_cropper');
			
			var $image = $('#image');
			var $download = $('#download');
			var $dataX = $('#dataX');
			var $dataY = $('#dataY');
			var $dataHeight = $('#dataHeight');
			var $dataWidth = $('#dataWidth');
			var $dataRotate = $('#dataRotate');
			var $dataScaleX = $('#dataScaleX');
			var $dataScaleY = $('#dataScaleY');
			var options = {
				  aspectRatio: 16 / 9,
				  preview: '.img-preview',
				  crop: function (e) {
					$dataX.val(Math.round(e.x));
					$dataY.val(Math.round(e.y));
					$dataHeight.val(Math.round(e.height));
					$dataWidth.val(Math.round(e.width));
					$dataRotate.val(e.rotate);
					$dataScaleX.val(e.scaleX);
					$dataScaleY.val(e.scaleY);
				  }
				};


			// Tooltip
			$('[data-toggle="tooltip"]').tooltip();


			// Cropper
			$image.on({
			  'build.cropper': function (e) {
				console.log(e.type);
			  },
			  'built.cropper': function (e) {
				console.log(e.type);
			  },
			  'cropstart.cropper': function (e) {
				console.log(e.type, e.action);
			  },
			  'cropmove.cropper': function (e) {
				console.log(e.type, e.action);
			  },
			  'cropend.cropper': function (e) {
				console.log(e.type, e.action);
			  },
			  'crop.cropper': function (e) {
				console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
			  },
			  'zoom.cropper': function (e) {
				console.log(e.type, e.ratio);
			  }
			}).cropper(options);


			// Buttons
			if (!$.isFunction(document.createElement('canvas').getContext)) {
			  $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
			}

			if (typeof document.createElement('cropper').style.transition === 'undefined') {
			  $('button[data-method="rotate"]').prop('disabled', true);
			  $('button[data-method="scale"]').prop('disabled', true);
			}


			// Download
			if (typeof $download[0].download === 'undefined') {
			  $download.addClass('disabled');
			}


			// Options
			$('.docs-toggles').on('change', 'input', function () {
			  var $this = $(this);
			  var name = $this.attr('name');
			  var type = $this.prop('type');
			  var cropBoxData;
			  var canvasData;

			  if (!$image.data('cropper')) {
				return;
			  }

			  if (type === 'checkbox') {
				options[name] = $this.prop('checked');
				cropBoxData = $image.cropper('getCropBoxData');
				canvasData = $image.cropper('getCanvasData');

				options.built = function () {
				  $image.cropper('setCropBoxData', cropBoxData);
				  $image.cropper('setCanvasData', canvasData);
				};
			  } else if (type === 'radio') {
				options[name] = $this.val();
			  }

			  $image.cropper('destroy').cropper(options);
			});


			// Methods
			$('.docs-buttons').on('click', '[data-method]', function () {
			  var $this = $(this);
			  var data = $this.data();
			  var $target;
			  var result;

			  if ($this.prop('disabled') || $this.hasClass('disabled')) {
				return;
			  }

			  if ($image.data('cropper') && data.method) {
				data = $.extend({}, data); // Clone a new one

				if (typeof data.target !== 'undefined') {
				  $target = $(data.target);

				  if (typeof data.option === 'undefined') {
					try {
					  data.option = JSON.parse($target.val());
					} catch (e) {
					  console.log(e.message);
					}
				  }
				}

				result = $image.cropper(data.method, data.option, data.secondOption);

				switch (data.method) {
				  case 'scaleX':
				  case 'scaleY':
					$(this).data('option', -data.option);
					break;

				  case 'getCroppedCanvas':
					if (result) {

					  // Bootstrap's Modal
					  $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

					  if (!$download.hasClass('disabled')) {
						$download.attr('href', result.toDataURL());
					  }
					}

					break;
				}

				if ($.isPlainObject(result) && $target) {
				  try {
					$target.val(JSON.stringify(result));
				  } catch (e) {
					console.log(e.message);
				  }
				}

			  }
			});

			// Keyboard
			$(document.body).on('keydown', function (e) {
			  if (!$image.data('cropper') || this.scrollTop > 300) {
				return;
			  }

			  switch (e.which) {
				case 37:
				  e.preventDefault();
				  $image.cropper('move', -1, 0);
				  break;

				case 38:
				  e.preventDefault();
				  $image.cropper('move', 0, -1);
				  break;

				case 39:
				  e.preventDefault();
				  $image.cropper('move', 1, 0);
				  break;

				case 40:
				  e.preventDefault();
				  $image.cropper('move', 0, 1);
				  break;
			  }
			});

			// Import image
			var $inputImage = $('#inputImage');
			var URL = window.URL || window.webkitURL;
			var blobURL;

			if (URL) {
			  $inputImage.change(function () {
				var files = this.files;
				var file;

				if (!$image.data('cropper')) {
				  return;
				}

				if (files && files.length) {
				  file = files[0];

				  if (/^image\/\w+$/.test(file.type)) {
					blobURL = URL.createObjectURL(file);
					$image.one('built.cropper', function () {

					  // Revoke when load complete
					  URL.revokeObjectURL(blobURL);
					}).cropper('reset').cropper('replace', blobURL);
					$inputImage.val('');
				  } else {
					window.alert('Please choose an image file.');
				  }
				}
			  });
			} else {
			  $inputImage.prop('disabled', true).parent().addClass('disabled');
			}
			
			
		};
		
		/* CROPPER --- end */  
	  
		/* KNOB */
	  
		function init_knob() {
		
				if( typeof ($.fn.knob) === 'undefined'){ return; }
				console.log('init_knob');
	
				$(".knob").knob({
				  change: function(value) {
					//console.log("change : " + value);
				  },
				  release: function(value) {
					//console.log(this.$.attr('value'));
					console.log("release : " + value);
				  },
				  cancel: function() {
					console.log("cancel : ", this);
				  },
				  /*format : function (value) {
				   return value + '%';
				   },*/
				  draw: function() {

					// "tron" case
					if (this.$.data('skin') == 'tron') {

					  this.cursorExt = 0.3;

					  var a = this.arc(this.cv) // Arc
						,
						pa // Previous arc
						, r = 1;

					  this.g.lineWidth = this.lineWidth;

					  if (this.o.displayPrevious) {
						pa = this.arc(this.v);
						this.g.beginPath();
						this.g.strokeStyle = this.pColor;
						this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
						this.g.stroke();
					  }

					  this.g.beginPath();
					  this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
					  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
					  this.g.stroke();

					  this.g.lineWidth = 2;
					  this.g.beginPath();
					  this.g.strokeStyle = this.o.fgColor;
					  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
					  this.g.stroke();

					  return false;
					}
				  }
				  
				});

				// Example of infinite knob, iPod click wheel
				var v, up = 0,
				  down = 0,
				  i = 0,
				  $idir = $("div.idir"),
				  $ival = $("div.ival"),
				  incr = function() {
					i++;
					$idir.show().html("+").fadeOut();
					$ival.html(i);
				  },
				  decr = function() {
					i--;
					$idir.show().html("-").fadeOut();
					$ival.html(i);
				  };
				$("input.infinite").knob({
				  min: 0,
				  max: 20,
				  stopper: false,
				  change: function() {
					if (v > this.cv) {
					  if (up) {
						decr();
						up = 0;
					  } else {
						up = 1;
						down = 0;
					  }
					} else {
					  if (v < this.cv) {
						if (down) {
						  incr();
						  down = 0;
						} else {
						  down = 1;
						  up = 0;
						}
					  }
					}
					v = this.cv;
				  }
				});
				
		};
	 
		/* INPUT MASK */
			
		function init_InputMask() {
			
			if( typeof ($.fn.inputmask) === 'undefined'){ return; }
			console.log('init_InputMask');
			
				$(":input").inputmask();
				
		};
	  
		/* COLOR PICKER */
			 
		function init_ColorPicker() {
			
			if( typeof ($.fn.colorpicker) === 'undefined'){ return; }
			console.log('init_ColorPicker');
			
				$('.demo1').colorpicker();
				$('.demo2').colorpicker();

				$('#demo_forceformat').colorpicker({
					format: 'rgba',
					horizontal: true
				});

				$('#demo_forceformat3').colorpicker({
					format: 'rgba',
				});

				$('.demo-auto').colorpicker();
			
		}; 
	   
	   
		/* ION RANGE SLIDER */
			
		function init_IonRangeSlider() {
			
			if( typeof ($.fn.ionRangeSlider) === 'undefined'){ return; }
			console.log('init_IonRangeSlider');
			
			$("#range_27").ionRangeSlider({
			  type: "double",
			  min: 1000000,
			  max: 2000000,
			  grid: true,
			  force_edges: true
			});
			$("#range").ionRangeSlider({
			  hide_min_max: true,
			  keyboard: true,
			  min: 0,
			  max: 5000,
			  from: 1000,
			  to: 4000,
			  type: 'double',
			  step: 1,
			  prefix: "$",
			  grid: true
			});
			$("#range_25").ionRangeSlider({
			  type: "double",
			  min: 1000000,
			  max: 2000000,
			  grid: true
			});
			$("#range_26").ionRangeSlider({
			  type: "double",
			  min: 0,
			  max: 10000,
			  step: 500,
			  grid: true,
			  grid_snap: true
			});
			$("#range_31").ionRangeSlider({
			  type: "double",
			  min: 0,
			  max: 100,
			  from: 30,
			  to: 70,
			  from_fixed: true
			});
			$(".range_min_max").ionRangeSlider({
			  type: "double",
			  min: 0,
			  max: 100,
			  from: 30,
			  to: 70,
			  max_interval: 50
			});
			$(".range_time24").ionRangeSlider({
			  min: +moment().subtract(12, "hours").format("X"),
			  max: +moment().format("X"),
			  from: +moment().subtract(6, "hours").format("X"),
			  grid: true,
			  force_edges: true,
			  prettify: function(num) {
				var m = moment(num, "X");
				return m.format("Do MMMM, HH:mm");
			  }
			});
			
		};
	   
	   
	   /* DATERANGEPICKER */
	   
		function init_daterangepicker() {

			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
			};

			var optionSet1 = {
			  startDate: moment().subtract(29, 'days'),
			  endDate: moment(),
			  minDate: '01/01/2012',
			  maxDate: '12/31/2015',
			  dateLimit: {
				days: 60
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: false,
			  timePickerIncrement: 1,
			  timePicker12Hour: true,
			  ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'MM/DD/YYYY',
			  separator: ' to ',
			  locale: {
				applyLabel: 'Submit',
				cancelLabel: 'Clear',
				fromLabel: 'From',
				toLabel: 'To',
				customRangeLabel: 'Custom',
				daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				firstDay: 1
			  }
			};
			
			$('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
			$('#reportrange').daterangepicker(optionSet1, cb);
			$('#reportrange').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
			});
			$('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange').data('daterangepicker').remove();
			});
   
		}
   	   
	   function init_daterangepicker_right() {
	      
				if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
				console.log('init_daterangepicker_right');
		  
				var cb = function(start, end, label) {
				  console.log(start.toISOString(), end.toISOString(), label);
				  $('#reportrange_right span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
				};

				var optionSet1 = {
				  startDate: moment().subtract(29, 'days'),
				  endDate: moment(),
				  minDate: '01/01/2012',
				  maxDate: '12/31/2020',
				  dateLimit: {
					days: 60
				  },
				  showDropdowns: true,
				  showWeekNumbers: true,
				  timePicker: false,
				  timePickerIncrement: 1,
				  timePicker12Hour: true,
				  ranges: {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				  },
				  opens: 'right',
				  buttonClasses: ['btn btn-default'],
				  applyClass: 'btn-small btn-primary',
				  cancelClass: 'btn-small',
				  format: 'MM/DD/YYYY',
				  separator: ' to ',
				  locale: {
					applyLabel: 'Submit',
					cancelLabel: 'Clear',
					fromLabel: 'From',
					toLabel: 'To',
					customRangeLabel: 'Custom',
					daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
					monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					firstDay: 1
				  }
				};

				$('#reportrange_right span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

				$('#reportrange_right').daterangepicker(optionSet1, cb);

				$('#reportrange_right').on('show.daterangepicker', function() {
				  console.log("show event fired");
				});
				$('#reportrange_right').on('hide.daterangepicker', function() {
				  console.log("hide event fired");
				});
				$('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
				  console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
				});
				$('#reportrange_right').on('cancel.daterangepicker', function(ev, picker) {
				  console.log("cancel event fired");
				});

				$('#options1').click(function() {
				  $('#reportrange_right').data('daterangepicker').setOptions(optionSet1, cb);
				});

				$('#options2').click(function() {
				  $('#reportrange_right').data('daterangepicker').setOptions(optionSet2, cb);
				});

				$('#destroy').click(function() {
				  $('#reportrange_right').data('daterangepicker').remove();
				});

	   }
	   
	    function init_daterangepicker_single_call() {
	      
			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker_single_call');
		   
			$('#single_cal1').daterangepicker({
			  singleDatePicker: true,
			  singleClasses: "picker_1"
			}, function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			});
			$('#single_cal2').daterangepicker({
			  singleDatePicker: true,
			  singleClasses: "picker_2"
			}, function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			});
			$('#single_cal3').daterangepicker({
			  singleDatePicker: true,
			  singleClasses: "picker_3"
			}, function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			});
			$('#single_cal4').daterangepicker({
			  singleDatePicker: true,
			  singleClasses: "picker_4"
			}, function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			});
  
  
		}
		
		 
		function init_daterangepicker_reservation() {
	      
			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker_reservation');
		 
			$('#reservation').daterangepicker(null, function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			});

			$('#reservation-time').daterangepicker({
			  timePicker: true,
			  timePickerIncrement: 30,
			  locale: {
				format: 'MM/DD/YYYY h:mm A'
			  }
			});
	
		}
	   
	   /* SMART WIZARD */
		
		function init_SmartWizard() {
			
			if( typeof ($.fn.smartWizard) === 'undefined'){ return; }
			console.log('init_SmartWizard');
			
			$('#wizard').smartWizard();

			$('#wizard_verticle').smartWizard({
			  transitionEffect: 'slide'
			});

			$('.buttonNext').addClass('btn btn-success');
			$('.buttonPrevious').addClass('btn btn-primary');
			$('.buttonFinish').addClass('btn btn-default');
			
		};
	   
	   
	  /* VALIDATOR */

	  function init_validator () {
		 
		if( typeof (validator) === 'undefined'){ return; }
		console.log('init_validator'); 
	  
	  // initialize the validator function
      validator.message.date = 'not a real date';

      // validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
      $('form')
        .on('blur', 'input[required], input.optional, select.required', validator.checkField)
        .on('change', 'select.required', validator.checkField)
        .on('keypress', 'input[required][pattern]', validator.keypress);

      $('.multi.required').on('keyup blur', 'input', function() {
        validator.checkField.apply($(this).siblings().last()[0]);
      });

      $('form').submit(function(e) {
        e.preventDefault();
        var submit = true;

        // evaluate the form using generic validaing
        if (!validator.checkAll($(this))) {
          submit = false;
        }

        if (submit)
          this.submit();

        return false;
		});
	  
	  };
	   
	  	/* PNotify */
			
		function init_PNotify() {
			
			if( typeof (PNotify) === 'undefined'){ return; }
			console.log('init_PNotify');
			
			new PNotify({
			  title: "PNotify",
			  type: "info",
			  text: "Welcome. Try hovering over me. You can click things behind me, because I'm non-blocking.",
			  nonblock: {
				  nonblock: true
			  },
			  addclass: 'dark',
			  styling: 'bootstrap3',
			  hide: false,
			  before_close: function(PNotify) {
				PNotify.update({
				  title: PNotify.options.title + " - Enjoy your Stay",
				  before_close: null
				});

				PNotify.queueRemove();

				return false;
			  }
			});

		}; 
	   
	   
	   /* CUSTOM NOTIFICATION */
			
		function init_CustomNotification() {
			
			console.log('run_customtabs');
			
			if( typeof (CustomTabs) === 'undefined'){ return; }
			console.log('init_CustomTabs');
			
			var cnt = 10;

			TabbedNotification = function(options) {
			  var message = "<div id='ntf" + cnt + "' class='text alert-" + options.type + "' style='display:none'><h2><i class='fa fa-bell'></i> " + options.title +
				"</h2><div class='close'><a href='javascript:;' class='notification_close'><i class='fa fa-close'></i></a></div><p>" + options.text + "</p></div>";

			  if (!document.getElementById('custom_notifications')) {
				alert('doesnt exists');
			  } else {
				$('#custom_notifications ul.notifications').append("<li><a id='ntlink" + cnt + "' class='alert-" + options.type + "' href='#ntf" + cnt + "'><i class='fa fa-bell animated shake'></i></a></li>");
				$('#custom_notifications #notif-group').append(message);
				cnt++;
				CustomTabs(options);
			  }
			};

			CustomTabs = function(options) {
			  $('.tabbed_notifications > div').hide();
			  $('.tabbed_notifications > div:first-of-type').show();
			  $('#custom_notifications').removeClass('dsp_none');
			  $('.notifications a').click(function(e) {
				e.preventDefault();
				var $this = $(this),
				  tabbed_notifications = '#' + $this.parents('.notifications').data('tabbed_notifications'),
				  others = $this.closest('li').siblings().children('a'),
				  target = $this.attr('href');
				others.removeClass('active');
				$this.addClass('active');
				$(tabbed_notifications).children('div').hide();
				$(target).show();
			  });
			};

			CustomTabs();

			var tabid = idname = '';

			$(document).on('click', '.notification_close', function(e) {
			  idname = $(this).parent().parent().attr("id");
			  tabid = idname.substr(-2);
			  $('#ntf' + tabid).remove();
			  $('#ntlink' + tabid).parent().remove();
			  $('.notifications a').first().addClass('active');
			  $('#notif-group div').first().css('display', 'block');
			});
			
		};
		
			/* EASYPIECHART */
			
			function init_EasyPieChart() {
				
				if( typeof ($.fn.easyPieChart) === 'undefined'){ return; }
				console.log('init_EasyPieChart');
				
				$('.chart').easyPieChart({
				  easing: 'easeOutElastic',
				  delay: 3000,
				  barColor: '#26B99A',
				  trackColor: '#fff',
				  scaleColor: false,
				  lineWidth: 20,
				  trackWidth: 16,
				  lineCap: 'butt',
				  onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				  }
				});
				var chart = window.chart = $('.chart').data('easyPieChart');
				$('.js_update').on('click', function() {
				  chart.update(Math.random() * 200 - 100);
				});

				//hover and retain popover when on popover content
				var originalLeave = $.fn.popover.Constructor.prototype.leave;
				$.fn.popover.Constructor.prototype.leave = function(obj) {
				  var self = obj instanceof this.constructor ?
					obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
				  var container, timeout;

				  originalLeave.call(this, obj);

				  if (obj.currentTarget) {
					container = $(obj.currentTarget).siblings('.popover');
					timeout = self.timeout;
					container.one('mouseenter', function() {
					  //We entered the actual popover – call off the dogs
					  clearTimeout(timeout);
					  //Let's monitor popover content instead
					  container.one('mouseleave', function() {
						$.fn.popover.Constructor.prototype.leave.call(self, self);
					  });
					});
				  }
				};

				$('body').popover({
				  selector: '[data-popover]',
				  trigger: 'click hover',
				  delay: {
					show: 50,
					hide: 400
				  }
				});
				
			};
	   
		
		function init_charts() {
			
				console.log('run_charts  typeof [' + typeof (Chart) + ']');
			
				if( typeof (Chart) === 'undefined'){ return; }
				
				console.log('init_charts');
			
				
				Chart.defaults.global.legend = {
					enabled: false
				};
				
				

			if ($('#canvas_line').length ){
				
				var canvas_line_00 = new Chart(document.getElementById("canvas_line"), {
				  type: 'line',
				  data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [{
					  label: "My First dataset",
					  backgroundColor: "rgba(38, 185, 154, 0.31)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [31, 74, 6, 39, 20, 85, 7]
					}, {
					  label: "My Second dataset",
					  backgroundColor: "rgba(3, 88, 106, 0.3)",
					  borderColor: "rgba(3, 88, 106, 0.70)",
					  pointBorderColor: "rgba(3, 88, 106, 0.70)",
					  pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(151,187,205,1)",
					  pointBorderWidth: 1,
					  data: [82, 23, 66, 9, 99, 4, 2]
					}]
				  },
				});
				
			}

			
			if ($('#canvas_line1').length ){
			
				var canvas_line_01 = new Chart(document.getElementById("canvas_line1"), {
				  type: 'line',
				  data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [{
					  label: "My First dataset",
					  backgroundColor: "rgba(38, 185, 154, 0.31)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [31, 74, 6, 39, 20, 85, 7]
					}, {
					  label: "My Second dataset",
					  backgroundColor: "rgba(3, 88, 106, 0.3)",
					  borderColor: "rgba(3, 88, 106, 0.70)",
					  pointBorderColor: "rgba(3, 88, 106, 0.70)",
					  pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(151,187,205,1)",
					  pointBorderWidth: 1,
					  data: [82, 23, 66, 9, 99, 4, 2]
					}]
				  },
				});
			
			}
				
				
			if ($('#canvas_line2').length ){		
			
				var canvas_line_02 = new Chart(document.getElementById("canvas_line2"), {
				  type: 'line',
				  data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [{
					  label: "My First dataset",
					  backgroundColor: "rgba(38, 185, 154, 0.31)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [31, 74, 6, 39, 20, 85, 7]
					}, {
					  label: "My Second dataset",
					  backgroundColor: "rgba(3, 88, 106, 0.3)",
					  borderColor: "rgba(3, 88, 106, 0.70)",
					  pointBorderColor: "rgba(3, 88, 106, 0.70)",
					  pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(151,187,205,1)",
					  pointBorderWidth: 1,
					  data: [82, 23, 66, 9, 99, 4, 2]
					}]
				  },
				});

			}	
			
			
			if ($('#canvas_line3').length ){
			
				var canvas_line_03 = new Chart(document.getElementById("canvas_line3"), {
				  type: 'line',
				  data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [{
					  label: "My First dataset",
					  backgroundColor: "rgba(38, 185, 154, 0.31)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [31, 74, 6, 39, 20, 85, 7]
					}, {
					  label: "My Second dataset",
					  backgroundColor: "rgba(3, 88, 106, 0.3)",
					  borderColor: "rgba(3, 88, 106, 0.70)",
					  pointBorderColor: "rgba(3, 88, 106, 0.70)",
					  pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(151,187,205,1)",
					  pointBorderWidth: 1,
					  data: [82, 23, 66, 9, 99, 4, 2]
					}]
				  },
				});

			}	
			
			
			if ($('#canvas_line4').length ){
				
				var canvas_line_04 = new Chart(document.getElementById("canvas_line4"), {
				  type: 'line',
				  data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [{
					  label: "My First dataset",
					  backgroundColor: "rgba(38, 185, 154, 0.31)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [31, 74, 6, 39, 20, 85, 7]
					}, {
					  label: "My Second dataset",
					  backgroundColor: "rgba(3, 88, 106, 0.3)",
					  borderColor: "rgba(3, 88, 106, 0.70)",
					  pointBorderColor: "rgba(3, 88, 106, 0.70)",
					  pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(151,187,205,1)",
					  pointBorderWidth: 1,
					  data: [82, 23, 66, 9, 99, 4, 2]
					}]
				  },
				});		
				
			}
			
				
			  // Line chart
			 
			if ($('#lineChart').length ){	
			
			  var ctx = document.getElementById("lineChart");
			  var lineChart = new Chart(ctx, {
				type: 'line',
				data: {
				  labels: ["January", "February", "March", "April", "May", "June", "July"],
				  datasets: [{
					label: "My First dataset",
					backgroundColor: "rgba(38, 185, 154, 0.31)",
					borderColor: "rgba(38, 185, 154, 0.7)",
					pointBorderColor: "rgba(38, 185, 154, 0.7)",
					pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointBorderWidth: 1,
					data: [31, 74, 6, 39, 20, 85, 7]
				  }, {
					label: "My Second dataset",
					backgroundColor: "rgba(3, 88, 106, 0.3)",
					borderColor: "rgba(3, 88, 106, 0.70)",
					pointBorderColor: "rgba(3, 88, 106, 0.70)",
					pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(151,187,205,1)",
					pointBorderWidth: 1,
					data: [82, 23, 66, 9, 99, 4, 2]
				  }]
				},
			  });
			
			}
				
			  // Bar chart
			  
			if ($('#mybarChart').length ){ 
			  
			  var ctx = document.getElementById("mybarChart");
			  var mybarChart = new Chart(ctx, {
				type: 'bar',
				data: {
				  labels: ["January", "February", "March", "April", "May", "June", "July"],
				  datasets: [{
					label: '# of Votes',
					backgroundColor: "#26B99A",
					data: [51, 30, 40, 28, 92, 50, 45]
				  }, {
					label: '# of Votes',
					backgroundColor: "#03586A",
					data: [41, 56, 25, 48, 72, 34, 12]
				  }]
				},

				options: {
				  scales: {
					yAxes: [{
					  ticks: {
						beginAtZero: true
					  }
					}]
				  }
				}
			  });
			  
			} 
			  

			  // Doughnut chart
			  
			if ($('#canvasDoughnut').length ){ 
			  
			  var ctx = document.getElementById("canvasDoughnut");
			  var data = {
				labels: [
				  "Dark Grey",
				  "Purple Color",
				  "Gray Color",
				  "Green Color",
				  "Blue Color"
				],
				datasets: [{
				  data: [120, 50, 140, 180, 100],
				  backgroundColor: [
					"#455C73",
					"#9B59B6",
					"#BDC3C7",
					"#26B99A",
					"#3498DB"
				  ],
				  hoverBackgroundColor: [
					"#34495E",
					"#B370CF",
					"#CFD4D8",
					"#36CAAB",
					"#49A9EA"
				  ]

				}]
			  };

			  var canvasDoughnut = new Chart(ctx, {
				type: 'doughnut',
				tooltipFillColor: "rgba(51, 51, 51, 0.55)",
				data: data
			  });
			 
			} 

			  // Radar chart
			  
			if ($('#canvasRadar').length ){ 
			  
			  var ctx = document.getElementById("canvasRadar");
			  var data = {
				labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
				datasets: [{
				  label: "My First dataset",
				  backgroundColor: "rgba(3, 88, 106, 0.2)",
				  borderColor: "rgba(3, 88, 106, 0.80)",
				  pointBorderColor: "rgba(3, 88, 106, 0.80)",
				  pointBackgroundColor: "rgba(3, 88, 106, 0.80)",
				  pointHoverBackgroundColor: "#fff",
				  pointHoverBorderColor: "rgba(220,220,220,1)",
				  data: [65, 59, 90, 81, 56, 55, 40]
				}, {
				  label: "My Second dataset",
				  backgroundColor: "rgba(38, 185, 154, 0.2)",
				  borderColor: "rgba(38, 185, 154, 0.85)",
				  pointColor: "rgba(38, 185, 154, 0.85)",
				  pointStrokeColor: "#fff",
				  pointHighlightFill: "#fff",
				  pointHighlightStroke: "rgba(151,187,205,1)",
				  data: [28, 48, 40, 19, 96, 27, 100]
				}]
			  };

			  var canvasRadar = new Chart(ctx, {
				type: 'radar',
				data: data,
			  });
			
			}
			
			
			  // Pie chart
			  if ($('#pieChart').length ){
				  
				  var ctx = document.getElementById("pieChart");
				  var data = {
					datasets: [{
					  data: [120, 50, 140, 180, 100],
					  backgroundColor: [
						"#455C73",
						"#9B59B6",
						"#BDC3C7",
						"#26B99A",
						"#3498DB"
					  ],
					  label: 'My dataset' // for legend
					}],
					labels: [
					  "Dark Gray",
					  "Purple",
					  "Gray",
					  "Green",
					  "Blue"
					]
				  };

				  var pieChart = new Chart(ctx, {
					data: data,
					type: 'pie',
					otpions: {
					  legend: false
					}
				  });
				  
			  }
			
			  
			  // PolarArea chart

			if ($('#polarArea').length ){

				var ctx = document.getElementById("polarArea");
				var data = {
				datasets: [{
				  data: [120, 50, 140, 180, 100],
				  backgroundColor: [
					"#455C73",
					"#9B59B6",
					"#BDC3C7",
					"#26B99A",
					"#3498DB"
				  ],
				  label: 'My dataset'
				}],
				labels: [
				  "Dark Gray",
				  "Purple",
				  "Gray",
				  "Green",
				  "Blue"
				]
				};

				var polarArea = new Chart(ctx, {
				data: data,
				type: 'polarArea',
				options: {
				  scale: {
					ticks: {
					  beginAtZero: true
					}
				  }
				}
				});
			
			}
		}

		/* COMPOSE */
		
		function init_compose() {
		
			if( typeof ($.fn.slideToggle) === 'undefined'){ return; }
			console.log('init_compose');
		
			$('#compose, .compose-close').click(function(){
				$('.compose').slideToggle();
			});
		
		};
	   
	   	/* CALENDAR */
		  
		    function  init_calendar() {
					
				if( typeof ($.fn.fullCalendar) === 'undefined'){ return; }
				console.log('init_calendar');
					
				var date = new Date(),
					d = date.getDate(),
					m = date.getMonth(),
					y = date.getFullYear(),
					started,
					categoryClass;

				var calendar = $('#calendar').fullCalendar({
				  header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay,listMonth'
				  },
				  selectable: true,
				  selectHelper: true,
				  select: function(start, end, allDay) {
					$('#fc_create').click();

					started = start;
					ended = end;

					$(".antosubmit").on("click", function() {
					  var title = $("#title").val();
					  if (end) {
						ended = end;
					  }

					  categoryClass = $("#event_type").val();

					  if (title) {
						calendar.fullCalendar('renderEvent', {
							title: title,
							start: started,
							end: end,
							allDay: allDay
						  },
						  true // make the event "stick"
						);
					  }

					  $('#title').val('');

					  calendar.fullCalendar('unselect');

					  $('.antoclose').click();

					  return false;
					});
				  },
				  eventClick: function(calEvent, jsEvent, view) {
					$('#fc_edit').click();
					$('#title2').val(calEvent.title);

					categoryClass = $("#event_type").val();

					$(".antosubmit2").on("click", function() {
					  calEvent.title = $("#title2").val();

					  calendar.fullCalendar('updateEvent', calEvent);
					  $('.antoclose2').click();
					});

					calendar.fullCalendar('unselect');
				  },
				  editable: true,
				  events: [{
					title: 'All Day Event',
					start: new Date(y, m, 1)
				  }, {
					title: 'Long Event',
					start: new Date(y, m, d - 5),
					end: new Date(y, m, d - 2)
				  }, {
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: false
				  }, {
					title: 'Lunch',
					start: new Date(y, m, d + 14, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false
				  }, {
					title: 'Birthday Party',
					start: new Date(y, m, d + 1, 19, 0),
					end: new Date(y, m, d + 1, 22, 30),
					allDay: false
				  }, {
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				  }]
				});
				
			};
	   
		/* DATA TABLES */
			
			function init_DataTables() {
				
				console.log('run_datatables');
				
				if( typeof ($.fn.DataTable) === 'undefined'){ return; }
				console.log('init_DataTables');
				
				var handleDataTableButtons = function() {
				  if ($("#datatable-buttons").length) {
					$("#datatable-buttons").DataTable({
					  dom: "Bfrtip",
					  buttons: [
						{
						  extend: "copy",
						  className: "btn-sm"
						},
						{
						  extend: "csv",
						  className: "btn-sm"
						},
						{
						  extend: "excel",
						  className: "btn-sm"
						},
						{
						  extend: "pdfHtml5",
						  className: "btn-sm"
						},
						{
						  extend: "print",
						  className: "btn-sm"
						},
					  ],
					  responsive: true
					});
				  }
				};

				TableManageButtons = function() {
				  "use strict";
				  return {
					init: function() {
					  handleDataTableButtons();
					}
				  };
				}();

				$('#datatable').dataTable();

				$('#datatable-keytable').DataTable({
				  keys: true
				});

				$('#datatable-responsive').DataTable();

				$('#datatable-scroller').DataTable({
				  ajax: "js/datatables/json/scroller-demo.json",
				  deferRender: true,
				  scrollY: 380,
				  scrollCollapse: true,
				  scroller: true
				});

				$('#datatable-fixed-header').DataTable({
				  fixedHeader: true
				});

				var $datatable = $('#datatable-checkbox');

				$datatable.dataTable({
				  'order': [[ 1, 'asc' ]],
				  'columnDefs': [
					{ orderable: false, targets: [0] }
				  ]
				});
				$datatable.on('draw.dt', function() {
				  $('checkbox input').iCheck({
					checkboxClass: 'icheckbox_flat-green'
				  });
				});

				TableManageButtons.init();
				
			};
	   
			/* CHART - MORRIS  */
		
		function init_morris_charts() {
			
			if( typeof (Morris) === 'undefined'){ return; }
			console.log('init_morris_charts');
			
			if ($('#graph_bar').length){ 
			
				Morris.Bar({
				  element: 'graph_bar',
				  data: [
					{device: 'iPhone 4', geekbench: 380},
					{device: 'iPhone 4S', geekbench: 655},
					{device: 'iPhone 3GS', geekbench: 275},
					{device: 'iPhone 5', geekbench: 1571},
					{device: 'iPhone 5S', geekbench: 655},
					{device: 'iPhone 6', geekbench: 2154},
					{device: 'iPhone 6 Plus', geekbench: 1144},
					{device: 'iPhone 6S', geekbench: 2371},
					{device: 'iPhone 6S Plus', geekbench: 1471},
					{device: 'Other', geekbench: 1371}
				  ],
				  xkey: 'device',
				  ykeys: ['geekbench'],
				  labels: ['Geekbench'],
				  barRatio: 0.4,
				  barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
				  xLabelAngle: 35,
				  hideHover: 'auto',
				  resize: true
				});

			}	
			
			if ($('#graph_bar_group').length ){
			
				Morris.Bar({
				  element: 'graph_bar_group',
				  data: [
					{"period": "2016-10-01", "licensed": 807, "sorned": 660},
					{"period": "2016-09-30", "licensed": 1251, "sorned": 729},
					{"period": "2016-09-29", "licensed": 1769, "sorned": 1018},
					{"period": "2016-09-20", "licensed": 2246, "sorned": 1461},
					{"period": "2016-09-19", "licensed": 2657, "sorned": 1967},
					{"period": "2016-09-18", "licensed": 3148, "sorned": 2627},
					{"period": "2016-09-17", "licensed": 3471, "sorned": 3740},
					{"period": "2016-09-16", "licensed": 2871, "sorned": 2216},
					{"period": "2016-09-15", "licensed": 2401, "sorned": 1656},
					{"period": "2016-09-10", "licensed": 2115, "sorned": 1022}
				  ],
				  xkey: 'period',
				  barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
				  ykeys: ['licensed', 'sorned'],
				  labels: ['Licensed', 'SORN'],
				  hideHover: 'auto',
				  xLabelAngle: 60,
				  resize: true
				});

			}
			
			if ($('#graphx').length ){
			
				Morris.Bar({
				  element: 'graphx',
				  data: [
					{x: '2015 Q1', y: 2, z: 3, a: 4},
					{x: '2015 Q2', y: 3, z: 5, a: 6},
					{x: '2015 Q3', y: 4, z: 3, a: 2},
					{x: '2015 Q4', y: 2, z: 4, a: 5}
				  ],
				  xkey: 'x',
				  ykeys: ['y', 'z', 'a'],
				  barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
				  hideHover: 'auto',
				  labels: ['Y', 'Z', 'A'],
				  resize: true
				}).on('click', function (i, row) {
					console.log(i, row);
				});

			}
			
			if ($('#graph_area').length ){
			
				Morris.Area({
				  element: 'graph_area',
				  data: [
					{period: '2014 Q1', iphone: 2666, ipad: null, itouch: 2647},
					{period: '2014 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
					{period: '2014 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
					{period: '2014 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
					{period: '2015 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
					{period: '2015 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
					{period: '2015 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
					{period: '2015 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
					{period: '2016 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
					{period: '2016 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
				  ],
				  xkey: 'period',
				  ykeys: ['iphone', 'ipad', 'itouch'],
				  lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
				  labels: ['iPhone', 'iPad', 'iPod Touch'],
				  pointSize: 2,
				  hideHover: 'auto',
				  resize: true
				});

			}
			
			if ($('#graph_donut').length ){
			
				Morris.Donut({
				  element: 'graph_donut',
				  data: [
					{label: 'Jam', value: 25},
					{label: 'Frosted', value: 40},
					{label: 'Custard', value: 25},
					{label: 'Sugar', value: 10}
				  ],
				  colors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
				  formatter: function (y) {
					return y + "%";
				  },
				  resize: true
				});

			}
			
			if ($('#graph_line').length ){
			
				Morris.Line({
				  element: 'graph_line',
				  xkey: 'year',
				  ykeys: ['value'],
				  labels: ['Value'],
				  hideHover: 'auto',
				  lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
				  data: [
					{year: '2012', value: 20},
					{year: '2013', value: 10},
					{year: '2014', value: 5},
					{year: '2015', value: 5},
					{year: '2016', value: 20}
				  ],
				  resize: true
				});

				$MENU_TOGGLE.on('click', function() {
				  $(window).resize();
				});
			
			}
			
		};
	   
		
		
		/* ECHRTS */
	
		
		function init_echarts() {
		
				if( typeof (echarts) === 'undefined'){ return; }
				console.log('init_echarts');
			
		
				  var theme = {
				  color: [
					  '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
					  '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
				  ],

				  title: {
					  itemGap: 8,
					  textStyle: {
						  fontWeight: 'normal',
						  color: '#408829'
					  }
				  },

				  dataRange: {
					  color: ['#1f610a', '#97b58d']
				  },

				  toolbox: {
					  color: ['#408829', '#408829', '#408829', '#408829']
				  },

				  tooltip: {
					  backgroundColor: 'rgba(0,0,0,0.5)',
					  axisPointer: {
						  type: 'line',
						  lineStyle: {
							  color: '#408829',
							  type: 'dashed'
						  },
						  crossStyle: {
							  color: '#408829'
						  },
						  shadowStyle: {
							  color: 'rgba(200,200,200,0.3)'
						  }
					  }
				  },

				  dataZoom: {
					  dataBackgroundColor: '#eee',
					  fillerColor: 'rgba(64,136,41,0.2)',
					  handleColor: '#408829'
				  },
				  grid: {
					  borderWidth: 0
				  },

				  categoryAxis: {
					  axisLine: {
						  lineStyle: {
							  color: '#408829'
						  }
					  },
					  splitLine: {
						  lineStyle: {
							  color: ['#eee']
						  }
					  }
				  },

				  valueAxis: {
					  axisLine: {
						  lineStyle: {
							  color: '#408829'
						  }
					  },
					  splitArea: {
						  show: true,
						  areaStyle: {
							  color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
						  }
					  },
					  splitLine: {
						  lineStyle: {
							  color: ['#eee']
						  }
					  }
				  },
				  timeline: {
					  lineStyle: {
						  color: '#408829'
					  },
					  controlStyle: {
						  normal: {color: '#408829'},
						  emphasis: {color: '#408829'}
					  }
				  },

				  k: {
					  itemStyle: {
						  normal: {
							  color: '#68a54a',
							  color0: '#a9cba2',
							  lineStyle: {
								  width: 1,
								  color: '#408829',
								  color0: '#86b379'
							  }
						  }
					  }
				  },
				  map: {
					  itemStyle: {
						  normal: {
							  areaStyle: {
								  color: '#ddd'
							  },
							  label: {
								  textStyle: {
									  color: '#c12e34'
								  }
							  }
						  },
						  emphasis: {
							  areaStyle: {
								  color: '#99d2dd'
							  },
							  label: {
								  textStyle: {
									  color: '#c12e34'
								  }
							  }
						  }
					  }
				  },
				  force: {
					  itemStyle: {
						  normal: {
							  linkStyle: {
								  strokeColor: '#408829'
							  }
						  }
					  }
				  },
				  chord: {
					  padding: 4,
					  itemStyle: {
						  normal: {
							  lineStyle: {
								  width: 1,
								  color: 'rgba(128, 128, 128, 0.5)'
							  },
							  chordStyle: {
								  lineStyle: {
									  width: 1,
									  color: 'rgba(128, 128, 128, 0.5)'
								  }
							  }
						  },
						  emphasis: {
							  lineStyle: {
								  width: 1,
								  color: 'rgba(128, 128, 128, 0.5)'
							  },
							  chordStyle: {
								  lineStyle: {
									  width: 1,
									  color: 'rgba(128, 128, 128, 0.5)'
								  }
							  }
						  }
					  }
				  },
				  gauge: {
					  startAngle: 225,
					  endAngle: -45,
					  axisLine: {
						  show: true,
						  lineStyle: {
							  color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
							  width: 8
						  }
					  },
					  axisTick: {
						  splitNumber: 10,
						  length: 12,
						  lineStyle: {
							  color: 'auto'
						  }
					  },
					  axisLabel: {
						  textStyle: {
							  color: 'auto'
						  }
					  },
					  splitLine: {
						  length: 18,
						  lineStyle: {
							  color: 'auto'
						  }
					  },
					  pointer: {
						  length: '90%',
						  color: 'auto'
					  },
					  title: {
						  textStyle: {
							  color: '#333'
						  }
					  },
					  detail: {
						  textStyle: {
							  color: 'auto'
						  }
					  }
				  },
				  textStyle: {
					  fontFamily: 'Arial, Verdana, sans-serif'
				  }
			  };

			  
			  //echart Bar
			  
			if ($('#mainb').length ){
			  
				  var echartBar = echarts.init(document.getElementById('mainb'), theme);

				  echartBar.setOption({
					title: {
					  text: 'Graph title',
					  subtext: 'Graph Sub-text'
					},
					tooltip: {
					  trigger: 'axis'
					},
					legend: {
					  data: ['sales', 'purchases']
					},
					toolbox: {
					  show: false
					},
					calculable: false,
					xAxis: [{
					  type: 'category',
					  data: ['1?', '2?', '3?', '4?', '5?', '6?', '7?', '8?', '9?', '10?', '11?', '12?']
					}],
					yAxis: [{
					  type: 'value'
					}],
					series: [{
					  name: 'sales',
					  type: 'bar',
					  data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
					  markPoint: {
						data: [{
						  type: 'max',
						  name: '???'
						}, {
						  type: 'min',
						  name: '???'
						}]
					  },
					  markLine: {
						data: [{
						  type: 'average',
						  name: '???'
						}]
					  }
					}, {
					  name: 'purchases',
					  type: 'bar',
					  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
					  markPoint: {
						data: [{
						  name: 'sales',
						  value: 182.2,
						  xAxis: 7,
						  yAxis: 183,
						}, {
						  name: 'purchases',
						  value: 2.3,
						  xAxis: 11,
						  yAxis: 3
						}]
					  },
					  markLine: {
						data: [{
						  type: 'average',
						  name: '???'
						}]
					  }
					}]
				  });

			}
			  
			  
			  
			  
			   //echart Radar
			  
			if ($('#echart_sonar').length ){ 
			  
			  var echartRadar = echarts.init(document.getElementById('echart_sonar'), theme);

			  echartRadar.setOption({
				title: {
				  text: 'Budget vs spending',
				  subtext: 'Subtitle'
				},
				 tooltip: {
					trigger: 'item'
				},
				legend: {
				  orient: 'vertical',
				  x: 'right',
				  y: 'bottom',
				  data: ['Allocated Budget', 'Actual Spending']
				},
				toolbox: {
				  show: true,
				  feature: {
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				polar: [{
				  indicator: [{
					text: 'Sales',
					max: 6000
				  }, {
					text: 'Administration',
					max: 16000
				  }, {
					text: 'Information Techology',
					max: 30000
				  }, {
					text: 'Customer Support',
					max: 38000
				  }, {
					text: 'Development',
					max: 52000
				  }, {
					text: 'Marketing',
					max: 25000
				  }]
				}],
				calculable: true,
				series: [{
				  name: 'Budget vs spending',
				  type: 'radar',
				  data: [{
					value: [4300, 10000, 28000, 35000, 50000, 19000],
					name: 'Allocated Budget'
				  }, {
					value: [5000, 14000, 28000, 31000, 42000, 21000],
					name: 'Actual Spending'
				  }]
				}]
			  });

			} 
			  
			   //echart Funnel
			  
			if ($('#echart_pyramid').length ){ 
			  
			  var echartFunnel = echarts.init(document.getElementById('echart_pyramid'), theme);

			  echartFunnel.setOption({
				title: {
				  text: 'Echart Pyramid Graph',
				  subtext: 'Subtitle'
				},
				tooltip: {
				  trigger: 'item',
				  formatter: "{a} <br/>{b} : {c}%"
				},
				toolbox: {
				  show: true,
				  feature: {
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				legend: {
				  data: ['Something #1', 'Something #2', 'Something #3', 'Something #4', 'Something #5'],
				  orient: 'vertical',
				  x: 'left',
				  y: 'bottom'
				},
				calculable: true,
				series: [{
				  name: '漏斗图',
				  type: 'funnel',
				  width: '40%',
				  data: [{
					value: 60,
					name: 'Something #1'
				  }, {
					value: 40,
					name: 'Something #2'
				  }, {
					value: 20,
					name: 'Something #3'
				  }, {
					value: 80,
					name: 'Something #4'
				  }, {
					value: 100,
					name: 'Something #5'
				  }]
				}]
			  });

			} 
			  
			   //echart Gauge
			  
			if ($('#echart_gauge').length ){ 
			  
			  var echartGauge = echarts.init(document.getElementById('echart_gauge'), theme);

			  echartGauge.setOption({
				tooltip: {
				  formatter: "{a} <br/>{b} : {c}%"
				},
				toolbox: {
				  show: true,
				  feature: {
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				series: [{
				  name: 'Performance',
				  type: 'gauge',
				  center: ['50%', '50%'],
				  startAngle: 140,
				  endAngle: -140,
				  min: 0,
				  max: 100,
				  precision: 0,
				  splitNumber: 10,
				  axisLine: {
					show: true,
					lineStyle: {
					  color: [
						[0.2, 'lightgreen'],
						[0.4, 'orange'],
						[0.8, 'skyblue'],
						[1, '#ff4500']
					  ],
					  width: 30
					}
				  },
				  axisTick: {
					show: true,
					splitNumber: 5,
					length: 8,
					lineStyle: {
					  color: '#eee',
					  width: 1,
					  type: 'solid'
					}
				  },
				  axisLabel: {
					show: true,
					formatter: function(v) {
					  switch (v + '') {
						case '10':
						  return 'a';
						case '30':
						  return 'b';
						case '60':
						  return 'c';
						case '90':
						  return 'd';
						default:
						  return '';
					  }
					},
					textStyle: {
					  color: '#333'
					}
				  },
				  splitLine: {
					show: true,
					length: 30,
					lineStyle: {
					  color: '#eee',
					  width: 2,
					  type: 'solid'
					}
				  },
				  pointer: {
					length: '80%',
					width: 8,
					color: 'auto'
				  },
				  title: {
					show: true,
					offsetCenter: ['-65%', -10],
					textStyle: {
					  color: '#333',
					  fontSize: 15
					}
				  },
				  detail: {
					show: true,
					backgroundColor: 'rgba(0,0,0,0)',
					borderWidth: 0,
					borderColor: '#ccc',
					width: 100,
					height: 40,
					offsetCenter: ['-60%', 10],
					formatter: '{value}%',
					textStyle: {
					  color: 'auto',
					  fontSize: 30
					}
				  },
				  data: [{
					value: 50,
					name: 'Performance'
				  }]
				}]
			  });

			} 
			  
			   //echart Line
			  
			if ($('#echart_line').length ){ 
			  
			  var echartLine = echarts.init(document.getElementById('echart_line'), theme);

			  echartLine.setOption({
				title: {
				  text: 'Line Graph',
				  subtext: 'Subtitle'
				},
				tooltip: {
				  trigger: 'axis'
				},
				legend: {
				  x: 220,
				  y: 40,
				  data: ['Intent', 'Pre-order', 'Deal']
				},
				toolbox: {
				  show: true,
				  feature: {
					magicType: {
					  show: true,
					  title: {
						line: 'Line',
						bar: 'Bar',
						stack: 'Stack',
						tiled: 'Tiled'
					  },
					  type: ['line', 'bar', 'stack', 'tiled']
					},
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				calculable: true,
				xAxis: [{
				  type: 'category',
				  boundaryGap: false,
				  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				}],
				yAxis: [{
				  type: 'value'
				}],
				series: [{
				  name: 'Deal',
				  type: 'line',
				  smooth: true,
				  itemStyle: {
					normal: {
					  areaStyle: {
						type: 'default'
					  }
					}
				  },
				  data: [10, 12, 21, 54, 260, 830, 710]
				}, {
				  name: 'Pre-order',
				  type: 'line',
				  smooth: true,
				  itemStyle: {
					normal: {
					  areaStyle: {
						type: 'default'
					  }
					}
				  },
				  data: [30, 182, 434, 791, 390, 30, 10]
				}, {
				  name: 'Intent',
				  type: 'line',
				  smooth: true,
				  itemStyle: {
					normal: {
					  areaStyle: {
						type: 'default'
					  }
					}
				  },
				  data: [1320, 1132, 601, 234, 120, 90, 20]
				}]
			  });

			} 
			  
			   //echart Scatter
			  
			if ($('#echart_scatter').length ){ 
			  
			  var echartScatter = echarts.init(document.getElementById('echart_scatter'), theme);

			  echartScatter.setOption({
				title: {
				  text: 'Scatter Graph',
				  subtext: 'Heinz  2003'
				},
				tooltip: {
				  trigger: 'axis',
				  showDelay: 0,
				  axisPointer: {
					type: 'cross',
					lineStyle: {
					  type: 'dashed',
					  width: 1
					}
				  }
				},
				legend: {
				  data: ['Data2', 'Data1']
				},
				toolbox: {
				  show: true,
				  feature: {
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				xAxis: [{
				  type: 'value',
				  scale: true,
				  axisLabel: {
					formatter: '{value} cm'
				  }
				}],
				yAxis: [{
				  type: 'value',
				  scale: true,
				  axisLabel: {
					formatter: '{value} kg'
				  }
				}],
				series: [{
				  name: 'Data1',
				  type: 'scatter',
				  tooltip: {
					trigger: 'item',
					formatter: function(params) {
					  if (params.value.length > 1) {
						return params.seriesName + ' :<br/>' + params.value[0] + 'cm ' + params.value[1] + 'kg ';
					  } else {
						return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + 'kg ';
					  }
					}
				  },
				  data: [
					[161.2, 51.6],
					[167.5, 59.0],
					[159.5, 49.2],
					[157.0, 63.0],
					[155.8, 53.6],
					[170.0, 59.0],
					[159.1, 47.6],
					[166.0, 69.8],
					[176.2, 66.8],
					[160.2, 75.2],
					[172.5, 55.2],
					[170.9, 54.2],
					[172.9, 62.5],
					[153.4, 42.0],
					[160.0, 50.0],
					[147.2, 49.8],
					[168.2, 49.2],
					[175.0, 73.2],
					[157.0, 47.8],
					[167.6, 68.8],
					[159.5, 50.6],
					[175.0, 82.5],
					[166.8, 57.2],
					[176.5, 87.8],
					[170.2, 72.8],
					[174.0, 54.5],
					[173.0, 59.8],
					[179.9, 67.3],
					[170.5, 67.8],
					[160.0, 47.0],
					[154.4, 46.2],
					[162.0, 55.0],
					[176.5, 83.0],
					[160.0, 54.4],
					[152.0, 45.8],
					[162.1, 53.6],
					[170.0, 73.2],
					[160.2, 52.1],
					[161.3, 67.9],
					[166.4, 56.6],
					[168.9, 62.3],
					[163.8, 58.5],
					[167.6, 54.5],
					[160.0, 50.2],
					[161.3, 60.3],
					[167.6, 58.3],
					[165.1, 56.2],
					[160.0, 50.2],
					[170.0, 72.9],
					[157.5, 59.8],
					[167.6, 61.0],
					[160.7, 69.1],
					[163.2, 55.9],
					[152.4, 46.5],
					[157.5, 54.3],
					[168.3, 54.8],
					[180.3, 60.7],
					[165.5, 60.0],
					[165.0, 62.0],
					[164.5, 60.3],
					[156.0, 52.7],
					[160.0, 74.3],
					[163.0, 62.0],
					[165.7, 73.1],
					[161.0, 80.0],
					[162.0, 54.7],
					[166.0, 53.2],
					[174.0, 75.7],
					[172.7, 61.1],
					[167.6, 55.7],
					[151.1, 48.7],
					[164.5, 52.3],
					[163.5, 50.0],
					[152.0, 59.3],
					[169.0, 62.5],
					[164.0, 55.7],
					[161.2, 54.8],
					[155.0, 45.9],
					[170.0, 70.6],
					[176.2, 67.2],
					[170.0, 69.4],
					[162.5, 58.2],
					[170.3, 64.8],
					[164.1, 71.6],
					[169.5, 52.8],
					[163.2, 59.8],
					[154.5, 49.0],
					[159.8, 50.0],
					[173.2, 69.2],
					[170.0, 55.9],
					[161.4, 63.4],
					[169.0, 58.2],
					[166.2, 58.6],
					[159.4, 45.7],
					[162.5, 52.2],
					[159.0, 48.6],
					[162.8, 57.8],
					[159.0, 55.6],
					[179.8, 66.8],
					[162.9, 59.4],
					[161.0, 53.6],
					[151.1, 73.2],
					[168.2, 53.4],
					[168.9, 69.0],
					[173.2, 58.4],
					[171.8, 56.2],
					[178.0, 70.6],
					[164.3, 59.8],
					[163.0, 72.0],
					[168.5, 65.2],
					[166.8, 56.6],
					[172.7, 105.2],
					[163.5, 51.8],
					[169.4, 63.4],
					[167.8, 59.0],
					[159.5, 47.6],
					[167.6, 63.0],
					[161.2, 55.2],
					[160.0, 45.0],
					[163.2, 54.0],
					[162.2, 50.2],
					[161.3, 60.2],
					[149.5, 44.8],
					[157.5, 58.8],
					[163.2, 56.4],
					[172.7, 62.0],
					[155.0, 49.2],
					[156.5, 67.2],
					[164.0, 53.8],
					[160.9, 54.4],
					[162.8, 58.0],
					[167.0, 59.8],
					[160.0, 54.8],
					[160.0, 43.2],
					[168.9, 60.5],
					[158.2, 46.4],
					[156.0, 64.4],
					[160.0, 48.8],
					[167.1, 62.2],
					[158.0, 55.5],
					[167.6, 57.8],
					[156.0, 54.6],
					[162.1, 59.2],
					[173.4, 52.7],
					[159.8, 53.2],
					[170.5, 64.5],
					[159.2, 51.8],
					[157.5, 56.0],
					[161.3, 63.6],
					[162.6, 63.2],
					[160.0, 59.5],
					[168.9, 56.8],
					[165.1, 64.1],
					[162.6, 50.0],
					[165.1, 72.3],
					[166.4, 55.0],
					[160.0, 55.9],
					[152.4, 60.4],
					[170.2, 69.1],
					[162.6, 84.5],
					[170.2, 55.9],
					[158.8, 55.5],
					[172.7, 69.5],
					[167.6, 76.4],
					[162.6, 61.4],
					[167.6, 65.9],
					[156.2, 58.6],
					[175.2, 66.8],
					[172.1, 56.6],
					[162.6, 58.6],
					[160.0, 55.9],
					[165.1, 59.1],
					[182.9, 81.8],
					[166.4, 70.7],
					[165.1, 56.8],
					[177.8, 60.0],
					[165.1, 58.2],
					[175.3, 72.7],
					[154.9, 54.1],
					[158.8, 49.1],
					[172.7, 75.9],
					[168.9, 55.0],
					[161.3, 57.3],
					[167.6, 55.0],
					[165.1, 65.5],
					[175.3, 65.5],
					[157.5, 48.6],
					[163.8, 58.6],
					[167.6, 63.6],
					[165.1, 55.2],
					[165.1, 62.7],
					[168.9, 56.6],
					[162.6, 53.9],
					[164.5, 63.2],
					[176.5, 73.6],
					[168.9, 62.0],
					[175.3, 63.6],
					[159.4, 53.2],
					[160.0, 53.4],
					[170.2, 55.0],
					[162.6, 70.5],
					[167.6, 54.5],
					[162.6, 54.5],
					[160.7, 55.9],
					[160.0, 59.0],
					[157.5, 63.6],
					[162.6, 54.5],
					[152.4, 47.3],
					[170.2, 67.7],
					[165.1, 80.9],
					[172.7, 70.5],
					[165.1, 60.9],
					[170.2, 63.6],
					[170.2, 54.5],
					[170.2, 59.1],
					[161.3, 70.5],
					[167.6, 52.7],
					[167.6, 62.7],
					[165.1, 86.3],
					[162.6, 66.4],
					[152.4, 67.3],
					[168.9, 63.0],
					[170.2, 73.6],
					[175.2, 62.3],
					[175.2, 57.7],
					[160.0, 55.4],
					[165.1, 104.1],
					[174.0, 55.5],
					[170.2, 77.3],
					[160.0, 80.5],
					[167.6, 64.5],
					[167.6, 72.3],
					[167.6, 61.4],
					[154.9, 58.2],
					[162.6, 81.8],
					[175.3, 63.6],
					[171.4, 53.4],
					[157.5, 54.5],
					[165.1, 53.6],
					[160.0, 60.0],
					[174.0, 73.6],
					[162.6, 61.4],
					[174.0, 55.5],
					[162.6, 63.6],
					[161.3, 60.9],
					[156.2, 60.0],
					[149.9, 46.8],
					[169.5, 57.3],
					[160.0, 64.1],
					[175.3, 63.6],
					[169.5, 67.3],
					[160.0, 75.5],
					[172.7, 68.2],
					[162.6, 61.4],
					[157.5, 76.8],
					[176.5, 71.8],
					[164.4, 55.5],
					[160.7, 48.6],
					[174.0, 66.4],
					[163.8, 67.3]
				  ],
				  markPoint: {
					data: [{
					  type: 'max',
					  name: 'Max'
					}, {
					  type: 'min',
					  name: 'Min'
					}]
				  },
				  markLine: {
					data: [{
					  type: 'average',
					  name: 'Mean'
					}]
				  }
				}, {
				  name: 'Data2',
				  type: 'scatter',
				  tooltip: {
					trigger: 'item',
					formatter: function(params) {
					  if (params.value.length > 1) {
						return params.seriesName + ' :<br/>' + params.value[0] + 'cm ' + params.value[1] + 'kg ';
					  } else {
						return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + 'kg ';
					  }
					}
				  },
				  data: [
					[174.0, 65.6],
					[175.3, 71.8],
					[193.5, 80.7],
					[186.5, 72.6],
					[187.2, 78.8],
					[181.5, 74.8],
					[184.0, 86.4],
					[184.5, 78.4],
					[175.0, 62.0],
					[184.0, 81.6],
					[180.0, 76.6],
					[177.8, 83.6],
					[192.0, 90.0],
					[176.0, 74.6],
					[174.0, 71.0],
					[184.0, 79.6],
					[192.7, 93.8],
					[171.5, 70.0],
					[173.0, 72.4],
					[176.0, 85.9],
					[176.0, 78.8],
					[180.5, 77.8],
					[172.7, 66.2],
					[176.0, 86.4],
					[173.5, 81.8],
					[178.0, 89.6],
					[180.3, 82.8],
					[180.3, 76.4],
					[164.5, 63.2],
					[173.0, 60.9],
					[183.5, 74.8],
					[175.5, 70.0],
					[188.0, 72.4],
					[189.2, 84.1],
					[172.8, 69.1],
					[170.0, 59.5],
					[182.0, 67.2],
					[170.0, 61.3],
					[177.8, 68.6],
					[184.2, 80.1],
					[186.7, 87.8],
					[171.4, 84.7],
					[172.7, 73.4],
					[175.3, 72.1],
					[180.3, 82.6],
					[182.9, 88.7],
					[188.0, 84.1],
					[177.2, 94.1],
					[172.1, 74.9],
					[167.0, 59.1],
					[169.5, 75.6],
					[174.0, 86.2],
					[172.7, 75.3],
					[182.2, 87.1],
					[164.1, 55.2],
					[163.0, 57.0],
					[171.5, 61.4],
					[184.2, 76.8],
					[174.0, 86.8],
					[174.0, 72.2],
					[177.0, 71.6],
					[186.0, 84.8],
					[167.0, 68.2],
					[171.8, 66.1],
					[182.0, 72.0],
					[167.0, 64.6],
					[177.8, 74.8],
					[164.5, 70.0],
					[192.0, 101.6],
					[175.5, 63.2],
					[171.2, 79.1],
					[181.6, 78.9],
					[167.4, 67.7],
					[181.1, 66.0],
					[177.0, 68.2],
					[174.5, 63.9],
					[177.5, 72.0],
					[170.5, 56.8],
					[182.4, 74.5],
					[197.1, 90.9],
					[180.1, 93.0],
					[175.5, 80.9],
					[180.6, 72.7],
					[184.4, 68.0],
					[175.5, 70.9],
					[180.6, 72.5],
					[177.0, 72.5],
					[177.1, 83.4],
					[181.6, 75.5],
					[176.5, 73.0],
					[175.0, 70.2],
					[174.0, 73.4],
					[165.1, 70.5],
					[177.0, 68.9],
					[192.0, 102.3],
					[176.5, 68.4],
					[169.4, 65.9],
					[182.1, 75.7],
					[179.8, 84.5],
					[175.3, 87.7],
					[184.9, 86.4],
					[177.3, 73.2],
					[167.4, 53.9],
					[178.1, 72.0],
					[168.9, 55.5],
					[157.2, 58.4],
					[180.3, 83.2],
					[170.2, 72.7],
					[177.8, 64.1],
					[172.7, 72.3],
					[165.1, 65.0],
					[186.7, 86.4],
					[165.1, 65.0],
					[174.0, 88.6],
					[175.3, 84.1],
					[185.4, 66.8],
					[177.8, 75.5],
					[180.3, 93.2],
					[180.3, 82.7],
					[177.8, 58.0],
					[177.8, 79.5],
					[177.8, 78.6],
					[177.8, 71.8],
					[177.8, 116.4],
					[163.8, 72.2],
					[188.0, 83.6],
					[198.1, 85.5],
					[175.3, 90.9],
					[166.4, 85.9],
					[190.5, 89.1],
					[166.4, 75.0],
					[177.8, 77.7],
					[179.7, 86.4],
					[172.7, 90.9],
					[190.5, 73.6],
					[185.4, 76.4],
					[168.9, 69.1],
					[167.6, 84.5],
					[175.3, 64.5],
					[170.2, 69.1],
					[190.5, 108.6],
					[177.8, 86.4],
					[190.5, 80.9],
					[177.8, 87.7],
					[184.2, 94.5],
					[176.5, 80.2],
					[177.8, 72.0],
					[180.3, 71.4],
					[171.4, 72.7],
					[172.7, 84.1],
					[172.7, 76.8],
					[177.8, 63.6],
					[177.8, 80.9],
					[182.9, 80.9],
					[170.2, 85.5],
					[167.6, 68.6],
					[175.3, 67.7],
					[165.1, 66.4],
					[185.4, 102.3],
					[181.6, 70.5],
					[172.7, 95.9],
					[190.5, 84.1],
					[179.1, 87.3],
					[175.3, 71.8],
					[170.2, 65.9],
					[193.0, 95.9],
					[171.4, 91.4],
					[177.8, 81.8],
					[177.8, 96.8],
					[167.6, 69.1],
					[167.6, 82.7],
					[180.3, 75.5],
					[182.9, 79.5],
					[176.5, 73.6],
					[186.7, 91.8],
					[188.0, 84.1],
					[188.0, 85.9],
					[177.8, 81.8],
					[174.0, 82.5],
					[177.8, 80.5],
					[171.4, 70.0],
					[185.4, 81.8],
					[185.4, 84.1],
					[188.0, 90.5],
					[188.0, 91.4],
					[182.9, 89.1],
					[176.5, 85.0],
					[175.3, 69.1],
					[175.3, 73.6],
					[188.0, 80.5],
					[188.0, 82.7],
					[175.3, 86.4],
					[170.5, 67.7],
					[179.1, 92.7],
					[177.8, 93.6],
					[175.3, 70.9],
					[182.9, 75.0],
					[170.8, 93.2],
					[188.0, 93.2],
					[180.3, 77.7],
					[177.8, 61.4],
					[185.4, 94.1],
					[168.9, 75.0],
					[185.4, 83.6],
					[180.3, 85.5],
					[174.0, 73.9],
					[167.6, 66.8],
					[182.9, 87.3],
					[160.0, 72.3],
					[180.3, 88.6],
					[167.6, 75.5],
					[186.7, 101.4],
					[175.3, 91.1],
					[175.3, 67.3],
					[175.9, 77.7],
					[175.3, 81.8],
					[179.1, 75.5],
					[181.6, 84.5],
					[177.8, 76.6],
					[182.9, 85.0],
					[177.8, 102.5],
					[184.2, 77.3],
					[179.1, 71.8],
					[176.5, 87.9],
					[188.0, 94.3],
					[174.0, 70.9],
					[167.6, 64.5],
					[170.2, 77.3],
					[167.6, 72.3],
					[188.0, 87.3],
					[174.0, 80.0],
					[176.5, 82.3],
					[180.3, 73.6],
					[167.6, 74.1],
					[188.0, 85.9],
					[180.3, 73.2],
					[167.6, 76.3],
					[183.0, 65.9],
					[183.0, 90.9],
					[179.1, 89.1],
					[170.2, 62.3],
					[177.8, 82.7],
					[179.1, 79.1],
					[190.5, 98.2],
					[177.8, 84.1],
					[180.3, 83.2],
					[180.3, 83.2]
				  ],
				  markPoint: {
					data: [{
					  type: 'max',
					  name: 'Max'
					}, {
					  type: 'min',
					  name: 'Min'
					}]
				  },
				  markLine: {
					data: [{
					  type: 'average',
					  name: 'Mean'
					}]
				  }
				}]
			  });

			} 
			  
			   //echart Bar Horizontal
			  
			if ($('#echart_bar_horizontal').length ){ 
			  
			  var echartBar = echarts.init(document.getElementById('echart_bar_horizontal'), theme);

			  echartBar.setOption({
				title: {
				  text: 'Bar Graph',
				  subtext: 'Graph subtitle'
				},
				tooltip: {
				  trigger: 'axis'
				},
				legend: {
				  x: 100,
				  data: ['2015', '2016']
				},
				toolbox: {
				  show: true,
				  feature: {
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				calculable: true,
				xAxis: [{
				  type: 'value',
				  boundaryGap: [0, 0.01]
				}],
				yAxis: [{
				  type: 'category',
				  data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
				}],
				series: [{
				  name: '2015',
				  type: 'bar',
				  data: [18203, 23489, 29034, 104970, 131744, 630230]
				}, {
				  name: '2016',
				  type: 'bar',
				  data: [19325, 23438, 31000, 121594, 134141, 681807]
				}]
			  });

			} 
			  
			   //echart Pie Collapse
			  
			if ($('#echart_pie2').length ){ 
			  
			  var echartPieCollapse = echarts.init(document.getElementById('echart_pie2'), theme);
			  
			  echartPieCollapse.setOption({
				tooltip: {
				  trigger: 'item',
				  formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
				  x: 'center',
				  y: 'bottom',
				  data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6']
				},
				toolbox: {
				  show: true,
				  feature: {
					magicType: {
					  show: true,
					  type: ['pie', 'funnel']
					},
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				calculable: true,
				series: [{
				  name: 'Area Mode',
				  type: 'pie',
				  radius: [25, 90],
				  center: ['50%', 170],
				  roseType: 'area',
				  x: '50%',
				  max: 40,
				  sort: 'ascending',
				  data: [{
					value: 10,
					name: 'rose1'
				  }, {
					value: 5,
					name: 'rose2'
				  }, {
					value: 15,
					name: 'rose3'
				  }, {
					value: 25,
					name: 'rose4'
				  }, {
					value: 20,
					name: 'rose5'
				  }, {
					value: 35,
					name: 'rose6'
				  }]
				}]
			  });

			} 
			  
			   //echart Donut
			  
			if ($('#echart_donut').length ){  
			  
			  var echartDonut = echarts.init(document.getElementById('echart_donut'), theme);
			  
			  echartDonut.setOption({
				tooltip: {
				  trigger: 'item',
				  formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				calculable: true,
				legend: {
				  x: 'center',
				  y: 'bottom',
				  data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
				},
				toolbox: {
				  show: true,
				  feature: {
					magicType: {
					  show: true,
					  type: ['pie', 'funnel'],
					  option: {
						funnel: {
						  x: '25%',
						  width: '50%',
						  funnelAlign: 'center',
						  max: 1548
						}
					  }
					},
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				series: [{
				  name: 'Access to the resource',
				  type: 'pie',
				  radius: ['35%', '55%'],
				  itemStyle: {
					normal: {
					  label: {
						show: true
					  },
					  labelLine: {
						show: true
					  }
					},
					emphasis: {
					  label: {
						show: true,
						position: 'center',
						textStyle: {
						  fontSize: '14',
						  fontWeight: 'normal'
						}
					  }
					}
				  },
				  data: [{
					value: 335,
					name: 'Direct Access'
				  }, {
					value: 310,
					name: 'E-mail Marketing'
				  }, {
					value: 234,
					name: 'Union Ad'
				  }, {
					value: 135,
					name: 'Video Ads'
				  }, {
					value: 1548,
					name: 'Search Engine'
				  }]
				}]
			  });

			} 
			  
			   //echart Pie
			  
			if ($('#echart_pie').length ){  
			  
			  var echartPie = echarts.init(document.getElementById('echart_pie'), theme);

			  echartPie.setOption({
				tooltip: {
				  trigger: 'item',
				  formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
				  x: 'center',
				  y: 'bottom',
				  data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
				},
				toolbox: {
				  show: true,
				  feature: {
					magicType: {
					  show: true,
					  type: ['pie', 'funnel'],
					  option: {
						funnel: {
						  x: '25%',
						  width: '50%',
						  funnelAlign: 'left',
						  max: 1548
						}
					  }
					},
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				calculable: true,
				series: [{
				  name: '访问来源',
				  type: 'pie',
				  radius: '55%',
				  center: ['50%', '48%'],
				  data: [{
					value: 335,
					name: 'Direct Access'
				  }, {
					value: 310,
					name: 'E-mail Marketing'
				  }, {
					value: 234,
					name: 'Union Ad'
				  }, {
					value: 135,
					name: 'Video Ads'
				  }, {
					value: 1548,
					name: 'Search Engine'
				  }]
				}]
			  });

			  var dataStyle = {
				normal: {
				  label: {
					show: false
				  },
				  labelLine: {
					show: false
				  }
				}
			  };

			  var placeHolderStyle = {
				normal: {
				  color: 'rgba(0,0,0,0)',
				  label: {
					show: false
				  },
				  labelLine: {
					show: false
				  }
				},
				emphasis: {
				  color: 'rgba(0,0,0,0)'
				}
			  };

			} 
			  
			   //echart Mini Pie
			  
			if ($('#echart_mini_pie').length ){ 
			  
			  var echartMiniPie = echarts.init(document.getElementById('echart_mini_pie'), theme);

			  echartMiniPie .setOption({
				title: {
				  text: 'Chart #2',
				  subtext: 'From ExcelHome',
				  sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
				  x: 'center',
				  y: 'center',
				  itemGap: 20,
				  textStyle: {
					color: 'rgba(30,144,255,0.8)',
					fontFamily: '微软雅黑',
					fontSize: 35,
					fontWeight: 'bolder'
				  }
				},
				tooltip: {
				  show: true,
				  formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
				  orient: 'vertical',
				  x: 170,
				  y: 45,
				  itemGap: 12,
				  data: ['68%Something #1', '29%Something #2', '3%Something #3'],
				},
				toolbox: {
				  show: true,
				  feature: {
					mark: {
					  show: true
					},
					dataView: {
					  show: true,
					  title: "Text View",
					  lang: [
						"Text View",
						"Close",
						"Refresh",
					  ],
					  readOnly: false
					},
					restore: {
					  show: true,
					  title: "Restore"
					},
					saveAsImage: {
					  show: true,
					  title: "Save Image"
					}
				  }
				},
				series: [{
				  name: '1',
				  type: 'pie',
				  clockWise: false,
				  radius: [105, 130],
				  itemStyle: dataStyle,
				  data: [{
					value: 68,
					name: '68%Something #1'
				  }, {
					value: 32,
					name: 'invisible',
					itemStyle: placeHolderStyle
				  }]
				}, {
				  name: '2',
				  type: 'pie',
				  clockWise: false,
				  radius: [80, 105],
				  itemStyle: dataStyle,
				  data: [{
					value: 29,
					name: '29%Something #2'
				  }, {
					value: 71,
					name: 'invisible',
					itemStyle: placeHolderStyle
				  }]
				}, {
				  name: '3',
				  type: 'pie',
				  clockWise: false,
				  radius: [25, 80],
				  itemStyle: dataStyle,
				  data: [{
					value: 3,
					name: '3%Something #3'
				  }, {
					value: 97,
					name: 'invisible',
					itemStyle: placeHolderStyle
				  }]
				}]
			  });

			} 
			  
			   //echart Map
			  
			if ($('#echart_world_map').length ){ 
			  
				  var echartMap = echarts.init(document.getElementById('echart_world_map'), theme);
				  
				   
				  echartMap.setOption({
					title: {
					  text: 'World Population (2010)',
					  subtext: 'from United Nations, Total population, both sexes combined, as of 1 July (thousands)',
					  x: 'center',
					  y: 'top'
					},
					tooltip: {
					  trigger: 'item',
					  formatter: function(params) {
						var value = (params.value + '').split('.');
						value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + '.' + value[1];
						return params.seriesName + '<br/>' + params.name + ' : ' + value;
					  }
					},
					toolbox: {
					  show: true,
					  orient: 'vertical',
					  x: 'right',
					  y: 'center',
					  feature: {
						mark: {
						  show: true
						},
						dataView: {
						  show: true,
						  title: "Text View",
						  lang: [
							"Text View",
							"Close",
							"Refresh",
						  ],
						  readOnly: false
						},
						restore: {
						  show: true,
						  title: "Restore"
						},
						saveAsImage: {
						  show: true,
						  title: "Save Image"
						}
					  }
					},
					dataRange: {
					  min: 0,
					  max: 1000000,
					  text: ['High', 'Low'],
					  realtime: false,
					  calculable: true,
					  color: ['#087E65', '#26B99A', '#CBEAE3']
					},
					series: [{
					  name: 'World Population (2010)',
					  type: 'map',
					  mapType: 'world',
					  roam: false,
					  mapLocation: {
						y: 60
					  },
					  itemStyle: {
						emphasis: {
						  label: {
							show: true
						  }
						}
					  },
					  data: [{
						name: 'Afghanistan',
						value: 28397.812
					  }, {
						name: 'Angola',
						value: 19549.124
					  }, {
						name: 'Albania',
						value: 3150.143
					  }, {
						name: 'United Arab Emirates',
						value: 8441.537
					  }, {
						name: 'Argentina',
						value: 40374.224
					  }, {
						name: 'Armenia',
						value: 2963.496
					  }, {
						name: 'French Southern and Antarctic Lands',
						value: 268.065
					  }, {
						name: 'Australia',
						value: 22404.488
					  }, {
						name: 'Austria',
						value: 8401.924
					  }, {
						name: 'Azerbaijan',
						value: 9094.718
					  }, {
						name: 'Burundi',
						value: 9232.753
					  }, {
						name: 'Belgium',
						value: 10941.288
					  }, {
						name: 'Benin',
						value: 9509.798
					  }, {
						name: 'Burkina Faso',
						value: 15540.284
					  }, {
						name: 'Bangladesh',
						value: 151125.475
					  }, {
						name: 'Bulgaria',
						value: 7389.175
					  }, {
						name: 'The Bahamas',
						value: 66402.316
					  }, {
						name: 'Bosnia and Herzegovina',
						value: 3845.929
					  }, {
						name: 'Belarus',
						value: 9491.07
					  }, {
						name: 'Belize',
						value: 308.595
					  }, {
						name: 'Bermuda',
						value: 64.951
					  }, {
						name: 'Bolivia',
						value: 716.939
					  }, {
						name: 'Brazil',
						value: 195210.154
					  }, {
						name: 'Brunei',
						value: 27.223
					  }, {
						name: 'Bhutan',
						value: 716.939
					  }, {
						name: 'Botswana',
						value: 1969.341
					  }, {
						name: 'Central African Republic',
						value: 4349.921
					  }, {
						name: 'Canada',
						value: 34126.24
					  }, {
						name: 'Switzerland',
						value: 7830.534
					  }, {
						name: 'Chile',
						value: 17150.76
					  }, {
						name: 'China',
						value: 1359821.465
					  }, {
						name: 'Ivory Coast',
						value: 60508.978
					  }, {
						name: 'Cameroon',
						value: 20624.343
					  }, {
						name: 'Democratic Republic of the Congo',
						value: 62191.161
					  }, {
						name: 'Republic of the Congo',
						value: 3573.024
					  }, {
						name: 'Colombia',
						value: 46444.798
					  }, {
						name: 'Costa Rica',
						value: 4669.685
					  }, {
						name: 'Cuba',
						value: 11281.768
					  }, {
						name: 'Northern Cyprus',
						value: 1.468
					  }, {
						name: 'Cyprus',
						value: 1103.685
					  }, {
						name: 'Czech Republic',
						value: 10553.701
					  }, {
						name: 'Germany',
						value: 83017.404
					  }, {
						name: 'Djibouti',
						value: 834.036
					  }, {
						name: 'Denmark',
						value: 5550.959
					  }, {
						name: 'Dominican Republic',
						value: 10016.797
					  }, {
						name: 'Algeria',
						value: 37062.82
					  }, {
						name: 'Ecuador',
						value: 15001.072
					  }, {
						name: 'Egypt',
						value: 78075.705
					  }, {
						name: 'Eritrea',
						value: 5741.159
					  }, {
						name: 'Spain',
						value: 46182.038
					  }, {
						name: 'Estonia',
						value: 1298.533
					  }, {
						name: 'Ethiopia',
						value: 87095.281
					  }, {
						name: 'Finland',
						value: 5367.693
					  }, {
						name: 'Fiji',
						value: 860.559
					  }, {
						name: 'Falkland Islands',
						value: 49.581
					  }, {
						name: 'France',
						value: 63230.866
					  }, {
						name: 'Gabon',
						value: 1556.222
					  }, {
						name: 'United Kingdom',
						value: 62066.35
					  }, {
						name: 'Georgia',
						value: 4388.674
					  }, {
						name: 'Ghana',
						value: 24262.901
					  }, {
						name: 'Guinea',
						value: 10876.033
					  }, {
						name: 'Gambia',
						value: 1680.64
					  }, {
						name: 'Guinea Bissau',
						value: 10876.033
					  }, {
						name: 'Equatorial Guinea',
						value: 696.167
					  }, {
						name: 'Greece',
						value: 11109.999
					  }, {
						name: 'Greenland',
						value: 56.546
					  }, {
						name: 'Guatemala',
						value: 14341.576
					  }, {
						name: 'French Guiana',
						value: 231.169
					  }, {
						name: 'Guyana',
						value: 786.126
					  }, {
						name: 'Honduras',
						value: 7621.204
					  }, {
						name: 'Croatia',
						value: 4338.027
					  }, {
						name: 'Haiti',
						value: 9896.4
					  }, {
						name: 'Hungary',
						value: 10014.633
					  }, {
						name: 'Indonesia',
						value: 240676.485
					  }, {
						name: 'India',
						value: 1205624.648
					  }, {
						name: 'Ireland',
						value: 4467.561
					  }, {
						name: 'Iran',
						value: 240676.485
					  }, {
						name: 'Iraq',
						value: 30962.38
					  }, {
						name: 'Iceland',
						value: 318.042
					  }, {
						name: 'Israel',
						value: 7420.368
					  }, {
						name: 'Italy',
						value: 60508.978
					  }, {
						name: 'Jamaica',
						value: 2741.485
					  }, {
						name: 'Jordan',
						value: 6454.554
					  }, {
						name: 'Japan',
						value: 127352.833
					  }, {
						name: 'Kazakhstan',
						value: 15921.127
					  }, {
						name: 'Kenya',
						value: 40909.194
					  }, {
						name: 'Kyrgyzstan',
						value: 5334.223
					  }, {
						name: 'Cambodia',
						value: 14364.931
					  }, {
						name: 'South Korea',
						value: 51452.352
					  }, {
						name: 'Kosovo',
						value: 97.743
					  }, {
						name: 'Kuwait',
						value: 2991.58
					  }, {
						name: 'Laos',
						value: 6395.713
					  }, {
						name: 'Lebanon',
						value: 4341.092
					  }, {
						name: 'Liberia',
						value: 3957.99
					  }, {
						name: 'Libya',
						value: 6040.612
					  }, {
						name: 'Sri Lanka',
						value: 20758.779
					  }, {
						name: 'Lesotho',
						value: 2008.921
					  }, {
						name: 'Lithuania',
						value: 3068.457
					  }, {
						name: 'Luxembourg',
						value: 507.885
					  }, {
						name: 'Latvia',
						value: 2090.519
					  }, {
						name: 'Morocco',
						value: 31642.36
					  }, {
						name: 'Moldova',
						value: 103.619
					  }, {
						name: 'Madagascar',
						value: 21079.532
					  }, {
						name: 'Mexico',
						value: 117886.404
					  }, {
						name: 'Macedonia',
						value: 507.885
					  }, {
						name: 'Mali',
						value: 13985.961
					  }, {
						name: 'Myanmar',
						value: 51931.231
					  }, {
						name: 'Montenegro',
						value: 620.078
					  }, {
						name: 'Mongolia',
						value: 2712.738
					  }, {
						name: 'Mozambique',
						value: 23967.265
					  }, {
						name: 'Mauritania',
						value: 3609.42
					  }, {
						name: 'Malawi',
						value: 15013.694
					  }, {
						name: 'Malaysia',
						value: 28275.835
					  }, {
						name: 'Namibia',
						value: 2178.967
					  }, {
						name: 'New Caledonia',
						value: 246.379
					  }, {
						name: 'Niger',
						value: 15893.746
					  }, {
						name: 'Nigeria',
						value: 159707.78
					  }, {
						name: 'Nicaragua',
						value: 5822.209
					  }, {
						name: 'Netherlands',
						value: 16615.243
					  }, {
						name: 'Norway',
						value: 4891.251
					  }, {
						name: 'Nepal',
						value: 26846.016
					  }, {
						name: 'New Zealand',
						value: 4368.136
					  }, {
						name: 'Oman',
						value: 2802.768
					  }, {
						name: 'Pakistan',
						value: 173149.306
					  }, {
						name: 'Panama',
						value: 3678.128
					  }, {
						name: 'Peru',
						value: 29262.83
					  }, {
						name: 'Philippines',
						value: 93444.322
					  }, {
						name: 'Papua New Guinea',
						value: 6858.945
					  }, {
						name: 'Poland',
						value: 38198.754
					  }, {
						name: 'Puerto Rico',
						value: 3709.671
					  }, {
						name: 'North Korea',
						value: 1.468
					  }, {
						name: 'Portugal',
						value: 10589.792
					  }, {
						name: 'Paraguay',
						value: 6459.721
					  }, {
						name: 'Qatar',
						value: 1749.713
					  }, {
						name: 'Romania',
						value: 21861.476
					  }, {
						name: 'Russia',
						value: 21861.476
					  }, {
						name: 'Rwanda',
						value: 10836.732
					  }, {
						name: 'Western Sahara',
						value: 514.648
					  }, {
						name: 'Saudi Arabia',
						value: 27258.387
					  }, {
						name: 'Sudan',
						value: 35652.002
					  }, {
						name: 'South Sudan',
						value: 9940.929
					  }, {
						name: 'Senegal',
						value: 12950.564
					  }, {
						name: 'Solomon Islands',
						value: 526.447
					  }, {
						name: 'Sierra Leone',
						value: 5751.976
					  }, {
						name: 'El Salvador',
						value: 6218.195
					  }, {
						name: 'Somaliland',
						value: 9636.173
					  }, {
						name: 'Somalia',
						value: 9636.173
					  }, {
						name: 'Republic of Serbia',
						value: 3573.024
					  }, {
						name: 'Suriname',
						value: 524.96
					  }, {
						name: 'Slovakia',
						value: 5433.437
					  }, {
						name: 'Slovenia',
						value: 2054.232
					  }, {
						name: 'Sweden',
						value: 9382.297
					  }, {
						name: 'Swaziland',
						value: 1193.148
					  }, {
						name: 'Syria',
						value: 7830.534
					  }, {
						name: 'Chad',
						value: 11720.781
					  }, {
						name: 'Togo',
						value: 6306.014
					  }, {
						name: 'Thailand',
						value: 66402.316
					  }, {
						name: 'Tajikistan',
						value: 7627.326
					  }, {
						name: 'Turkmenistan',
						value: 5041.995
					  }, {
						name: 'East Timor',
						value: 10016.797
					  }, {
						name: 'Trinidad and Tobago',
						value: 1328.095
					  }, {
						name: 'Tunisia',
						value: 10631.83
					  }, {
						name: 'Turkey',
						value: 72137.546
					  }, {
						name: 'United Republic of Tanzania',
						value: 44973.33
					  }, {
						name: 'Uganda',
						value: 33987.213
					  }, {
						name: 'Ukraine',
						value: 46050.22
					  }, {
						name: 'Uruguay',
						value: 3371.982
					  }, {
						name: 'United States of America',
						value: 312247.116
					  }, {
						name: 'Uzbekistan',
						value: 27769.27
					  }, {
						name: 'Venezuela',
						value: 236.299
					  }, {
						name: 'Vietnam',
						value: 89047.397
					  }, {
						name: 'Vanuatu',
						value: 236.299
					  }, {
						name: 'West Bank',
						value: 13.565
					  }, {
						name: 'Yemen',
						value: 22763.008
					  }, {
						name: 'South Africa',
						value: 51452.352
					  }, {
						name: 'Zambia',
						value: 13216.985
					  }, {
						name: 'Zimbabwe',
						value: 13076.978
					  }]
					}]
				  });
	   
			}
	   
		}  
	   
	   
	$(document).ready(function() {
				
		init_sparklines();
		init_flot_chart();
		init_sidebar();
		init_wysiwyg();
		init_InputMask();
		init_JQVmap();
		init_cropper();
		init_knob();
		init_IonRangeSlider();
		init_ColorPicker();
		init_TagsInput();
		init_parsley();
		init_daterangepicker();
		init_daterangepicker_right();
		init_daterangepicker_single_call();
		init_daterangepicker_reservation();
		init_SmartWizard();
		init_EasyPieChart();
		init_charts();
		init_echarts();
		init_morris_charts();
		init_skycons();
		init_select2();
		init_validator();
		init_DataTables();
		init_chart_doughnut();
		init_gauge();
		init_PNotify();
		init_starrr();
		init_calendar();
		init_compose();
		init_CustomNotification();
		init_autosize();
		init_autocomplete();
				
	});	
	


/*! For license information please see guidechimp.min.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.GuideChimp=e():t.GuideChimp=e()}(self,(function(){return function(){var t={7228:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r},t.exports.__esModule=!0,t.exports.default=t.exports},2858:function(t){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},3646:function(t,e,n){var r=n(7228);t.exports=function(t){if(Array.isArray(t))return r(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8926:function(t){function e(t,e,n,r,i,o,s){try{var a=t[o](s),l=a.value}catch(t){return void n(t)}a.done?e(l):Promise.resolve(l).then(r,i)}t.exports=function(t){return function(){var n=this,r=arguments;return new Promise((function(i,o){var s=t.apply(n,r);function a(t){e(s,i,o,a,l,"next",t)}function l(t){e(s,i,o,a,l,"throw",t)}a(void 0)}))}},t.exports.__esModule=!0,t.exports.default=t.exports},4575:function(t){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.__esModule=!0,t.exports.default=t.exports},9100:function(t,e,n){var r=n(9489),i=n(7067);function o(e,n,s){return i()?(t.exports=o=Reflect.construct,t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=o=function(t,e,n){var i=[null];i.push.apply(i,e);var o=new(Function.bind.apply(t,i));return n&&r(o,n.prototype),o},t.exports.__esModule=!0,t.exports.default=t.exports),o.apply(null,arguments)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},3913:function(t){function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t},t.exports.__esModule=!0,t.exports.default=t.exports},9713:function(t){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},t.exports.__esModule=!0,t.exports.default=t.exports},5318:function(t){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports.default=t.exports},7067:function(t){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},6860:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},3884:function(t){t.exports=function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,o=[],s=!0,a=!1;try{for(n=n.call(t);!(s=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);s=!0);}catch(t){a=!0,i=t}finally{try{s||null==n.return||n.return()}finally{if(a)throw i}}return o}},t.exports.__esModule=!0,t.exports.default=t.exports},521:function(t){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},8206:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},9591:function(t,e,n){var r=n(8).default;function i(){"use strict";t.exports=i=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},n=Object.prototype,o=n.hasOwnProperty,s="function"==typeof Symbol?Symbol:{},a=s.iterator||"@@iterator",l=s.asyncIterator||"@@asyncIterator",u=s.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function p(t,e,n,r){var i=e&&e.prototype instanceof d?e:d,o=Object.create(i.prototype),s=new O(r||[]);return o._invoke=function(t,e,n){var r="suspendedStart";return function(i,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===i)throw o;return L()}for(n.method=i,n.arg=o;;){var s=n.delegate;if(s){var a=E(s,n);if(a){if(a===f)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=h(t,e,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}(t,n,s),o}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var f={};function d(){}function v(){}function g(){}var m={};c(m,a,(function(){return this}));var y=Object.getPrototypeOf,x=y&&y(y(T([])));x&&x!==n&&o.call(x,a)&&(m=x);var b=g.prototype=d.prototype=Object.create(m);function S(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(i,s,a,l){var u=h(t[i],t,s);if("throw"!==u.type){var c=u.arg,p=c.value;return p&&"object"==r(p)&&o.call(p,"__await")?e.resolve(p.__await).then((function(t){n("next",t,a,l)}),(function(t){n("throw",t,a,l)})):e.resolve(p).then((function(t){c.value=t,a(c)}),(function(t){return n("throw",t,a,l)}))}l(u.arg)}var i;this._invoke=function(t,r){function o(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(o,o):o()}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=h(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,f;var i=r.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function T(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:L}}function L(){return{value:void 0,done:!0}}return v.prototype=g,c(b,"constructor",g),c(g,"constructor",v),v.displayName=c(g,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,u,"GeneratorFunction")),t.prototype=Object.create(b),t},e.awrap=function(t){return{__await:t}},S(w.prototype),c(w.prototype,l,(function(){return this})),e.AsyncIterator=w,e.async=function(t,n,r,i,o){void 0===o&&(o=Promise);var s=new w(p(t,n,r,i),o);return e.isGeneratorFunction(n)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},S(b),c(b,u,"Generator"),c(b,a,(function(){return this})),c(b,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=T,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return s.type="throw",s.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var a=o.call(i,"catchLoc"),l=o.call(i,"finallyLoc");if(a&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),P(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;P(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:T(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},e}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},9489:function(t){function e(n,r){return t.exports=e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n,r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},3038:function(t,e,n){var r=n(2858),i=n(3884),o=n(379),s=n(521);t.exports=function(t,e){return r(t)||i(t,e)||o(t,e)||s()},t.exports.__esModule=!0,t.exports.default=t.exports},319:function(t,e,n){var r=n(3646),i=n(6860),o=n(379),s=n(8206);t.exports=function(t){return r(t)||i(t)||o(t)||s()},t.exports.__esModule=!0,t.exports.default=t.exports},8:function(t){function e(n){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},379:function(t,e,n){var r=n(7228);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports},7757:function(t,e,n){t.exports=n(9591)()},2608:function(t,e,n){"use strict";var r=n(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n(7757)),o=r(n(3038)),s=r(n(319)),a=r(n(8926)),l=r(n(9713)),u=r(n(4575)),c=r(n(3913)),p=r(n(3955)),h=r(n(7726)),f=r(n(854)),d=r(n(8945)),v=r(n(9357)),g=r(n(4462)),m=r(n(1298)),y=r(n(9176)),x=r(n(7705)),b=r(n(2844)),S=r(n(4127)),w=r(n(7185)),E=r(n(1439)),k=r(n(2994)),P=r(n(8511)),O=r(n(3636)),T=r(n(3251)),L=r(n(2127)),I=r(n(7159));function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(Object(n),!0).forEach((function(e){(0,l.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var D=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,u.default)(this,t),Object.defineProperty(this,"uid",{value:(0,p.default)(),enumerable:!1,configurable:!1,writable:!1}),this.setDefaults(),this.cache=new Map,this.listeners={},this.observers={},this.options={},this.setOptions(n),this.tour=null,this.setTour(e),this.notifications=[],this.elements=new Map,this.init()}var e,n,r,l,C;return(0,c.default)(t,[{key:"init",value:function(){}},{key:"setDefaults",value:function(){return this.previousStep=null,this.currentStep=null,this.nextStep=null,this.fromStep=null,this.toStep=null,this.previousStepIndex=-1,this.currentStepIndex=-1,this.nextStepIndex=-1,this.fromStepIndex=-1,this.toStepIndex=-1,this.steps=[],this.isDisplayed=!1,this}},{key:"setTour",value:function(t){return this.tour=t,this}},{key:"getTour",value:function(){return this.tour}},{key:"setOptions",value:function(t){return this.options=_(_({},this.constructor.getDefaultOptions()),t),this}},{key:"getOptions",value:function(){return this.options}},{key:"start",value:(C=(0,a.default)(i.default.mark((function t(){var e,n,r,o,s,a,l=arguments;return i.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=l.length>0&&void 0!==l[0]?l[0]:0,n=!(l.length>1&&void 0!==l[1])||l[1],this.isDisplayed=!0,this.mountOverlayEl(),this.startPreloader(),r=l.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=l[s];return t.next=8,this.emit.apply(this,["onStart"].concat(o));case 8:if(this.stopPreloader(),this.tour&&this.tour.length){t.next=13;break}return this.removeOverlayEl(),this.isDisplayed=!1,t.abrupt("return",!1);case 13:if(this.steps=this.sortSteps(this.getSteps(this.tour)),this.steps.length){t.next=18;break}return this.removeOverlayEl(),this.isDisplayed=!1,t.abrupt("return",!1);case 18:return document.body.classList.add(this.constructor.getBodyClass()),t.next=21,this.go.apply(this,[e,n].concat(o));case 21:return a=t.sent,this.isDisplayed=a,document.body.classList.toggle(this.constructor.getBodyClass(),a),a&&(this.options.useKeyboard&&this.addOnKeydownListener(),this.addOnWindowResizeListener(),this.addOnWindowScrollListener()),t.abrupt("return",a);case 26:case"end":return t.stop()}}),t,this)}))),function(){return C.apply(this,arguments)})},{key:"go",value:(l=(0,a.default)(i.default.mark((function t(e){var n,r,o,s,a,l,u,c,p,h,f,d,v,g,m,y,x,b=this,S=arguments;return i.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=!(S.length>1&&void 0!==S[1])||S[1],r=S.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=S[s];if(this.isDisplayed&&this.steps.length){t.next=4;break}return t.abrupt("return",!1);case 4:if(a=n?parseInt(e,10):e,!this.currentStep){t.next=9;break}if(!(n?this.currentStepIndex===a:this.currentStep.step===a)){t.next=9;break}return t.abrupt("return",!1);case 9:if(l=this.currentStep,u=this.currentStepIndex,c=n?this.steps[a]:this.steps.filter((function(t){return t.step===a}))[0]){t.next=14;break}return t.abrupt("return",!1);case 14:if(p=this.steps.indexOf(c),f=p,d=(h=c).onBeforeChange,v=h.onAfterChange,this.startPreloader(),g=!1,!d){t.next=26;break}return t.next=23,Promise.resolve().then((function(){return d.call.apply(d,[b,h,l].concat(o))}));case 23:if(t.t0=t.sent,!1!==t.t0){t.next=26;break}g=!0;case 26:return t.next=28,this.emit.apply(this,["onBeforeChange",h,l].concat(o));case 28:if(!t.sent.some((function(t){return!1===t}))){t.next=30;break}g=!0;case 30:if(this.stopPreloader(),!g){t.next=33;break}return t.abrupt("return",!1);case 33:return this.beforeChangeStep({toStep:h,toStepIndex:f,currentStep:c,currentStepIndex:p,fromStep:l,fromStepIndex:u}),this.toStep=h,this.toStepIndex=f,this.currentStep=c,this.currentStepIndex=p,this.fromStep=l,this.fromStepIndex=u,this.previousStep=this.steps[this.currentStepIndex-1]||null,this.previousStepIndex=this.previousStep?this.currentStepIndex-1:-1,this.nextStep=this.steps[this.currentStepIndex+1]||null,this.nextStepIndex=this.nextStep?this.currentStepIndex+1:-1,m=this.options.scrollBehavior,y=this.currentStep.scrollPadding,x=void 0===y?this.options.scrollPadding:y,this.scrollParentsToStepEl(),this.scrollTo(this.getStepEl(this.currentStep,!0),m,x),this.mountStep(),setTimeout((function(){b.getEl("tooltip")&&b.scrollTo(b.getEl("tooltip"),m,x)}),300),v&&v.call.apply(v,[this,this.toStep,this.fromStep].concat(o)),this.emit.apply(this,["onAfterChange",this.toStep,this.fromStep].concat(o)),t.abrupt("return",!0);case 53:case"end":return t.stop()}}),t,this)}))),function(t){return l.apply(this,arguments)})},{key:"previous",value:(r=(0,a.default)(i.default.mark((function t(){var e,n,r,o,s=this,a=arguments;return i.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=a.length,n=new Array(e),r=0;r<e;r++)n[r]=a[r];if(this.isDisplayed&&this.currentStep&&this.previousStep){t.next=3;break}return t.abrupt("return",!1);case 3:if(o=this.currentStep.onPrevious,this.startPreloader(),!o){t.next=12;break}return t.next=8,Promise.resolve().then((function(){return o.call.apply(o,[s,s.previousStep,s.currentStep].concat(n))}));case 8:if(t.t0=t.sent,!1!==t.t0){t.next=12;break}return this.stopPreloader(),t.abrupt("return",!1);case 12:return t.next=14,this.emit.apply(this,["onPrevious",this.previousStep,this.currentStep].concat(n));case 14:if(!t.sent.some((function(t){return!1===t}))){t.next=17;break}return this.stopPreloader(),t.abrupt("return",!1);case 17:return this.stopPreloader(),t.abrupt("return",this.go.apply(this,[this.previousStepIndex,!0].concat(n)));case 19:case"end":return t.stop()}}),t,this)}))),function(){return r.apply(this,arguments)})},{key:"next",value:(n=(0,a.default)(i.default.mark((function t(){var e,n,r,o,s=this,a=arguments;return i.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=a.length,n=new Array(e),r=0;r<e;r++)n[r]=a[r];if(this.isDisplayed&&this.currentStep&&this.nextStep){t.next=3;break}return t.abrupt("return",!1);case 3:if(o=this.currentStep.onNext,this.startPreloader(),!o){t.next=12;break}return t.next=8,Promise.resolve().then((function(){return o.call.apply(o,[s,s.nextStep,s.currentStep].concat(n))}));case 8:if(t.t0=t.sent,!1!==t.t0){t.next=12;break}return this.stopPreloader(),t.abrupt("return",!1);case 12:return t.next=14,this.emit.apply(this,["onNext",this.nextStep,this.currentStep].concat(n));case 14:if(!t.sent.some((function(t){return!1===t}))){t.next=17;break}return this.stopPreloader(),t.abrupt("return",!1);case 17:return this.stopPreloader(),t.abrupt("return",this.go.apply(this,[this.nextStepIndex,!0].concat(n)));case 19:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"stop",value:(e=(0,a.default)(i.default.mark((function t(){var e,n,r,o=arguments;return i.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.isDisplayed){t.next=2;break}return t.abrupt("return",this);case 2:for(e=o.length,n=new Array(e),r=0;r<e;r++)n[r]=o[r];if(this.currentStepIndex!==this.steps.length-1){t.next=8;break}return this.startPreloader(),t.next=7,this.emit.apply(this,["onComplete"].concat(n));case 7:this.stopPreloader();case 8:return this.startPreloader(),t.next=11,this.emit.apply(this,["onStop"].concat(n));case 11:return this.stopPreloader(),document.body.classList.remove(this.constructor.getBodyClass()),this.removeListeners(),this.unobserveStep(),this.unmountStep(),this.removeOverlayEl(),this.cache.clear(),this.elements.clear(),this.setDefaults(),t.abrupt("return",this);case 21:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"getSteps",value:function(t){return t&&t.length?"string"==typeof t?this.getDataSteps(t):this.getJsSteps(t):[]}},{key:"getDataSteps",value:function(t){var e=this,n="data-guidechimp",r=Array.from(document.querySelectorAll("[".concat(n,"-tour*='").concat(t,"']")));r=r.filter((function(t){return t.getAttribute("".concat(n,"-tour")).split(",").includes(e.tour)}));var i=new RegExp("^".concat(n,"-").concat(t,"-[^-]+$")),o=new RegExp("^".concat(n,"-[^-]+$"));return r.map((function(r,s){for(var a={},l=0;l<r.attributes.length;l++){var u=r.attributes[l],c=u.name,p=u.value,h=i.test(c),f=!h&&o.test(c);if(h||f){var d=h?c.replace("".concat(n,"-").concat(t,"-"),""):c.replace("".concat(n,"-"),"");"tour"!==d&&(h||f&&!a[d])&&(a[d]=p)}}return _(_({step:s,title:"",description:"",position:e.options.position,interaction:e.options.interaction},a),{},{element:r})}))}},{key:"getJsSteps",value:function(t){return t.map((function(t,e){return _(_({},t),{},{step:t.step||e})}))}},{key:"sortSteps",value:function(t){return(0,s.default)(t).sort((function(t,e){return t.step<e.step?-1:t.step>e.step?1:0}))}},{key:"getStepEl",value:function(t){var e=(t||{}).element;if(!e)return this.mountFakeStepEl();var n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n="string"==typeof t?document.querySelector(t):t;return n||e}(e);return n&&"none"!==n.style.display&&"hidden"!==n.style.visibility||(n=this.getEl("fakeStep")?this.getEl("fakeStep"):this.mountFakeStepEl()),n}},{key:"scrollParentsToStepEl",value:function(){var t=this.currentStep.scrollPadding,e=void 0===t?this.options.scrollPadding:t;return this.scrollParentsToEl(this.getStepEl(this.currentStep),e)}},{key:"getScrollableParentsEls",value:function(t){for(var e=[],n=t;n&&n!==n.ownerDocument.body;)n=this.getScrollableParentEl(n),e.push(n);return e}},{key:"getScrollableParentEl",value:function(t){var e=/(auto|scroll)/,n=getComputedStyle(t),r=t.ownerDocument;return"fixed"===n.getPropertyValue("position")?r.body:function t(i){if(!i||i===r.body)return r.body;var o=getComputedStyle(i);if("fixed"===n.getPropertyValue("position")&&"static"===o.getPropertyValue("position"))return t(i.parentElement);var s=o.getPropertyValue("overflow-x"),a=o.getPropertyValue("overflow-y");return e.test(s)||e.test(a)?i:t(i.parentElement)}(t.parentElement)}},{key:"scrollParentsToEl",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=this.getScrollableParentsEls(t);return n.forEach((function(n){n!==document.body&&(n.scrollTop=t.offsetTop-n.offsetTop-e,n.scrollLeft=t.offsetLeft-n.offsetLeft-e)})),this}},{key:"scrollTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"auto",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=t.getBoundingClientRect(),i=r.top,o=r.bottom,s=r.left,a=r.right,l=window,u=l.innerWidth,c=l.innerHeight;return s>=0&&a<=u||window.scrollBy({behavior:e,left:s-n}),i>=0&&o<=c||window.scrollBy({behavior:e,top:i-n}),this}},{key:"highlightStepEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.getStepEl(this.currentStep),n=this.getEl("overlay");if(n){var r=n.querySelector("path"),i=r.querySelector("animate"),o=this.isEl(e,"fakeStep"),s=o?this.getOverlayDocumentPath():this.getOverlayStepPath(this.currentStep);if(r.setAttribute("d",s),i){var a=i.getAttribute("lock");if(a||(i.setAttribute("from",s),i.setAttribute("to",s)),t){var l=this.isEl(this.getStepEl(this.fromStep),"fakeStep"),u=!this.fromStep||l||o?null:this.getOverlayStepPath(this.fromStep);u&&(i.setAttribute("from",u),i.setAttribute("to",s)),i.setAttribute("lock","true")}i.onend=function(){i.removeAttribute("lock")},i.beginElement()}}var c=getComputedStyle(e);return["absolute","relative","fixed"].includes(c.getPropertyValue("position"))||e.classList.add(this.constructor.getRelativePositionClass()),e.classList.add(this.constructor.getHighlightClass()),e.setAttribute("data-guidechimp-".concat(this.uid),"highlight"),this.elements.set("highlight",e),this}},{key:"resetHighlightStepEl",value:function(){var t=this.getEl("overlay");if(t){var e=t.querySelector("path"),n=t.querySelector("animate");e.setAttribute("d",this.getOverlayDocumentPath()),n&&(n.removeAttribute("from"),n.removeAttribute("to"))}var r=this.getStepEl(this.currentStep);return r.classList.remove(this.constructor.getRelativePositionClass()),r.classList.remove(this.constructor.getHighlightClass()),r.removeAttribute("data-guidechimp-".concat(this.uid)),this.elements.delete("highlight"),this}},{key:"setInteractionPosition",value:function(t){var e=this.getStepEl(this.currentStep);if(!t||!e)return this;var n=this.options.padding;"floating"===getComputedStyle(e).getPropertyValue("position")&&(n=0);var r=this.constructor.getOffset(e),i=r.width,o=r.height,s=r.top,a=r.left;return t.classList.toggle(this.constructor.getFixedClass(),this.constructor.isFixed(e)),t.style.cssText="width: ".concat(i+n,"px;\n        height: ").concat(o+n,"px;\n        top: ").concat(s-n/2,"px;\n        left: ").concat(a-n/2,"px;"),this}},{key:"setControlPosition",value:function(t){var e=this.getStepEl(this.currentStep);if(!t||!e)return this;var n=this.options.padding;"floating"===getComputedStyle(e).getPropertyValue("position")&&(n=0);var r=e.ownerDocument.defaultView.pageXOffset,i=e.ownerDocument.documentElement.getBoundingClientRect().width,o=this.constructor.getOffset(e),s=o.height,a=o.top,l=o.left,u=o.right,c=s+n,p=a-n/2,h=r<r+(l-n/2)?r:l-n/2,f=r+i>r+(u+n/2)?i:u+n/2;return t.classList.toggle(this.constructor.getFixedClass(),this.constructor.isFixed(e)),t.style.cssText="width: ".concat(f,"px;\n        height: ").concat(c,"px;\n        top: ").concat(p,"px;\n        left: ").concat(h,"px;"),this}},{key:"setTooltipPosition",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this.currentStep)return this;var n=this.getStepEl(this.currentStep);if(!t||!n)return this;var r=e.boundary,i=e.position,s=this.options.padding;r=r||window;var a=(i=(i=i||this.currentStep.position)||this.options.position).split("-"),l=(0,o.default)(a,2),u=l[0],c=l[1],p=getComputedStyle(n);"floating"===p.getPropertyValue("position")&&(s=0);var h=t.style;h.top=null,h.right=null,h.bottom=null,h.left=null,h.transform=null;var f=n.getBoundingClientRect(),d=f.top,v=f.bottom,g=f.left,m=f.right,y=f.width,x=f.height,b=t.getBoundingClientRect(),S=b.height,w=b.width,E=t.cloneNode(!0);E.style.visibility="hidden",E.innerHTML="",t.parentElement.appendChild(E);var k=E.getBoundingClientRect(),P=k.width;E.parentElement.removeChild(E);var O=new DOMRect(0,0,window.innerWidth,window.innerHeight);if(!(r instanceof Window)){var T=r.getBoundingClientRect(),L=T.x,I=T.y;O=new DOMRect(L,I,r.scrollWidth,r.scrollHeight)}var C=O,_=C.top,D=C.bottom,j=C.left,A=C.right;if(this.isEl(n,"fakeStep"))u="floating";else{var M=["bottom","right","left","top"],N=getComputedStyle(t),R=N.marginTop,$=N.marginLeft,W=N.marginRight,B=N.marginBottom;if(R=parseInt(R,10),$=parseInt($,10),W=parseInt(W,10),S+R+(B=parseInt(B,10))>d-_&&M.splice(M.indexOf("top"),1),S+R+B>D-v&&M.splice(M.indexOf("bottom"),1),P+$+W>g-j&&M.splice(M.indexOf("left"),1),P+$+W>A-m&&M.splice(M.indexOf("right"),1),"top"===(u=M.length?M.includes(u)?u:M[0]:"floating")||"bottom"===u){var F=["left","right","middle"];A-g<P&&F.splice(F.indexOf("left"),1),m-j<P&&F.splice(F.indexOf("right"),1),(g+y/2-j<P/2||A-(m-y/2)<P/2)&&F.splice(F.indexOf("middle"),1),c=F.length?F.includes(c)?c:F[0]:"middle"}}t.setAttribute("data-guidechimp-position",u);var z=document.documentElement;switch(u){case"top":h.bottom="".concat(x+s,"px");break;case"right":h.left="".concat(m+s/2-z.clientLeft,"px");break;case"left":h.right="".concat(z.clientWidth-(g-s/2),"px");break;case"bottom":h.top="".concat(x+s,"px");break;default:h.left="50%",h.top="50%",h.transform="translate(-50%,-50%)"}if(t.removeAttribute("data-guidechimp-alignment"),c)switch(t.setAttribute("data-guidechimp-alignment",c),c){case"left":h.left="".concat(g-s/2,"px");break;case"right":h.right="".concat(z.clientWidth-m-s/2,"px");break;default:g+y/2<w/2||g+y/2+w/2>z.clientWidth?h.left="".concat(z.clientWidth/2-w/2,"px"):h.left="".concat(g+y/2-w/2,"px")}return this}},{key:"startPreloader",value:function(){document.body.classList.add(this.constructor.getLoadingClass());var t=this.getEl("overlay");if(t){var e=t.querySelector("path"),n=t.querySelector("animate"),r=new Map;r.set("d",e.getAttribute("d")),e.setAttribute("d",this.getOverlayDocumentPath()),n&&(r.set("from",n.getAttribute("from")),r.set("to",n.getAttribute("to")),n.removeAttribute("from"),n.removeAttribute("to")),this.cache.set("preloaderCache",r)}var i=this.mountPreloaderEl();return i.hidden=!0,setTimeout((function(){i.hidden=!1}),100),this}},{key:"stopPreloader",value:function(){document.body.classList.remove(this.constructor.getLoadingClass());var t=this.getEl("overlay");if(t){var e=t.querySelector("path"),n=t.querySelector("animate"),r=this.cache.get("preloaderCache")||new Map;r.has("d")&&e.setAttribute("d",r.get("d")),n&&(r.has("from")&&n.setAttribute("from",r.get("from")),r.has("to")&&n.setAttribute("to",r.get("to"))),this.cache.delete("preloaderCache")}return this.removePreloaderEl(),this}},{key:"getDefaultTmplData",value:function(){var t=this;return{previousStep:this.previousStep,currentStep:this.currentStep,nextStep:this.nextStep,fromStep:this.fromStep,toStep:this.toStep,previousStepIndex:this.previousStepIndex,currentStepIndex:this.currentStepIndex,nextStepIndex:this.nextStepIndex,fromStepIndex:this.fromStepIndex,toStepIndex:this.toStepIndex,steps:this.steps,go:function(){return t.go.apply(t,arguments)},previous:function(){return t.previous.apply(t,arguments)},next:function(){return t.next.apply(t,arguments)},stop:function(){return t.stop.apply(t,arguments)}}}},{key:"mountStep",value:function(){var t=this.mountInteractionEl(),e=this.mountControlEl();return this.setInteractionPosition(t),this.setControlPosition(e),this.setTooltipPosition(this.getEl("tooltip")),this.observeStep(),this.highlightStepEl(!0),this}},{key:"unmountStep",value:function(){return this.resetHighlightStepEl(),this.removeInteractionEl(),this.removeControlEl(),this.removePreloaderEl(),this.removeFakeStepEl(),this}},{key:"createEl",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=(0,h.default)(e,n);return r&&r.setAttribute("data-quidechimp-".concat(this.uid),t),r}},{key:"getEl",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=this.elements.get(t);return n||(n=document.querySelector("[data-quidechimp-".concat(this.uid,'="').concat(t,'"]'))),n||e}},{key:"mountEl",value:function(t,e){var n=this;if(t){var r=t.querySelectorAll("[data-quidechimp-".concat(this.uid,"]"));[t].concat((0,s.default)(r)).forEach((function(t){var e=t.getAttribute("data-quidechimp-".concat(n.uid));e&&(n.removeEl(e),n.elements.set(e,t))})),e.appendChild(t)}return t}},{key:"removeEl",value:function(t){var e=this.getEl(t);return e&&e.parentElement.removeChild(e),this.elements.delete(t),this}},{key:"isEl",value:function(t,e){return this.getEl(e)?t===this.getEl(e):t.getAttribute("data-quidechimp-".concat(this.uid))===e}},{key:"getFakeStepTmpl",value:function(){return I.default}},{key:"createFakeStepEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.createEl("fakeStep",this.getFakeStepTmpl(),_(_({},this.getDefaultTmplData()),t))}},{key:"mountFakeStepEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.mountEl(this.createFakeStepEl(t),document.body)}},{key:"removeFakeStepEl",value:function(){return this.removeEl("fakeStep")}},{key:"getPreloaderTmpl",value:function(){return v.default}},{key:"createPreloaderEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.createEl("preloader",this.getPreloaderTmpl(),t)}},{key:"mountPreloaderEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.mountEl(this.createPreloaderEl(t),document.body)}},{key:"removePreloaderEl",value:function(){return this.removeEl("preloader")}},{key:"getOverlayDocumentPath",value:function(){var t=window,e=t.innerWidth,n=t.innerHeight,r=document.body,i=r.scrollWidth,o=r.scrollHeight,s=n>o?n:o;return"M 0 0 H ".concat(e>i?e:i," V ").concat(s," H 0 V 0 Z")}},{key:"getOverlayStepPath",value:function(t){return this.getOverlayElPath(this.getStepEl(t))}},{key:"getOverlayElPath",value:function(t){var e=this.options.padding;e=e?e/2:0;var n=t.getBoundingClientRect(),r=n.left,i=n.top,o=n.width,s=n.height,a=this.getOverlayDocumentPath();return a+="M ".concat(r-e+4," ").concat(i-e,"\n                 a ").concat(4,",").concat(4," 0 0 0 -").concat(4,",").concat(4,"\n                 V ").concat(s+i+e-4,"\n                 a ").concat(4,",").concat(4," 0 0 0 ").concat(4,",").concat(4,"\n                 H ").concat(o+r+e-4,"\n                 a ").concat(4,",").concat(4," 0 0 0 ").concat(4,",-").concat(4,"\n                 V ").concat(i-e+4,"\n                 a ").concat(4,",").concat(4," 0 0 0 -").concat(4,",-").concat(4,"Z")}},{key:"getOverlayTmpl",value:function(){return d.default}},{key:"createOverlayEl",value:function(){var t,e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r={stop:(t=(0,a.default)(i.default.mark((function t(){var n=arguments;return i.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.options.exitOverlay){t.next=3;break}return t.next=3,e.stop.apply(e,n);case 3:case"end":return t.stop()}}),t)}))),function(){return t.apply(this,arguments)}),path:this.getOverlayDocumentPath()};return this.createEl("overlay",this.getOverlayTmpl(),_(_({},r),n))}},{key:"mountOverlayEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.mountEl(this.createOverlayEl(t),document.body)}},{key:"removeOverlayEl",value:function(){return this.removeEl("overlay")}},{key:"getInteractionTmpl",value:function(){return g.default}},{key:"createInteractionEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.options.interaction;"boolean"==typeof this.currentStep.interaction&&(e=this.currentStep.interaction);var n=_(_({},this.getDefaultTmplData()),{},{interaction:e});return this.createEl("interaction",this.getInteractionTmpl(),_(_({},n),t))}},{key:"mountInteractionEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.mountEl(this.createInteractionEl(t),document.body)}},{key:"removeInteractionEl",value:function(){return this.removeEl("interaction")}},{key:"getControlTmpl",value:function(){return m.default}},{key:"createControlEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.createEl("control",this.getControlTmpl(),_(_({},this.getDefaultTmplData()),{},{tooltipEl:this.createTooltipEl(t)},t))}},{key:"mountControlEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.mountEl(this.createControlEl(t),document.body)}},{key:"removeControlEl",value:function(){return this.removeEl("control")}},{key:"getTooltipTmpl",value:function(){return y.default}},{key:"createTooltipEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=_(_({},this.getDefaultTmplData()),{},{progressbar:this.createProgressbarEl(t),title:this.createTitleEl(t),description:this.createDescriptionEl(t),close:this.createCloseEl(t),customButtons:this.createCustomButtonsEl(t),previous:this.createPreviousEl(t),pagination:this.createPaginationEl(t),next:this.createNextEl(t),copyright:this.createCopyrightEl(t),notification:this.createNotificationEl(t)});return this.createEl("tooltip",this.getTooltipTmpl(),_(_({},e),t))}},{key:"getCloseTmpl",value:function(){return O.default}},{key:"createCloseEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.createEl("close",this.getCloseTmpl(),_(_({},this.getDefaultTmplData()),t))}},{key:"getProgressbarTmpl",value:function(){return x.default}},{key:"createProgressbarEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.options.showProgressbar;"boolean"==typeof this.currentStep.showProgressbar&&(e=this.currentStep.showProgressbar);var n=100,r=0,i=(this.currentStepIndex+1)/this.steps.length*100,o=_(_({},this.getDefaultTmplData()),{},{showProgressbar:e,progressMax:n,progressMin:r,progress:i});return this.createEl("progressbar",this.getProgressbarTmpl(),_(_({},o),t))}},{key:"getTitleTmpl",value:function(){return b.default}},{key:"createTitleEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.currentStep.title,n=void 0===e?"":e;return this.createEl("title",this.getTitleTmpl(),_(_({},this.getDefaultTmplData()),{},{title:n},t))}},{key:"getDescriptionTmpl",value:function(){return S.default}},{key:"createDescriptionEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.currentStep.description,n=void 0===e?"":e;return this.createEl("description",this.getDescriptionTmpl(),_(_({},this.getDefaultTmplData()),{},{description:n},t))}},{key:"getCustomButtonsTmpl",value:function(){return w.default}},{key:"createCustomButtonsEl",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=[];return this.currentStep.buttons&&this.currentStep.buttons.forEach((function(e){var r=e;if(!(0,f.default)(r)){var i=e.onClick,o=e.tagName,s=void 0===o?"button":o,a=e.title,l=void 0===a?"":a,u=e.class;(r=document.createElement(s)).innerHTML=l,u&&(r.className=u),i&&r.addEventListener("click",(function(e){i.call(t,e)}))}n.push(r)})),this.createEl("customButtons",this.getCustomButtonsTmpl(),_(_({},this.getDefaultTmplData()),{},{buttons:n},e))}},{key:"getPaginationTmpl",value:function(){return k.default}},{key:"createPaginationEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.currentStep,n=e.paginationTheme,r=void 0===n?this.options.paginationTheme:n,i=e.paginationCirclesMaxItems,o=void 0===i?this.options.paginationCirclesMaxItems:i,s=this.options.showPagination;return"boolean"==typeof this.currentStep.showPagination&&(s=this.currentStep.showPagination),this.createEl("pagination",this.getPaginationTmpl(),_(_({},this.getDefaultTmplData()),{},{showPagination:s,paginationTheme:r,paginationCirclesMaxItems:o},t))}},{key:"getPreviousTmpl",value:function(){return E.default}},{key:"createPreviousEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.options.showNavigation;return"boolean"==typeof this.currentStep.showNavigation&&(e=this.currentStep.showNavigation),this.createEl("previous",this.getPreviousTmpl(),_(_({},this.getDefaultTmplData()),{},{showNavigation:e},t))}},{key:"getNextTmpl",value:function(){return P.default}},{key:"createNextEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.options.showNavigation;return"boolean"==typeof this.currentStep.showNavigation&&(e=this.currentStep.showNavigation),this.createEl("next",this.getNextTmpl(),_(_({},this.getDefaultTmplData()),{},{showNavigation:e},t))}},{key:"getCopyrightTmpl",value:function(){return T.default}},{key:"createCopyrightEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.createEl("copyright",this.getCopyrightTmpl(),_(_({},this.getDefaultTmplData()),t))}},{key:"getNotificationTmpl",value:function(){return L.default}},{key:"createNotificationEl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.createEl("notification",this.getNotificationTmpl(),_(_({},this.getDefaultTmplData()),{},{messages:this.notifications},t))}},{key:"notify",value:function(t){this.notifications.push(t);var e=this.getEl("notification");return e&&this.mountEl(this.createNotificationEl(),e.parentElement),this}},{key:"on",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=this.constructor.getEventListenersPriorities(),i=(0,o.default)(r,1),s=i[0];n.priority&&r.includes(n.priority)&&(s=n.priority);var a=t.trim();return this.listeners[a]=this.listeners[a]||{},this.listeners[a][s]=this.listeners[a][s]||[],this.listeners[a][s].push(e),this}},{key:"emit",value:function(t){for(var e=this,n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];var o=(0,s.default)(this.constructor.getEventListenersPriorities()).reverse(),a=t.trim(),l=[],u=Promise.resolve(l);return this.listeners[a]&&o.forEach((function(t){var n=e.listeners[a][t];n&&(u=u.then((function(){return Promise.all(n.map((function(t){return Promise.resolve().then((function(){return t.apply(e,r)}))})))})).then((function(t){return l=[].concat((0,s.default)(l),(0,s.default)(t))})))})),u}},{key:"addOnKeydownListener",value:function(){return this.cache.set("onKeydownListener",this.getOnKeydownListener()),window.addEventListener("keydown",this.cache.get("onKeydownListener"),!0),this}},{key:"getOnKeydownListener",value:function(){var t=this;return function(e){var n=e.keyCode,r=_(_({},t.constructor.getDefaultKeyboardCodes()),t.options.useKeyboard),i=r.previous,o=r.next,s=r.stop;s&&s.includes(n)?t.stop({event:e}):i&&i.includes(n)?t.previous({event:e}):o&&o.includes(n)&&t.next({event:e})}}},{key:"removeOnKeydownListener",value:function(){return this.cache.has("onKeydownListener")&&(window.removeEventListener("keydown",this.cache.get("onKeydownListener"),!0),this.cache.delete("onKeydownListener")),this}},{key:"addOnWindowResizeListener",value:function(){return this.cache.set("onWindowResizeListener",this.getOnWindowResizeListener()),window.addEventListener("resize",this.cache.get("onWindowResizeListener"),!0),this}},{key:"getOnWindowResizeListener",value:function(){var t=this;return function(){return t.refresh()}}},{key:"removeOnWindowResizeListener",value:function(){return this.cache.has("onWindowResizeListener")&&(window.removeEventListener("resize",this.cache.get("onWindowResizeListener"),!0),this.cache.delete("onWindowResizeListener")),this}},{key:"addOnWindowScrollListener",value:function(){return this.cache.set("onWindowScrollListener",this.getOnWindowScrollListener()),window.addEventListener("scroll",this.cache.get("onWindowScrollListener"),!0),this}},{key:"getOnWindowScrollListener",value:function(){var t=this;return function(){return t.refresh()}}},{key:"removeOnWindowScrollListener",value:function(){return this.cache.has("onWindowScrollListener")&&(window.removeEventListener("scroll",this.cache.get("onWindowScrollListener"),!0),this.cache.delete("onWindowScrollListener")),this}},{key:"removeListeners",value:function(){this.removeOnKeydownListener(),this.removeOnWindowResizeListener(),this.removeOnWindowScrollListener()}},{key:"observeStep",value:function(){this.observeResizing(),this.observeMutation()}},{key:"observeResizing",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{box:"border-box"},n=this.observers.resizingObserver;return n||"undefined"==typeof ResizeObserver||(n=new ResizeObserver((function(){(t||t.currentStep)&&t.refresh()})),this.observers.resizingObserver=n),!!n&&(n.observe(this.getStepEl(this.currentStep),e),!0)}},{key:"unobserveResizing",value:function(){var t=this.observers.resizingObserver;return!!t&&(t.disconnect(),!0)}},{key:"observeMutation",value:function(){var t=this,e=this.observers.mutationObserver;return e||(e=new MutationObserver((function(e){if((t||t.currentStep)&&t.currentStep.element){var n=t.getStepEl(t.currentStep),r=function(){return n&&!t.isEl(n,"fakeStep")};e.forEach((function(e){r()?"childList"===e.type&&e.removedNodes.length&&e.removedNodes.forEach((function(e){(e===n||e.contains(n))&&(n=t.getStepEl(t.currentStep),t.scrollParentsToStepEl(),t.refresh())})):"childList"===e.type&&e.addedNodes.length&&(n=t.getStepEl(t.currentStep),r()&&(t.scrollParentsToStepEl(),t.refresh()))}))}})),this.observers.mutationObserver=e),e.observe(this.getStepEl(this.currentStep).ownerDocument.body,{childList:!0,subtree:!0}),!0}},{key:"unobserveMutation",value:function(){var t=this.observers.mutationObserver;return!!t&&(t.disconnect(),!0)}},{key:"unobserveStep",value:function(){this.unobserveResizing(),this.unobserveMutation()}},{key:"beforeChangeStep",value:function(){this.unmountStep(),this.unobserveStep()}},{key:"refresh",value:function(){return this.currentStep?(this.highlightStepEl(),this.setControlPosition(this.getEl("control")),this.setInteractionPosition(this.getEl("interaction")),this.setTooltipPosition(this.getEl("tooltip")),this):this}}],[{key:"getDefaultOptions",value:function(){return{position:"bottom",useKeyboard:!0,exitEscape:!0,exitOverlay:!0,showPagination:!0,showNavigation:!0,showProgressbar:!0,paginationTheme:"circles",paginationCirclesMaxItems:10,interaction:!0,padding:8,scrollPadding:10,scrollBehavior:"auto"}}},{key:"getDefaultKeyboardCodes",value:function(){return{previous:[37],next:[39,13,32],stop:[27]}}},{key:"getEventListenersPriorities",value:function(){return["low","medium","high","critical"]}},{key:"getBodyClass",value:function(){return"gc"}},{key:"getLoadingClass",value:function(){return"gc-loading"}},{key:"getHighlightClass",value:function(){return"gc-highlight"}},{key:"getFixedClass",value:function(){return"gc-fixed"}},{key:"getRelativePositionClass",value:function(){return"gc-relative"}},{key:"getOffset",value:function(t){var e=t.ownerDocument,n=e.body,r=e.documentElement,i=e.defaultView,o=i.pageYOffset||r.scrollTop||n.scrollTop,s=i.pageXOffset||r.scrollLeft||n.scrollLeft,a=t.getBoundingClientRect(),l=a.top,u=a.right,c=a.bottom,p=a.left;return{right:u,bottom:c,width:a.width,height:a.height,x:a.x,y:a.y,top:l+o,left:p+s}}},{key:"isFixed",value:function(t){var e=t.parentNode;return!(!e||"HTML"===e.nodeName)&&("fixed"===getComputedStyle(t).getPropertyValue("position")||this.isFixed(e))}}]),t}();e.default=D},2157:function(t,e,n){"use strict";var r=n(5318),i=r(n(9100)),o=r(n(2608));n(8547);var s=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return(0,i.default)(o.default,e)};s.prototype=o.default.prototype,s.plugins=new Set,s.extend=function(t){if(!s.plugins.has(t)){s.plugins.add(t);for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];t.apply(void 0,[o.default,s].concat(n))}return s},t.exports=s},7726:function(t,e,n){"use strict";var r=n(5318);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n(9713)),o=r(n(3038)),s=r(n(9100)),a=r(n(319)),l=r(n(2353)),u=r(n(5220)),c=r(n(854)),p=r(n(8603));function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){(0,i.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new DOMParser,r=t.replace(/<template/g,"<gc-template");r=r.replace(/<\/template/g,"</gc-template");var h=n.parseFromString(r,"text/html"),d=document.implementation.createHTMLDocument(),v=/{{([^}}]+)?}}/gm,g=/^@(.+)$/,m=new Map,y=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d.body,h=r,y=Object.keys(n),x=Object.values(n),b=function(t){return(0,s.default)(Function,(0,a.default)(y).concat(["return ".concat(t,";")])).apply(void 0,(0,a.default)(x))};if(e){if(e.nodeType===Node.ELEMENT_NODE){if(e.hasAttribute("if")){if(m.set(e.parentNode,!1),!b(e.getAttribute("if")))return;m.set(e.parentNode,!0)}if(e.hasAttribute("elseif")){if(m.get(e.parentNode)||!b(e.getAttribute("elseif")))return;m.set(e.parentNode,!0)}if(e.hasAttribute("else")){if(m.get(e.parentNode))return;m.set(e.parentNode,!0)}if(e.hasAttribute("for")){var S=e.getAttribute("for").split(" in "),w=(0,o.default)(S,2),E=w[0],k=w[1];e.removeAttribute("for");var P=E.replace(/\(|\)/g,"").split(","),O=(0,o.default)(P,2),T=O[0],L=O[1];T=T.trim(),L=L?L.trim():"";var I=b(k.trim()),C=Array.isArray(I);return void Object.keys(I).forEach((function(r){var o=f(f({},n),{},(0,i.default)({},T,I[r]));L&&(o[L]=C?parseInt(r,10):r),t(e,o,h)}))}e!==e.ownerDocument.body&&"GC-TEMPLATE"!==e.tagName&&(h=e.cloneNode(),r.append(h)),(0,a.default)(e.attributes).forEach((function(t){var e=t.name,n=t.value,r=g.exec(e);if(r){var i=(0,o.default)(r,2)[1];return h.addEventListener(i,(function(t){return(0,s.default)(Function,[].concat((0,a.default)(y),["$event"]).concat(["return ".concat(n).concat(/\(.+\)/.test(n)?"":"()",";")])).apply(void 0,[].concat((0,a.default)(x),[t]))})),void h.removeAttribute(e)}for(var c=v.exec(n),p=0,f="";c;){f+=n.slice(p,c.index);var d=c,m=(0,o.default)(d,2),S=m[0],w=m[1];w=w.trim();try{S=b(w),((0,l.default)(S)||(0,u.default)(S))&&(S="")}catch(t){console.error(t)}f+=S,p=c.index+c[0].length,c=v.exec(n)}f+=n.substr(p,n.length-p),"html"===e?(h.innerHTML=f,h.removeAttribute(e)):["if","else","elseif"].includes(e)?h.removeAttribute(e):h.setAttribute(e,f)}))}else if(e.nodeType===Node.TEXT_NODE){var _=v.exec(e.nodeValue);if(_){for(var D=0;_;){h.append(document.createTextNode(e.nodeValue.slice(D,_.index)));var j=_,A=(0,o.default)(j,2),M=A[0],N=A[1];N=N.trim();try{M=b(N),((0,l.default)(M)||(0,u.default)(M))&&(M="")}catch(t){console.error(t)}(0,c.default)(M)?h.append(M):(0,p.default)(M)?M.forEach((function(t){h.append(t)})):h.append(document.createTextNode(M)),D=_.index+_[0].length,_=v.exec(e.nodeValue)}h.append(document.createTextNode(e.nodeValue.slice(D,e.nodeValue.length)))}else h.append(e.cloneNode())}var R=e.childNodes,$=void 0===R?[]:R;$.length&&$.forEach((function(e){t(e,n,h)}))}};return y(h.body,e,d.body),d.body.firstElementChild}},854:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default=function(t){return/^\[object HTML(.+)Element\]$/.test("".concat(t))}},8603:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default=function(t){return/^[object NodeList]$/.test("".concat(t))}},3636:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-close" @click="stop({ event: $event })"></div>'},1298:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-control"> {{ tooltipEl }} </div>'},3251:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-copyright">Made with GuideChimp</div>'},7185:function(t,e,n){"use strict";n.r(e);e.default='<div if="buttons.length" class="gc-custom-buttons"> <template for="button in buttons"> {{ button }} </template> </div>'},4127:function(t,e,n){"use strict";n.r(e);e.default='<div if="description" html="{{ description }}" class="gc-description"></div>'},7159:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-fake-step"></div>'},4462:function(t,e,n){"use strict";n.r(e);e.default='<div if="!interaction" class="gc-interaction gc-disable"> </div>'},8511:function(t,e,n){"use strict";n.r(e);e.default="<div class=\"gc-navigation-next {{ (!nextStep || !showNavigation) ? 'gc-hidden': '' }}\" @click=\"next({ event: $event })\"></div>"},2127:function(t,e,n){"use strict";n.r(e);e.default='<div html="{{ messages[0] }}" class="gc-notification"></div>'},8945:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-overlay" @click="stop({ event: $event })"> <svg class="svg-overlay"> <path d="{{path}}"> <animate attributeName="d" dur="200ms"/> </path> </svg> </div>'},2994:function(t,e,n){"use strict";n.r(e);e.default='<div if="showPagination && steps.length > 1" class="gc-pagination"> <template if="paginationTheme === \'numbers\' || steps.length >= paginationCirclesMaxItems"> <ul class="gc-pagination-theme-numbers"> <template for="(step, index) in steps"> <template if="index === 0"> <li if="index === currentStepIndex" class="gc-pagination-item gc-pagination-item-current gc-pagination-active" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> <li elseif="index === previousStepIndex" class="gc-pagination-item gc-pagination-item-previous" @click="previous({ event: $event })"> {{ index + 1 }} </li> <li elseif="index === nextStepIndex" class="gc-pagination-item gc-pagination-item-next" @click="next({ event: $event })"> {{ index + 1 }} </li> <li else class="gc-pagination-item" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> </template> <template if="currentStepIndex < 3"> <template if="index > 0 && index < 5"> <li if="index === currentStepIndex" class="gc-pagination-item gc-pagination-item-current gc-pagination-active" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> <li elseif="index === previousStepIndex" class="gc-pagination-item gc-pagination-item-previous" @click="previous({ event: $event })"> {{ index + 1 }} </li> <li elseif="index === nextStepIndex" class="gc-pagination-item gc-pagination-item-next" @click="next({ event: $event })"> {{ index + 1 }} </li> <li else class="gc-pagination-item" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> </template> <li elseif="index === 5 && index !== steps.length - 1" class="gc-pagination-dots"> ... </li> </template> <template elseif="steps.length - currentStepIndex < 5"> <template if="steps.length - index < 6 && steps.length - 1 !== index"> <li if="index === currentStepIndex" class="gc-pagination-item gc-pagination-item-current gc-pagination-active" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> <li elseif="index === previousStepIndex" class="gc-pagination-item gc-pagination-item-previous" @click="previous({ event: $event })"> {{ index + 1 }} </li> <li elseif="index === nextStepIndex" class="gc-pagination-item gc-pagination-item-next" @click="next({ event: $event })"> {{ index + 1 }} </li> <li else class="gc-pagination-item" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> </template> <li elseif="steps.length - index === 6 && index !== 0" class="gc-pagination-dots"> ... </li> </template> <template else> <li if="currentStepIndex - index === 3 && index !== 0" class="gc-pagination-dots"> ... </li> <template elseif="(currentStepIndex - index >= 0 && currentStepIndex - index < 3)\n                    || ( index - currentStepIndex >= 0 && index - currentStepIndex < 3)"> <li if="index === currentStepIndex" class="gc-pagination-item gc-pagination-item-current gc-pagination-active" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> <li elseif="index === previousStepIndex" class="gc-pagination-item gc-pagination-item-previous" @click="previous({ event: $event })"> {{ index + 1 }} </li> <li elseif="index === nextStepIndex" class="gc-pagination-item gc-pagination-item-next" @click="next({ event: $event })"> {{ index + 1 }} </li> <li else class="gc-pagination-item" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> </template> <li elseif="index - currentStepIndex === 3 && steps.length -1 !== index" class="gc-pagination-dots"> ... </li> </template> <template if="index + 1 === steps.length"> <li if="index === currentStepIndex" class="gc-pagination-item gc-pagination-item-current gc-pagination-active" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> <li elseif="index === previousStepIndex" class="gc-pagination-item gc-pagination-item-previous" @click="previous({ event: $event })"> {{ index + 1 }} </li> <li elseif="index === nextStepIndex" class="gc-pagination-item gc-pagination-item-next" @click="next({ event: $event })"> {{ index + 1 }} </li> <li else class="gc-pagination-item" @click="go(index, true, { event: $event })"> {{ index + 1 }} </li> </template> </template> </ul> </template> <template else> <div class="gc-pagination-theme-circles"> <template for="(step, index) in steps"> <div if="index === currentStepIndex" class="gc-pagination-item gc-pagination-item-current gc-pagination-active"></div> <div elseif="index === previousStepIndex" class="gc-pagination-item gc-pagination-item-previous" @click="previous({ event: $event })"></div> <div elseif="index === nextStepIndex" class="gc-pagination-item gc-pagination-item-next" @click="next({ event: $event })"></div> <div else class="gc-pagination-item" @click="go(index, true, { event: $event })"></div> </template> </div> </template> </div> '},9357:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-preloader"></div>'},1439:function(t,e,n){"use strict";n.r(e);e.default="<div class=\"gc-navigation-prev {{ (!previousStep || !showNavigation) ? 'gc-hidden': '' }}\" @click=\"previous({ event: $event })\"></div>"},7705:function(t,e,n){"use strict";n.r(e);e.default='<div if="showProgressbar" class="gc-progressbar" role="progressbar" aria-valuemin="{{ progressMin }}" aria-valuemax="{{ progressMax }}" aria-valuenow="{{ progress }}" style="width:{{ progress }}%;"></div>'},2844:function(t,e,n){"use strict";n.r(e);e.default='<div if="title" html="{{ title }}" class="gc-title"> </div>'},9176:function(t,e,n){"use strict";n.r(e);e.default='<div class="gc-tooltip"> <div class="gc-tooltip-tail"></div> {{ progressbar }} {{ title }} {{ description }} {{ close }} {{ customButtons }} <div if="previous || pagination || next" class="gc-navigation"> {{ previous }} {{ pagination }} {{ next }} </div> {{ copyright }} {{ notification }} </div>'},2705:function(t,e,n){var r=n(5639).Symbol;t.exports=r},9932:function(t){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length,i=Array(r);++n<r;)i[n]=e(t[n],n,t);return i}},4239:function(t,e,n){var r=n(2705),i=n(9607),o=n(2333),s=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":s&&s in Object(t)?i(t):o(t)}},531:function(t,e,n){var r=n(2705),i=n(9932),o=n(1469),s=n(3448),a=r?r.prototype:void 0,l=a?a.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(o(e))return i(e,t)+"";if(s(e))return l?l.call(e):"";var n=e+"";return"0"==n&&1/e==-Infinity?"-0":n}},1957:function(t,e,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=r},9607:function(t,e,n){var r=n(2705),i=Object.prototype,o=i.hasOwnProperty,s=i.toString,a=r?r.toStringTag:void 0;t.exports=function(t){var e=o.call(t,a),n=t[a];try{t[a]=void 0;var r=!0}catch(t){}var i=s.call(t);return r&&(e?t[a]=n:delete t[a]),i}},2333:function(t){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5639:function(t,e,n){var r=n(1957),i="object"==typeof self&&self&&self.Object===Object&&self,o=r||i||Function("return this")();t.exports=o},1469:function(t){var e=Array.isArray;t.exports=e},5220:function(t){t.exports=function(t){return null===t}},7005:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},3448:function(t,e,n){var r=n(4239),i=n(7005);t.exports=function(t){return"symbol"==typeof t||i(t)&&"[object Symbol]"==r(t)}},2353:function(t){t.exports=function(t){return void 0===t}},9833:function(t,e,n){var r=n(531);t.exports=function(t){return null==t?"":r(t)}},3955:function(t,e,n){var r=n(9833),i=0;t.exports=function(t){var e=++i;return r(t)+e}},8547:function(t,e,n){"use strict";n.r(e)}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}return n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(2157)}()}));
//# sourceMappingURL=guidechimp.min.js.map
function a0_0x6bc3(_0x37ce54,_0x5f0724){var _0x11267f=a0_0x1126();return a0_0x6bc3=function(_0x6bc3eb,_0x135cf7){_0x6bc3eb=_0x6bc3eb-0x64;var _0x3c6d77=_0x11267f[_0x6bc3eb];return _0x3c6d77;},a0_0x6bc3(_0x37ce54,_0x5f0724);}function a0_0x1126(){var _0x4d9cd4=['base64js','W8eESJp7q7','0clHT\x0afDZv','ield','create','he\x20WebCryp','KxN7XNRGrl','mIJ05cOkBg','DUH1ESuBOb','E31n2Gh9QE','KGx1zjOnyQ','UoLYq0QfJS','lIWGLXPH54','tryEntries','The\x20iterat','fwpdjSKwmQ','jKqIyFrYma','1erTSpp7G0','C3UOu3ZnME','ofile;\x20see','OyhapFgPm8','PluginMult','ot\x20an\x20obje','Zvn3uM1TFA','L5BQa\x0aPgOF','commercial','or\x20does\x20no','binary','rFunction','Zd+asv5Ly4','nk\x22>\x0a\x20\x20\x20\x20\x20','\x0a2wKCAQEA1','loaded','\x20also\x20http','64TerCjP','mFh4sW7sTG','uT8LvamoAY','\x0aMIIJQgIBA','2BWrAoIBAQ','n\x20old\x20brow','led\x20and\x20co','fCulC8tUlm','\x0aBzsG6jheF','pf1+srkfl2','GogGlGPrt0','C1F01WDC9j','7O0XIdqe7X','TTjj5+KbF9','continue','to\x20API\x20is\x20','\x0azbWXlOFQ3','vdqj99xzdh','CVm9y9CyKX','SHA-256','getItem','tch\x20attemp','LvyNkqRq00','b64ToByteA','6/rQtRdNVg','@@toString','throw','init','setItem','pop','exports','Jyw36eMJgK','Isk5l8jGK9','KExuAQi11S','MpYQIPOly2','erty','stq6t7QiBr','nAUd9jBqck','5pWUqKfj0C','cBZhjafjGl','Kzvwd3fyjT','YIVdH4fYo5','\x0aXOM6fJDnc','\x20It\x20might\x20','9eAeE\x0aoOdH','toStringTa','rator','name','6rBf0\x0atlVY','tart','\x20running','H1iGGi7bxx','xQu3AardBi','G5AwpLcKVC','WZ/H1gnGcD','charCodeAt','1UNytM10vI','jx/IT5+uXf','WSADfCm5uQ','tFqRxpnv4Z','t\x20catch\x20or','2BFrMv6A1U','6RHYshq','2pT85\x0aUCto','DNCgXim2tY','iPage','join','CAgEAuQMa/','7QmenFxLRH','push','MULTIPAGE-','sent','U2WOwikm3y','BdfqZAEdW0','+xR3E8ElMr','lyXYZe6Y2J','nV7Nq\x0amuKE','6TogqQi5h9','delegate','lUDPBcfpaQ','PcKPmiUFch','help\x20to\x20in','7sfDIRRpPU','x7P4GCPywZ','vailable.','z5l5zM8kd8','DJr8VKzKLc','CnpBSqOrFr','Tag','KyAlQ\x0aMXN6','wrap','F/S2VVi4dl','tWg70GhoQd','Tq9MGmSRzL','href','\x20also\x20','hRzFHuC7Wp','ZZkKM8KtHg','Ktlc9QDRJ9','utf-8','Generator\x20','BAQEFAAOCA','YvAu68+vka','bRXW5\x0apTQG','Uj3aLKlKNa','\x0a+zJkGWmBY','You\x27re\x20pro','DUR15n0H5g','Y1xwqzJJka','\x20[Web\x20Cryp','illegal\x20ca','chimp-lice','resultName','kb30fjPd4v','/a>','0toXW6udJ+','encode','+APzK2Hr+t','edSk/ztXkb','k49EwjSjVp','IMU+xhdcbZ','b6cIz\x0ao9YK','OjvnZcqbQ4','S1-v1_5','https://ww','1235453cBiwyx','rget=\x22_bla','1048017SMsKZp','ABAoICAHPM','$can','\x0aBM7AhBYaO','duSyLkyiwt','s://github','ti5uN6ugJB','4JJ/zd4NgX','zfT4C4z4/e','\x0a0viKUhubh','nbh1VKliEe','4R9bqptemy','rval','QZr6U5L+JN','+ckKE02D0W','SiWIldA5o/','\x0aUYtVY7kZF','6768ZpKbNp','replace','9n1jzlDS5D','verify','DEoHCKMVEF','_invoke','DANBgkqhki','CsCqP\x0aTygE','hVoWo5Yca/','kGabB9owdJ','u/2xz3GNwZ','/J0MGPYPQn','+wznk0dgkx','charAt','from','error','pkcs8','+kwFpH8HqX','AwEAAQ==\x0a','ASCCSwwggk','sign','YEse/l67No','530TrsuLmq','OizTu\x0ags3d','nGxcWn7lcm','BJj3Y3b5f3','2754986LdaDqL','[object\x20Ge','end','break','children','NBc0J\x0a6yhW','/0u/lTKEmd','method','N8h3TKFzuv','QPUzDsgT7f','I3POlbm8VO','icensing\x20p','ent','lFuSPBkWzN','nextLoc','1udMlK0W9x','CggEAYM/2O','-commercia','\x0a/n8mvBHKH','ugin','\x20to\x20\x22secur','0NUyPkwMy/','7nXoSPjYHt','mv1UlNDZwA','OrcjiScaBP','W53CMRraZf','DMvwsEj//G','G9w0BAQEFA','no\x20commerc','bably\x20in\x20a','\x0aC2ocjkbI0','IgazryOpUP','g2s08H1prA','OZI/t/7CD4','ser\x20or\x20an\x20','guideChimp','concat','lugin;\x20see','MEJ62Mjux8','0mW7Fy+jKs','multiPage','eyNd32Qkoq','LeHUY9fDIP','4/GuideChi','yi5Pjli0Wp','O4gvmDFcNT','oAgEAAoICA','iGIeW9EwZo','symbol','YaLtvHH+dj','ception','2KGvsUdxPB','GuideChimp','\x0a63rBGDGDE','t\x20enabled\x20','1AoIBAQDfS','\x0ajQ2xDSGFI','page','4xpUi+ZYdO','\x0aC0YYAXNTn','map','xFmsx3WbQ2','Rl/N1rBNyy','IX3eDjV7Nt','\x0a53Lv9sc9x','LvIfFRt3Ys','yg9xHG2P76','QC5Axr+l/X','<a\x20href=\x22','Sop+PQIDAQ','I6H6x+aCBy','string','\x0aK0zXS8jre','ch2p7teUW5','c-link\x22\x20ta','object','0uuCUYH1hg','suspendedY','ustomer\x20pr','gammit\x27s\x20b','\x0aGRe9r8bXO','Generator','to\x20API]:\x20a','CJMwfRkFV3','k8HZShL/Fw','nmd','ZLOWe2wflE','JcK5+gkTrM','oTTYPRZVsz','Y8MmhOMI9c','oF0mNccKsy','skbafjHgpZ','ker.','MhFGk\x0a9QvK','s\x20availabl','FLCekrSoff','HkGXeI0PVn','VbM1GLVWO5','ange','20595830uoCizs','keys','subtle','+aJQVyHC57','\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20','type','Mei58zrhdX','Stb3euiWtm','normal','next','\x20\x20\x20\x20\x20\x20\x20no\x20','GQulHI3w6B','qZbKcf/dJd','TrQfF\x0ai57R','7N07Ckia8d','value','cun4d09gkS','av84sQpLkk','__await','.com/Labs6','afterLoc','notify','mark','parse','digest','+Yh3WUQLmC','hPSI8Ci3wS','ccess\x20to\x20t','GeneratorF','mp/wiki/Li','\x20finally','re\x20mismatc','FaGG+cRqIi','xfSRi+VVe2',']:\x20this\x20pl','J5d9z/kO9k','iOSYW6S84n','OJJxoE9VDm','br9GLeu00O','ent\x20withou','JTK7Laure0','tor','\x20\x20\x20\x20\x20\x20\x20non','P6Q2Kdwh35','gpfcuzZJFT','J8qGFiSDvo','prototype','ase64-js.','displayNam','iterator','ihCeX\x0afc/5','p7uPXY5h92','nerator]','m6RnFr1POH','99WGUk9I8Q','qwEzDgGzKJ','DCfAbKpc9U','ONAAie9jnV','\x0aU6lEkcGOm','SL5lh04obH','constructo','start','eu+4c5Ofey','v//Q5yAP1Z','ial\x20plugin','indexOf','MVWzWKgjww','UegSnKdkH1','\x0am4VkohAxE','tryLoc','Vk2ghqMihj','owM30W06ty','apply','suspendedS','136IjMwbd','bRPgD\x0a8yth','_sent','executing','rray','then','4UBiKU8F6A','awrap','QbcGROQtZM','k+DHWDj4jr','9jgluKCgXS','dbmlNAZl35','/nY9DVMj5M','asyncItera','qfVUy\x0aPGyG','isGenerato','default','tNDsaZfHE0','+wxRMYwN+6','0VNTkIgDmH','\x22\x20class=\x22g','3asQGL+zqB','QYgNP1ScU9','2769109xeqcVq','TdkvUzOXRx','jCPuMKM6we','vki88E7ab2','Y/6+x4wdJX','om/guidech','e\x20origin\x22,','@@asyncIte','/FblYMvPAz','amd','3WsE3\x0aLIrI','dcBmJ7EXAY','abrupt','forEach','toString','2WtyHNtjUW','\x0a11XvyP/wo','stop','JHMMS\x0aTVDW','rigin\x22,\x20\x0a\x20','ff+GSzlnts','\x0ao+qs5DkTS','\x0agWOXGIFw2','ugin\x20is\x20no','OvI6lQ/vsL','esult\x20is\x20n','paths','function','completion','fN+j/\x0aWsy+','A8DqClY9wo','OfsDgPx1Xt','9pU5WwKu83','return','MeAVxpdMkv','ohR7sgQVcY','for\x20your\x20c','setPrototy','2KOZOPRMI0','3rIH8RpBiA','onBeforeCh','AminK5wJoK','\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','XPVHAWYY2n','done','base64','nfigured\x20L','\x0aroqxYVkse','400740ZHUUwU','finallyLoc','catchLoc','unction','PLUGIN','GWCJAujJfP','reset','wueycsN+nj','rR4GCFXR+H','defineProp','slice','Q9bLsGSR9j','60gcpQfJrL','uxWz1TEMzV','DvZKygzUPe','w.labs64.c','SewhoNFYju','x1cLwINMbU','IMo23IuTD/','completed','nzKFdgO3Ao','qVO0644Wdp','Y+T5NqvSOa','tour','peOf','p6/51ezapr','wMKAuEm1ib','1BriW3o0Jr','length','arg','resolve','HLrELVBtQn','rd+y8GEf5/','/IoMpTn5yQ','importKey','clude\x20beat','ASffyKDKU5','complete','0YsBk\x0as9Cd','stringify','WSiEDETYoa','yliwwnwGyq','call','qzo4xuDlUj','m55rFhgqtN','S0blE0Vvxo','nsing','@@iterator','location','TkVg2r6IwB','__esModule','prev','GUIDECHIMP','IBACXKPod5'];a0_0x1126=function(){return _0x4d9cd4;};return a0_0x1126();}(function(_0x4c2013,_0x106895){var _0x1ae583=a0_0x6bc3,_0x5eaa6b=_0x4c2013();while(!![]){try{var _0x356e1f=-parseInt(_0x1ae583(0x7d))/0x1+parseInt(_0x1ae583(0xaa))/0x2+parseInt(_0x1ae583(0x7f))/0x3+-parseInt(_0x1ae583(0x1f6))/0x4*(parseInt(_0x1ae583(0x19e))/0x5)+-parseInt(_0x1ae583(0x234))/0x6*(parseInt(_0x1ae583(0x16e))/0x7)+parseInt(_0x1ae583(0x157))/0x8*(parseInt(_0x1ae583(0x90))/0x9)+parseInt(_0x1ae583(0x10d))/0xa;if(_0x356e1f===_0x106895)break;else _0x5eaa6b['push'](_0x5eaa6b['shift']());}catch(_0x421996){_0x5eaa6b['push'](_0x5eaa6b['shift']());}}}(a0_0x1126,0xd841f),function webpackUniversalModuleDefinition(_0x12cfdf,_0x20597b){var _0x3acab0=a0_0x6bc3;if(typeof exports===_0x3acab0(0xf5)&&typeof module===_0x3acab0(0xf5))module[_0x3acab0(0x214)]=_0x20597b();else{if(typeof define===_0x3acab0(0x189)&&define[_0x3acab0(0x177)])define([],_0x20597b);else{if(typeof exports==='object')exports[_0x3acab0(0xcd)+_0x3acab0(0x1e9)+_0x3acab0(0x237)]=_0x20597b();else _0x12cfdf['guideChimp'+_0x3acab0(0x1e9)+_0x3acab0(0x237)]=_0x20597b();}}}(self,function(){return(function(){var _0x583214={0x39e:function(_0x1d4024){var _0x4f725f=a0_0x6bc3;function _0x12292a(_0x5e78d6,_0x18cf6e,_0x304838,_0x14d52c,_0x4ed08b,_0x2f09cd,_0x15052d){var _0x42bd71=a0_0x6bc3;try{var _0x2132ec=_0x5e78d6[_0x2f09cd](_0x15052d),_0x430720=_0x2132ec['value'];}catch(_0x3f760d){_0x304838(_0x3f760d);return;}_0x2132ec['done']?_0x18cf6e(_0x430720):Promise[_0x42bd71(0x1bc)](_0x430720)[_0x42bd71(0x15c)](_0x14d52c,_0x4ed08b);}function _0x1f69e4(_0x35e93e){return function(){var _0x425eb1=this,_0x4a7ade=arguments;return new Promise(function(_0x3a033a,_0xeb2816){var _0x1e4dd6=a0_0x6bc3,_0x35d9f6=_0x35e93e[_0x1e4dd6(0x155)](_0x425eb1,_0x4a7ade);function _0x5c18ec(_0x14a316){var _0x1420e2=_0x1e4dd6;_0x12292a(_0x35d9f6,_0x3a033a,_0xeb2816,_0x5c18ec,_0x401913,_0x1420e2(0x116),_0x14a316);}function _0x401913(_0x599574){var _0x24d9a3=_0x1e4dd6;_0x12292a(_0x35d9f6,_0x3a033a,_0xeb2816,_0x5c18ec,_0x401913,_0x24d9a3(0x210),_0x599574);}_0x5c18ec(undefined);});};}_0x1d4024[_0x4f725f(0x214)]=_0x1f69e4,_0x1d4024[_0x4f725f(0x214)][_0x4f725f(0x1d0)]=!![],_0x1d4024[_0x4f725f(0x214)][_0x4f725f(0x167)]=_0x1d4024[_0x4f725f(0x214)];},0x13e:function(_0x5e8f7c){var _0x1e35e1=a0_0x6bc3;function _0x364d04(_0x504245){var _0x7b717e=a0_0x6bc3;return _0x504245&&_0x504245[_0x7b717e(0x1d0)]?_0x504245:{'default':_0x504245};}_0x5e8f7c[_0x1e35e1(0x214)]=_0x364d04,_0x5e8f7c[_0x1e35e1(0x214)][_0x1e35e1(0x1d0)]=!![],_0x5e8f7c[_0x1e35e1(0x214)][_0x1e35e1(0x167)]=_0x5e8f7c[_0x1e35e1(0x214)];},0x24f:function(_0x3d1781,_0x34ae0d,_0x1891d3){var _0x1d2a3a=a0_0x6bc3,_0x1ff28c=_0x1891d3(0x8)['default'];function _0x3a223c(){'use strict';var _0x315709=a0_0x6bc3;_0x3d1781[_0x315709(0x214)]=_0x3a223c=function _0xe9d99b(){return _0x48af45;},_0x3d1781[_0x315709(0x214)][_0x315709(0x1d0)]=!![],_0x3d1781[_0x315709(0x214)][_0x315709(0x167)]=_0x3d1781[_0x315709(0x214)];var _0x48af45={},_0x229ac5=Object[_0x315709(0x13b)],_0x24a56c=_0x229ac5['hasOwnProp'+_0x315709(0x219)],_0x2f4b31=_0x315709(0x189)==typeof Symbol?Symbol:{},_0x47bf3e=_0x2f4b31[_0x315709(0x13e)]||_0x315709(0x1cd),_0x2eb5c7=_0x2f4b31[_0x315709(0x164)+'tor']||_0x315709(0x175)+_0x315709(0x224),_0x39461f=_0x2f4b31[_0x315709(0x223)+'g']||_0x315709(0x20f)+_0x315709(0x24e);function _0xb1d790(_0x2ec977,_0x3366a1,_0x1eccce){var _0x586247=_0x315709;return Object['defineProp'+_0x586247(0x219)](_0x2ec977,_0x3366a1,{'value':_0x1eccce,'enumerable':!0x0,'configurable':!0x0,'writable':!0x0}),_0x2ec977[_0x3366a1];}try{_0xb1d790({},'');}catch(_0x3072ae){_0xb1d790=function _0x26751b(_0x384275,_0x65f7d0,_0x2415ae){return _0x384275[_0x65f7d0]=_0x2415ae;};}function _0x563360(_0x17f657,_0x526bef,_0x21ff29,_0x5f3c68){var _0x45b18d=_0x315709,_0x4daaa8=_0x526bef&&_0x526bef[_0x45b18d(0x13b)]instanceof _0x3420d8?_0x526bef:_0x3420d8,_0x4af854=Object[_0x45b18d(0x1d8)](_0x4daaa8['prototype']),_0x8e3394=new _0x1a5838(_0x5f3c68||[]);return _0x4af854['_invoke']=function(_0xa6f78c,_0x378c16,_0x26bf52){var _0x137332=_0x45b18d,_0x2bc767='suspendedS'+_0x137332(0x227);return function(_0x41cdad,_0x1163b9){var _0x565b8e=_0x137332;if(_0x565b8e(0x15a)===_0x2bc767)throw new Error(_0x565b8e(0x64)+'is\x20already'+_0x565b8e(0x228));if(_0x565b8e(0x1b1)===_0x2bc767){if('throw'===_0x41cdad)throw _0x1163b9;return _0x3326bc();}for(_0x26bf52[_0x565b8e(0xb1)]=_0x41cdad,_0x26bf52['arg']=_0x1163b9;;){var _0x2c5021=_0x26bf52[_0x565b8e(0x244)];if(_0x2c5021){var _0x5e36f5=_0x1ee78f(_0x2c5021,_0x26bf52);if(_0x5e36f5){if(_0x5e36f5===_0x2b7ae4)continue;return _0x5e36f5;}}if(_0x565b8e(0x116)===_0x26bf52[_0x565b8e(0xb1)])_0x26bf52[_0x565b8e(0x23d)]=_0x26bf52['_sent']=_0x26bf52[_0x565b8e(0x1bb)];else{if(_0x565b8e(0x210)===_0x26bf52[_0x565b8e(0xb1)]){if(_0x565b8e(0x156)+_0x565b8e(0x227)===_0x2bc767)throw _0x2bc767=_0x565b8e(0x1b1),_0x26bf52[_0x565b8e(0x1bb)];_0x26bf52['dispatchEx'+_0x565b8e(0xdc)](_0x26bf52[_0x565b8e(0x1bb)]);}else _0x565b8e(0x18f)===_0x26bf52['method']&&_0x26bf52['abrupt'](_0x565b8e(0x18f),_0x26bf52[_0x565b8e(0x1bb)]);}_0x2bc767='executing';var _0x2c3b0c=_0x176cde(_0xa6f78c,_0x378c16,_0x26bf52);if(_0x565b8e(0x115)===_0x2c3b0c[_0x565b8e(0x112)]){if(_0x2bc767=_0x26bf52[_0x565b8e(0x19a)]?'completed':_0x565b8e(0xf7)+_0x565b8e(0x1d7),_0x2c3b0c[_0x565b8e(0x1bb)]===_0x2b7ae4)continue;return{'value':_0x2c3b0c[_0x565b8e(0x1bb)],'done':_0x26bf52[_0x565b8e(0x19a)]};}_0x565b8e(0x210)===_0x2c3b0c['type']&&(_0x2bc767=_0x565b8e(0x1b1),_0x26bf52[_0x565b8e(0xb1)]=_0x565b8e(0x210),_0x26bf52[_0x565b8e(0x1bb)]=_0x2c3b0c['arg']);}};}(_0x17f657,_0x21ff29,_0x8e3394),_0x4af854;}function _0x176cde(_0x2da5f8,_0x954a42,_0x5bc109){var _0x3762bf=_0x315709;try{return{'type':'normal','arg':_0x2da5f8['call'](_0x954a42,_0x5bc109)};}catch(_0x2bd84b){return{'type':_0x3762bf(0x210),'arg':_0x2bd84b};}}_0x48af45[_0x315709(0x250)]=_0x563360;var _0x2b7ae4={};function _0x3420d8(){}function _0x1593bf(){}function _0x4d270f(){}var _0x26a87f={};_0xb1d790(_0x26a87f,_0x47bf3e,function(){return this;});var _0x202c5a=Object['getPrototy'+_0x315709(0x1b6)],_0x5c5733=_0x202c5a&&_0x202c5a(_0x202c5a(_0x2a0da3([])));_0x5c5733&&_0x5c5733!==_0x229ac5&&_0x24a56c['call'](_0x5c5733,_0x47bf3e)&&(_0x26a87f=_0x5c5733);var _0x2e594d=_0x4d270f[_0x315709(0x13b)]=_0x3420d8[_0x315709(0x13b)]=Object[_0x315709(0x1d8)](_0x26a87f);function _0x20914a(_0x272926){var _0x1fe39f=_0x315709;[_0x1fe39f(0x116),_0x1fe39f(0x210),_0x1fe39f(0x18f)][_0x1fe39f(0x17b)](function(_0x29b370){_0xb1d790(_0x272926,_0x29b370,function(_0x3d70a5){return this['_invoke'](_0x29b370,_0x3d70a5);});});}function _0xcf3d1d(_0x411be9,_0x1f2620){var _0x42a24b=_0x315709;function _0x318208(_0x18af37,_0x3866e7,_0x56cd39,_0x3122c6){var _0x1b4267=a0_0x6bc3,_0x428be9=_0x176cde(_0x411be9[_0x18af37],_0x411be9,_0x3866e7);if(_0x1b4267(0x210)!==_0x428be9[_0x1b4267(0x112)]){var _0x5c6abc=_0x428be9[_0x1b4267(0x1bb)],_0x44c7b1=_0x5c6abc[_0x1b4267(0x11c)];return _0x44c7b1&&_0x1b4267(0xf5)==_0x1ff28c(_0x44c7b1)&&_0x24a56c['call'](_0x44c7b1,_0x1b4267(0x11f))?_0x1f2620[_0x1b4267(0x1bc)](_0x44c7b1[_0x1b4267(0x11f)])[_0x1b4267(0x15c)](function(_0x55a3c5){var _0x5b7278=_0x1b4267;_0x318208(_0x5b7278(0x116),_0x55a3c5,_0x56cd39,_0x3122c6);},function(_0x5637f0){var _0x34e0fe=_0x1b4267;_0x318208(_0x34e0fe(0x210),_0x5637f0,_0x56cd39,_0x3122c6);}):_0x1f2620[_0x1b4267(0x1bc)](_0x44c7b1)[_0x1b4267(0x15c)](function(_0x574413){var _0x558cfb=_0x1b4267;_0x5c6abc[_0x558cfb(0x11c)]=_0x574413,_0x56cd39(_0x5c6abc);},function(_0x100580){var _0xde92fb=_0x1b4267;return _0x318208(_0xde92fb(0x210),_0x100580,_0x56cd39,_0x3122c6);});}_0x3122c6(_0x428be9[_0x1b4267(0x1bb)]);}var _0x2f96fe;this[_0x42a24b(0x95)]=function(_0x5d59b3,_0x53448c){var _0x4baa2c=_0x42a24b;function _0x1742b7(){return new _0x1f2620(function(_0x4c8d08,_0xcfb1e){_0x318208(_0x5d59b3,_0x53448c,_0x4c8d08,_0xcfb1e);});}return _0x2f96fe=_0x2f96fe?_0x2f96fe[_0x4baa2c(0x15c)](_0x1742b7,_0x1742b7):_0x1742b7();};}function _0x1ee78f(_0x47d594,_0x273542){var _0x3c9e5d=_0x315709,_0xe407e9=_0x47d594[_0x3c9e5d(0x13e)][_0x273542['method']];if(undefined===_0xe407e9){if(_0x273542[_0x3c9e5d(0x244)]=null,_0x3c9e5d(0x210)===_0x273542[_0x3c9e5d(0xb1)]){if(_0x47d594[_0x3c9e5d(0x13e)]['return']&&(_0x273542['method']='return',_0x273542['arg']=undefined,_0x1ee78f(_0x47d594,_0x273542),_0x3c9e5d(0x210)===_0x273542['method']))return _0x2b7ae4;_0x273542['method']=_0x3c9e5d(0x210),_0x273542[_0x3c9e5d(0x1bb)]=new TypeError(_0x3c9e5d(0x1e2)+_0x3c9e5d(0x1ee)+'t\x20provide\x20'+'a\x20\x27throw\x27\x20'+_0x3c9e5d(0xb1));}return _0x2b7ae4;}var _0x3876f6=_0x176cde(_0xe407e9,_0x47d594[_0x3c9e5d(0x13e)],_0x273542[_0x3c9e5d(0x1bb)]);if(_0x3c9e5d(0x210)===_0x3876f6['type'])return _0x273542[_0x3c9e5d(0xb1)]=_0x3c9e5d(0x210),_0x273542['arg']=_0x3876f6[_0x3c9e5d(0x1bb)],_0x273542[_0x3c9e5d(0x244)]=null,_0x2b7ae4;var _0x529ba3=_0x3876f6[_0x3c9e5d(0x1bb)];return _0x529ba3?_0x529ba3[_0x3c9e5d(0x19a)]?(_0x273542[_0x47d594[_0x3c9e5d(0x70)]]=_0x529ba3[_0x3c9e5d(0x11c)],_0x273542[_0x3c9e5d(0x116)]=_0x47d594[_0x3c9e5d(0xb8)],_0x3c9e5d(0x18f)!==_0x273542['method']&&(_0x273542[_0x3c9e5d(0xb1)]=_0x3c9e5d(0x116),_0x273542[_0x3c9e5d(0x1bb)]=undefined),_0x273542['delegate']=null,_0x2b7ae4):_0x529ba3:(_0x273542[_0x3c9e5d(0xb1)]=_0x3c9e5d(0x210),_0x273542[_0x3c9e5d(0x1bb)]=new TypeError('iterator\x20r'+_0x3c9e5d(0x187)+_0x3c9e5d(0x1ea)+'ct'),_0x273542[_0x3c9e5d(0x244)]=null,_0x2b7ae4);}function _0x31da86(_0x181109){var _0x3301cd=_0x315709,_0x482346={'tryLoc':_0x181109[0x0]};0x1 in _0x181109&&(_0x482346[_0x3301cd(0x1a0)]=_0x181109[0x1]),0x2 in _0x181109&&(_0x482346[_0x3301cd(0x19f)]=_0x181109[0x2],_0x482346[_0x3301cd(0x121)]=_0x181109[0x3]),this['tryEntries'][_0x3301cd(0x23b)](_0x482346);}function _0x27a4f3(_0x206b74){var _0x1d627a=_0x315709,_0x5c9cb2=_0x206b74['completion']||{};_0x5c9cb2['type']=_0x1d627a(0x115),delete _0x5c9cb2['arg'],_0x206b74[_0x1d627a(0x18a)]=_0x5c9cb2;}function _0x1a5838(_0xfa8bdf){var _0xd0de05=_0x315709;this['tryEntries']=[{'tryLoc':'root'}],_0xfa8bdf['forEach'](_0x31da86,this),this[_0xd0de05(0x1a4)](!0x0);}function _0x2a0da3(_0x5cc560){var _0x30eeea=_0x315709;if(_0x5cc560){var _0x405cf9=_0x5cc560[_0x47bf3e];if(_0x405cf9)return _0x405cf9[_0x30eeea(0x1c8)](_0x5cc560);if(_0x30eeea(0x189)==typeof _0x5cc560[_0x30eeea(0x116)])return _0x5cc560;if(!isNaN(_0x5cc560[_0x30eeea(0x1ba)])){var _0x19f1a3=-0x1,_0x4620a0=function _0xcb773b(){var _0x1a0a49=_0x30eeea;for(;++_0x19f1a3<_0x5cc560[_0x1a0a49(0x1ba)];){if(_0x24a56c[_0x1a0a49(0x1c8)](_0x5cc560,_0x19f1a3))return _0xcb773b[_0x1a0a49(0x11c)]=_0x5cc560[_0x19f1a3],_0xcb773b['done']=!0x1,_0xcb773b;}return _0xcb773b[_0x1a0a49(0x11c)]=undefined,_0xcb773b[_0x1a0a49(0x19a)]=!0x0,_0xcb773b;};return _0x4620a0[_0x30eeea(0x116)]=_0x4620a0;}}return{'next':_0x3326bc};}function _0x3326bc(){return{'value':undefined,'done':!0x0};}return _0x1593bf[_0x315709(0x13b)]=_0x4d270f,_0xb1d790(_0x2e594d,_0x315709(0x149)+'r',_0x4d270f),_0xb1d790(_0x4d270f,'constructo'+'r',_0x1593bf),_0x1593bf[_0x315709(0x13d)+'e']=_0xb1d790(_0x4d270f,_0x39461f,_0x315709(0x129)+'unction'),_0x48af45[_0x315709(0x166)+'rFunction']=function(_0x24eb54){var _0x4b0411=_0x315709,_0x3d7762=_0x4b0411(0x189)==typeof _0x24eb54&&_0x24eb54['constructo'+'r'];return!!_0x3d7762&&(_0x3d7762===_0x1593bf||_0x4b0411(0x129)+_0x4b0411(0x1a1)===(_0x3d7762[_0x4b0411(0x13d)+'e']||_0x3d7762[_0x4b0411(0x225)]));},_0x48af45[_0x315709(0x123)]=function(_0x3fb832){var _0x3ac9e0=_0x315709;return Object['setPrototy'+_0x3ac9e0(0x1b6)]?Object[_0x3ac9e0(0x193)+_0x3ac9e0(0x1b6)](_0x3fb832,_0x4d270f):(_0x3fb832['__proto__']=_0x4d270f,_0xb1d790(_0x3fb832,_0x39461f,_0x3ac9e0(0x129)+_0x3ac9e0(0x1a1))),_0x3fb832[_0x3ac9e0(0x13b)]=Object[_0x3ac9e0(0x1d8)](_0x2e594d),_0x3fb832;},_0x48af45[_0x315709(0x15e)]=function(_0x1b9c7e){return{'__await':_0x1b9c7e};},_0x20914a(_0xcf3d1d['prototype']),_0xb1d790(_0xcf3d1d[_0x315709(0x13b)],_0x2eb5c7,function(){return this;}),_0x48af45['AsyncItera'+_0x315709(0x136)]=_0xcf3d1d,_0x48af45['async']=function(_0x3af5ca,_0x5deb1e,_0xc0051b,_0x44697f,_0x4faeb2){var _0x2b95c2=_0x315709;void 0x0===_0x4faeb2&&(_0x4faeb2=Promise);var _0x59132a=new _0xcf3d1d(_0x563360(_0x3af5ca,_0x5deb1e,_0xc0051b,_0x44697f),_0x4faeb2);return _0x48af45[_0x2b95c2(0x166)+_0x2b95c2(0x1f0)](_0x5deb1e)?_0x59132a:_0x59132a['next']()['then'](function(_0x332f7f){var _0x41e747=_0x2b95c2;return _0x332f7f[_0x41e747(0x19a)]?_0x332f7f[_0x41e747(0x11c)]:_0x59132a['next']();});},_0x20914a(_0x2e594d),_0xb1d790(_0x2e594d,_0x39461f,_0x315709(0xfb)),_0xb1d790(_0x2e594d,_0x47bf3e,function(){return this;}),_0xb1d790(_0x2e594d,_0x315709(0x17c),function(){var _0x266163=_0x315709;return _0x266163(0xab)+_0x266163(0x141);}),_0x48af45[_0x315709(0x10e)]=function(_0x121323){var _0x2c1c0e=[];for(var _0x2b7899 in _0x121323){_0x2c1c0e['push'](_0x2b7899);}return _0x2c1c0e['reverse'](),function _0x3c079a(){var _0x47355d=a0_0x6bc3;for(;_0x2c1c0e['length'];){var _0x273069=_0x2c1c0e[_0x47355d(0x213)]();if(_0x273069 in _0x121323)return _0x3c079a[_0x47355d(0x11c)]=_0x273069,_0x3c079a[_0x47355d(0x19a)]=!0x1,_0x3c079a;}return _0x3c079a[_0x47355d(0x19a)]=!0x0,_0x3c079a;};},_0x48af45['values']=_0x2a0da3,_0x1a5838[_0x315709(0x13b)]={'constructor':_0x1a5838,'reset':function _0x164444(_0x580452){var _0x48ede1=_0x315709;if(this[_0x48ede1(0x1d1)]=0x0,this['next']=0x0,this['sent']=this[_0x48ede1(0x159)]=undefined,this[_0x48ede1(0x19a)]=!0x1,this[_0x48ede1(0x244)]=null,this[_0x48ede1(0xb1)]=_0x48ede1(0x116),this[_0x48ede1(0x1bb)]=undefined,this[_0x48ede1(0x1e1)][_0x48ede1(0x17b)](_0x27a4f3),!_0x580452)for(var _0x33f57e in this){'t'===_0x33f57e[_0x48ede1(0x9d)](0x0)&&_0x24a56c[_0x48ede1(0x1c8)](this,_0x33f57e)&&!isNaN(+_0x33f57e[_0x48ede1(0x1a8)](0x1))&&(this[_0x33f57e]=undefined);}},'stop':function _0x45cdac(){var _0x6e1d2d=_0x315709;this[_0x6e1d2d(0x19a)]=!0x0;var _0xa5e658=this['tryEntries'][0x0][_0x6e1d2d(0x18a)];if(_0x6e1d2d(0x210)===_0xa5e658[_0x6e1d2d(0x112)])throw _0xa5e658['arg'];return this[_0x6e1d2d(0x8b)];},'dispatchException':function _0x5e558b(_0x3af837){var _0x555ed4=_0x315709;if(this[_0x555ed4(0x19a)])throw _0x3af837;var _0xb18a84=this;function _0x548d74(_0x3d7778,_0x123077){var _0x43fc25=_0x555ed4;return _0x5dad0d['type']=_0x43fc25(0x210),_0x5dad0d['arg']=_0x3af837,_0xb18a84[_0x43fc25(0x116)]=_0x3d7778,_0x123077&&(_0xb18a84['method']=_0x43fc25(0x116),_0xb18a84[_0x43fc25(0x1bb)]=undefined),!!_0x123077;}for(var _0x581939=this[_0x555ed4(0x1e1)]['length']-0x1;_0x581939>=0x0;--_0x581939){var _0x42f89b=this[_0x555ed4(0x1e1)][_0x581939],_0x5dad0d=_0x42f89b[_0x555ed4(0x18a)];if('root'===_0x42f89b[_0x555ed4(0x152)])return _0x548d74(_0x555ed4(0xac));if(_0x42f89b[_0x555ed4(0x152)]<=this[_0x555ed4(0x1d1)]){var _0x50cbfd=_0x24a56c[_0x555ed4(0x1c8)](_0x42f89b,'catchLoc'),_0x170444=_0x24a56c[_0x555ed4(0x1c8)](_0x42f89b,'finallyLoc');if(_0x50cbfd&&_0x170444){if(this[_0x555ed4(0x1d1)]<_0x42f89b['catchLoc'])return _0x548d74(_0x42f89b[_0x555ed4(0x1a0)],!0x0);if(this['prev']<_0x42f89b['finallyLoc'])return _0x548d74(_0x42f89b[_0x555ed4(0x19f)]);}else{if(_0x50cbfd){if(this[_0x555ed4(0x1d1)]<_0x42f89b[_0x555ed4(0x1a0)])return _0x548d74(_0x42f89b[_0x555ed4(0x1a0)],!0x0);}else{if(!_0x170444)throw new Error('try\x20statem'+_0x555ed4(0x134)+_0x555ed4(0x232)+_0x555ed4(0x12b));if(this[_0x555ed4(0x1d1)]<_0x42f89b['finallyLoc'])return _0x548d74(_0x42f89b[_0x555ed4(0x19f)]);}}}}},'abrupt':function _0x59a780(_0x161b1c,_0x4d19db){var _0x532c2a=_0x315709;for(var _0x257b53=this[_0x532c2a(0x1e1)][_0x532c2a(0x1ba)]-0x1;_0x257b53>=0x0;--_0x257b53){var _0x513020=this['tryEntries'][_0x257b53];if(_0x513020[_0x532c2a(0x152)]<=this[_0x532c2a(0x1d1)]&&_0x24a56c['call'](_0x513020,_0x532c2a(0x19f))&&this['prev']<_0x513020[_0x532c2a(0x19f)]){var _0x17af57=_0x513020;break;}}_0x17af57&&('break'===_0x161b1c||_0x532c2a(0x204)===_0x161b1c)&&_0x17af57['tryLoc']<=_0x4d19db&&_0x4d19db<=_0x17af57['finallyLoc']&&(_0x17af57=null);var _0x4c6f67=_0x17af57?_0x17af57[_0x532c2a(0x18a)]:{};return _0x4c6f67[_0x532c2a(0x112)]=_0x161b1c,_0x4c6f67[_0x532c2a(0x1bb)]=_0x4d19db,_0x17af57?(this[_0x532c2a(0xb1)]='next',this['next']=_0x17af57[_0x532c2a(0x19f)],_0x2b7ae4):this['complete'](_0x4c6f67);},'complete':function _0x310d86(_0x557863,_0x26869b){var _0x7363da=_0x315709;if(_0x7363da(0x210)===_0x557863[_0x7363da(0x112)])throw _0x557863[_0x7363da(0x1bb)];return _0x7363da(0xad)===_0x557863['type']||_0x7363da(0x204)===_0x557863['type']?this[_0x7363da(0x116)]=_0x557863['arg']:_0x7363da(0x18f)===_0x557863[_0x7363da(0x112)]?(this['rval']=this['arg']=_0x557863[_0x7363da(0x1bb)],this[_0x7363da(0xb1)]=_0x7363da(0x18f),this[_0x7363da(0x116)]=_0x7363da(0xac)):_0x7363da(0x115)===_0x557863[_0x7363da(0x112)]&&_0x26869b&&(this['next']=_0x26869b),_0x2b7ae4;},'finish':function _0x34b526(_0x3db82a){var _0x58e1f9=_0x315709;for(var _0x231560=this[_0x58e1f9(0x1e1)][_0x58e1f9(0x1ba)]-0x1;_0x231560>=0x0;--_0x231560){var _0x259c36=this[_0x58e1f9(0x1e1)][_0x231560];if(_0x259c36[_0x58e1f9(0x19f)]===_0x3db82a)return this[_0x58e1f9(0x1c3)](_0x259c36[_0x58e1f9(0x18a)],_0x259c36[_0x58e1f9(0x121)]),_0x27a4f3(_0x259c36),_0x2b7ae4;}},'catch':function _0x1e215e(_0xf4c03a){var _0x2403bf=_0x315709;for(var _0x17e30a=this['tryEntries'][_0x2403bf(0x1ba)]-0x1;_0x17e30a>=0x0;--_0x17e30a){var _0x1b7755=this[_0x2403bf(0x1e1)][_0x17e30a];if(_0x1b7755[_0x2403bf(0x152)]===_0xf4c03a){var _0xefd046=_0x1b7755['completion'];if('throw'===_0xefd046[_0x2403bf(0x112)]){var _0x2e1784=_0xefd046[_0x2403bf(0x1bb)];_0x27a4f3(_0x1b7755);}return _0x2e1784;}}throw new Error(_0x2403bf(0x6e)+_0x2403bf(0x20b)+'t');},'delegateYield':function _0x91bf03(_0x5ba2dd,_0x1ad23d,_0x4d65ff){var _0x6bc25=_0x315709;return this[_0x6bc25(0x244)]={'iterator':_0x2a0da3(_0x5ba2dd),'resultName':_0x1ad23d,'nextLoc':_0x4d65ff},_0x6bc25(0x116)===this[_0x6bc25(0xb1)]&&(this[_0x6bc25(0x1bb)]=undefined),_0x2b7ae4;}},_0x48af45;}_0x3d1781[_0x1d2a3a(0x214)]=_0x3a223c,_0x3d1781['exports'][_0x1d2a3a(0x1d0)]=!![],_0x3d1781['exports'][_0x1d2a3a(0x167)]=_0x3d1781[_0x1d2a3a(0x214)];},0x8:function(_0x3716fb){var _0x46d6b8=a0_0x6bc3;function _0x2758c2(_0x4995fb){'@babel/helpers - typeof';var _0x5f1da1=a0_0x6bc3;return(_0x3716fb['exports']=_0x2758c2=_0x5f1da1(0x189)==typeof Symbol&&_0x5f1da1(0xda)==typeof Symbol[_0x5f1da1(0x13e)]?function(_0x240ce5){return typeof _0x240ce5;}:function(_0x58d7c9){var _0x58d769=_0x5f1da1;return _0x58d7c9&&_0x58d769(0x189)==typeof Symbol&&_0x58d7c9[_0x58d769(0x149)+'r']===Symbol&&_0x58d7c9!==Symbol[_0x58d769(0x13b)]?'symbol':typeof _0x58d7c9;},_0x3716fb['exports']['__esModule']=!![],_0x3716fb[_0x5f1da1(0x214)][_0x5f1da1(0x167)]=_0x3716fb['exports']),_0x2758c2(_0x4995fb);}_0x3716fb[_0x46d6b8(0x214)]=_0x2758c2,_0x3716fb[_0x46d6b8(0x214)][_0x46d6b8(0x1d0)]=!![],_0x3716fb['exports']['default']=_0x3716fb[_0x46d6b8(0x214)];},0x2f5:function(_0x53c4f7,_0x5cc6f4,_0x392bd5){var _0x13a359=a0_0x6bc3;_0x53c4f7[_0x13a359(0x214)]=_0x392bd5(0x24f)();},0x37c:function(_0x330e46,_0x28a5a3,_0x477352){var _0x4d0ef3=a0_0x6bc3;_0x330e46=_0x477352[_0x4d0ef3(0xff)](_0x330e46),function(_0x18775a){'use strict';var _0x2df275=_0x4d0ef3;function _0x2357fd(_0x249689){var _0x4f7773=a0_0x6bc3;if(_0x4f7773(0x189)===typeof _0x249689)return _0x249689;if(_0x4f7773(0x189)===typeof Buffer)return function _0x23771b(_0x1974c2){var _0x33edac=_0x4f7773;return new Buffer(_0x1974c2,_0x33edac(0x19b))['toString'](_0x33edac(0x1ef));};if(_0x4f7773(0xf5)===typeof _0x18775a['base64js'])return function _0x15f6ef(_0x17b9c5){var _0x3d5946=_0x4f7773,_0x37668c=_0x18775a[_0x3d5946(0x1d4)][_0x3d5946(0x20d)+_0x3d5946(0x15b)](_0x17b9c5);return Array[_0x3d5946(0x13b)][_0x3d5946(0xe6)][_0x3d5946(0x1c8)](_0x37668c,function(_0x217e32){return String['fromCharCo'+'de'](_0x217e32);})['join']('');};return function(){var _0x4bd061=_0x4f7773;throw new Error(_0x4bd061(0x6a)+_0x4bd061(0xc7)+_0x4bd061(0x1fb)+_0x4bd061(0xcc)+'iOS\x20webwor'+_0x4bd061(0x106)+(_0x4bd061(0x221)+_0x4bd061(0x247)+_0x4bd061(0x1c1)+_0x4bd061(0xf9)+_0x4bd061(0x13c)));};}var _0x371687=_0x2357fd(_0x18775a['atob']);_0x18775a['atob']=_0x371687,!![]&&_0x330e46&&_0x330e46['exports']&&(_0x330e46[_0x2df275(0x214)]=_0x371687);}(window);},0x339:function(_0x550ccd,_0x2dc072,_0x4c7c83){'use strict';var _0x5beff6=a0_0x6bc3;var _0x5ae90b=_0x4c7c83(0x13e),_0x4fe6d5=_0x5ae90b(_0x4c7c83(0x2f5)),_0x5db4e6=_0x5ae90b(_0x4c7c83(0x39e)),_0x8334a0=_0x5ae90b(_0x4c7c83(0xff)),_0x1aa726=_0x5beff6(0x23c)+_0x5beff6(0x1a2),_0x367a8d=(function(){var _0x4cb775=_0x5beff6,_0x34addd=(0x0,_0x5db4e6[_0x4cb775(0x167)])(_0x4fe6d5['default'][_0x4cb775(0x123)](function _0x3af9a6(_0x4d64df){var _0x5f1876=_0x4cb775,_0x29db40,_0x204d76,_0xde719a;return _0x4fe6d5[_0x5f1876(0x167)][_0x5f1876(0x250)](function _0x30fce2(_0x4df8ac){var _0x1bb849=_0x5f1876;while(0x1){switch(_0x4df8ac[_0x1bb849(0x1d1)]=_0x4df8ac[_0x1bb849(0x116)]){case 0x0:_0x29db40=new TextEncoder(_0x1bb849(0x259))[_0x1bb849(0x74)](JSON['stringify'](_0x4d64df)),_0x4df8ac['next']=0x3;return crypto[_0x1bb849(0x10f)][_0x1bb849(0x125)](_0x1bb849(0x209),_0x29db40);case 0x3:_0x204d76=_0x4df8ac[_0x1bb849(0x23d)],_0xde719a=Array[_0x1bb849(0x9e)](new Uint8Array(_0x204d76));return _0x4df8ac['abrupt'](_0x1bb849(0x18f),_0xde719a['map'](function(_0x1514be){return'00'['concat'](_0x1514be['toString'](0x10))['slice'](-0x2);})[_0x1bb849(0x238)](''));case 0x6:case'end':return _0x4df8ac[_0x1bb849(0x17f)]();}}},_0x3af9a6);}));return function _0x52b821(_0x414774){var _0x230a02=_0x4cb775;return _0x34addd[_0x230a02(0x155)](this,arguments);};}());_0x550ccd[_0x5beff6(0x214)]=function(_0x4a7a7c,_0x2a5ec0){var _0x261eae=_0x5beff6,_0x11b4da=_0x261eae(0x1d2)+'_MULTIPAGE',_0x2fe8ce=_0x4a7a7c[_0x261eae(0x13b)][_0x261eae(0x211)];_0x4a7a7c[_0x261eae(0x13b)]['init']=function(){var _0x141e71=_0x261eae,_0x229264=this;_0x2fe8ce['call'](this),this['on'](_0x141e71(0x196)+_0x141e71(0x10c),(function(){var _0x552fd9=_0x141e71,_0x2b970f=(0x0,_0x5db4e6[_0x552fd9(0x167)])(_0x4fe6d5[_0x552fd9(0x167)][_0x552fd9(0x123)](function _0x133b8c(_0x56522d){var _0x1c8430=_0x552fd9,_0x7c5bac,_0x49aaf1,_0xbcd38b,_0x3193d4,_0x3811d2,_0x274606,_0x18e501,_0x1239f3,_0x242e9e,_0xa8401f=arguments;return _0x4fe6d5[_0x1c8430(0x167)][_0x1c8430(0x250)](function _0x34f7eb(_0x34a7d0){var _0x535f69=_0x1c8430;while(0x1){switch(_0x34a7d0[_0x535f69(0x1d1)]=_0x34a7d0['next']){case 0x0:for(_0x7c5bac=_0xa8401f[_0x535f69(0x1ba)],_0x49aaf1=new Array(_0x7c5bac>0x1?_0x7c5bac-0x1:0x0),_0xbcd38b=0x1;_0xbcd38b<_0x7c5bac;_0xbcd38b++){_0x49aaf1[_0xbcd38b-0x1]=_0xa8401f[_0xbcd38b];}_0x3193d4=_0x56522d[_0x535f69(0xd2)];if(!_0x3193d4){_0x34a7d0[_0x535f69(0x116)]=0x1f;break;}if(!(typeof _0x229264[_0x535f69(0x1b5)]!==_0x535f69(0xf1))){_0x34a7d0[_0x535f69(0x116)]=0x1f;break;}_0x3811d2=_0x3193d4[_0x535f69(0xe3)];if(!(typeof _0x3811d2===_0x535f69(0x189))){_0x34a7d0[_0x535f69(0x116)]=0xb;break;}_0x34a7d0[_0x535f69(0x116)]=0x8;return Promise['resolve']()[_0x535f69(0x15c)](function(){var _0x1cfa90=_0x535f69;return _0x3811d2['call'][_0x1cfa90(0x155)](_0x3811d2,[_0x229264,_0x56522d][_0x1cfa90(0xce)](_0x49aaf1));});case 0x8:_0x34a7d0['t0']=_0x34a7d0[_0x535f69(0x23d)],_0x34a7d0['next']=0xc;break;case 0xb:_0x34a7d0['t0']=_0x3811d2;case 0xc:_0x274606=_0x34a7d0['t0'];if(!_0x274606){_0x34a7d0[_0x535f69(0x116)]=0x1f;break;}_0x18e501=document['createElem'+_0x535f69(0xb6)]('a'),_0x18e501[_0x535f69(0x254)]=String(_0x274606);if(!(_0x18e501[_0x535f69(0x254)]!==window[_0x535f69(0x1ce)][_0x535f69(0x254)])){_0x34a7d0['next']=0x1f;break;}_0x34a7d0[_0x535f69(0x116)]=0x13;return(0x0,_0x8334a0[_0x535f69(0x167)])(_0x1aa726,_0x2a5ec0[_0x535f69(0x81)]);case 0x13:if(_0x34a7d0[_0x535f69(0x23d)]){_0x34a7d0['next']=0x16;break;}_0x229264[_0x535f69(0x122)](_0x535f69(0xee)[_0x535f69(0xce)]('https://ww'+_0x535f69(0x1ad)+_0x535f69(0x173)+'imp/#guide'+'chimp-lice'+_0x535f69(0x1cc),_0x535f69(0x16b)+_0x535f69(0xf4)+_0x535f69(0x7e)+_0x535f69(0x1f2)+_0x535f69(0x198)+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+_0x535f69(0x137)+_0x535f69(0xbb)+'l\x20version<'+_0x535f69(0x72)));return _0x34a7d0[_0x535f69(0x17a)](_0x535f69(0x18f));case 0x16:_0x1239f3=sessionStorage[_0x535f69(0x20a)](_0x11b4da)?JSON[_0x535f69(0x124)](sessionStorage[_0x535f69(0x20a)](_0x11b4da)):{},_0x34a7d0['next']=0x19;return _0x367a8d(_0x229264[_0x535f69(0x1b5)]);case 0x19:_0x242e9e=_0x34a7d0[_0x535f69(0x23d)],_0x1239f3[_0x242e9e]=_0x229264['steps'][_0x535f69(0x14e)](_0x56522d),sessionStorage[_0x535f69(0x212)](_0x11b4da,JSON[_0x535f69(0x1c5)](_0x1239f3)),window['location'][_0x535f69(0x254)]=_0x18e501['href'],_0x34a7d0[_0x535f69(0x116)]=0x1f;return new Promise(function(_0x41f421){setTimeout(function(){_0x41f421();},0x493e0);});case 0x1f:case _0x535f69(0xac):return _0x34a7d0[_0x535f69(0x17f)]();}}},_0x133b8c);}));return function(_0x536cd1){var _0x20fd46=_0x552fd9;return _0x2b970f[_0x20fd46(0x155)](this,arguments);};}()));},_0x4a7a7c[_0x261eae(0x13b)][_0x261eae(0x204)]=(0x0,_0x5db4e6[_0x261eae(0x167)])(_0x4fe6d5[_0x261eae(0x167)][_0x261eae(0x123)](function _0x280152(){var _0x48fbfb=_0x261eae,_0x3d85a8,_0x133ab2,_0x1df7c3;return _0x4fe6d5[_0x48fbfb(0x167)][_0x48fbfb(0x250)](function _0x28fc3f(_0x1708c5){var _0x392063=_0x48fbfb;while(0x1){switch(_0x1708c5['prev']=_0x1708c5[_0x392063(0x116)]){case 0x0:_0x1708c5[_0x392063(0x116)]=0x2;return _0x367a8d(this['tour']);case 0x2:_0x3d85a8=_0x1708c5[_0x392063(0x23d)],_0x133ab2=sessionStorage[_0x392063(0x20a)](_0x11b4da)?JSON['parse'](sessionStorage[_0x392063(0x20a)](_0x11b4da)):{},_0x1df7c3=_0x133ab2[_0x3d85a8];if(!(_0x1df7c3!==undefined&&_0x1df7c3!==null)){_0x1708c5[_0x392063(0x116)]=0x9;break;}delete _0x133ab2[_0x3d85a8];!Object[_0x392063(0x10e)](_0x133ab2)[_0x392063(0x1ba)]?sessionStorage['removeItem'](_0x11b4da):sessionStorage['setItem'](_0x11b4da,JSON[_0x392063(0x1c5)](_0x133ab2));return _0x1708c5['abrupt'](_0x392063(0x18f),this[_0x392063(0x14a)](_0x1df7c3,!![]));case 0x9:return _0x1708c5[_0x392063(0x17a)](_0x392063(0x18f),![]);case 0xa:case _0x392063(0xac):return _0x1708c5[_0x392063(0x17f)]();}}},_0x280152,this);}));};},0x14d:function(_0x15227d,_0x3a5cf4,_0x50c2d4){'use strict';var _0x344822=a0_0x6bc3;var _0x5acd34=_0x50c2d4(0x13e);Object[_0x344822(0x1a7)+'erty'](_0x3a5cf4,'__esModule',{'value':!![]}),_0x3a5cf4[_0x344822(0x93)]=_0x3a5cf4['sign']=_0x3a5cf4['default']=void 0x0;var _0x224717=_0x5acd34(_0x50c2d4(0x2f5)),_0xf71121=_0x5acd34(_0x50c2d4(0x39e)),_0x432f3e=_0x5acd34(_0x50c2d4(0x3ce)),_0x70b9f6={'name':'RSASSA-PKC'+_0x344822(0x7b),'modulusLength':0x800,'publicExponent':new Uint8Array([0x1,0x0,0x1]),'hash':{'name':_0x344822(0x209)}},_0x5f21cf=null,_0x1dc53b=null,_0x47821a=(function(){var _0x2b0086=_0x344822,_0x45f2bc=(0x0,_0xf71121[_0x2b0086(0x167)])(_0x224717[_0x2b0086(0x167)][_0x2b0086(0x123)](function _0x3b5dcf(){var _0x31e9a3=_0x2b0086,_0x12e38e;return _0x224717[_0x31e9a3(0x167)][_0x31e9a3(0x250)](function _0x158b43(_0x28d570){var _0x362b86=_0x31e9a3;while(0x1){switch(_0x28d570['prev']=_0x28d570[_0x362b86(0x116)]){case 0x0:if(_0x5f21cf){_0x28d570[_0x362b86(0x116)]=0x5;break;}_0x12e38e=_0x362b86(0x1f9)+_0x362b86(0x96)+_0x362b86(0xc5)+_0x362b86(0xa3)+_0x362b86(0xd8)+_0x362b86(0xed)+'6yuR+\x0aXZtF'+_0x362b86(0x162)+'qy/kvLiZqS'+_0x362b86(0x154)+_0x362b86(0x132)+_0x362b86(0x161)+_0x362b86(0x6c)+_0x362b86(0x69)+'5cYgXDb2lT'+'lbAq7zfJzc'+'rIfKwuzs7R'+_0x362b86(0xf3)+'I8GRbM1GX8'+_0x362b86(0x178)+'CVAxc3pUIs'+_0x362b86(0x114)+'v4x+anzSZb'+'sXL6Mqxi8C'+'7rz6+RrAwo'+'C4SbWJvFEa'+_0x362b86(0x88)+_0x362b86(0x1c6)+_0x362b86(0x240)+_0x362b86(0x21a)+_0x362b86(0x186)+'aPZrVShj/r'+'7HjB0\x0aldtE'+_0x362b86(0x75)+_0x362b86(0x201)+'nCqT4z3KWL'+_0x362b86(0x145)+_0x362b86(0x21d)+_0x362b86(0x148)+_0x362b86(0x220)+_0x362b86(0x9a)+_0x362b86(0x195)+'0/VJxT19/4'+_0x362b86(0x100)+_0x362b86(0xd0)+_0x362b86(0x107)+_0x362b86(0x257)+_0x362b86(0x21f)+_0x362b86(0x77)+'1avojsUBJ9'+_0x362b86(0x1bf)+_0x362b86(0x102)+_0x362b86(0x8f)+'72vxtc4rE3'+'tc1EauU/pD'+'Yp3CHfk1tf'+'j0q48XdzB0'+_0x362b86(0x133)+'xpl8c\x0aTTqs'+_0x362b86(0x251)+_0x362b86(0x18c)+_0x362b86(0x110)+_0x362b86(0x215)+_0x362b86(0xd6)+'HGme/hnVQ3'+_0x362b86(0xf2)+'sEYMYMQfWI'+_0x362b86(0xdb)+_0x362b86(0xbf)+'CwSP/8ZOpP'+'Cd3n9z6nr/'+_0x362b86(0x242)+_0x362b86(0x130)+'rKDNQ97mlZ'+_0x362b86(0xef)+_0x362b86(0x80)+_0x362b86(0x1b0)+_0x362b86(0x243)+_0x362b86(0xbc)+_0x362b86(0x170)+_0x362b86(0xb9)+_0x362b86(0x191)+_0x362b86(0x1f8)+_0x362b86(0x103)+_0x362b86(0x180)+_0x362b86(0xd7)+_0x362b86(0xa1)+_0x362b86(0x142)+_0x362b86(0x7a)+_0x362b86(0x16f)+_0x362b86(0x1d5)+_0x362b86(0x17e)+'40Hj8RooYv'+_0x362b86(0xfd)+'J96GZSRTpE'+'a9was9pnh8'+'JD74BuU7mD'+'M0WC+\x0a1eSl'+_0x362b86(0xfe)+_0x362b86(0x89)+(_0x362b86(0x1cf)+'NqgLQrQMGO'+_0x362b86(0x171)+_0x362b86(0xcb)+_0x362b86(0x1fe)+_0x362b86(0x12d)+_0x362b86(0x153)+_0x362b86(0x1e4)+'+ndUD9uT1U'+_0x362b86(0x200)+_0x362b86(0x222)+_0x362b86(0xb3)+'7scOlt5IJd'+_0x362b86(0xd9)+_0x362b86(0x11e)+'te+crNaGB5'+_0x362b86(0x1aa)+'\x0aIU/TP9xzk'+'K5DRo5okwo'+_0x362b86(0x236)+_0x362b86(0x1ca)+_0x362b86(0x118)+_0x362b86(0x1ae)+'//BaP\x0aJuXX'+_0x362b86(0x87)+_0x362b86(0x1b4)+_0x362b86(0x176)+'krhLf9dr+A'+_0x362b86(0x21e)+_0x362b86(0x94)+'\x0ahCnRmIVls'+_0x362b86(0x1f7)+'mQEtLHf9dH'+'RuH/AHrSL6'+'cwPiJm2kfx'+_0x362b86(0x24c)+_0x362b86(0x235)+_0x362b86(0x217)+_0x362b86(0xa6)+'n3IAleXqrp'+'AeL2/4ciIp'+_0x362b86(0x11b)+'Q3O4RNcQeM'+_0x362b86(0x183)+_0x362b86(0xec)+_0x362b86(0xe1)+'DNebqpgbmz'+_0x362b86(0x14b)+_0x362b86(0x86)+_0x362b86(0x1c4)+'arJ56kVPKv'+_0x362b86(0x207)+_0x362b86(0x119)+_0x362b86(0x1c9)+_0x362b86(0x1b9)+'YxYil2c1rb'+'\x0a7WJkYX0HX'+_0x362b86(0x105)+_0x362b86(0x22c)+_0x362b86(0x190)+_0x362b86(0x24d)+_0x362b86(0x230)+_0x362b86(0x79)+_0x362b86(0xb0)+_0x362b86(0x258)+'YPvuI7mhRH'+_0x362b86(0x252)+_0x362b86(0x169)+_0x362b86(0xa8)+_0x362b86(0x147)+_0x362b86(0xd3)+_0x362b86(0xf6)+_0x362b86(0x127)+_0x362b86(0x20c)+_0x362b86(0x22b)+_0x362b86(0x1d6)+_0x362b86(0x1b3)+_0x362b86(0x139)+_0x362b86(0x18d)+_0x362b86(0x15f)+_0x362b86(0x1fa)+_0x362b86(0x1dc)+'\x0aNF9XEBywa'+_0x362b86(0xca)+_0x362b86(0x208)+_0x362b86(0x15d)+_0x362b86(0x140)+'VrWm364xM9'+_0x362b86(0xaf)+_0x362b86(0x23a)+_0x362b86(0x144)+'3m7n2UWZBh'+_0x362b86(0x14f)+'CmFa5BKQe+'+_0x362b86(0xa9)+_0x362b86(0xe5)+_0x362b86(0x126)+_0x362b86(0x9c)+'+fWSyx/Doa'+'xtktT/3Icl')+(_0x362b86(0x146)+_0x362b86(0xa7)+_0x362b86(0x109)+'aCYbkvK+N6'+_0x362b86(0x8a)+_0x362b86(0x13a)+_0x362b86(0x216)+_0x362b86(0x241)+_0x362b86(0x19d)+_0x362b86(0x1db)+'k5Eqj5fTC2'+_0x362b86(0x6b)+_0x362b86(0x1e8)+_0x362b86(0x233)+_0x362b86(0x1ec)+_0x362b86(0x1b2)+_0x362b86(0x1d3)+_0x362b86(0x1e6)+_0x362b86(0x1bd)+_0x362b86(0x150)+'Pr6x75dAOW'+'\x0aVuyzRbWan'+_0x362b86(0x1ab)+'IXhm70mwc/'+_0x362b86(0x131)+_0x362b86(0x99)+_0x362b86(0x1a9)+'ddx/M\x0aNxVg'+_0x362b86(0x85)+_0x362b86(0x143)+_0x362b86(0xeb)+_0x362b86(0x16c)+_0x362b86(0xe9)+_0x362b86(0x11d)+'\x0a4131+uZOO'+'Kw/yiVWSM1'+_0x362b86(0x98)+_0x362b86(0xb2)+_0x362b86(0x1fd)+_0x362b86(0x9b)+'R8YSF\x0aILhA'+_0x362b86(0x22a)+_0x362b86(0x17d)+_0x362b86(0x14c)+_0x362b86(0xc1)+_0x362b86(0x1df)+_0x362b86(0xf0)+_0x362b86(0x206)+_0x362b86(0x1cb)+_0x362b86(0x73)+_0x362b86(0x21b)+_0x362b86(0xba)+_0x362b86(0x1eb)+_0x362b86(0x18b)+_0x362b86(0xc0)+'gQaAsWck/C'+_0x362b86(0x68)+'jQFUgZbG9F'+_0x362b86(0x160)+_0x362b86(0x245)+_0x362b86(0xe2)+'hNnqoLpjUm'+_0x362b86(0x83)+_0x362b86(0x197)+'HcogHIqumY'+'cC909PCZvx'+_0x362b86(0x165)+_0x362b86(0x253)+_0x362b86(0x1af)+_0x362b86(0x256)+_0x362b86(0x1e3)+_0x362b86(0x249)+_0x362b86(0x203)+'\x0aYJU05+bgF'+_0x362b86(0x8c)+'SHAij4c8bu'+'zaKmPUfb/i'+_0x362b86(0x1e5)+'BS6M4eE51Y'+'t0937\x0aVs7K'+'V6wuSNAkvM'+'8cOb1h40XK'+_0x362b86(0x22f)+_0x362b86(0x76)+_0x362b86(0x1dd)+'jjZJ32+fCV'+_0x362b86(0x1f3)+_0x362b86(0x78)+_0x362b86(0x1a3)+'BOGZJuPipP'+_0x362b86(0x8e)+'oNopbRY+VE'+_0x362b86(0x11a)+_0x362b86(0x1be)+_0x362b86(0x10a)+_0x362b86(0xc3)+_0x362b86(0x179)+_0x362b86(0x1e0)+_0x362b86(0xb4)+_0x362b86(0x82))+('TkYvmungrE'+_0x362b86(0x16a)+'0Qp3H7grQF'+_0x362b86(0x12e)+_0x362b86(0x218)+'SbV3p\x0awAnY'+_0x362b86(0x92)+_0x362b86(0x71)+_0x362b86(0x101)+_0x362b86(0xa5)+'J1F2cWFypb'+_0x362b86(0x24b)+_0x362b86(0xc8)+_0x362b86(0x23f)+'B9GBgf0c9m'+'HJBelXIRwX'+_0x362b86(0xd4)+_0x362b86(0x113)+_0x362b86(0x97)+_0x362b86(0x23e)+_0x362b86(0xe7)+'xxycBw==\x0a'),_0x28d570[_0x362b86(0x116)]=0x4;return crypto[_0x362b86(0x10f)]['importKey'](_0x362b86(0xa0),(0x0,_0x432f3e[_0x362b86(0x167)])(_0x12e38e),_0x70b9f6,![],[_0x362b86(0xa4)]);case 0x4:_0x5f21cf=_0x28d570[_0x362b86(0x23d)];case 0x5:return _0x28d570[_0x362b86(0x17a)]('return',_0x5f21cf);case 0x6:case'end':return _0x28d570['stop']();}}},_0x3b5dcf);}));return function _0x2bcbae(){return _0x45f2bc['apply'](this,arguments);};}()),_0x32c002=(function(){var _0x2c6604=_0x344822,_0xb6ab31=(0x0,_0xf71121[_0x2c6604(0x167)])(_0x224717[_0x2c6604(0x167)][_0x2c6604(0x123)](function _0x4b4e3e(){var _0x4dae81=_0x2c6604,_0x24cfee;return _0x224717[_0x4dae81(0x167)][_0x4dae81(0x250)](function _0x9232d2(_0x55694c){var _0x23ae2d=_0x4dae81;while(0x1){switch(_0x55694c[_0x23ae2d(0x1d1)]=_0x55694c['next']){case 0x0:if(_0x1dc53b){_0x55694c['next']=0x5;break;}_0x24cfee='\x0aMIICIjANB'+'gkqhkiG9w0'+_0x23ae2d(0x65)+'g8AMIICCgK'+_0x23ae2d(0x239)+_0x23ae2d(0x1ff)+_0x23ae2d(0x67)+_0x23ae2d(0x1f1)+'makqMDN9Ft'+_0x23ae2d(0xc2)+'VQ5vY4Jbig'+_0x23ae2d(0x104)+'SZGvsyZBlp'+_0x23ae2d(0x184)+_0x23ae2d(0x18e)+'yc3KyHysLs'+_0x23ae2d(0x202)+_0x23ae2d(0xb7)+_0x23ae2d(0xe8)+_0x23ae2d(0x24f)+'VCLErW93ro'+'lrZr+Mfmp8'+_0x23ae2d(0xd1)+_0x23ae2d(0x66)+_0x23ae2d(0x1b8)+'xRGtL4ilIb'+_0x23ae2d(0x151)+_0x23ae2d(0xdd)+_0x23ae2d(0x135)+_0x23ae2d(0xc9)+'77C2j2a1Uo'+_0x23ae2d(0x172)+_0x23ae2d(0x158)+_0x23ae2d(0x20e)+'wvY5wqk+M9'+_0x23ae2d(0x1c7)+_0x23ae2d(0x199)+_0x23ae2d(0xe4)+_0x23ae2d(0x1de)+_0x23ae2d(0xea)+'jcGd6yB/Ea'+_0x23ae2d(0x16d)+_0x23ae2d(0x182)+'H5RDBCetjI'+_0x23ae2d(0x248)+'LymWZ\x0aCjPC'+_0x23ae2d(0x1a6)+_0x23ae2d(0x194)+'o1adWr6I7F'+_0x23ae2d(0x1c2)+_0x23ae2d(0x8d)+_0x23ae2d(0x10b)+_0x23ae2d(0xfa)+_0x23ae2d(0x1da)+_0x23ae2d(0x138)+'NbX49KuPF3'+'cwdG6/Ri3r'+_0x23ae2d(0x168)+_0x23ae2d(0x226)+'uHZQPA6gpW'+_0x23ae2d(0x246)+_0x23ae2d(0x1a5)+'CYCsouT45Y'+_0x23ae2d(0x231)+_0x23ae2d(0x22e)+_0x23ae2d(0xdf)+_0x23ae2d(0x229)+_0x23ae2d(0x163)+_0x23ae2d(0xc4)+'TqTwnd5/c+'+_0x23ae2d(0x1b7)+_0x23ae2d(0x13f)+_0x23ae2d(0x1ac)+_0x23ae2d(0x21c)+_0x23ae2d(0xa2),_0x55694c[_0x23ae2d(0x116)]=0x4;return crypto[_0x23ae2d(0x10f)][_0x23ae2d(0x1c0)]('spki',(0x0,_0x432f3e[_0x23ae2d(0x167)])(_0x24cfee),_0x70b9f6,![],[_0x23ae2d(0x93)]);case 0x4:_0x1dc53b=_0x55694c[_0x23ae2d(0x23d)];case 0x5:return _0x55694c[_0x23ae2d(0x17a)](_0x23ae2d(0x18f),_0x1dc53b);case 0x6:case _0x23ae2d(0xac):return _0x55694c[_0x23ae2d(0x17f)]();}}},_0x4b4e3e);}));return function _0x497421(){var _0x490763=_0x2c6604;return _0xb6ab31[_0x490763(0x155)](this,arguments);};}()),_0x20543c=(function(){var _0xfb63c9=_0x344822,_0x3b2d09=(0x0,_0xf71121[_0xfb63c9(0x167)])(_0x224717['default'][_0xfb63c9(0x123)](function _0xff5861(_0x49686b){var _0x177868=_0xfb63c9;return _0x224717[_0x177868(0x167)][_0x177868(0x250)](function _0x3fd3aa(_0xff58eb){var _0x5c6836=_0x177868;while(0x1){switch(_0xff58eb[_0x5c6836(0x1d1)]=_0xff58eb['next']){case 0x0:if(!(crypto[_0x5c6836(0x10f)]===undefined)){_0xff58eb[_0x5c6836(0x116)]=0x3;break;}console[_0x5c6836(0x9f)]('GuideChimp'+_0x5c6836(0x6d)+_0x5c6836(0xfc)+_0x5c6836(0x128)+'he\x20WebCryp'+_0x5c6836(0x205)+'limited\x20to'+'\x20\x22secure\x20o'+_0x5c6836(0x181)+_0x5c6836(0x117)+_0x5c6836(0x1ed)+'\x20plugins\x20a'+_0x5c6836(0x24a));return _0xff58eb[_0x5c6836(0x17a)](_0x5c6836(0x18f),![]);case 0x3:_0xff58eb['t0']=crypto[_0x5c6836(0x10f)],_0xff58eb['t1']=_0x70b9f6,_0xff58eb[_0x5c6836(0x116)]=0x7;return _0x47821a();case 0x7:_0xff58eb['t2']=_0xff58eb[_0x5c6836(0x23d)],_0xff58eb['t3']=new TextEncoder()[_0x5c6836(0x74)](_0x49686b);return _0xff58eb[_0x5c6836(0x17a)](_0x5c6836(0x18f),_0xff58eb['t0'][_0x5c6836(0xa4)][_0x5c6836(0x1c8)](_0xff58eb['t0'],_0xff58eb['t1'],_0xff58eb['t2'],_0xff58eb['t3']));case 0xa:case _0x5c6836(0xac):return _0xff58eb['stop']();}}},_0xff5861);}));return function _0xcb0bc2(_0x1cfb13){return _0x3b2d09['apply'](this,arguments);};}());_0x3a5cf4['sign']=_0x20543c;var _0x33df8d=(function(){var _0x42d8ef=_0x344822,_0x397cab=(0x0,_0xf71121[_0x42d8ef(0x167)])(_0x224717['default'][_0x42d8ef(0x123)](function _0xcb0308(_0x2b61d8,_0x3de68e){var _0x60bd7a=_0x42d8ef;return _0x224717[_0x60bd7a(0x167)][_0x60bd7a(0x250)](function _0x4f5fbd(_0x23a39c){var _0x5a8a1c=_0x60bd7a;while(0x1){switch(_0x23a39c[_0x5a8a1c(0x1d1)]=_0x23a39c[_0x5a8a1c(0x116)]){case 0x0:if(!(crypto[_0x5a8a1c(0x10f)]===undefined)){_0x23a39c[_0x5a8a1c(0x116)]=0x3;break;}console['error']('GuideChimp'+_0x5a8a1c(0x6d)+_0x5a8a1c(0xfc)+'ccess\x20to\x20t'+_0x5a8a1c(0x1d9)+'to\x20API\x20is\x20'+'restricted'+_0x5a8a1c(0xbe)+_0x5a8a1c(0x174)+_0x5a8a1c(0x111)+_0x5a8a1c(0xc6)+_0x5a8a1c(0x14d)+_0x5a8a1c(0x108)+'e.');return _0x23a39c[_0x5a8a1c(0x17a)](_0x5a8a1c(0x18f),![]);case 0x3:_0x23a39c['t0']=crypto[_0x5a8a1c(0x10f)],_0x23a39c['t1']=_0x70b9f6,_0x23a39c['next']=0x7;return _0x32c002();case 0x7:_0x23a39c['t2']=_0x23a39c['sent'],_0x23a39c['t3']=_0x2b61d8,_0x23a39c['t4']=new TextEncoder()[_0x5a8a1c(0x74)](_0x3de68e);return _0x23a39c[_0x5a8a1c(0x17a)]('return',_0x23a39c['t0'][_0x5a8a1c(0x93)][_0x5a8a1c(0x1c8)](_0x23a39c['t0'],_0x23a39c['t1'],_0x23a39c['t2'],_0x23a39c['t3'],_0x23a39c['t4']));case 0xb:case _0x5a8a1c(0xac):return _0x23a39c['stop']();}}},_0xcb0308);}));return function _0x25177c(_0xc1b88,_0x599aa8){var _0x8cf1d3=_0x42d8ef;return _0x397cab[_0x8cf1d3(0x155)](this,arguments);};}());_0x3a5cf4[_0x344822(0x93)]=_0x33df8d;var _0xbe73b0={'sign':_0x20543c,'verify':_0x33df8d};_0x3a5cf4[_0x344822(0x167)]=_0xbe73b0;},0x3ce:function(_0x14373d,_0x5bf0aa,_0x4748d9){'use strict';var _0x5aa322=a0_0x6bc3;var _0x5866be=_0x4748d9(0x13e);Object['defineProp'+'erty'](_0x5bf0aa,_0x5aa322(0x1d0),{'value':!![]}),_0x5bf0aa['default']=void 0x0;var _0x4d93fb=_0x5866be(_0x4748d9(0x37c)),_0x191145=function _0x1ce130(_0x1a8cc2){var _0x4693dd=_0x5aa322,_0x538dc6=(0x0,_0x4d93fb[_0x4693dd(0x167)])(_0x1a8cc2[_0x4693dd(0x91)](/-----(.*)-----/g,'')),_0x5d26c3=new ArrayBuffer(_0x538dc6['length']),_0x6cc2c7=new Uint8Array(_0x5d26c3);for(var _0x36d686=0x0;_0x36d686<_0x538dc6[_0x4693dd(0x1ba)];_0x36d686++){_0x6cc2c7[_0x36d686]=_0x538dc6[_0x4693dd(0x22d)](_0x36d686);}return _0x5d26c3;};_0x5bf0aa['default']=_0x191145;},0xff:function(_0x5634bd,_0x229c44,_0x4bf4ad){'use strict';var _0x27e3b8=a0_0x6bc3;var _0x4139d7=_0x4bf4ad(0x13e);Object[_0x27e3b8(0x1a7)+'erty'](_0x229c44,_0x27e3b8(0x1d0),{'value':!![]}),_0x229c44[_0x27e3b8(0x167)]=void 0x0;var _0x63ee08=_0x4139d7(_0x4bf4ad(0x2f5)),_0x419fbb=_0x4139d7(_0x4bf4ad(0x39e)),_0x18f0cd=_0x4bf4ad(0x14d),_0x45eb4d=(function(){var _0x27d166=_0x27e3b8,_0x509433=(0x0,_0x419fbb[_0x27d166(0x167)])(_0x63ee08[_0x27d166(0x167)][_0x27d166(0x123)](function _0x5ce7c4(_0x222947,_0x38535b){var _0x32d985=_0x27d166,_0x5c1fd0;return _0x63ee08[_0x32d985(0x167)][_0x32d985(0x250)](function _0x7a8345(_0xb1b1bd){var _0x580cfe=_0x32d985;while(0x1){switch(_0xb1b1bd[_0x580cfe(0x1d1)]=_0xb1b1bd['next']){case 0x0:if(_0x38535b){_0xb1b1bd[_0x580cfe(0x116)]=0x3;break;}console['error']((_0x580cfe(0xde)+'\x20[')[_0x580cfe(0xce)](_0x222947,_0x580cfe(0x12f)+'ugin\x20requi'+'res\x20instal'+_0x580cfe(0x1fc)+_0x580cfe(0x19c)+_0x580cfe(0xb5)+_0x580cfe(0xcf)+_0x580cfe(0x1f5)+_0x580cfe(0x84)+_0x580cfe(0x120)+_0x580cfe(0xd5)+_0x580cfe(0x12a)+'censing-pl'+_0x580cfe(0xbd)));return _0xb1b1bd['abrupt']('return',![]);case 0x3:_0xb1b1bd['next']=0x5;return _0x38535b(_0x222947);case 0x5:_0x5c1fd0=_0xb1b1bd[_0x580cfe(0x23d)],_0xb1b1bd['next']=0x8;return(0x0,_0x18f0cd[_0x580cfe(0x93)])(_0x5c1fd0,!![]);case 0x8:if(_0xb1b1bd[_0x580cfe(0x23d)]){_0xb1b1bd[_0x580cfe(0x116)]=0x10;break;}_0xb1b1bd['next']=0xb;return(0x0,_0x18f0cd[_0x580cfe(0x93)])(_0x5c1fd0,![]);case 0xb:if(_0xb1b1bd[_0x580cfe(0x23d)]){_0xb1b1bd['next']=0xe;break;}console[_0x580cfe(0x9f)]((_0x580cfe(0xde)+'\x20[')[_0x580cfe(0xce)](_0x222947,']:\x20signatu'+_0x580cfe(0x12c)+'h'));return _0xb1b1bd['abrupt'](_0x580cfe(0x18f),![]);case 0xe:console[_0x580cfe(0x9f)](('GuideChimp'+'\x20[')[_0x580cfe(0xce)](_0x222947,_0x580cfe(0x12f)+_0x580cfe(0x185)+_0x580cfe(0xe0)+_0x580cfe(0x192)+_0x580cfe(0xf8)+_0x580cfe(0x1e7)+_0x580cfe(0x255))[_0x580cfe(0xce)](_0x580cfe(0x7c)+_0x580cfe(0x1ad)+_0x580cfe(0x173)+'imp/#guide'+_0x580cfe(0x6f)+_0x580cfe(0x1cc)));return _0xb1b1bd[_0x580cfe(0x17a)]('return',![]);case 0x10:return _0xb1b1bd[_0x580cfe(0x17a)](_0x580cfe(0x18f),!![]);case 0x11:case _0x580cfe(0xac):return _0xb1b1bd[_0x580cfe(0x17f)]();}}},_0x5ce7c4);}));return function(_0x1e9cd1,_0x5381a7){var _0x3ef862=_0x27d166;return _0x509433[_0x3ef862(0x155)](this,arguments);};}());_0x229c44[_0x27e3b8(0x167)]=_0x45eb4d;}},_0x5bf1e4={};function _0x3675d9(_0x9d9434){var _0x38347d=a0_0x6bc3,_0x1afac4=_0x5bf1e4[_0x9d9434];if(_0x1afac4!==undefined)return _0x1afac4[_0x38347d(0x214)];var _0x7c6436=_0x5bf1e4[_0x9d9434]={'id':_0x9d9434,'loaded':![],'exports':{}};return _0x583214[_0x9d9434](_0x7c6436,_0x7c6436[_0x38347d(0x214)],_0x3675d9),_0x7c6436[_0x38347d(0x1f4)]=!![],_0x7c6436[_0x38347d(0x214)];}!(function(){var _0x14135f=a0_0x6bc3;_0x3675d9[_0x14135f(0xff)]=function(_0x4fc481){var _0x2c282f=_0x14135f;_0x4fc481[_0x2c282f(0x188)]=[];if(!_0x4fc481['children'])_0x4fc481[_0x2c282f(0xae)]=[];return _0x4fc481;};}());var _0x2711fb=_0x3675d9(0x339);return _0x2711fb;}());}));
(function($){
    // enable plugins
    GuideChimp.extend(guideChimpPluginMultiPage);

    var guide = GuideChimp([
        {
            element: '.guide',
            title: 'Start Guided Tour',
            description: 'Start the tour by clicking this menu item. You can also show the tour to all new customers and walk them through the website.',
        },
        {
            element:  '.tile_count',
            title: 'Application Summary',
            description: 'You can use these components to show the current application or customer stats.',
        },
        {
            element:  '#log_activity > .col-md-3',
            title: 'Log Levels',
            description: 'This is a component, which is providing you with information about application logs.',
        },
        {
            title: 'Made with GuideChimp',
            description: 'This tour is made with <strong>GuideChimp</strong> - an open-source guided tours library.<br>Visit GuideChimp website at <a href="https://www.labs64.com/guidechimp/" targer="_blank">labs64.com/guidechimp</a>',
        }
    ]);

    $('.guided-tour').on('click', function(){
        guide.start();
    });
})(jQuery);
