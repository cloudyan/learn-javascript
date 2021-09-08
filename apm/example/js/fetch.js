
// fetch

fetch
fetch('https://example.com/movies.json')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
