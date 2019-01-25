class TimersManager {
	constructor(timers = []) {
		this.timers = timers;
	}

	add(body) {
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
	}

	start() {
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

	stop() {}

	pause() {}

	resume() {}

	_add(body, args) {
		const {name, delay, interval, job} = body;
		check(name, 'string');
		check(delay, 'number');
		check(interval, 'boolean');
		check(job, 'function');

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