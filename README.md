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
import { fastCompare, fastCompareUnsafe } from 'react-fast-memo'

// `fastCompare` is for general and correct nullable-objects comparison
console.log(fastCompare(
  { a: 1, b: undefined },
  { a: 1 },
))
// => false

// `fastCompareUnsafe` is optimized for react props: non-nullable objects
// where `prop: undefined` is equivalent to not having the prop.
console.log(fastCompareUnsafe(
  { a: 1, b: undefined },
  { a: 1 },
))
// => true

```

If you never use the pattern `'key' in props` in your codebase and are ok with using `fastCompareUnsafe` for
top-of-the-line performance, you can use that version:


```javascript
import { fastMemoUnsafe } from 'react-fast-memo'
```

### Benchmarks

In least performant to most performant order. Each function is benchmarked for objects that are `equal` and `unequal`.

```jsonc
{
  "fbjs/lib/shallowEqual:equal:monomorphic":      { t: 1339.67, stddev: 2.35},
  "fbjs/lib/shallowEqual:unequal:monomorphic":    { t: 1274.33, stddev: 7.58},

  "fast-shallow-equal:equal:monomorphic":         { t: 1228.33, stddev: 36.44},
  "fast-shallow-equal:unequal:monomorphic":       { t: 1174.33, stddev: 2.62},

  "react:equal:monomorphic":                      { t: 1240, stddev: 1.41},
  "react:unequal:monomorphic":                    { t: 1229.67, stddev: 4.71},

  "fast-equals.shallowEqual:equal:monomorphic":   { t: 1261.33, stddev: 42.67},
  "fast-equals.shallowEqual:unequal:monomorphic": { t: 333.33, stddev: 2.05},

  "shallowequal:equal:monomorphic":               { t: 1153, stddev: 67.23 },
  "shallowequal:unequal:monomorphic":             { t: 1188, stddev: 29.06},

  "romgrk-fastCompare:equal:monomorphic":         { t: 859.67, stddev: 3.39},
  "romgrk-fastCompare:unequal:monomorphic":       { t: 769.33, stddev: 2.05},

  "hughsk/shallow-equals:equal:monomorphic":      { t: 592.33, stddev: 41.96},
  "hughsk/shallow-equals:unequal:monomorphic":    { t: 563.33, stddev: 4.18},

  "romgrk-fastCompareUnsafe:equal:monomorphic":   { t: 515.67, stddev: 1.24},
  "romgrk-fastCompareUnsafe:unequal:monomorphic": { t: 455.67, stddev: 7.31},
}
```
