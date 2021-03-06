/* globals localStorage */

const moment = require('moment')
const {PARALLEL_PROFILE_URL} = require('./const')

exports.pluralize = function (num, base, suffix = 's') {
  if (num === 1) { return base }
  return base + suffix
}

exports.niceDate = function (ts, opts) {
  const endOfToday = moment().endOf('day')
  if (typeof ts === 'number') { ts = moment(ts) }
  if (ts.isSame(endOfToday, 'day')) {
    if (opts && opts.noTime) { return 'today' }
    return ts.fromNow()
  } else if (ts.isSame(endOfToday.subtract(1, 'day'), 'day')) { return 'yesterday' } else if (ts.isSame(endOfToday, 'month')) { return ts.fromNow() }
  return ts.format('ll')
}

exports.getUserProfileURL = function () {
  return localStorage.userProfileURL
}

exports.setUserProfileURL = function (url) {
  localStorage.userProfileURL = url
}

exports.getAvatarURL = function (profile) {
  if (profile && profile.avatar) {
    return profile._origin + profile.avatar
  }
  return ''
}

exports.getAvatarStyle = function (profile) {
  // derive a fallback color from the author's URL (hey, why not)
  if (profile && profile.avatar) {
    return 'background-image: url(' + profile._origin + profile.avatar + ')'
  }
  const color = profile._origin.slice('dat://'.length, 'dat://'.length + 6)
  return 'background-color: #' + color
}

exports.getViewProfileURL = function (profile) {
  if (!profile) return ''
  var url = profile._origin ? profile._origin : profile
  return '/#profile/' + url.slice('dat://'.length)
}

exports.getEditProfileURL = function (profile) {
  return '/#settings'
}

exports.getViewFollowsURL = function (profile) {
  var url = profile._origin ? profile._origin : profile
  return '/#profile/' + url.slice('dat://'.length) + '/follows'
}

exports.getViewPostURL = function (post) {
  return '/#post/' + post._url.slice('dat://'.length)
}

exports.getViewGizmoURL = function (gizmo) {
  if (typeof gizmo === 'string') {
    return '/#gizmo/' + gizmo.slice('dat://'.length)
  }
  return '/#gizmo/' + gizmo._url.slice('dat://'.length)
}

exports.getViewSubgizmosURL = function (profile) {
  if (!profile) return ''
  var url = profile._origin ? profile._origin : profile
  return '/#gizmos/' + url.slice('dat://'.length)
}

exports.getViewWorkbenchURL = function (profile) {
  return '/#workbench'
}

exports.getViewFindFriendURL = function (profile) {
  return '/#find-friend'
}

exports.getViewKeysURL = function (profile) {
  return '/#keys'
}

exports.getViewSidebarSetupURL = function (profile) {
  return 'beaker://setup/' + profile
}

exports.getViewShopURL = function (profile) {
  if (!profile) return ''
  var url = profile._origin ? profile._origin : profile
  return '/#shop/' + url.slice('dat://'.length)
}

exports.getViewNetworkURL = function () {
  return '/#profiles/' + PARALLEL_PROFILE_URL.slice('dat://'.length) + '/follows'
}

exports.getIsFollowed = async function (state, profile) {
  if (state.userProfile && profile._origin !== state.userProfile._origin) {
    return await state.DB().isFollowing(state.userProfile._origin, profile._origin)
  }
  return false
}
