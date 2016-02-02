'use strict'

var api = require("../libs/api")

/**
 * Home Page
 * @method	GET
 * @param {object} req 
 * @param {object} res
 */
var home = function(req, res) {
	
	// Render submit page action
	if(req.query.reppo == "" || req.query.reppo) {
		
		// Filter owner & reppo name
		var reppoName = '';
		var reppoUrl = req.query.reppo;
		var data = reppoUrl.split("github.com");
		if(data[1]) {
			data = data[1].split("/");
			if(data[1] && data[2]) {
				reppoName = data[1] + "/" + data[2];
			}
		}
		
		getIssueCount(reppoName, function (data) {
			var resJson = {
				url: reppoUrl,
				head: "GitHub Repo Issue Info",
				type: 'submit',
				data: data.data
			};
			
			// Error message
			if(!data.status) {
				resJson.message = data.message;
			}
			
			res.render('index', resJson);
		});
	} else {
		res.render('index', {
			head: "GitHub Repo Issue Info",
			type: 'init'
		})
	}
}

/**
 * Get Issues Count
 * @param {string} reppoName url
 */
var getIssueCount = function (reppoName, callback) {
	var resJson = {status: false, message: "", data: null};
	
	if(!reppoName) {
		resJson.message = "Enter a valid reppo url";
		callback(resJson);
		return;
	}
	
	// Github api inputs
	var page 		= 1;
	var limit 		= 100;
	var options 	= {};
	options.reppoName = reppoName;
	options.host 	= 'api.github.com',
	options.headers = {
		'User-Agent': 'dRh-api'
	}

	// Initialize values
	var result = [];
	var dateGroup = {
		low: 0,
		medium: 0,
		high: 0,
	};
	var total = 0;
	
	// Call api
	callGitapi(options, page, result, postAction);
	
	// Api callback
	function postAction(result) {
		if(Array.isArray(result) && result.length > 0) {
			var now			= new Date();
			var numberDays	= 0;
			var group		= null;
			result.forEach(function (issue) {
				// Filter issues
				if(issue.html_url.indexOf('issue') > -1) {
					numberDays = getDiffDays(now, new Date(issue.created_at));

					if(numberDays <= 1) {
						group = 'low';
					} else if(numberDays <= 7) {
						group = 'medium';
					} else {
						group = 'high';
					}

					dateGroup[group]++;
					total++;
				}
			});
			resJson.message = 'success';
			resJson.status	= true;
		}
		
		var countList = {
			low: dateGroup.low,
			medium: dateGroup.medium,
			high: dateGroup.high,
			total: total
		}
		
		resJson.data	= countList;
		callback(resJson);
	}
}

/**
 * Recursive call to fetch all page info
 * @param {object} options  
 * @param {number} page     
 * @param {Array}  result   
 * @param {Array}  callback 
 */
var callGitapi = function (options, page, result, callback) {
	var limit = 100;
	var isEnd = false;
	options.path = '/repos/' + options.reppoName + '/issues?is=issue&state=open&per_page=' + limit + '&page=' + page;
	console.log(options.path);
	api.request(options, [], function(data) {
		try {
			var newResult = JSON.parse(data.result);
			// console.log("## ", newResult);
			if(Array.isArray(newResult)) {
				if(newResult.length < limit) {
					isEnd = true;
				} 
				console.log("Length " + newResult.length);
				result = result.concat(newResult);
			} else {
				isEnd = true;
			}
		} catch(e) {
			console.log(e);
			isEnd = true;
		}

		if(isEnd) {
			callback(result);
			return;
		} else {
			callGitapi(options, ++page, result, callback)
		}
	})
}

/**
 * Difference between 2 dates in days
 * @param   {object} date1 date
 * @param   {object} date2 date
 * @returns {number} number of days
 */
var getDiffDays = function(date1, date2) {
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return diffDays;
}

module.exports = {
	home: home,
	getIssueCount: getIssueCount,
}
