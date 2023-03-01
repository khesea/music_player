new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Drake (ft. 21 Savage)",
          artist: "Jimmy Cooks",
          cover: "https://avatars.mds.yandex.net/i?id=a9bf6b7886aa281915ecc4b4e8098e2f4d44ff38-3370318-images-thumbs&n=13",
          source: "music/1.mp3",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Drake (ft. 21 Savage)",
          artist: "Rich Flex",
          cover: "https://avatars.mds.yandex.net/i?id=33f7c01128873e9659d0436e488247f3a948751a-8491910-images-thumbs&n=13",
          source: "music/2.mp3",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Drake (ft. 21 Savage)",
          artist: "On BS",
          cover: "https://i.ytimg.com/vi/q6ex4p6gqPI/maxresdefault.jpg",
          source: "music/3.mp3",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Metro Boomin",
          artist: "Raindrops",
          cover: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/906f2033532859.56aef41f521c6.jpg",
          source: "music/4.m4a",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Metro Boomin",
          artist: "Trance",
          cover: "https://i.ytimg.com/vi/S376RsHxn1A/maxresdefault.jpg",
          source: "music/5.m4a",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Metro Boomin",
          artist: "Creepin",
          cover: "https://i.pinimg.com/originals/3c/a8/99/3ca899670697d2d22ba94fc4d0402c6a.png",
          source: "music/6.m4a",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Metro Boomin",
          artist: "Niagara Falls",
          cover: "https://i.ytimg.com/vi/aMoKwYtsikQ/maxresdefault.jpg",
          source: "music/7.m4a",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Metro Boomin",
          artist: "Walk 'Em N*gga Down",
          cover: "https://i.etsystatic.com/32400093/r/il/7de8e8/4464412320/il_fullxfull.4464412320_jgdj.jpg",
          source: "music/8.m4a",
          url: "https://github.com/khesea",
          favorited: false
        },
        {
          name: "Drake (ft. 21 Savage)",
          artist: "Circo Loco",
          cover: "https://i.pinimg.com/originals/a9/cd/d8/a9cdd8be18677288d430874ea2ff977d.png",
          source: "music/9.mp3",
          url: "https://github.com/khesea",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };


    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
