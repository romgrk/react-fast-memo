# react-fast-memo

A faster `React.memo()`. Use it as a direct replacement.

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
