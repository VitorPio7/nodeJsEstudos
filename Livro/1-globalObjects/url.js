//PERMITE TRABALHAR COM A URL;
const url = new URL('/dist/latest-v16.x/docs/api/','https://nodejs.org');
console.log(url)
const searchParams = new URLSearchParams();
searchParams.set('name', 'john');
searchParams.set('age', 42);
console.log(searchParams.toString());