# React 16 / Enzyme

When `shallow` is used with `lifecycleExperimental` option as false, `componentDidMount` should not be called.

```
shallow(<Test />, {
  lifecycleExperimental: false
});
```

## Install and test

    npm install

    npm test


### Versions

```
"enzyme": "^3.1.0",
"enzyme-adapter-react-16": "^1.0.2",
"react": "^16.0.0",
"react-dom": "^16.0.0"
```
