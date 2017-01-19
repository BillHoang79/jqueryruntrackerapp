$(document).one('pageinit', function() {
	//Displays runs
	showRuns()

	// ADD handler, tap works the same as click 
	$('#submitAdd').on('tap', addRun) 
	// Edit Handler
	$('#submitEdit').on('tap', editRun)

	// Delete Handler
	$('#stats').on('tap', '#deleteLink', deleteRun)

	//Set Current Handler
	$('#stats').on('tap', '#editLink', setCurrent)

	// Clear handler
	$('#clearRuns').on('tap', clearRuns)


	/*Show all runs */
	function showRuns() {
		// get runs obj
		var runs = getRunsObject()

		// Check if empty
		if(runs != '' && runs != null) {
			for(var i =0; i < runs.length; i++) {
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+
				' <br><strong>Distance: </strong>' +runs[i]["miles"]+'m<div class="controls">' +
				'<a href="#edit" id=editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" onclick="return comfirm(\'Are You Sure?\')">Delete</a></li>')
			}
			$('#home').bind('pageinit', function() { 
				$('#stats').listview('refresh')
			})
		} else {
			$('#stats').html('<p>You have no logged runs</p>')
		}

	}

	/* Add a run */

	function addRun() {
		// Get form values
		var miles = $('#addMiles').val()
		var date  = $('#addDate').val()

		// Creates run object, parseFloat for decimals numbers
		var run = {
			date: date,
			miles: parseFloat(miles)
		}

		var runs = getRunsObject()

		// Adds run to runs array
		runs.push(run)

		alert('Run Added')

		// Set stringified obj to localStorage
		localStorage.setItem('runs', JSON.stringify(runs))

		// Redirect
		window.location.href="index.html"

		return false
	}

	/* Edit Runs */
	function editRun() {
		// Get current data
		currentMiles = localStorage.getItem('currentMiles')
		currentDate  = localStorage.getItem('currentDate')

		var runs = getRunsObject()

		// Loop through runs
		for(var i = 0; i < runs.length; i++) {
			if(runs[i].miles == currentMiles && runs[i].date == currentDate) {
				runs.splice(i,1)
			}
			localStorage.setItem('runs', JSON.stringify(runs))
	}

	// Get form values
	var miles = $('#editMiles').val()
	var date  = $('#editDate').val()

	// Create 'run' obj
	var update_run = {
		date: date,
		miles: parseFloat(miles)
	}

	// Add run to runs array
	runs.push(update_run)

	alert('Run Updated')

	// Set stringified obj to localStorage
	localStorage.setItem('runs', JSON.stringify(runs))

	// Redirect
	window.onlocation.href="index.html"

	return false
}

function clearRuns() {
	localStorage.removeItem('runs')
	$('#stats').html('<p>You have no logged runs</p>')
}

/* Delete Run */
function deleteRun() {
	// Set 1s items
	localStorage.setItem('currentMiles', $(this).data('miles'))
	localStorage/setItem('currentDate', $(this).data('date'))

	// Get current data
	currentMiles = localStorage.getItem('currentMiles')
	currentDate  = localStorage.getItem('currentDate')

	var runs = getRunsObject()

	// Loop through runs
	for(var i = 0; i < runs.length; i++) {
		if(runs[i].miles == currentMiles && runs[i].date == currentDate) {
			runs.splce(i,1)
		}
		localStorage.setItem('runs', JSON.stringify(runs))
	}

	alert('Run Deleted')

	// Redirect
	window.location.href='index.html'

	return false
}


	/* Get the runs object */
	function getRunsObject() {
		// Set runs array
		var runs = new Array()
		// Get currents runs from localStorage
		var currentRuns = localStorage.getItem('runs')

		// Check localStorage
		if(currentRuns != null) {
			// Set to runs
			var runs = JSON.parse(currentRuns)
		}

		// Return runs obj
		return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)})
	}

	/*Set the current clicked miles and date*/
	function setCurrent() {
		// Set 1s items
		localStorage.setItem('currentMiles', $(this).data('miles'))
		localStorage.setItem('currentDate', $(this).data('date'))

		// Insert form fields
		$('#editMiles').val(localStorage.getItem('currentMiles'))
		$('#editDate').val(localStorage.getItem('currentDate'))
	}
})