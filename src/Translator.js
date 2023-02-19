class Translator {

    key = "180b0f6ff322422e9c506a2fb3dc1e1b";
    endpoint = "https://api.cognitive.microsofttranslator.com";

    // location, also known as region.
    // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
    location = "canadacentral";

    languages = ['ar', 'sq', 'am', 'ar', 'hy', 'as',
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
    text;
    givenLang;
    outputLang;

    constructor(text, givenLang, outputLang) {
        this.text = text;
        this.givenLang = givenLang;
        this.outputLang = outputLang;
    }

    translate() {
        const axios = require('axios').default;
        const { v4: uuidv4 } = require('uuid');
        const result = axios({
            baseURL: this.endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': this.key,
                // location required if you're using a multi-service or regional (not global) resource.
                'Ocp-Apim-Subscription-Region': this.location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': this.givenLang,
                'to': this.outputLang
            },
            data: [{
                'text': this.text
            }],
            responseType: 'json'
        }).then(function(response){
            return response.data[0].translations[0].text;
        })
        return result;
    }

    translateMany() {

        let random;
        let finalLang;
        let result;

        finalLang = this.outputLang.slice();

        for (let i = 0; i < 10; i++) {

            random = Math.random()*this.languages.length;
            this.outputLang = [this.languages[random]];

            result = this.translate();
            this.givenLang = this.outputLang[0].slice();

        }

        this.outputLang = finalLang.slice();
        result = this.translate();

        console.log(result);
        return result;

    }

}

let translator = new Translator("stupid", "en", ["zh-Hans"]);
let message = translator.translate()
    .then((result)=> {
        console.log(result);
        return result;
    });