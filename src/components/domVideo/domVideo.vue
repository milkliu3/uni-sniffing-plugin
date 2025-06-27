<template>
  <view class="video-container">
    <video
      :src="src"
      class="video-player"
      controls
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
    ></video>
  </view>
</template>

<script>
export default {
  name: 'domVideo',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    onPlay() {
      console.log('Video is playing');
    },
    onPause() {
      console.log('Video is paused');
    },
    onEnded() {
      console.log('Video has ended');
    }
  }
}
</script>

<style scoped>
.video-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player {
  width: 100%;
  height: auto;
  max-width: 600px; /* Adjust as needed */
  border-radius: 10px;
  background-color: #000;
}
</style>