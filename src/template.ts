export const htmlTemplate =
`<div class="image-container">
  <div class="match-parent" [ngSwitch]="status">
    
    <div class="match-parent" *ngSwitchCase="statusEnum.NotSelected">
      <button type="button" class="add-image-btn" (click)="onImageClicked($event)">
          <div>
            <p class="plus">+</p>
            <p>Click here to add image</p>
            <p>Or drop image here</p>
          </div>
      </button>
    </div>

    <div class="selected-status-wrapper match-parent" *ngSwitchCase="statusEnum.Loaded">
      <img [src]="imageThumbnail" #imageElement>

      <button type="button" class="remove" (click)="removeImage()">×</button>
    </div>

    <div class="selected-status-wrapper match-parent" *ngSwitchCase="statusEnum.Selected">
      <img [src]="imageThumbnail" #imageElement>

      <button type="button" class="remove" (click)="removeImage()">×</button>
    </div>

    <div *ngSwitchCase="statusEnum.Uploading">
      <img [attr.src]="imageThumbnail ? imageThumbnail : null" (click)="onImageClicked()">

      <div class="progress-bar">
        <div class="bar" [style.width]="progress+'%'"></div>
      </div>
    </div>

    <div class="match-parent" *ngSwitchCase="statusEnum.Loading">
      <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>
    </div>

    <div class="match-parent" *ngSwitchCase="statusEnum.Error">
      <div class="error">
        <div class="error-message">
          <p>{{errorMessage}}</p>
        </div>
        <button type="button" class="remove" (click)="dismissError()">×</button>
      </div>
    </div>
  </div>

  <input type="file" #fileInput (change)="onFileChanged()">
  <div class="drag-overlay" [hidden]="true" #dragOverlay></div>
</div>`;

export const cssTemplate =
`:host {
  display: block;
}

.match-parent {
  width: 100%;
  height: 100%;
}

.add-image-btn {
  width: 100%;
  height: 100%;
  font-weight: bold;
  opacity: 0.5;
  border: 0;
}

.add-image-btn:hover {
  opacity: .7;
  cursor: pointer;
  background-color: #ddd;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
}

.add-image-btn .plus {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 5px;
  margin-top: 5px;
}

img {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  background-color: #f1f1f1;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
}

.remove {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  font-size: 25px;
  text-align: center;
  opacity: 0.8;
  border: 0;
  cursor: pointer;
}

.selected-status-wrapper > .remove:hover {
  opacity: 0.7;
  background-color: #fff;
}

.error .remove {
  opacity: 0.5;
}

.error .remove:hover {
  opacity: 0.7;
}

input {
  display: none;
}

.error {
  width: 100%;
  height: 100%;
  border: 1px solid #e3a5a2;
  color: #d2706b;
  background-color: #fbf1f0;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
}

.error-message {
  width: 100%;
  line-height: 18px;
}

.progress-bar {
  position: absolute;
  bottom:10%;
  left:10%;
  width: 80%;
  height: 5px;
  background-color: grey;
  opacity: 0.9;
  overflow: hidden;
}

.bar {
  position: absolute;
  height: 100%;
  background-color: #a4c639;
}

.drag-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: yellow;
  opacity: 0.3;
}

/* spinner */

.sk-fading-circle {
  width: 40px;
  height: 40px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sk-fading-circle .sk-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.sk-fading-circle .sk-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
          transform: rotate(30deg);
}
.sk-fading-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
          transform: rotate(60deg);
}
.sk-fading-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
          transform: rotate(90deg);
}
.sk-fading-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
          transform: rotate(120deg);
}
.sk-fading-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
          transform: rotate(150deg);
}
.sk-fading-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
}
.sk-fading-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
          transform: rotate(210deg);
}
.sk-fading-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
          transform: rotate(240deg);
}
.sk-fading-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
          transform: rotate(270deg);
}
.sk-fading-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
          transform: rotate(300deg); 
}
.sk-fading-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
          transform: rotate(330deg); 
}
.sk-fading-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s; 
}
.sk-fading-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s; 
}
.sk-fading-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s; 
}
.sk-fading-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s; 
}
.sk-fading-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s; 
}
.sk-fading-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s; 
}
.sk-fading-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s; 
}
.sk-fading-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s;
}

@-webkit-keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

@keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; } 
}`;