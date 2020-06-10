let movieList = [];

let movieInput = document.querySelector('input[type="text"]');
let ul = document.querySelector("ul");

function createElement(tag, props = {}, [...children]) {
	let elm = document.createElement(tag);
	console.log(Array.isArray(children));
	children.forEach((c) => {
		if (typeof c === "string") {
			let childElement = document.createTextNode(c);
			elm.append(childElement);
		} else if (typeof c === "object") {
			elm.append(c);
		}
	});
	return elm;
}

function createUI(data = movieList, root = ul) {
	root.innerHTML = "";
	data.forEach((movie, index) => {
		let checked = movie.isWatched ? "Watched" : "To Watch";

		let p = createElement("p", null, movie.name);

		let button = createElement("button", { "data-id": index }, checked);

		let del = createElement("span", { "data-id": index }, "x");

		let li = createElement("li", null, [p, button, del]);
		ul.append(li);
	});
}

function toggleWatch(event) {
	if (event.target.nodeName === "BUTTON") {
		let id = event.target.dataset.id;
		movieList = movieList.map((movie, index) => {
			if (index == id) {
				return {
					...movie,
					isWatched: !movie.isWatched,
				};
			}
			return movie;
		});
		createUI();
	}
}
function handleInput(event) {
	if (event.keyCode === 13) {
		movieList = movieList.concat({
			name: event.target.value,
			isWatched: false,
		});
		event.target.value = "";
		createUI();
	}
}

function deleteMovie(event) {
	if (event.target.nodeName === "SPAN") {
		let id = event.target.dataset.id;
		movieList.splice(id, 1);
		createUI();
	}
}
ul.addEventListener("click", toggleWatch);
ul.addEventListener("click", deleteMovie);
movieInput.addEventListener("keyup", handleInput);
