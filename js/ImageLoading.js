var playerPic = document.createElement("img");
var bulletPic = document.createElement("img");
var badguyPic = document.createElement("img");
var backGroundPic = document.createElement("img");
var playerWeapon = document.createElement("img");
var wheelMisfortune = document.createElement("img");

var picsToLoad = 0; //// one less thing to manually keep in sync

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		// last image loaded?
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	////
	// picsToLoad++; // led to race condition, don’t want to do it that way, after all! ////
	imgVar.onload = countLoadedImageAndLaunchIfReady; ////
	imgVar.src = "images/" + fileName; ////
} ////

function loadImages() {
	var imageList = [
		////
		{ varName: playerPic, theFile: "player.png" }, ////
		{ varName: bulletPic, theFile: "bullet.png" }, ////
		{ varName: badguyPic, theFile: "testEnemy00.png" }, ////
		{ varName: backGroundPic, theFile: "arena00small.png" }, ////
		{ varName: playerWeapon, theFile: "gunTest.png" },
		{varName: wheelMisfortune, theFile: "wheeloffortune.png"},
	]; ////

	picsToLoad = imageList.length; ////

	for (var i = 0; i < imageList.length; i++) {
		////
		beginLoadingImage(imageList[i].varName, imageList[i].theFile); ////
	} ////
}
