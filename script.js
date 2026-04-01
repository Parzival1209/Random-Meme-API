const api = "https://script.google.com/macros/s/AKfycbwR7OkyhCVETCsbuu92JMNmo_Le8u7i4Zgppis35vk6H9a-4GFH9m2UqQLaDJhDXMSeRg/exec";

function validMemeURL(url) {
	return /^https?:\/\/.+\.(png|gif|jpg|jpeg|webp)$/i.test(url.trim());
}
function redditURL(url) {
	return /^https?:\/\/www\.reddit\.com\/media\?url=/.test(url.trim());
}

document.getElementById("memeForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	let url = document.getElementById("memeUrl").value.trim();
	const msg = document.getElementById("msg");

	if (redditURL(url)) {
		const queryString = url.split("?")[1];
        const params = {};
        queryString.split("&").forEach(pair => {
          const [key, value] = pair.split("=");
          params[key] = value;
        });
        if (params.url) {
          url = decodeURIComponent(params.url);
        }
	}
	const tempUrl = url.split("?")[1];
	if (!validMemeURL(tempUrl)) {
		msg.textContent = "Invalid URL format. Must end in .png/.gif/.jpg/.jpeg/.webp";
		msg.style.color = "red";
		setTimeout(() => { msg.textContent = ""; }, 5000);
		return;
	}

	let dots = "";
	msg.style.color = "black";
	msg.textContent = "Submitting";
	const submitInterval = setInterval(() => {
		dots = (dots.length < 3) ? dots + "." : "";
		msg.textContent = "Submitting" + dots;
	}, 500);

	try {
		const response = await fetch(api, {
			method: "POST",
			body: JSON.stringify({ "url": url, "token": "r4kT8FzN9qWmYxE2C7LJpH0bV6sD5A_U" })
		});

		const text = await response.text();
		clearInterval(submitInterval);
		if (text === "OK") {
			msg.textContent = "Meme submitted!";
			msg.style.color = "green";
			setTimeout(() => { msg.textContent = ""; }, 2500);
			document.getElementById("memeUrl").value = "";
		} else if (/^API .* error: /.test(text)) {
			msg.textContent = text;
			msg.style.color = "red";
		} else {
			msg.textContent = text;
			msg.style.color = "red";
			setTimeout(() => { msg.textContent = ""; }, 2500);
		}
	} catch (err) {
		msg.textContent = "API Web Page error: " + err.toString() + ".";
		msg.style.color = "red";
	}
});
