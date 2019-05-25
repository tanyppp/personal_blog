export default function(cookie) {
  if (typeof cookie !== 'string') throw new Error('cookie类型不正确，应该为string');
  const arr = cookie.split("; ");
  const obj = {};
  arr.reduce(function(prev, next) {
    const newArr = next.split('=');
    prev[newArr[0]] = newArr[1];
    return prev;
  }, obj);
  return obj;
}
