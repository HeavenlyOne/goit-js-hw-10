var t,n;t=document.querySelector(".js-search"),n=document.querySelector(".js-list"),t.addEventListener("submit",function(t){t.preventDefault();var e,c,a=t.currentTarget.elements,o=a.query,r=a.days;(e=o.value,c=r.value,fetch("".concat("https://api.weatherapi.com/v1","/forecast.json?key=").concat("someapikey","&q=").concat(e,"&days=").concat(c,"&lang=uk")).then(function(t){if(!t.ok)throw Error(t.statusText);return t.json()})).then(function(t){return n.innerHTML=t.forecast.forecastday.map(function(t){var n=t.date,e=t.day,c=e.avgtemp_c,a=e.condition,o=a.icon,r=a.text;return'<li>\n        <img src="'.concat(o,'" alt="').concat(r,'">\n        <p>').concat(r,"</p>\n        <h2>").concat(n,"</h2>\n        <h3>").concat(c,"</h3>\n    </li>")}).join("")}).catch(function(t){return console.log(t)})});
//# sourceMappingURL=risich-1.079e10a9.js.map
