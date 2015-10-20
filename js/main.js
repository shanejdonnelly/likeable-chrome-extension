// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
var user = 
{
id: 441,
legacy_id: "business406",
username: "eefb",
password: "test1234",
platform_name: "Business",
brand_id: 406,
user_id: 441,
signup_id: 473,
fb_user_id: "711613",
login_token: "1u741esczjdye0jbnx207sph41dt6zjduayqviwtrfh1lu7hcj2wrynfrkbhtgfswn6ta4lefs8t9ux3ohuq31jc1j",
account_status: "active",
admin: 0,
stripe_customer_id: null,
stripe_subscription_id: null,
stripe_period_end: null,
data_last_updated: "1442936331566",
subscription_type: "vip",
free_trial_ends: null,
allowed_addons: 16,
likeable_team_member: 0,
platform_index: 0,
host: "tool.likeablebusiness.com",
vertical_id: 6,
canonical_platform_host: "tool.likeablebusiness.com",
platform_theme: "business",
platform_logo_url: "https://stories.likeablelocal.com:8001/media/uploads/hostedfiles/2014/01/13/LBGlowEffect_1.png",
platform_business_desc_singular: "business",
platform_business_desc_plural: "businesses",
platform_contact_email: "contact@likeablelocal.com",
image_path: "https://tool.likeablebusiness.com/assets/uploads/",
joined: "2014-01-27T19:02:06.000Z",
activity: "2015-09-29T14:42:20.000Z",
status: "Done",
firstlogin: 1,
test: 0,
news_feed_subscriptions: "general",
site_id: null,
huburl: "http://likeab.ly/eigenbagel",
first_name: "Hugh",
last_name: "Morgenbesser",
mobile: "617 504 0734",
email: "hugh@likeablelocal.com",
clinic_name: "eigenbagel",
clinic_address: "533 congress street, portland, ME 04101",
fb_page_url: "",
henry_schein_agent: "myself",
agent_email: "awesome@example.com",
state: "ME",
name: "Eigenbagel",
vertical: 6,
fb_page: 114808462022307,
fb_token: "CAAFN5ApCzQkBAMnGV44yaSZCJscI2j6xChwcuVOF0XqxTt51TCEoXng5rbgKjOjP1SejLqpLvyVEoEioz4z7kgmZBkT2J9kEIR5eLNvqjmf3Yo2BZAfleGtKOodSN5PKi9SV0opgQFrb8mibN1Txq0Kebjw1vpydMozozMbZBzWm0Lh1yNQwCOB0jXrkx8YZD",
sea: 20,
notif_days: 7,
last_notif: "2014-01-27T05:00:00.000Z",
timezone_id: 19,
hubsite_beta_user: 441,
user_plan_subscription_type: null,
user_plan_free_trial_end_dt: null,
user_plan_stripe_plan_code: null,
user_plan_stripe_customer_id: null,
user_plan_stripe_period_end_dt: null,
billing_exempt: null,
category_admin: null,
accomplishments: {
questionaire: true,
social_setup: true,
hubsite_setup: true,
storytelling: true,
page: true,
tutorial: true
},
social_accounts: [
{
brand_id: 406,
platform: "Facebook page",
ad_buying: true,
platform_id: 114808462022307,
username: "Eigenbagel",
link: "https://facebook.com/114808462022307",
token: "CAAFN5ApCzQkBAMnGV44yaSZCJscI2j6xChwcuVOF0XqxTt51TCEoXng5rbgKjOjP1SejLqpLvyVEoEioz4z7kgmZBkT2J9kEIR5eLNvqjmf3Yo2BZAfleGtKOodSN5PKi9SV0opgQFrb8mibN1Txq0Kebjw1vpydMozozMbZBzWm0Lh1yNQwCOB0jXrkx8YZD",
secret: "",
valid: 1,
selected: 1,
reverb: 0
},
{
brand_id: 406,
platform: "Facebook profile",
platform_id: "103069133362057",
username: "Likeable Shane",
link: "http://facebook.com/103069133362057",
token: "CAAFN5ApCzQkBAKrlIZCkGq4rQdrb8mP3YRC6mOIDA4PS6Oxyt2ZAtZAh43kf7LZBruGyHpeip85dEoxbZCnDn4vZCK1LAQJnWYTaNoVCbaPOQQvbttq3ZB79f07a7OSSQW5KGi4tS9vAor6So4Sh1DO9cDGDrFF43TQniADsXZCzb4tTrFXazRZAjZAfDsqeNQ6AsZD",
secret: "",
last_authed: "2015-10-19T13:30:30.000Z",
valid: 1,
selected: 1,
reverb: 0,
avatar_url: null
},
{
brand_id: 406,
platform: "Twitter",
platform_id: "shanejdonnelly",
username: "shanejdonnelly",
link: "http://twitter.com/shanejdonnelly",
token: "145680635-kqHfGwsQwrlZpsqmjTxadEUCowF4ZTCyn8Jd6CtG",
secret: "tBkccaLmDTCfMSVnIY229sTWuHd8yDzNi6XUVEuAIR0LY",
valid: 1,
selected: 1,
reverb: 0,
avatar_url: "https://likeabucket.s3.amazonaws.com/twitter-avatar-406-768cfce0-5b0a-11e5-a73e-05abe307688a.jpg"
}
],
hubsite_path: "shane1234",
hubsite_url: "https://sd-dev.likeablehub.com:8080/shane1234",
likeably_url: "http://likeab.ly/eigenbagel",
externalid: 406,
externaluserid: 441,
subscription: "",
platform_id: 7,
fb_url: "",
fb_username: "Eigenbagel",
content_distribution_on: 0,
promo_preference: "global promo",
startdate: "2014-01-27T19:02:06.000Z",
startlikes: 0,
useractive: "active",
latestlikes: 11,
product_id: 4,
referafriendurl: "http://likeab.ly/eigenbagel#refer",
content_subscriptions: [
"entertainment",
"parenting"
]
};
document.addEventListener('DOMContentLoaded', function() {
/*  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    renderStatus('Performing Google Image search for ' + url);

    getImageUrl(url, function(imageUrl, width, height) {

      renderStatus('Search term: ' + url + '\n' +
          'Google image search result: ' + imageUrl);
      var imageResult = document.getElementById('image-result');
      // Explicitly set the width/height to minimize the number of reflows. For
      // a single image, this does not matter, but if you're going to embed
      // multiple external images in your page, then the absence of width/height
      // attributes causes the popup to resize multiple times.
      imageResult.width = width;
      imageResult.height = height;
      imageResult.src = imageUrl;
      imageResult.hidden = false;

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
  });
  */

  React.render(
      React.createElement(Composebox, {
          close_btn: false, 
          user: user
      }),
      document.getElementById('js-composebox-wrap')
  ); 

  $('body').trigger('newPost');

});
