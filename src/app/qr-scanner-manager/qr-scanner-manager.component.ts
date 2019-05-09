import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import jsQR, {QRCode} from 'jsqr';
import {Client} from './client.model';
declare var $: any;

@Component({
  selector: 'app-qr-scanner-manager',
  templateUrl: './qr-scanner-manager.component.html',
  styleUrls: ['./qr-scanner-manager.component.scss']
})
export class QrScannerManagerComponent implements OnInit, AfterViewInit {
    @ViewChild('scanCanvas') canvasRef: ElementRef;
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    scanDetailModal: HTMLDivElement;
    canvasContext: CanvasRenderingContext2D;

    previousQRCodeData: string;
    qrCodeData: string;
    detectedClient: Client;

    isReady: boolean;
    scanSuccess: boolean;
    scanVerified: boolean;
    successCounter: number;

    constructor(private renderer: Renderer2) {
        this.isReady = false;
        this.scanSuccess = false;
        this.scanVerified = false;

        this.video = renderer.createElement('video');
        this.video.width = window.innerWidth;
        this.video.height = window.innerHeight;

        this.previousQRCodeData = '';
        this.successCounter = 0;

        this.detectedClient = new Client(
            '',
            '',
            '',
            '',
            '',
            null,
            null,
        )
    }

    ngOnInit() {
        this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
        // this.scanDetailModal = <HTMLDivElement>this.modalRef.nativeElement;
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(async (stream: MediaStream) => {
            this.video.srcObject = stream;
            this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
            await this.video.play();
            requestAnimationFrame(this.tick.bind(this));
        });

    }

    ngAfterViewInit(): void {
        this.canvasContext = this.canvas.getContext('2d');
    }

    private drawLine(begin, end, color): void {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(begin.x, begin.y);
        this.canvasContext.lineTo(end.x, end.y);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
    }

    private tick(): void {
        this.isReady = this.video.readyState === this.video.HAVE_ENOUGH_DATA;

        if (this.isReady) {
            this.canvas.height = this.video.videoHeight;
            this.canvas.width = this.video.videoWidth;
            this.canvasContext.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            const imageData: ImageData = this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const code: QRCode = jsQR(imageData.data, imageData.width, imageData.height);

            this.scanSuccess = !!code;

            if (this.scanSuccess) {
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
                this.qrCodeData = code.data;
                this.successCounter++;
            }

            if (this.successCounter >= 20) {
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#008000');
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#008000');
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#008000');
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#008000');

                this.convertToClientData(JSON.parse(this.qrCodeData));
                this.scanVerified = true;
                $('#clientDetailModal').modal('show');
                this.reset();
            }
        }
        requestAnimationFrame(this.tick.bind(this));
    }

    scan(): void {
    }

    reset(): void {
        // cancelAnimationFrame(requestAnimationFrame(this.tick.(this);
        this.video.pause();
        this.successCounter = 0;
        this.isReady = false;
        this.scanSuccess = false;
    }

    convertToClientData(jsonData: any): void {
        const convertedJsonData = jsonData;
        console.log('BEFORE: ', convertedJsonData);
        this.detectedClient = new Client(
            convertedJsonData.id,
            convertedJsonData.firstName,
            convertedJsonData.lastName,
            convertedJsonData.selectedVehicle,
            convertedJsonData.plateNumber,
            convertedJsonData.packageType,
            convertedJsonData.selectedPackage);
        console.log('AFTER: ', this.detectedClient);
    }
}


            /* ngOnInit() {
               navigator.mediaDevices.enumerateDevices()
                   .then(gotDevices).then(this.getStream()).catch(handleError);

               this.captureSource = this.captureElement.nativeElement;
               if (this.checkUserMedia()) {
                   this.activate();
               } else {
                   alert('getUserMedia() is not supported by your browser!');
               }
             }

             checkUserMedia(): boolean {
               return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
             }

             initCamera(config: any) {
               const browser = <any>navigator;

               browser.getUserMedia = (
                   browser.getUserMedia ||
                   browser.webkitGetUserMedia ||
                   browser.mozGetUserMedia ||
                   browser.msGetUserMedia
               );

               browser.mediaDevices.getUserMedia(config).then(stream => {
                 this.captureSource.src = window.URL.createObjectURL(stream);
                 console.log('Camera Active');
               });
             }

             getStream() {
               if (window.stream) {
                 window.stream.getTracks().forEach(function(track) {
                   track.stop();
                 });
               }
             }

             scan() {
               // capture code here
             }

             activate() {
               this.initCamera({video: true, audio: false});
             }*/
