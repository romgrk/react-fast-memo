# react-fast-memo

A faster `React.memo()`. Also includes the [fastest](#benchmarks) correct shallow object comparison function.

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

The comparison function is also included:

```javascript
import { fastCompare } from 'react-fast-memo'

// `fastCompare` is for general and correct nullable-objects comparison
console.log(fastCompare(
  { a: 1, b: undefined },
  { a: 1 },
))
```

An unsafe comparison function is also exported, `fastCompareUnsafe`, but it should only be used when objects are guaranteed to have the same shape.

### Benchmarks

In least performant to most performant order. Each function is benchmarked for objects that are `equal` and `unequal`.
The full results here are for V8, and I have added partial results for JSC and SpiderMonkey after. Suprisingly, in JSC
the safe version is the fastest one.

Runnable benchmark code is in the `./benchmark` folder, and consist of comparing two 8-keys monomorphic objects together
in a 1,000,000 iteration loop, in two cases: equal values, and unequal values (one differing value). Results are in
milliseconds

```jsonc
// V8
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
  // This one is faster than our safe one, but it uses `===` for comparison
  // instead of `Object.is`, it is therefore incorrect because `NaN !== NaN`
  // due to the unsound semantics of `===` in float comparison.

  "romgrk-fastCompareUnsafe:equal:monomorphic":   { t: 515.67, stddev: 1.24},
  "romgrk-fastCompareUnsafe:unequal:monomorphic": { t: 455.67, stddev: 7.31},
}
```

```jsonc
// JSC
{
  "react:equal:monomorphic":                      { t: 401, stddev: 25.152865973217974 },
  "react:unequal:monomorphic":                    { t: 415.33, stddev: 3.39934634239519 },

  "romgrk-fastCompareUnsafe:equal:monomorphic":   { t: 313.67, stddev: 30.26916289265731 },
  "romgrk-fastCompareUnsafe:unequal:monomorphic": { t: 244.67, stddev: 3.8586123009300755 },

  "hughsk/shallow-equals:equal:monomorphic":      { t: 297, stddev: 14.236104336041748 },
  "hughsk/shallow-equals:unequal:monomorphic":    { t: 189.33, stddev: 2.0548046676563256 },

  "romgrk-fastCompare:equal:monomorphic":         { t: 199.67, stddev: 6.847546194724712 },
  "romgrk-fastCompare:unequal:monomorphic":       { t: 128.67, stddev: 1.247219128924647 },
}
```

```jsonc
// SpiderMonkey
{
  "react:equal:monomorphic":                      { t: 975.33, stddev: 1.24721912892464 },
  "react:unequal:monomorphic":                    { t: 1073, stddev: 13.49073756323204 },

  "hughsk/shallow-equals:equal:monomorphic":      { t: 661.33, stddev: 50.5459087255228 },
  "hughsk/shallow-equals:unequal:monomorphic":    { t: 509, stddev: 22.01514630127782 },

  "romgrk-fastCompare:equal:monomorphic":         { t: 506.33, stddev: 3.3993463423951 },
  "romgrk-fastCompare:unequal:monomorphic":       { t: 503.67, stddev: 3.681787005729087 },

  "romgrk-fastCompareUnsafe:equal:monomorphic":   { t: 468.33, stddev: 6.18241233033046 },
  "romgrk-fastCompareUnsafe:unequal:monomorphic": { t: 466.67, stddev: 3.09120616516523 },
}
```
