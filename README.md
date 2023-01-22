# Sortable Tree

Easily create *drag'n'drop*, *sortable* and *collapsable* trees &mdash; vanilla TypeScript, lightweight and no dependencies.

[Check out the demo here.](https://marcantondahmen.github.io/sortable-tree/)

- [Getting Started](#getting-started)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Usage](#usage)
- [Options](#options)
  - [The `nodes` Object in Detail](#the-nodes-object-in-detail)
  - [Rendering Nodes](#rendering-nodes)
  - [Overriding CSS Classes](#overriding-css-classes)
  - [The `onChange` Method](#the-onchange-method)
  - [The `onClick` Method](#the-onclick-method)
  - [Confirming Changes](#confirming-changes)
- [The Tree Object](#the-tree-object)
  - [Tree Methods](#tree-methods)
    - [`findNode(key: string, value: unknown): NodeComponent`](#findnodekey-string-value-unknown-nodecomponent)
    - [`getNode(guid: string): NodeComponent`](#getnodeguid-string-nodecomponent)
- [Nodes](#nodes)
  - [Node Propterties](#node-propterties)
  - [Node Methods](#node-methods)
    - [`collapse(state: boolean): void`](#collapsestate-boolean-void)
    - [`reveal(): void`](#reveal-void)
    - [`toggle(): void`](#toggle-void)

---

## Getting Started

### NPM

### CDN

## Usage

The tree is rendered based on an array of `node` objects. Every node must consist of a `data` and a `nodes` property. While the `data` object is nothing more than a collection of key/value pairs that are passed to the `renderLabel()` function, the `nodes` property represents the array of subnodes that have the same recursive structure.

```html
<div id="tree" class="tree"></div>
<script>
  const nodes = [
    {
      data: { title: 'Home' }, nodes: [
        { data: { title: 'Page 1' }, nodes: [] },
        { data: { title: 'Page 2' }, nodes: [
          { data: { title: 'Subpage' }, nodes: [] }
        ] }
      ]
    }
  ];

  const tree = new SortableTree({
    nodes: nodes,
    element: document.querySelector('#tree'),
    renderLabel: (data) => {
      return `<span>${data.title}</span>`;
    },
    onChange: (result) => { console.log(result); },
    onClick: (event, node) => { console.log(node.data); }
  });
</script>
```

## Options

The following options can be used when creating a new tree object:

```typescript
const tree = new SortableTree({
  nodes: nodes,
  element: document.querySelector('#tree'),
  styles: {
    tree: 'tree',
    node: 'tree__node',
    nodeHover: 'tree__node--hover',
    nodeDragging: 'tree__node--dragging',
    nodeDropBefore: 'tree__node--drop-before',
    nodeDropInside: 'tree__node--drop-inside',
    nodeDropAfter: 'tree__node--drop-after',
    label: 'tree__label',
    subnodes: 'tree__subnodes',
    collapse: 'tree__collapse',
  },
  lockRootLevel: true,
  initCollapseLevel: 2,
  renderLabel: (data: KeyValue): string => {
    return `<span>${data.title}</span>`;
  },
  confirm: async (
    moved: NodeComponent,
    parentNode: NodeComponent
  ): Promise<boolean> => {
    return true;
  },
  onChange: (result: DropResultData): void => {
    console.log(result); 
  },
  onClick: (event: Event, node: NodeComponent): void => {
    console.log(node.data); 
  }
});
```

| Name | Description |
| ---- | ----------- |
| `nodes` | An array of [node objects](#the-nodes-object-in-detail) (required) |
| `element` | The container element where the tree will be created in (required) |
| `styles` | An optional object of [CSS classes](#overriding-css-classes) that are used for the tree elements |
| `lockRootLevel` | Prevent moving nodes the root level (default: `true`) |
| `initCollapseLevel` | The level of nesting that will be initially collapsed (default: `2`) |
| `renderLabel` | The function that will be used to [render a node's label](#rendering-nodes) |
| `onChange` | The [method](#the-onchange-method) that is called when the tree has changed |
| `onClick` | The [method](#the-onclick-method) that is called when a node label has been clicked |
| `confirm` | An async function that is used to [confirm](#confirming-changes) any changes in the tree |

### The `nodes` Object in Detail

The `nodes` object contains the initial array of nodes that is used to construct the tree. A node is a recursive object that contains itself other (sub)nodes and must contain the following two items:

- `data`: An `KeyValue` object that is passed to the `renderLabel` function
- `nodes`: An array of subnodes that have the same shape as the node itself

### Rendering Nodes

The `renderLabel` function controls the HTML of the actual node label that is clickable and draggable. As mentioned before, the `data` object of the rendered noded is passed as argument. Asumming the following `nodes` object:

```typescript
const nodes = [
  data: { 
    title: 'Homepage', 
    path: '/' 
  },
  nodes: []
]
```

A typical implementation that uses the `title` and `path` fields could look like:

```typescript
const tree = SortableTree({
  nodes,
  element: document.querySelector('#tree'),
  renderLabel: (data: KeyValue): string => {
    return `
      <span data-path="${data.path}">
        ${data.title}
      </span>`;
  }
})
```

### Overriding CSS Classes

It is possible to override the class names that are used when rendering the tree. The following fields can be defined in the object that used with the `styles` option:

```typescript
const tree = new SortableTree({
  nodes: nodes,
  element: document.querySelector('#tree'),
  styles: {
    tree: 'my-tree',
    node: 'my-tree__node',
    nodeHover: 'tmy-ree__node--hover',
    nodeDragging: 'my-tree__node--dragging',
    nodeDropBefore: 'my-tree__node--drop-before',
    nodeDropInside: 'my-tree__node--drop-inside',
    nodeDropAfter: 'my-tree__node--drop-after',
    label: 'my-tree__label',
    subnodes: 'my-tree__subnodes',
    collapse: 'my-tree__collapse',
  },
});
```

### The `onChange` Method

The `onChange` method is called whenever a node is dropped successfully somewhere in the tree and a `DropResultData` object is passed as argument.
A `DropResultData` object consists of three items:

- `nodes`: The tree structure that contains a `guid`, `element` and `subnodes` for each node
- `movedNode`: The [node](#nodes) that has been moved
- `srcParentNode`: The original parent [node](#nodes)
- `targetParentNode`: The new parent [node](#nodes)

```typescript
const tree = SortableTree({
  nodes,
  element: document.querySelector('#tree'),
  onChange: ({
    nodes,
    movedNode,
    srcParentNode,
    targetParentNode,
  }: DropResultData): void => {
    const data = movedNode.data;
    const src = srcParentNode.data;
    const target = targetParentNode.data;

    console.log(data, src, target);
    console.log(nodes);
  },
});
```

### The `onClick` Method

The `onClick` method is called whenever a node label is clicked.
The original event object as well as the clicked [node](#nodes) are passed as arguments.

```typescript
const tree = SortableTree({
  nodes,
  element: document.querySelector('#tree'),
  onClick: (event: Event, node: NodeComponent):void => {
    console.log(event, node);
  },
});
```

### Confirming Changes

Whenever a node is dropped, it is possible to request confirmation before actually moving a node. Therefore an `async` function can be assigned to the `confirm` as follows:

```typescript
const tree = SortableTree({
  nodes,
  element: document.querySelector('#tree'),
  confirm: async (
    movedNode: NodeComponent,
    targetParentNode: NodeComponent
  ): Promise<boolean> => {
    return confirm('Are you sure?');
  },
});
```

## The Tree Object

The tree object represents the collection of nodes and allows for retrieving nodes by GUID or values from the initial dataset.

### Tree Methods

The following public methods are available:

#### `findNode(key: string, value: unknown): NodeComponent`

You can search for a [node](#nodes) by a key/value pair in the initial nodes [data object](#node-propterties) that was used to create the tree by using the `findNode` method. Note that only the first match is returned:

```typescript
const tree = new SortableTree(options);
const node = tree.findNode('title', 'home');

console.log(node.guid);
console.log(node.data);
```

#### `getNode(guid: string): NodeComponent`

In case you have already a GUID of a node from a previous search or similar, you can use the `getNode` method to get the node from the tree:

```typescript
const node = tree.getNode(guid);
```

## Nodes

Nodes represent the based units a tree consists of. Nodes can also contain other nodes.

### Node Propterties

The following public properties can be accessed on a node element:

| Name | Description |
| ---- | ----------- |
| `data` | The custom data object that was assigned when creating the tree |
| `label` | The clickable and draggable label element |
| `subnodes` | The container element that hosts the subnodes |
| `guid` | The node's GUID that can be used to get the node from the tree instance |

### Node Methods

Every node exposes the folowing public methods:

#### `collapse(state: boolean): void`

You can control the `collapse` state of a node as follows:

```typescript
const tree = new SortableTree(options);
const node = tree.findNode('title', 'home');

node.collapse(true); // Hide all subnodes
node.collapse(false); // Show all subnodes
```

#### `reveal(): void`

The `reveal` method can be used to unfold the tree down to the node:

```typescript
const tree = new SortableTree(options);
const node = tree.findNode('title', 'home');

node.reveal();
```

#### `toggle(): void`

The `toggle` method is used to toggle the `collapse` state.

---

(c) 2023 Marc Anton Dahmen, MIT license