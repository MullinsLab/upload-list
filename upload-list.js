// Copied from TCozy app.js, should eventually be a proper library somewhere
document.addEventListener("DOMContentLoaded", function() {
    /* An Upload List (.upload-list) is a small form widget containing an
     * <input type="file"> element and a <ul> with a "data-for" attribute set
     * to the id of the <input>.  The container (the .upload-list element) is
     * dropzone for dragged files.  The <ul> lists the file names of the local
     * files currently selected by the input (either from drag and drop or
     * browsing).  Applying the Bootstrap .well class to an .upload-list looks
     * nice.
     */
    toArray(document.querySelectorAll(".upload-list"))
        .forEach(function(container) {
            var input = container.querySelector("input[type=file]");

            // Prevent default to allow drag
            container.addEventListener("dragover", squelchEvent, false);

            // Highlight the dropzone
            container.addEventListener("dragenter", function(ev) {
                this.classList.add("active-dropzone");
            }, false);

            // Remove dropzone highlight
            container.addEventListener("dragleave", function(ev) {
                if (ev.target === this)
                    this.classList.remove("active-dropzone");
            }, false);

            // Handle drop
            container.addEventListener("drop", function(ev) {
                squelchEvent(ev);
                input.files = ev.dataTransfer.files;
                updateFileList(ev);
                this.classList.remove("active-dropzone");
            }, false);

            // Keep the display of file names up-to-date, either from
            // drag-and-drop or manual selection.
            var updateFileList = function(ev) {
                var list = container.querySelector("ul[data-for=" + input.id + "]");
                if (!list) return;
                container.classList.toggle("has-files", input.files.length > 0);

                // Clear existing file list
                list.innerHTML = '';

                for (var i = 0; i < input.files.length; i++) {
                    var file = input.files[i];
                    var li = document.createElement('li');
                    li.textContent = file.name;
                    list.appendChild(li);
                }
            };
            window.addEventListener("pageshow", updateFileList);
            input.addEventListener("change", updateFileList);
            input.form.addEventListener("reset", function(){
                // Trigger an update on the "next tick", which ensures that
                // input.files is actually cleared when updateFileList runs.
                setTimeout(updateFileList, 1);
            });
        });
}, false);
