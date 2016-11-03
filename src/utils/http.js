import ajax from 'packing-ajax';
import { isObject } from './validator';
import { safeAssign } from './safeMethod';

let api = (opts, params) => {
  let defaultOpts = {
      url: '',
      type: 'get',
      dataType: 'json',
      contentType: ''
    },
    option = safeAssign(defaultOpts, isObject(opts) ? opts : { url: opts });

  return new Promise((resolve, reject) => {
    ajax({
      ...option,
      data: params,
      success: (response) => {
        if (!response.ret) {
          reject(response);
          return;
        }
        resolve(response);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
};

let getUrlRelativePath = () => {

  let url = document.location.toString(),
    arrUrl = url.split('//'),
    start = arrUrl[1].indexOf('/'),
    relUrl = arrUrl[1].substring(start);

  if ( relUrl.indexOf('?') != -1 ) {
    relUrl = relUrl.split('?')[0];
  }

  return relUrl;
};

let getQueryString = () => {
    var url = window.location.search;
    var theRequest = {};
    if (url.indexOf('?') != -1) {
      var str = url.substr(1),
        strs = str.split('&');

      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  }

export {
  api,
  getUrlRelativePath,
  getQueryString
}
