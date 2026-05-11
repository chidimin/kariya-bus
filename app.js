const busData = {

  east: {

    up: {

      stops: {

        "富士松図書館": {
          weekday: ["06:12", "07:05", "08:10"],
          holiday: ["07:10", "09:10"]
        },

        "一里山市民館": {
          weekday: ["06:20", "07:12", "08:18"],
          holiday: ["07:18", "09:18"]
        },

        "朝日町2丁目": {
          weekday: ["06:28", "07:20", "08:25"],
          holiday: ["07:25", "09:25"]
        },

        "刈谷駅北口": {
          weekday: ["06:35", "07:28", "08:32"],
          holiday: ["07:32", "09:32"]
        },

        "交通児童遊園": {
          weekday: ["06:40", "07:35", "08:38"],
          holiday: ["07:38", "09:38"]
        },

        "刈谷駅南口": {
          weekday: ["06:45", "07:42", "08:45"],
          holiday: ["07:45", "09:45"]
        }

      }

    },

    down: {

      stops: {

        "刈谷駅南口": {
          weekday: ["06:50", "07:50", "08:50"],
          holiday: ["07:50", "09:50"]
        },

        "交通児童遊園": {
          weekday: ["06:55", "07:55", "08:55"],
          holiday: ["07:55", "09:55"]
        },

        "刈谷駅北口": {
          weekday: ["07:00", "08:00", "09:00"],
          holiday: ["08:00", "10:00"]
        },

        "朝日町2丁目": {
          weekday: ["07:08", "08:08", "09:08"],
          holiday: ["08:08", "10:08"]
        },

        "一里山市民館": {
          weekday: ["07:15", "08:15", "09:15"],
          holiday: ["08:15", "10:15"]
        },

        "富士松図書館": {
          weekday: ["07:22", "08:22", "09:22"],
          holiday: ["08:22", "10:22"]
        }

      }

    }

  },

  west: {

    up: {

      stops: {

        "富士松図書館": {
          weekday: ["06:05", "07:00", "08:00"],
          holiday: ["07:00", "09:00"]
        },

        "蒲生池遊園": {
          weekday: ["06:12", "07:08", "08:08"],
          holiday: ["07:08", "09:08"]
        },

        "今岡町日向": {
          weekday: ["06:20", "07:15", "08:15"],
          holiday: ["07:15", "09:15"]
        },

        "生きがいセンター": {
          weekday: ["06:28", "07:22", "08:22"],
          holiday: ["07:22", "09:22"]
        },

        "刈谷駅北口": {
          weekday: ["06:35", "07:30", "08:30"],
          holiday: ["07:30", "09:30"]
        },

        "刈谷駅南口": {
          weekday: ["06:42", "07:38", "08:38"],
          holiday: ["07:38", "09:38"]
        }

      }

    },

    down: {

      stops: {

        "刈谷駅南口": {
          weekday: ["06:50", "07:50", "08:50"],
          holiday: ["07:50", "09:50"]
        },

        "刈谷駅北口": {
          weekday: ["06:58", "07:58", "08:58"],
          holiday: ["07:58", "09:58"]
        },

        "生きがいセンター": {
          weekday: ["07:05", "08:05", "09:05"],
          holiday: ["08:05", "10:05"]
        },

        "今岡町日向": {
          weekday: ["07:12", "08:12", "09:12"],
          holiday: ["08:12", "10:12"]
        },

        "蒲生池遊園": {
          weekday: ["07:20", "08:20", "09:20"],
          holiday: ["08:20", "10:20"]
        },

        "富士松図書館": {
          weekday: ["07:28", "08:28", "09:28"],
          holiday: ["08:28", "10:28"]
        }

      }

    }

  }

};

let currentRoute = "east";
let currentDirection = "up";
let currentStop = "富士松図書館";

const eastBtn = document.getElementById("east-btn");
const westBtn = document.getElementById("west-btn");

const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");

eastBtn.onclick = () => {

  currentRoute = "east";

  eastBtn.classList.add("active");
  westBtn.classList.remove("active");

  resetStop();
};

westBtn.onclick = () => {

  currentRoute = "west";

  westBtn.classList.add("active");
  eastBtn.classList.remove("active");

  resetStop();
};

upBtn.onclick = () => {

  currentDirection = "up";

  upBtn.classList.add("active");
  downBtn.classList.remove("active");

  resetStop();
};

downBtn.onclick = () => {

  currentDirection = "down";

  downBtn.classList.add("active");
  upBtn.classList.remove("active");

  resetStop();
};

function resetStop() {

  const stops =
    Object.keys(
      busData[currentRoute][currentDirection].stops
    );

  currentStop = stops[0];

  renderStops();
  renderTimetable();
}

function renderStops() {

  const container =
    document.getElementById("stop-selector");

  const stops =
    busData[currentRoute][currentDirection].stops;

  container.innerHTML = "";

  Object.keys(stops).forEach(stop => {

    const button =
      document.createElement("button");

    button.textContent = stop;

    button.className = "stop-button";

    if (stop === currentStop) {
      button.classList.add("active");
    }

    button.onclick = () => {

      currentStop = stop;

      renderStops();
      renderTimetable();
    };

    container.appendChild(button);

  });

}

function renderTimetable() {

  const timetable =
    document.getElementById("timetable");

  const stopData =
    busData[currentRoute][currentDirection]
    .stops[currentStop];

  const today = new Date().getDay();

  const type =
    (today === 0 || today === 6)
      ? "holiday"
      : "weekday";

  timetable.innerHTML = `
    <div class="timetable-stop">

      <h2>${currentStop}</h2>

      <div class="times">

        ${stopData[type].map(time => `
          <span>${time}</span>
        `).join("")}

      </div>

    </div>
  `;
}

resetStop(function renderStops() {

  const select =
    document.getElementById("stop-selector");

  const stops =
    busData[currentRoute][currentDirection]
    .stops;

  select.innerHTML = "";

  Object.keys(stops).forEach(stop => {

    const option =
      document.createElement("option");

    option.value = stop;
    option.textContent = stop;

    if (stop === currentStop) {
      option.selected = true;
    }

    select.appendChild(option);

  });

  select.onchange = (e) => {

    currentStop = e.target.value;

    renderTimetable();
  };

});