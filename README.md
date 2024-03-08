# react-fast-memo

A faster `React.memo()`. Use it as a direct replacement. Also includes fast object comparison functions.

### Usage

```javascript
import fastMemo from 'react-fast-memo'

const MemoizedComponent = fastMemo(function Component(props) {
  return (
    <div className={props.className}>
      I don't re-render often.
    </div>
  )
})
```

These comparison functions are also included:

```javascript
import { fastCompare, fastCompareForReactProps } from 'react-fast-memo'

// `fastCompare` is for general and correct nullable-objects comparison
console.log(fastCompare(
  { a: 1, b: undefined },
  { a: 1 },
))
// => false

// `fastCompareForReactProps` is optimized for react props: non-nullable objects
// where `prop: undefined` is equivalent to not having the prop.
console.log(fastCompareForReactProps(
  { a: 1, b: undefined },
  { a: 1 },
))
// => true

```

The default export uses `fastCompareForReactProps` which may feel too unsafe for your use-case. In that case
you can use `fastMemoSafe` which uses the more correct version:

```javascript
import { fastMemoSafe } from 'react-fast-memo'
```

### Benchmarks

In least performant to most performant order. Each function is benchmarked for objects that are `equal` and `unequal`.

```jsonc
{
  "fbjs/lib/shallowEqual:equal:monomorphic":             { average: 1322.67, stddev: 1.699673171197595 },
  "fbjs/lib/shallowEqual:unequal:monomorphic":           { average: 1243.67, stddev: 1.247219128924647 },

  "fast-shallow-equal:equal:monomorphic":                { average: 1235.67, stddev: 36.80881536926839 },
  "fast-shallow-equal:unequal:monomorphic":              { average: 1241.33, stddev: 1.699673171197595 },

  "shallowequal:equal:monomorphic":                      { average: 1172.67, stddev: 71.94596737984848 },
  "shallowequal:unequal:monomorphic":                    { average: 1194.33, stddev: 30.15883876338006 },

  "react:equal:monomorphic":                             { average: 1261,    stddev: 3.7416573867739413 },
  "react:unequal:monomorphic":                           { average: 1249,    stddev: 1.632993161855452 },

  "fast-equals.shallowEqual:equal:monomorphic":          { average: 1237.67, stddev: 27.353650985238193 },
  "fast-equals.shallowEqual:unequal:monomorphic":        { average: 325.67,  stddev: 1.8856180831641267 },

  "romgrk-fastCompare:equal:monomorphic":                { average: 871.67,  stddev: 11.585431464655178 },
  "romgrk-fastCompare:unequal:monomorphic":              { average: 777,     stddev: 8.831760866327848 }

  "hughsk/shallow-equals:equal:monomorphic":             { average: 600.67,  stddev: 35.31131389355102 },
  "hughsk/shallow-equals:unequal:monomorphic":           { average: 562.67,  stddev: 3.681787005729087 },

  "romgrk-fastCompareForReactProps:equal:monomorphic":   { average: 515,     stddev: 7.483314773547883 },
  "romgrk-fastCompareForReactProps:unequal:monomorphic": { average: 445.33,  stddev: 1.247219128924647 },
}
```
