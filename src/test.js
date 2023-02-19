let key = "180b0f6ff322422e9c506a2fb3dc1e1b";
let endpoint = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = "canadacentral";

let languages = ['ar', 'sq', 'am', 'ar', 'hy', 'as',
    'az', 'bn', 'ba', 'eu', 'bs', 'bg', 'yue', 'ca',
    'lzh', 'zh-Hans', 'zh-Hant', 'hr', 'cs', 'da',
    'prs', 'dv', 'nl', 'en', 'et', 'fo', 'fj', 'fil',
    'fr', 'fr-ca', 'gl', 'ka', 'de', 'el', 'gu', 'ht',
    'he', 'hi', 'mww', 'hu', 'is', 'id', 'ikt', 'iu',
    'iu-Latn', 'ga', 'it', 'ja', 'kn', 'kk', 'km',
    'tlh-Latn', 'tlh-Piqd', 'ko', 'ku', 'kmr', 'ky',
    'lo', 'lv', 'lt', 'mk', 'mg', 'ms', 'ml', 'mt',
    'mi', 'mr', 'mn-Cyrl', 'mn-Mong', 'my', 'ne',
    'nb', 'or', 'ps', 'fa', 'pl', 'pt', 'pt-pt',
    'pa', 'otq', 'ro', 'ru', 'sm', 'sr-Cyrl',
    'sr-Latn', 'sk', 'sl', 'so', 'es', 'sw',
    'sv', 'ty', 'ta', 'tt', 'te', 'th', 'bo',
    'ti', 'to', 'tr', 'tk', 'uk', 'hsb', 'ur',
    'ug', 'uz', 'vi', 'cy', 'yua', 'zu'];
let text = "hi";
let givenLang = "en";
let outputLang = ["zh-Hans"];

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': key,
        // location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: {
        'api-version': '3.0',
        'from': givenLang,
        'to': outputLang
    },
    data: [{
        'text': text
    }],
    responseType: 'json'
}).then(function(response){
    console.log(response.data[0].translations[0].text);
})