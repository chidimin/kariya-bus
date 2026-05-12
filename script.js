let currentRoute = "east";
let currentDay = "weekday";
let currentDirection = "up";

/* =========================
   遅延情報取得
========================= */

const delayDiv =
  document.getElementById("delay-info");

const updateDiv =
  document.getElementById("update-time");

async function fetchDelayInfo() {

  // 初期化
  delayDiv.style.display = "none";
  delayDiv.innerHTML = "";

  try {

    const targetUrl =
      "https://buscatch.jp/rt3/unko_rosen_list.php?id=kariya-city";

    // CORS回避
    const proxyUrl =
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent(targetUrl);

    const response =
      await fetch(proxyUrl);

    // 通信失敗
    if (!response.ok) {
      return;
    }

    const html =
      await response.text();

    // データ不足
    if (!html || html.length < 100) {
      return;
    }

    // HTML解析
    const parser =
      new DOMParser();

    const doc =
      parser.parseFromString(
        html,
        "text/html"
      );

    const text =
      doc.body.innerText;

    const targets = [
      "東境線",
      "西境線"
    ];

    let results = [];

    targets.forEach(line => {

      const regex =
        new RegExp(
          `${line}.*?(\\d+)分遅れ`,
          "g"
        );

      let match;

      while (
        (match = regex.exec(text))
        !== null
      ) {

        results.push(
          `${line} ${match[1]}分遅れ`
        );

      }

    });

    // 表示
    if (results.length > 0) {

      delayDiv.innerHTML =
        results.join("<br>");

      delayDiv.style.display =
        "block";
    }

    // 更新時刻
    const now = new Date();

    updateDiv.innerHTML =
      "最終更新: " +
      now.toLocaleTimeString("ja-JP");

  } catch (error) {

    // エラー時完全非表示
    delayDiv.style.display = "none";
    delayDiv.innerHTML = "";

    console.error(
      "取得失敗",
      error
    );
  }
}

/* =========================
   時刻表データ
========================= */

const data = {
  east:{
    weekday:{
      up:{
        stops:[
          "富士松図書館",
          "一里山市民館",
          "朝日町2丁目",
          "刈谷駅北口",
          "交通児童遊園",
          "刈谷駅南口"
        ],
        times:[
          ["6:13","6:29","6:38","6:52","6:55","7:09"]
        ]
      }
    }
  }
};

/* =========================
   ボタン操作
========================= */

function setRoute(route){

    currentRoute = route;

    document
      .getElementById("routeEast")
      .classList.remove("active");

    document
      .getElementById("routeWest")
      .classList.remove("active");

    if(route==="east"){
        document
          .getElementById("routeEast")
          .classList.add("active");
    }else{
        document
          .getElementById("routeWest")
          .classList.add("active");
    }

    render();
}

function setDay(day){

    currentDay = day;

    document
      .getElementById("weekdayBtn")
      .classList.remove("active");

    document
      .getElementById("holidayBtn")
      .classList.remove("active");

    if(day==="weekday"){
        document
          .getElementById("weekdayBtn")
          .classList.add("active");
    }else{
        document
          .getElementById("holidayBtn")
          .classList.add("active");
    }

    render();
}

function setDirection(direction){

    currentDirection = direction;

    document
      .getElementById("upBtn")
      .classList.remove("active");

    document
      .getElementById("downBtn")
      .classList.remove("active");

    if(direction==="up"){
        document
          .getElementById("upBtn")
          .classList.add("active");
    }else{
        document
          .getElementById("downBtn")
          .classList.add("active");
    }

    render();
}

/* =========================
   描画
========================= */

function render(){

    const obj =
      data[currentRoute]
      ?. [currentDay]
      ?. [currentDirection];

    if(!obj){
      document.getElementById(
        "tableArea"
      ).innerHTML =
        "<p>データ未設定</p>";
      return;
    }

    let html = "<table>";

    html += "<tr><th>便</th>";

    obj.stops.forEach(stop=>{
        html += `<th>${stop}</th>`;
    });

    html += "</tr>";

    obj.times.forEach((row,index)=>{

        html += `<tr>
        <td class="stop">${index+1}便</td>`;

        row.forEach(time=>{
            html += `<td>${time}</td>`;
        });

        html += "</tr>";
    });

    html += "</table>";

    document
      .getElementById("tableArea")
      .innerHTML = html;

    const routeName =
        currentRoute==="east"
        ? "東境線"
        : "西境線";

    const dayName =
        currentDay==="weekday"
        ? "平日"
        : "土日祝";

    const directionName =
        currentDirection==="up"
        ? "上り"
        : "下り";

    document
      .getElementById("title")
      .innerText =
        `${routeName} ${dayName} ${directionName}`;
}

/* 初回 */

render();
fetchDelayInfo();

/* 自動更新 */

setInterval(
  fetchDelayInfo,
  60000
);
