;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.JqueryModuleTab = factory(root.jquery);
  }
}(this, function(jquery) {
// Tab Module

'use-strict'

const LABEL_MARGIN = '5%'

// View
var constructTab = function (tabContainer) {
  var tabContentEl = $(tabContainer).find('.content li')

  // Content elements process
  $.each(tabContentEl, function () {
    hideTabs(this)
  })

  var tabLegendEl = $(tabContainer).find('.legend li')

  // Label elements process
  $.each(tabLegendEl, function () {
    var index = $(this).index()
    var last = tabLegendEl.length
    var w = getPercWidth(tabLegendEl)

    // auto-width
    if (index === 0) {
      $(this).css('width', w)
      $(this).css('margin-left', LABEL_MARGIN)
    } else if (index === last) {
      $(this).css('width', w)
      $(this).css('margin-right', LABEL_MARGIN)
    } else {
      $(this).css('width', w)
    }

    // auto-border
    var borderW = $(this).css('borderLeftWidth')
    if (index !== 0) {
      $(this).css('margin-left', '-' + borderW)
    }
  })

  var activeTab = ($('.legend .active').length) ? $('.legend .active') : $('.legend li:first-child')
  showTab(activeTab)
}

var getPercWidth = function (tabLegendEl) {
  var l = tabLegendEl.length
  var p = 90 / l
  var s = p.toString()
  return s + '%'
}

var hideTabs = function (tab, callback) {
  $(tab).hide().removeClass('active')
  if (callback) {
    callback()
  }
}

var showTab = function (tab) {
  var index = tab.index()

  hideTabs($('.content .active'))
  $('.legend .active').removeClass('active').addClass('inactive')
  $('.legend li').eq(index).removeClass('inactive').addClass('active')
  $('.content li').eq(index).show().addClass('active')
}

var unifyHeights = function (tabContainer) {
  var content = $(tabContainer).find('.content')
  var maxHeight = content.outerHeight()
  var th
  var txt

  th = $(content).find('.thumb')
  if (th.outerHeight > maxHeight) { maxHeight = th.outerHeight() }
  txt = $(content).find('.text')
  if (txt.outerHeight > maxHeight) { maxHeight = txt.outerHeight() }

  $.each(th, function () {
    $(this).css('height', maxHeight)
  })

  $.each(txt, function () {
    $(this).css('height', maxHeight)
  })
}

// Controller
var tabController = function (tabContainer) {
  var tabLegendEl = $(tabContainer).find('.legend li')
  $.each(tabLegendEl, function () {
    $(this).on('click', function () {
      var tabElement = $(this)
      showTab(tabElement)
    })
  })
}

var init = function (mainClassName) {
  var tabElement = $('.' + mainClassName)

  $.each(tabElement, function () {
    constructTab(this)
    tabController(this)
    unifyHeights(this)
  })
}

// public
var JqueryModuleTab = {
  init: init
}

return JqueryModuleTab;
}));
