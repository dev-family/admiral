## ⌨️ Development

```bash
$ git clone git@github.com:dev-family/admiral.git
$ cd admiral
$ npm install
$ npm run dev
```

Open your browser and visit http://localhost:3000

## 🏗️ Build library

_(example for tag version 1.0.0)_

```bash
$ npm run build:lib
$ git commit -m "build: lib (v1.0.0)"
$ git push
$ git tag v1.0.0
$ git push origin --tags
```

After that you can add the library to your project with the command:

```bash
$ npm install git+ssh://git@github.com:dev-family/admiral.git#v1.0.0
```
