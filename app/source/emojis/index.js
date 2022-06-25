import smile from "./weixiao.png";
import grinning from "./grinning.png";
import thumbs from "./thumbs.png";
import folded from "./folded.png";
import ok from "./ok.png";
import crying from "./crying.png";
import mouth from "./mouth.png";
import shushing from "./shushing.png";
import rolling from "./rolling.png";
import grinningSweat from "./grinning-sweat.png";

export const EMOJIS_DATA = {
  "😊": smile,
  "😄": grinning,
  "👍": thumbs,
  "🙏": folded,
  "👌": ok,
  "😭": crying,
  "🤭": mouth,
  "🤫": shushing,
  "🤣": rolling,
  "😅": grinningSweat,
};

// 符号->中文
export const EMOJIS_ZH = {
  "😊": "😊",
  "😄": "😄",
  "👍": "👍",
  "🙏": "🙏",
  "👌": "👌",
  "😭": "😭",
  "🤭": "🤭",
  "🤫": "🤫",
  "🤣": "🤣",
  "😅": "😅",
};

export const invertKeyValues = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {});

const default_emoji = () => {
  const strMap = new Map();
  let index = 0;
  const data = [];
  for (const key of Object.keys(EMOJIS_DATA)) {
    strMap.set(key, EMOJIS_DATA[key]);
  }
  for (const val of strMap.keys()) {
    data.push({
      key: index,
      value: val,
    });
    index++;
  }

  const page0 = data.slice(0, 23);
  const page1 = data.slice(23, 46);
  const page2 = data.slice(46, 69);
  const page3 = data.slice(69, 92);
  const page4 = data.slice(92, 115);

  page0.push({
    key: 100,
    value: "/{del}",
  });
  page1.push({
    key: 101,
    value: "/{del}",
  });
  page2.push({
    key: 102,
    value: "/{del}",
  });
  page3.push({
    key: 103,
    value: "/{del}",
  });
  page4.push({
    key: 104,
    value: "/{del}",
  });
  return [page0, page1, page2, page3, page4];
};

export const DEFAULT_EMOJI = default_emoji();
