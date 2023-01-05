<script setup>
// Renders a date in the local timezone, including day of the week.
// e.g. "Fri, 22 May 2020"
const dateFormatter = new Intl.DateTimeFormat([], {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

// Renders an HH:MM time in the local timezone, including timezone info.
// e.g. "12:17 BST"
const timeFormatter = new Intl.DateTimeFormat([], {
  hour: "numeric",
  minute: "numeric",
});

// Given an ISO 8601 date string, render it as a more friendly date
// in the user's timezone.
//
// Examples:
// - "today @ 12:00 BST"
// - "yesterday @ 11:00 CST"
// - "Fri, 22 May 2020 @ 10:00 PST"
//
function getHumanFriendlyDateString(iso8601_date_string) {
  const date = new Date(Date.parse(iso8601_date_string));

  // When are today and yesterday?
  const today = new Date();
  const yesterday = new Date().setDate(today.getDate() - 1);

  // We have to compare the *formatted* dates rather than the actual dates --
  // for example, if the UTC date and the localised date fall on either side
  // of midnight.
  if (dateFormatter.format(date) == dateFormatter.format(today)) {
    return "Today at " + timeFormatter.format(date);
  } else if (dateFormatter.format(date) == dateFormatter.format(yesterday)) {
    return "Yesterday at " + timeFormatter.format(date);
  } else {
    return dateFormatter.format(date) + " @ " + timeFormatter.format(date);
  }
}

// Given an ISO 8601 date string, render a human-friendly description
// of how long ago it was, if recent.
//
// Examples:
// - "just now"
// - "10 seconds ago"
// - "20 minutes ago"
//
function getHumanFriendlyDelta(iso8601_date_string) {
  const date = new Date(Date.parse(iso8601_date_string));
  const now = new Date();

  const deltaMilliseconds = now - date;
  const deltaSeconds = Math.floor(deltaMilliseconds / 1000);
  const deltaMinutes = Math.floor(deltaSeconds / 60);
  const deltaHours = Math.floor(deltaMinutes / 60);

  if (deltaSeconds < 5) {
    return "just now";
  } else if (deltaSeconds < 60) {
    return deltaSeconds + " seconds ago";
  } else if (deltaMinutes == 1) {
    return "1 minute ago";
  } else if (deltaMinutes < 60) {
    return deltaMinutes + " minutes ago";
  } else if (deltaHours == 1) {
    return "1 hour ago";
  } else if (deltaHours < 6) {
    return deltaHours + " hours ago";
  } else {
    return "";
  }
}

function timeFormat(date) {
  let newDate = getHumanFriendlyDelta(date);
  if (newDate) {
    return newDate;
  } else {
    newDate = getHumanFriendlyDateString(date);
  }
  return newDate;
}
</script>

<script>
export default {
  props: ["id", "title", "content", "displayPhoto", "author", "lastUpdate"],
  data() {
    return {
      blogId: this.$props.id,
      bearerToken: localStorage.getItem("bearer"),
      comments: [],
      usercomment: "",
      opencomments: false,
      opendialog: "Show",
    };
  },
  methods: {
    submitComment() {
      this.axios
        .post(
          "http://localhost:1337/api/comments/api::blog.blog:" +
            this.blogId +
            "",
          {
            content: this.usercomment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.bearerToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
      this.usercomment = "";
      this.getArticleComments();
      this.opencomments = true;
      this.opendialog = "Hide";
    },
    getArticleComments() {
      this.axios
        .get(
          "http://localhost:1337/api/comments/api::blog.blog:" +
            this.blogId +
            "",
          {
            headers: {
              Authorization: "Bearer " + this.bearerToken,
            },
          }
        )
        .then((response) => {
          this.comments = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLogStatus() {
      if (localStorage.getItem("bearer") == "null") {
        this.loggedout = true;
      } else {
        this.loggedout = false;
      }
    },
    toggleComments() {
      this.opencomments
        ? (this.opencomments = !this.opencomments)
        : (this.opencomments = !this.opencomments);
      console.log(this.opencomments);
    },
    toggleShow() {
      if (this.opendialog == "Show") {
        this.opendialog = "Hide";
        console.log(this.opendialog);
      } else {
        this.opendialog = "Show";
        console.log(this.opendialog);
      }
    },
  },
  created() {
    this.getArticleComments();
    console.log(localStorage.getItem("bearer"));
    this.getLogStatus();
  },
};
</script>

<template>
  <div class="content">
    <div class="titlecontainer">
      <div class="displayphoto">
        <img
          class="article-image"
          :src="'http://localhost:1337' + displayPhoto"
          alt="article_image"
        />
      </div>
      <div class="titletext">
        <h1>{{ title }}</h1>
        <h3 style="float: left">{{ author }}</h3>
        <h4 style="float: right">
          {{ timeFormat(lastUpdate) }}
        </h4>
      </div>
    </div>
    <div v-html="content"></div>
    <div>
      <h2>
        Comments:
        <button @click="toggleComments(), toggleShow()">
          {{ opendialog }}
        </button>
      </h2>
      <div v-if="loggedout" class="text-align">Log in to view comments!</div>
      <div v-else-if="!comments.length" class="text-align">
        Be the first to comment!
      </div>
      <div v-else v-show="opencomments">
        <div v-for="comment in comments" class="commententry" :key="comment.id">
          <p style="line-height: 0px">
            <b>{{ comment.author.name }} </b> ({{ comment.createdAt }})
          </p>
          <p style="margin-left: 10px">
            {{ comment.content }}
          </p>
        </div>
      </div>
      <div class="commententry userinput">
          <p style="line-height: 0px">
            <b>Comment Here:</b>
          </p>
          <p style="margin-left: 10px">
            <textarea type="text" v-model="usercomment" /><button
              @click="submitComment()"
            >
              Comment
            </button>
          </p>
        </div>
    </div>
  </div>
</template>
<style scoped>
button {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s;
}
button:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s;
}
textarea {
  width: calc(100% - 16px);
  height: 50px;
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  border-color: #2a5b6b;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.text-align {
  text-align: center;
}
.commententry {
  border-style: solid;
  border-radius: 10px;
  padding: 5px;
  background-color: #ffffff;
  margin: 5px;
}
.userinput {
  background-color: #f1f1f1;
  border-color: black;
}
h3 {
  display: inline;
}
.titlebar {
  display: inline;
}
.article-image {
  width: 75px;
  height: 75px;
}
.content {
  width: 50%;
  margin: auto;
  border-color: #8dcac1;
  border-radius: 25px;
  border-style: solid;
  padding: 20px 50px 20px 50px;
  background-color: #f1f1f1;
  color: #2a5b6b;
  margin-bottom: 25px;
  margin-top: 50px;
}
img {
  width: 100%;
  border-radius: 50%;
  border-style: solid;
  border-color: #2a5b6b;
}
.titlecontainer {
  display: flex;
  align-items: center;
}
.titletext {
  margin-left: 20px;
}
</style>
