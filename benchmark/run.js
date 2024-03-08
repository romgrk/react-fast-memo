import * as current from '../'
import shallowEqual from 'shallowequal'
import fbjsEquals from 'fbjs/lib/shallowEqual.js'
import { shallowEqual as fastEquals } from 'fast-equals'
import { equal as fastShallowEqual } from 'fast-shallow-equal'
// import wordpressEqual from '@wordpress/is-shallow-equal'
// import { shallowEqualJIT } from 'shallow-equal-jit'

import reactEquals from './react-equals.js'
import hughskEquals from './hughsk-shallow-equals.js'

const aMap1 = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 };

const bSame = aMap1;

const bEqualMap1   = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 };
const bEqualMap2   = { b: 2, a: 1, c: 3, d: 4, e: 5, f: 6, g: 7 };
const bEqualMap3   = { b: 2, c: 3, a: 1, d: 4, e: 5, f: 6, g: 7 };
const bEqualMap4   = { b: 2, c: 3, d: 4, a: 1, e: 5, f: 6, g: 7 };
const bEqualMap5   = { b: 2, c: 3, d: 4, e: 5, a: 1, f: 6, g: 7 };
const bEqualMap6   = { b: 2, c: 3, d: 4, e: 5, f: 6, a: 1, g: 7 };
const bEqualMap7   = { b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, a: 1 };

const X = 'X'
const bUnequalMap1   = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: X };
const bUnequalMap2   = { b: 2, a: 1, c: 3, d: 4, e: 5, f: 6, g: X };
const bUnequalMap3   = { b: 2, c: 3, a: 1, d: 4, e: 5, f: 6, g: X };
const bUnequalMap4   = { b: 2, c: 3, d: 4, a: 1, e: 5, f: 6, g: X };
const bUnequalMap5   = { b: 2, c: 3, d: 4, e: 5, a: 1, f: 6, g: X };
const bUnequalMap6   = { b: 2, c: 3, d: 4, e: 5, f: 6, a: 1, g: X };
const bUnequalMap7   = { b: 2, c: 3, d: 4, e: 5, f: 6, g: X, a: 1 };

const tests = [
  // ['is-equal-shallow', isEqualShallow],
  ['shallowequal',shallowEqual],
  ['fbjs/lib/shallowEqual', fbjsEquals],
  ['fast-shallow-equal', fastShallowEqual],
  // ['@wordpress/is-shallow-equal', wordpressEqual],
  // ['shallow-equal-jit', shallowEqualJIT(keys)],
  // ['shallow-equal-jit (===)', shallowEqualJIT(keys, true)],

  ['react', reactEquals],
  ['hughsk/shallow-equals', hughskEquals],
  ['fast-equals.shallowEqual', fastEquals],
  ...Object.keys(current)
    .filter(k => k.startsWith('fast'))
    .map(name => ['romgrk-' + name, current[name]]).reverse()
]

const results = {}

start()
start()
start()

// start()
// start()
// start()
// start()

console.log(map(results, runs => ({
  average: average(runs),
  stddev: stddev(runs),
})))

function start() {
  for (let [name, equal] of tests) {
    run(name + ':equal:monomorphic', equal, compareEqualMonomorphic)
    // run(name + ':equal:megamorphic', equal, compareEqualMegamorphic)
    run(name + ':unequal:monomorphic', equal, compareUnequalMonomorphic)
    // run(name + ':unequal:megamorphic', equal, compareUnequalMegamorphic)
  }
  console.log()
}

function run(name, compareFn, test) {
  // loop(10_000, compareFn, test)
  // loop(10_000, compareFn, test)
  // loop(10_000, compareFn, test)

  const start = Date.now()
  loop(1_000_000, compareFn, test)
  const end = Date.now()
  const d = end - start

  console.log(name, d, 'ms')

  results[name] ??= []
  results[name].push(d)
}

function loop(n, compareFn, test) {
  for (let i = 0; i < n; i++) {
    test(compareFn)
  }
}

function compareEqualMonomorphic(fn) {
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap1)
}

function compareEqualMegamorphic(fn) {
  fn(aMap1, bEqualMap1)
  fn(aMap1, bEqualMap2)
  fn(aMap1, bEqualMap3)
  fn(aMap1, bEqualMap4)
  fn(aMap1, bEqualMap5)
  fn(aMap1, bEqualMap6)
  fn(aMap1, bEqualMap7)
}

function compareUnequalMonomorphic(fn) {
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap1)
}

function compareUnequalMegamorphic(fn) {
  fn(aMap1, bUnequalMap1)
  fn(aMap1, bUnequalMap2)
  fn(aMap1, bUnequalMap3)
  fn(aMap1, bUnequalMap4)
  fn(aMap1, bUnequalMap5)
  fn(aMap1, bUnequalMap6)
  fn(aMap1, bUnequalMap7)
}

function compareEqualDifferentMap(fn) {
  fn(aMap1, bEqualMap2)
  fn(aMap1, bEqualMap2)
  fn(aMap1, bEqualMap2)
  fn(aMap1, bEqualMap2)
}


function average(xs) {
  return Math.round((xs.reduce((t, x) => t + x, 0) / (xs.length || 1)) * 100) / 100
}
function stddev(xs) {
  const n = xs.length || 1
  const mean = xs.reduce((a, b) => a + b) / n
  return Math.sqrt(xs.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
function map(o, fn) {
  const result = {}
  for (let key in o) {
    result[key] = fn(o[key])
  }
  return result
}
