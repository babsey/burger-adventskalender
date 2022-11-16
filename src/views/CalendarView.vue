<template>
  <div class="calendarView">
    <div
      class="text-bg-black text-white"
      v-if="state.ready && state.isDecember"
    >
      <div class="no-print background">
        <video
          class="video-background"
          autoplay
          loop
          muted
          plays-inline
          v-if="state.config.videoAutoplay"
        >
          <source
            :src="require('@/assets/media/octagon.mp4')"
            type="video/mp4"
          />
        </video>
        <video
          v-else
          class="video-background"
          :poster="require('@/assets/img/octagon.png')"
        />
      </div>

      <v-app-bar class="no-print" color="transparent" flat>
        <v-menu v-model="state.menu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-menu" v-bind="props" variant="text" />
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-item density="compact">
                <v-switch
                  @change="updateConfig"
                  density="compact"
                  class="mx-3 no-print"
                  hide-details
                  label="Hintergrundvideo abspielen"
                  v-model="state.config.videoAutoplay"
                />
              </v-list-item>
              <v-list-item density="compact">
                <v-switch
                  @change="updateConfig"
                  density="compact"
                  class="mx-3 no-print"
                  hide-details
                  label="Zeige Orte im Kalender an"
                  v-model="state.config.showLocationInCalender"
                />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-container class="mb-4 wrapper">
        <div
          class="text-lg-h2 text-md-h3 text-sm-h4 text-h5 handlee title mb-0"
        >
          {{ state.title }}
        </div>
        <div class="text-sm-h5 text-h6 handlee my-3 subtitle">
          {{ state.subtitle }}
        </div>

        <div
          style="margin-left: -12px"
          v-if="state.dates.length > 0"
          v-touch="{
            left: toNextDate,
            right: toPreviousDate,
          }"
        >
          <v-card
            border="0"
            class="ma-auto location"
            max-width="1000"
            v-if="state.selectedDate"
            variant="outlined"
          >
            <v-card-actions class="no-print">
              <v-btn
                class="handlee"
                exact
                prepend-icon="mdi-calendar"
                to="/"
                variant="text"
              >
                Kalender
              </v-btn>
              <v-spacer />

              <v-btn
                @click="toPreviousDate"
                icon="mdi-arrow-left"
                size="small"
              />
              <v-btn to="/?tag=heute" class="handlee" variant="text">
                Heute
              </v-btn>
              <v-btn @click="toNextDate" icon="mdi-arrow-right" size="small" />
            </v-card-actions>

            <v-img
              :src="baseURL + state.image.filename"
              class="ma-auto"
              cover
              height="480"
            />

            <v-btn
              :href="state.image.source"
              class="no-print text-caption text-disabled"
              compact
              target="_blank"
              theme="dark"
              v-if="state.image.source"
              v-text="state.image.source"
              variant="text"
            />

            <v-card-text class="location handlee my-5">
              Am {{ state.selectedDate.format("D. MMMM") }} öffnet sich das
              Fenster
              <span
                v-html="
                  state.selectedEvent && state.selectedEvent.location
                    ? state.selectedEvent.location
                    : 'leider nicht'
                "
              />.
            </v-card-text>
          </v-card>

          <v-card
            variant="outlined"
            border="0"
            class="ma-auto cards-wrapper"
            :width="width"
            v-else
          >
            <v-row>
              <v-col
                :key="'pre' + pre"
                style="flex-grow: 0"
                v-for="pre in [...Array(firstDate().weekday()).keys()]"
                v-show="addEmptyCards"
              >
                <v-card
                  variant="text"
                  class="d-flex flex-column justify-center align-center rounded-xl card handlee"
                  height="150"
                  width="150"
                />
              </v-col>

              <v-col
                :key="idx"
                class="cols-7"
                style="flex-grow: 0"
                v-for="(date, idx) in state.dates"
              >
                <v-card
                  :color="color(date.weekday())"
                  :variant="date.isBefore(state.today) ? 'text' : 'outlined'"
                  @click="toDate(date.date())"
                  class="d-flex flex-column justify-center align-center rounded-xl card handlee"
                  height="150"
                  width="150"
                >
                  <div v-text="date.format('dd')" />
                  <div class="text-h3 handlee" v-text="date.format('D')" />
                  <div
                    :class="
                      state.config.showLocationInCalender || isToday(date)
                        ? ''
                        : 'print'
                    "
                    v-html="getLocation(date)"
                  />
                </v-card>
              </v-col>

              <v-col
                :key="'post' + post"
                style="flex-grow: 0"
                v-for="post in [...Array(6 - lastDate().weekday()).keys()]"
                v-show="addEmptyCards"
              >
                <v-card
                  variant="text"
                  class="d-flex flex-column justify-center align-center rounded-xl card handlee"
                  height="150"
                  width="150"
                />
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-container>
    </div>

    <div v-else>
      <v-card class="my-10 ma-auto" max-width="600" variant="text">
        <v-card-text style="line-height: 2rem; font-size: 1.5rem">
          Bitte haben Sie noch ein wenig Geduld. Der Kalender ist erst
          {{ state.today.to(moment(state.year + "-12", "YYYY-MM")) }}
          verfügbar.
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";
moment.locale("de");
import router from "../router";

const baseURL = process.env.BASE_URL;
const display = useDisplay();
const route = useRoute();

const state = reactive({
  config: {
    videoAutoplay: !display.mobile.value,
    showLocationInCalender: false,
  },
  dates: [],
  events: {},
  image: {},
  images: [],
  isDecember: false,
  menu: false,
  ready: false,
  selectedDate: null,
  selectedEvent: null,
  subtitle: "",
  title: "",
  today: moment(),
  year: null,
});

const width = computed(() => {
  return display.lgAndUp.value ? 1194 : "auto";
});

const addEmptyCards = computed(() => {
  return display.lgAndUp.value;
});

const toDate = (date: number) => {
  isDateValid(date)
    ? router.push({ path: "/", query: { tag: date } })
    : router.push({ path: "/" });
};
const toPreviousDate = () => toDate(state.selectedDate.date() - 1);
const toNextDate = () => toDate(state.selectedDate.date() + 1);

const firstDate = () => state.dates[0];
const lastDate = () => state.dates[state.dates.length - 1];
const isDateValid = (date: number) =>
  firstDate().date() <= date && date <= lastDate().date();

const isDecember = (date: moment.Moment) =>
  date.isSameOrAfter(firstDate(), "day");
const isToday = (date: moment.Moment) => date.isSame(state.today, "day");

const getEvent = (date: moment.Moment | undefined) =>
  date && date.date() in state.events ? state.events[date.date()] : null;
const getLocation = (date: moment.Moment) =>
  date.date() in state.events ? state.events[date.date()].location : "";

const getDate = (date: number) => state.dates.find((d) => d.date() === date);

const selectImage = () =>
  (state.image =
    state.selectedEvent && state.selectedEvent.img
      ? state.selectedEvent.img
      : state.images[Math.floor(Math.random() * state.images.length)]);

const color = (weekday: number) =>
  [5, 6].includes(weekday) ? "red" : "light-green";

const initConfig = () => {
  const config = localStorage.getItem("config");
  if (config != undefined) {
    state.config = JSON.parse(config);
  }
};

const updateConfig = () => {
  localStorage.setItem("config", JSON.stringify(state.config));
};

const resetState = () => {
  state.selectedDate = null;
  state.selectedEvent = null;
  state.today = moment();
};

const getQuery = () => {
  if (route.query.today) {
    const date = state.year + "-12-" + route.query.today;
    state.today = moment(date);
  }

  if (route.query.tag) {
    const date =
      route.query.tag === "heute"
        ? state.today.date()
        : Number(route.query.tag);
    state.selectedDate = isDateValid(date) ? getDate(date) : -1;
  }
};

const init = () => {
  initConfig();
  state.ready = false;
  axios.get(baseURL + "data.json").then((res) => {
    const data = res.data;
    state.events = data.events;
    state.images = data.images;
    state.year = data.year;
    state.title = data.title;
    state.subtitle = data.subtitle;
    state.dates = Object.keys(state.events).map((d) =>
      moment(state.year + "-12-" + d)
    );
    update();
    state.ready = true;
  });
};

const update = () => {
  resetState();
  updateConfig();
  getQuery();
  state.isDecember = isDecember(state.today);
  state.selectedEvent = getEvent(state.selectedDate);
  selectImage();
};

onMounted(init);

watch(() => route.query, update);
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Handlee|Montserrat:300,400");

.print {
  display: none;
}

@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }

  .print {
    display: inherit !important;
  }

  .wrapper {
    padding: 0 !important;
    width: 100% !important;

    .title,
    .subtitle {
      color: black !important;
    }

    .v-row {
      justify-content: left !important;
    }
  }
}

.calendarView {
  text-align: center;

  .w-90 {
    width: 90%;
  }

  .w-80 {
    width: 80%;
  }

  .w-70 {
    width: 70%;
  }

  .w-60 {
    width: 60%;
  }

  .background {
    position: fixed;

    .video-background {
      /*  making the video fullscreen  */
      bottom: 0;
      min-height: 100%;
      min-width: 100%;
      position: fixed;
      right: 0;
      z-index: -100;
    }
  }

  .wrapper {
    position: relative;

    .handlee {
      font-family: "Handlee", cursive !important;
      font-weight: 900;
    }

    .location {
      font-size: 2rem;
      line-height: 2rem;
    }

    .card {
      border-width: 0.4rem;
    }
  }
}
</style>
