const html = require('choo/html')
const renderFollowBtn = require('./follow-btn')
const renderAvatar = require('./avatar')
const renderEditProfileBtn = require('./edit-profile-btn')
const {getViewProfileURL, getViewFollowsURL, getViewShopURL, getViewSubscriptsURL} = require('../util')

module.exports = function renderProfileCard (state, emit, profile) {
  if (!profile) {
    return ''
  }
  var isUser = profile._origin === state.userProfile._origin

  // DZ - change layout <br></br>
  return html`
    <div class="profile-card">
      <div class="profile-card-header">
        <a class="avatar-container" href=${getViewProfileURL(profile)}>
          ${renderAvatar(profile)}
        </a>

        <div class="profile-card-info">
          <h1 class="name"><a href=${getViewProfileURL(profile)}>${profile.name}</a></h1>
          <div class="profile-card-stats">
            <a class="stat" href=${getViewFollowsURL(profile)}>
              <span class="label">Following</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewProfileURL(profile)}>
              <span class="label">Widgets</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewSubscriptsURL(profile)}>
              <span class="value"></span>
              <span class="label">Gizmos</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewShopURL(profile)}>
              <span class="value"></span>
              <span class="label">Shop</span>
            </a>
          </div>
        </div>
      </div>

      ${profile.bio ? html`<p class="description">${profile.bio}</p>` : ''}
      ${isUser ? renderEditProfileBtn(state, emit, profile) : renderFollowBtn(state, emit, profile)}
    </div>
  `
}
