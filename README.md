# Upload List

An Upload List (`.upload-list`) is a small widget containing an `<input
type="file">` element and an empty `<ul>` with a `data-for` attribute set to
the _name_ of the `<input>`.  The container (the `.upload-list` element)
becomes a dropzone for dragged files.  The `<ul>` will list the file names of
the local files currently selected by the input (either from drag and drop or
browsing using the file chooser).  The intent is a loosely coupled widget
providing nicer behaviour on top of standard form elements and form submission
behaviour.

The original version was written for our [TCozy][] application and eventually
made its way into [Viroverse][] where it saw some improvements before finally
being extracted into a separate component.

[TCozy]: https://mullinslab.microbiol.washington.edu/tcozy/
[Viroverse]: https://viroverse.washington.edu


## Usage

Include the following at the top of your page (or in your packed JS):

```html
<script src="upload-list.js" type="text/javascript"></script>
<link href="upload-list.css" type="text/css" rel="stylesheet" />
```

If you're using [AngularJS][], also include:

```html
<script src="angular-upload-list.js" type="text/javascript"></script>
```

The minimal markup you need is a container, an `<input type="file">` with a
`name`, and a `<ul>` with a `data-for` attribute set to the input's name:

```html
<div class="upload-list">
  <input type="file" name="files" multiple>
  <ul data-for="files"></ul>
</div>
```

If you're using [AngularJS][] and you've required the `upload-list` module in
your own application modules, then you're all set!  The directive will pick up
the `.upload-list` class.

Otherwise, you can manually initialize the component like so:

```js
let uploads = new UploadList( document.querySelector(".upload-list") );

// Look at the source of upload-list.js for the API
// available on the class instance
```

The above HTML will look pretty bleak, although it's functional.  You can get
much fancier with additional elements and behaviour, for example (using some
[Bootstrap 3][] styles here):

```html
<!-- Bootstrap 3's .well class looks nice -->
<div class="upload-list well">
  <label>
    Chromats (<code>ab1</code> or <code>scf</code> format)
    and consensus sequence (<code>fasta</code> format)
  </label>

  <p class="text-muted small">
    Drag and drop files into here or click the <i>Add files…</i> button below.
  </p>

  <ul class="list-unstyled" data-for="pcr-files"></ul>

  <!-- Note that this input is hidden, so it won't be directly visible for file
       selection.  We provide an "Add files…" button below instead. -->
  <input type="file" name="pcr-files" multiple class="hidden">

  <!-- This will be styled by default into the bottom right corner of the well. -->
  <div class="btn-group">
    <button class="btn btn-xs btn-default upload-list-add">Add files…</button>
    <button class="btn btn-xs btn-default upload-list-clear">Clear files</button>
  </div>
</div>
```

which results in:

![Screenshot of above HTML when rendered, with no files selected](../../raw/master/examples/fancy-example-empty.png)

![Screenshot of above HTML when rendered, with several files selected](../../raw/master/examples/fancy-example-with-files.png)


[AngularJS]: https://angularjs.org


## Styling

This component provides minimal default styling when you include
[`upload-list.css`][], but will almost certainly want to add some additional
styles yourself.  If you’re using [Bootstrap 3][], applying `.well` class to an
`.upload-list` looks nice.

### Classes

The following classes are used by the component at various times, which you can
use as hooks for styling or providing optional functionality:

* `.upload-list`: The main container, which is also the dropzone

* `.has-files`: Applied on the container when there is at least one file
  selected/dropped

* `.active-dropzone`: Applied on the container when a drag-and-drop operation
  is active and hovering over the dropzone.  This is useful for indicating via
  a visual change that the dropzone is a droppable area to the user.

* `.upload-list-add`: Any child of the container with this class will have an
  onclick handler registered which triggers a native file chooser.

* `.upload-list-clear`: Any child of the container with this class will have an
  onclick handler registered which removes all files in the upload list.


[Bootstrap 3]: https://getbootstrap.com/docs/3.3/
[`upload-list.css`]: upload-list.css
