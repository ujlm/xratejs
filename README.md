# xratejs
![xratejs logo](https://i.ibb.co/SRt2gg8/xratejs-logo-transparent.png)
A simple solution to include the latest currency conversions in your HTML.
You pass the portfolio as an array of currency_symbol-value pairs inside the from attribute.
The exhange rates are fetched using the cryptocompare API cryptocompare.com.
Consider using the API with your own API key: https://min-api.cryptocompare.com/pricing 

# Dependencies
Include the script in your html before closing body tag
```html
<script type="text/javascript" src="./[PATH_TO]/xrate.js"></script>
```

# Usage
```html
<span class="xratejs" from='[{"OFFICIAL_CURRENCY_SYMBOL": VALUE}, {"OFFICIAL_CURRENCY_SYMBOL": VALUE}, {...}]' to="OFFICIAL_CURRENCY_SYMBOL"></span>
<!-- Pay attention to use double quotes for the object keys -->
```
# Examples
```html
<!-- Basic conversion -->
My $5 is worth €<span class="xratejs" from='[{"USD": 5}]' to="EUR"></span>

<!-- Portfolio consisting of multiple currencies -->
<span class="xratejs" from='[{"BTC": 1}, {"GBP": 2}, {"USD": 10}]' to="EUR"></span>

```
