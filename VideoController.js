export class VideoController {
	/**
	 * @param {HTMLVideoElement} video
	 */
	constructor(video) {
		/** @type {HTMLVideoElement} */
		this.video = video;

		/** @type {boolean} */
		this.reverse = false;

		/** @type {number | null} */
		this.reverseInterval = null;
	}


	isReady() {
		return this.video.readyState >= 3;
	}

	#reverseReset() {
		this.video.pause();

		if (this.reverseInterval !== null) {
			clearInterval(this.reverseInterval);
			this.reverseInterval = null;
		}
	}

	#reversePlay() {
		const reverseFrame = () => {
			if (this.video.currentTime <= 0) {
				this.#reverseReset();
			} else {
				this.video.currentTime -= 0.03;
			}
		};
		reverseFrame();

		this.reverseInterval = setInterval(() => reverseFrame(), 30);
	}

	play() {
		this.#reverseReset();

		if (this.reverse === true) {
			this.#reversePlay();
		} else {
			this.video.play();
		}
	}
}