let name = 'my friend'
Array(4).fill(1).forEach((item, index) => {
  console.log(`Merry christmas ${index == 3 ?
`dear ${name}` : 'to You'}`)
});
