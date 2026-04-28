This random meme API was primarily built for https://qwertyhu66.github.io/Useless-Web-Projects, a project I'm working on with a friend. <br>
On the GitHub Pages website for this repository, you can find the actual URL for the random meme API and add, remove, and edit images in the database. Please understand that you can only do these actions through the website. <br>
*Additionally, note that currently, the website only supports adding images to the database.* <br>
<br>
**Instructions on how to use the API**<br>
Use a question mark (?) at the end of the API URL, followed by key-value pairs to set specific parameters. If you don't set any key-value pairs, the API will try to display a simple webpage that shows a single randomly chosen meme using **Google Apps Script HtmlService.** <br>
The key-value pairs must be written in this format: https://example.com?key1=value1&key2=value2. <br>
The parameters currently available are format, count, width, and height. <br>
The parameter format controls the format of the returned URL(s). The available formats are HTML, JSON, and plain text. *Note that setting the format to HTML returns the **entire HTML code** for a simple webpage that displays a single randomly chosen meme **as text.*** <br>
The parameter count controls the number of returned URLs. The minimum value for count is 1, and the maximum value is the size of the currently selected meme database (See height and width for more info). *Note that this parameter only works with the JSON and plain text formats.* <br>
The width and height parameters filter the memes that the API can randomly pick from based on the given width and height values, **in pixels.** *Note that the width and height parameters are added as separate key-value pairs.* The parameters work like so: doing this "parameter=num1-num2" gives you memes with a height and/or width that fits within the given values, doing this "parameter=num1-" gives you memes with a height and/or width that's larger than the given value, and finally doing this "parameter=-num1" gives you memes with a height and/or width that's smaller than the given value. <br>
<ins>**Important!!! When fetching the API URL using JavaScript, use the fetch method "Get" or just don't set one.** </ins> <br>
