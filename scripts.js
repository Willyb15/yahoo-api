$(document).ready(function(){

	// add a submit handler
	$('#search').submit(function(){
		var searchSym = $('#symbol').val();

		// url for Yahoo's API
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + searchSym + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';

		// url for USGS IV REST service
		// var url2 = 'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=GA&startDT=2015-11-20&endDT=2016-03-20&parameterCd=00060,00065,00010,00076';

		// url for USGS DV REST service
		// var url3 = '';

		// AJAX call - JS goes to url and brings back yahooResult
		$.getJSON(url, function(yahooResult){
			console.log(yahooResult);
			var stockInfo = yahooResult.query.results.quote;
			var newHTML;
			if (yahooResult.query.count > 1) {
				for (i=0; i<yahooResult.query.count; i++) {
					newHTML += updateTable(stockInfo[i]);
				}
			} else {
				newHTML = updateTable(stockInfo);
			}
			$('#ticker-body').html(newHTML);
			
			$(function() {
				$('.footable').footable();
			});
			
			addSpecialClasses();
			});
		event.preventDefault();
	});

	function updateTable(thingToLoopThrough) {
		var newHTMLRow = '<tr><td>' + thingToLoopThrough.Symbol + '</td>';
		newHTMLRow += '<td>' + thingToLoopThrough.Name + '</td>';
		newHTMLRow += '<td>' + thingToLoopThrough.Ask + '</td>';
		newHTMLRow += '<td class="daily-change">' + thingToLoopThrough.Change + '</td>';
		newHTMLRow += '<td>' + thingToLoopThrough.DaysHigh + '</td></tr>';
		return newHTMLRow;
	}

	function addSpecialClasses() {
		// if dailychange is negative, turn text red; if positive, turn it green
		$('.daily-change').each(function() {
			var dailyChange = $(this).html();
			if (dailyChange.indexOf('+') > -1) {
				$(this).addClass('green');
				console.log('Turn it green!');
			} else if (dailyChange.indexOf('-') > -1) {
				$(this).addClass('red');
				console.log('Turn it red!');
			}
		});
		// add other classes...if asking price > dayshigh....
	}

});