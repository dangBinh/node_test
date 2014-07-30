var fs = require('fs'),
	path = require('path'),
	args = process.argv.splice(2),
	command = args.shift(),
	taskDescription = args.join(' '),
	file = path.join(process.cwd(), '/.tasks');

switch (command) {
	case 'list': 
		listTasks(file);
		break;
	case 'add':
		addTask(file, taskDescription);
		break; 
	default: 
		console.log('Process:' + process.argv[0] + ' list|task [taskDescription]');
}

function loadOrInitilizeTaskArray(file, cb) {
	fs.exists(file, function(exists){
		var tasks = [];
		if(exists) {
			fs.readFile(file, 'utf-8', function(err, data){
				if (err) throw err;
				var data = data.toString();
				var tasks = JSON.parse(data);
				cb(tasks);
			})
		} else {
			cb([]);
		}
	})
}

function listTasks(file) {
	loadOrInitilizeTaskArray(file, function(tasks){
		for(var i in tasks){
			console.log(tasks[i]);
		}
	})
}

function storeTasks(file, tasks) {
	fs.writeFile(file, JSON.stringify(tasks), 'utf-8', function(err){
		if(err) throw err;
		console.log('Saved.');
	})
}

function addTask(file, taskDescription) {
	loadOrInitilizeTaskArray(file, function(tasks) {
		tasks.push(taskDescription);
		storeTasks(file, tasks);
	}) 
}