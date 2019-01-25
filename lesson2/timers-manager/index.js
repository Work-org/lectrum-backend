// Module
const manager = require('./module');

const t1 = {
	name:     't1',
	delay:    3000,
	interval: false,
	job:      () => { console.log('>>>> job 1 finished') }
};

const t2 = {
	name:     't2',
	delay:    490,
	interval: true,
	job:      (a, b) => {
		const c = a + b;
		console.log('>>>> job2', a, b, c);
	}
};

manager
	.add(t1)
	.add(t2, 1, 2);
manager.start();
// console.log(manager.list());

// stop t1 before him start
setTimeout(() => manager.remove('t2'), 2000);
manager.pause('t1');