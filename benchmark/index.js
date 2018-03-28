/**
 * Globals for benchmark.js
 */
global.escapeHtml = require('..')

/**
 * Module dependencies.
 */
const
  benchmark = require('benchmark'),
  benchmarks = require('beautify-benchmark')

for (let dep in process.version) {
  console.log('  %s@%s', dep, process.versions[dep])
}

console.log('')

const suite = new benchmark.Suite

suite.add({
  'name': 'no special characters',
  'minSamples': 100,
  'fn': 'escapeHtml(str)',
  'setup': 'str = "Hello, World!"'
})

suite.add({
  'name': 'single special character',
  'minSamples': 100,
  'fn': 'escapeHtml(str)',
  'setup': 'str = "Hello, World&!"'
})

suite.add({
  'name': 'many special characters',
  'minSamples': 100,
  'fn': 'escapeHtml(str)',
  'setup': 'str = "\'>\'\\"\\"&>h<e>&<y>"'
})

suite.on('cycle', function onCycle(event) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete() {
  benchmarks.log()
})

suite.run({'async': false})
