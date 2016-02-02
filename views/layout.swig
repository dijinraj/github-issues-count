<!doctype html>
<html>

	<head>
	
		<meta charset="utf-8">
		<title>{% block title %}{{ title }}{% endblock %}</title>
		
		<!--Bootstrap-->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"> 
		
		{% block head %} {% endblock %}
		
	</head>

	<body>
	
		<!--Scripts-->
		<script src="http://code.jquery.com/jquery.js"></script>
		
		<div class="col-md-offset-2 col-md-8">
			{% block content %}{% endblock %}
		</div>
	</body>
		
</html>