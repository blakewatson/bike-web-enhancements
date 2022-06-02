# Bike Web Enhancements

This is a script and style sheet designed to be injected into a standard Bike file (which is itself a subset of HTML). Bike Web Enhancements currently adds these features:

- List styling similar to Bike's defaults
- Collapsible lists
- Visual settings
	- Light/dark color theme
	- Font size
	- Page width

The following features are on my todo list:

- Support URL/email links
- Support Bike links
- Support focusing in/out

## Usage

The only way to use these assets currently is to manually inject a `link` tag and a `script` tag into the HTML of the `.bike` file.

You can use the following CDN-powered tags. For better interoperability with Bike's XML format, it's recommended that you format your tags like this:

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blakewatson/bike-web-enhancements/src/app.css"/>
<script defer="true" src="https://cdn.jsdelivr.net/gh/blakewatson/bike-web-enhancements/src/app.js">\\</script>
```

By injecting those tags in the `<head>` and changing the file extension to `html`, you can view the file in a web browser with the enhancements included.

## Building

If you want to make your own modifications and test locally, you can use this little build system I hacked together.

If you run the `src/build.js` script and pass a path to a Bike file as the first option, it will take the contents of that file, inject a `link` and `script` tag into the `<head>`, and save that into `build/index.html`.

The local URLs for the assets assume the root project directory is being served on `localhost:8888`. I didn't include any mechanism for serving as I am using PHP's built-in development server. You can use whatever you like as a server (Python has one as well).

If there is any interest, I am open to making this build system more sensible.
