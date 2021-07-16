const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const sites = localStorage.getItem("sites");
const xObject = JSON.parse(sites);
const hashMap = xObject || [
  {
    logo: "T",
    url: "https://tieba.baidu.com",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
  {
    logo: "W",
    url: "https://weibo.com",
  },
  {
    logo: "Z",
    url: "https://www.zhihu.com",
  },
  {
    logo: "F",
    url: "https://translate.google.cn",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
      <li>
        <div class="site">
          <div class="logo">${node.logo[0]}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </li>
    `).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入你要添加的网站:", "https://");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("sites", string);
};
