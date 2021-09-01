// Event listeners
// Event Listener 里经常会漏加 try...catch，从而出现未捕获错误

document.querySelector('button').addEventListener('click', async () => {
	throw new Error('event listener err'); // uncaught
});

document.querySelector('button').addEventListener('click', () => {
	throw new Error('event listener err'); // uncaught
})

// Use a try..catch inside the event handler to catch errors
