export default function(query) {
  if (typeof query !== 'string') throw new Error('query类型不正确，应该为string');
  const arr = query.slice(1).split("&");
  const obj = {};
  arr.reduce(function(prev, next) {
    const newArr = next.split('=');
    prev[newArr[0]] = newArr[1];
    return prev;
  }, obj);
  return obj;
}
