You want to write modular code, not all code in a single file.

# Splitting Code into multiple files: what options do we have? 3 options
1. write multiple TS files; TS will compile them in the source directory and you can then manually import those .js files into the HTML file --> not a good options for bigger projects
2. NAMESPACES and FILE BUNDLING: namespaces is a TS feature ("namespace" code syntax) to group code together below a namespace and then import namespaces into other files + it also bundles the files together into one file
3. ES6 IMPORTS and EXPORTS --> more modern and more important alternative