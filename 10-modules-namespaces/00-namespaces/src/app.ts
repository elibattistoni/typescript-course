/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

//! NB the three slashes are a special syntax that ts understands!
//! with the code with that syntax above, now the namespaces defined at those paths are available here
//! NB the name of the namespace must be the same

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
