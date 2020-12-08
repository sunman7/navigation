const $list = $(".list");
const $lastLi = $list.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

//初始化
let map = [
  {
    logo: "S",
    logoType: "text",
    url: "https://www.segmentfault.com",
  },
  {
    logo: "I",
    logoType: "text",
    url: "https://www.iconfont.cn/",
  },
  {
    logo: "C",
    logoType: "text",
    url: "https://csstriggers.com/",
  },
  {
    logo: "J",
    logoType: "text",
    url: "https://zh.javascript.info/",
  },
  {
    logo: "C",
    logoType: "text",
    url: "https://caniuse.com/",
  },
  {
    logo: "D",
    logoType: "text",
    url: "https://developer.mozilla.org/zh-CN/docs/Web",
  },
];
map = xObject || map;
const SimpleifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 /开头的内容
};
const render = () => {
  $list.find("li:not(.last)").remove();

  map.forEach((node, index) => {
    console.log(index);
    const $li = $(`<li>     
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${SimpleifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close1"></use>
              </svg></div>
          </div>
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      // 阻止冒泡
      e.stopPropagation();
      map.splice(index, 1);
      console.log(map);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入想要添加的网站");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  map.push({
    logo: SimpleifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  console.log("页面关闭");
  const string = JSON.stringify(map);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < map.length; i++) {
    if (map[i].logo.toLowerCase() === key) {
      window.open(map[i].url);
    }
  }
});
// 阻止在文本框输入的时候冒泡
$(".searchForm")
  .find("input")
  .on("keypress", (e) => {
    e.stopPropagation();
  });
