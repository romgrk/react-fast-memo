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
