// 現在選択中
let currentRoute = 'east';
let currentMode = 'weekday';

// データ
const busData = {

    east: {

        stops: [
            "富士松図書館",
            "一里山市民館",
            "朝日町2丁目",
            "刈谷駅北口",
            "交通児童遊園",
            "刈谷駅南口"
        ],

        timetable: {

            weekday: {
                "富士松図書館": ["06:12", "06:35", "07:01"],
                "一里山市民館": ["06:15", "06:38", "07:04"],
                "朝日町2丁目": ["06:20", "06:43", "07:09"],
                "刈谷駅北口": ["06:25", "06:48", "07:14"],
                "交通児童遊園": ["06:30", "06:53", "07:19"],
                "刈谷駅南口": ["06:33", "06:56", "07:22"]
            },

            holiday: {
                "富士松図書館": ["07:10", "07:40"],
                "一里山市民館": ["07:13", "07:43"],
                "朝日町2丁目": ["07:18", "07:48"],
                "刈谷駅北口": ["07:23", "07:53"],
                "交通児童遊園": ["07:28", "07:58"],
                "刈谷駅南口": ["07:31", "08:01"]
            }
        }
    },

    west: {

        stops: [
            "富士松図書館",
            "蒲生池遊園",
            "今岡町日向",
            "生きがいセンター",
            "刈谷駅北口",
            "刈谷駅南口"
        ],

        timetable: {

            weekday: {
                "富士松図書館": ["06:10", "06:40", "07:10"],
                "蒲生池遊園": ["06:15", "06:45", "07:15"],
                "今岡町日向": ["06:18", "06:48", "07:18"],
                "生きがいセンター": ["06:22", "06:52", "07:22"],
                "刈谷駅北口": ["06:27", "06:57", "07:27"],
                "刈谷駅南口": ["06:30", "07:00", "07:30"]
            },

            holiday: {
                "富士松図書館": ["07:00", "07:30"],
                "蒲生池遊園": ["07:05", "07:35"],
                "今岡町日向": ["07:08", "07:38"],
                "生きがいセンター": ["07:12", "07:42"],
                "刈谷駅北口": ["07:17", "07:47"],
                "刈谷駅南口": ["07:20", "07:50"]
            }
        }
    }
};

// 初期化
function init() {

    updateStopList();

    renderTimetable();

    registerServiceWorker();
}

// 路線変更
function selectRoute(route, button) {

    currentRoute = route;

    document.querySelectorAll('.route-btn')
        .forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    updateStopList();

    renderTimetable();
}

// バス停更新
function updateStopList() {

    const select = document.getElementById('stopSelect');

    select.innerHTML = '';

    const stops = busData[currentRoute].stops;

    stops.forEach(stop => {

        const option = document.createElement('option');

        option.value = stop;
        option.textContent = stop;

        select.appendChild(option);
    });
}

// 平日 / 土日祝
function setMode(mode) {

    currentMode = mode;

    document.getElementById('weekdayBtn')
        .classList.remove('active');

    document.getElementById('holidayBtn')
        .classList.remove('active');

    if(mode === 'weekday') {
        document.getElementById('weekdayBtn')
            .classList.add('active');
    } else {
        document.getElementById('holidayBtn')
            .classList.add('active');
    }

    renderTimetable();
}

// 時刻表表示
function renderTimetable() {

    const stop =
        document.getElementById('stopSelect').value;

    const timetable =
        busData[currentRoute]
        .timetable[currentMode][stop];

    const ul = document.getElementById('timetable');

    ul.innerHTML = '';

    timetable.forEach(time => {

        const li = document.createElement('li');

        li.textContent = time;

        ul.appendChild(li);
    });
}

// Service Worker
function registerServiceWorker() {

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register(
            './service-worker.js'
        );
    }
}

init();