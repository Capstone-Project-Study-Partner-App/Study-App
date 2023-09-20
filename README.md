to sync the database, run `(cd server && npm run seed)`

// Node.js is using CJS requires

```
const Lib = require("lib");
module.exports = { ... }
```

// Vite is using ESM modules

```
import Lib from "lib";
export const foo = ...;
export async function foo() { ... }
```
