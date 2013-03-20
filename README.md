## Portlets Demo using local storage by Steven Holdsworth (@holsee)

This was created initially as a demo.  JavaScript portlet UI implemenation as a jQuery Plug-in which stores state in localstorage.  

The code is still pretty rough and needs to be refactored a polished.  The goal is to restructure the directory, remove any dependencies on twitter bootstrap (rather take the form of a twitter boostrap compatible control) and also remove the depenency on jQuery sortable in favor of an approach that allowed multi column widgets/portlets. See: http://holsee.com/portlets-with-localstorage/

## Dependencies

* jQuery
* jQuery UI (Sortable)
* Twitter Bootstrap (responsive css & glyphs)

## DEMO

http://holseeui.herokuapp.com/#portlets

### stand-alone 
* any modern browser open **stand-alone/index.html**.

### node server host 
* install node.js 
* **npm install** 
* **node server**. 
* Open **http://localhost:3000**.

### tests / specs
* Open **tests/spec-runner.html**

## 3rd Party Code (used in example app):

* Twitter Bootstrap
* Backbone.js
* Node.js
* Express
* jQuery & jQuery UI (sortable)
* Jasmine BDD lib


License Notes

All my* code is MIT license, so go nuts with one condition, that you rename the files and the plug-in from 'holsee' to whatever you want.

\* Code which I wrote. 3rd Party libs and dependencies have their own license.
