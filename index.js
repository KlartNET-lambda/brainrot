import { querySelector_s } from "./domUtils.js";
import { VideoController } from "./VideoController.js";

const video = querySelector_s("video", HTMLVideoElement);
const upload = querySelector_s("input[type=file]", HTMLInputElement);
const videoSrc = querySelector_s("source", HTMLSourceElement);



const controller = new VideoController(video);

['mouseenter', 'touchstart'].forEach(eventName => {
	video.addEventListener(eventName, /** @param {MouseEvent | TouchEvent} e */ e => {
		e.preventDefault();
		
		controller.reverse = false; 
		controller.play();
	});
});
['mouseleave', 'touchend'].forEach(eventName => {
	video.addEventListener(eventName, /** @param {MouseEvent | TouchEvent} e */ e => {
		e.preventDefault();

		controller.reverse = true; 
		controller.play();
	});
});

upload.addEventListener('change', async () => {
	const files = upload.files;
	if (files === null) return;

	videoSrc.src = URL.createObjectURL(files[0]);
	video.load();
});