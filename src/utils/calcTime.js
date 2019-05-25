export default function (t) {
  const now = Date.now();
  const s = Math.floor((now - t) / 1000); // 计算秒
  const m = Math.floor(s / 60); // 分
  const h = Math.floor(m / 60); // 时
  const d = Math.floor(h / 24); // 天
  const mth = Math.floor(d / 30); // 月
  const y = Math.floor(mth / 12); // 年
  const arr = [{
      t: y,
      desc: '年前'
    },
    {
      t: mth,
      desc: '月前'
    },
    {
      t: d,
      desc: '天前'
    },
    {
      t: h,
      desc: '小时前'
    },
    {
      t: m,
      desc: '分钟前'
    },
    {
      t: s,
      desc: '秒前'
    }
  ];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i].t > 0) {
      if (i === 0) {
        const t = arr[i].t;
        const m = mth - t * 12 > 0 ? mth - t * 12 + '个月前' : '';
        return m ? t + '年' + m : t + '年前';
      }
      return arr[i].t + arr[i].desc;
    }
  }
}
