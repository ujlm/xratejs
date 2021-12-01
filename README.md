# xratejs
A simple solution to include the latest currency conversions in your HTML

# Dependencies
Include the script in your html before closing body tag
```html
<script type="text/javascript" src="./[PATH_TO]/xrate.js"></script>
```

# Usage
```html
<!-- Basic conversion -->
My $5 is worth €<span class="xratejs" from='[{"USD": 5}]' to="EUR"></span>

<!-- Portfolio consisting of multiple currencies -->
<span class="xratejs" from='[{"BTC": 1}, {"GBP": 2}, {"USD": 10}]' to="EUR"></span>

```
