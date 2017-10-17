# Renderdoc

Write HTML documents custom tags and render those tags with React components.

Caveats:

- The HTML file must be well-formed and follow XML rules. Every tag must be closed or self-closing.
- The tags are case sensitive
- You need to supply a parent component to act as a wrapper. To render a HTML page, you probably want a component that renders a `<html>` element with the children wrapped in a `<body>`
- The final output will be prepended with `<!doctype html>` unless you disable this feature.

## Use renderdoc with a components directory

Renderdoc can load a directory of components and use them automatically.

```js
const options = {
  componentsDirectory: './components'
};
```

The `components` directory might look like this, with each file exporting a React component:

```
components/
  Page.js
  Title.js
  Item.js
```

When you point renderdoc to this components directory, it will automatically load the components and will use them to render a document like this one:

```html
<Page>
  <Title>Hello, world.</Title>

  <Item>My first item</Item>
  <Item>My second item</Item>
</Page>
```

TODO: update the example below to match the actual API.

```js
const renderdoc = require('renderdoc');

const options = {
    source:
    wrapper:
};

renderdoc.renderFile(options).then(html => {
    fs.writeFile('./output2.html', html);
});
```
