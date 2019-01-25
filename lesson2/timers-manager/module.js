class TimersManager {
	constructor(timers = []) {
		this.timers = timers;
		// this.start = false;
	}

	add(body) {
		/*if (this.start) {
			throw new Error('Don\'t add new task');
		}*/

		return this._add(body, [...arguments].slice(1));
	}

	list() {
		console.log(this.timers);
	}

	remove(name) {
		check(name, 'string');
		this.timers = this.timers
			.map(timer => {
				const {body, stop} = timer;
				// found by name, then added
				if (body.name === name) {
					if (stop !== undefined) {
						stop();
						console.log('stop -->', name);
					} else {
						console.log(`> Timer ${name} was not started!`);
					}

					console.log('remove -->', name);

					return null;
				}

				return timer;
			})
			.filter(Boolean);

		/*if (this.timers.length === 0) {
			this.start = false;
		}*/
	}

	start() {
		// this.start = true;

		this.timers = this.timers
			.map(timer => {
				const {body, call} = timer;
				const {name, delay, interval} = body;
				const timeFunction = interval ? setInterval : setTimeout;
				const clearTimeFunction = interval ? clearInterval : clearTimeout;

				timer['stop'] = clearTimeFunction.bind(global, timeFunction(call, delay));
				console.log('start -->', name);

				return timer;
			});
	}

	stop() {
		this.stop = false;
	}

	pause() {}

	resume() {}

	_add(body, args) {
		const {name, delay, interval, job} = body;
		check(name, 'string');
		check(delay, 'number');
		check(interval, 'boolean');
		check(job, 'function');

		/*const found = this.timers.filter(({body}) => body.name === name);
		if (found.length > 0) {
			throw new Error('Task is exist');
		}*/

		this
			.timers
			.push({
				body,
				call: job.bind(job, ...args),
			});

		console.log('added -->', name);

		return this;
	}
}

function check(val, type) {
	if (val === undefined || !(typeof val === type)) {
		throw new Error(`parameter undefined or wrong type [${type}]`);
	}

	if (type === 'string' && val === '') {
		throw new Error('parameter must not be an empty string');
	}

	if (type === 'number' && (val > 5000 || val < 0)) {
		throw new Error('parameter must belong to gap between 0 and 5000');
	}
}

module.exports = new TimersManager([]);