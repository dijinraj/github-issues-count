{% extends 'layout.swig' %}

{% block title %}{{ title }}{% endblock %}

{% block head %}
  {% parent %}
{% endblock %}

{% block content %}
	<h1 class="text-center"> {{ head }} </h1>
	<div>
		<form>
			<label class="col-md-3">Enter your repo url: </label>
			<input class="col-md-7" type="text" name="reppo" id="repname" value="{{ url }}"/>
			<input class="col-md-2" type="submit" value="Submit" id="submit" />
		</form>
	</div>
	{% if type != 'init' %}
	<div>
		<br />
		<br />
		{% if message.length > 0 %}
		<pre class="bg-danger">

{{ message }}
		</pre>
		{% else %}
		<pre class="bg-info">
		
- Total number of open issues: <b>{{ data.total }}</b>

- Number of open issues that were opened in the last 24 hours: <b>{{ data.low }}</b>

- Number of open issues that were opened more than 24 hours ago but less than 7 days ago: <b>{{ data.medium }}</b>

- Number of open issues that were opened more than 7 days ago: <b>{{ data.high }}</b>
		</pre>
		{% endif %}
	</div>
	{% endif %}
{% endblock %}


