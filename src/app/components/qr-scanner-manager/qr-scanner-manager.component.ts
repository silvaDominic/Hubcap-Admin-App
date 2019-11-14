import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import jsQR, {QRCode} from 'jsqr';
import {Client} from '../../_shared/models/client.model';
import {QrScannerService} from '../../_shared/services/qr-scanner.service';
import {DialogBoxService} from '../../_shared/services/dialog-box.service';

declare var $: any;

@Component({
    selector: 'app-qr-scanner-manager',
    templateUrl: './qr-scanner-manager.component.html',
    styleUrls: ['./qr-scanner-manager.component.scss']
})
export class QrScannerManagerComponent implements OnInit, AfterViewInit {
    @ViewChild('scanCanvas', {static: true}) canvasRef: ElementRef;
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    scanDetailModal: HTMLDivElement;
    canvasContext: CanvasRenderingContext2D;

    private scannedPreviously: boolean;
    private qrCodeData: string;

    public isReady: boolean;
    public scanSuccess: boolean;
    public scanVerified: boolean;
    public successCounter: number;

    constructor(private readonly renderer: Renderer2, private readonly qrService: QrScannerService, private readonly dialogBox: DialogBoxService) {
        this.isReady = false;
        this.scannedPreviously = false;
        this.scanSuccess = false;
        this.scanVerified = false;
        this.successCounter = 0;

        this.video = renderer.createElement('video');
        this.video.width = window.innerWidth;
        this.video.height = window.innerHeight;
    }

    ngOnInit() {
        this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;

        navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}}).then((stream) => {
            this.video.srcObject = stream;
            this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
            this.video.play();
            requestAnimationFrame(this.tick.bind(this));
        });
    }

    ngAfterViewInit(): void {
        this.canvasContext = this.canvas.getContext('2d');
    }

    private tick(): void {
        this.isReady = this.video.readyState === this.video.HAVE_ENOUGH_DATA;
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.canvas.height = this.video.videoHeight;
            this.canvas.width = this.video.videoWidth;
            this.canvasContext.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            const imageData: ImageData = this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const code: QRCode = jsQR(imageData.data, imageData.width, imageData.height);

            this.scanSuccess = !!code;

            // If a code has been successfully identified, mark and begin evaluating validity
            if (this.scanSuccess) {
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
                console.log(this.successCounter);

                // Check if a qr code already exists to compare to
                if (this.scannedPreviously === false) {
                    console.log('First Scan');
                    this.qrCodeData = code.data;
                    this.scannedPreviously = true;
                    this.successCounter++;
                    // If a code already exists, check if current matches previous
                } else if (this.qrCodeData === code.data) {
                    this.qrCodeData = code.data;
                    this.successCounter++;

                    // Once a code has been checked 20 (subject to change) times it is considered valid and is converted to an object
                    if (this.successCounter >= 20) {
                        this.scanVerified = true;
                        this.convertToClientData(JSON.parse(this.qrCodeData));
                        console.log('SUCCESS');
                        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#008000');
                        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#008000');
                        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#008000');
                        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#008000');

                        $('#clientDetailModal').modal('show');
                    }
                } else if (this.qrCodeData !== code.data) {
                    this.qrCodeData = '';
                    this.successCounter = 0;
                    this.scannedPreviously = false;
                }
            }
        }
        requestAnimationFrame(this.tick.bind(this));
    }

    public scan() {
        this.closeModal();
        requestAnimationFrame(this.tick.bind(this));
    }

    private drawLine(begin, end, color): void {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(begin.x, begin.y);
        this.canvasContext.lineTo(end.x, end.y);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
    }

    private reset(): void {
        this.successCounter = 0;
        this.isReady = false;
        this.scanSuccess = false;
        this.scannedPreviously = false;
        this.scanVerified = false;
        // this.qrCodeData = null;
    }

    public confirmClient(client: Client) {
        this.qrService.confirmClient(client).then(resolve => {
            this.closeModal();
            this.dialogBox.openDialogBox('Confirmed!', client.firstName + ' confirmed for a ' + client.selectedPackage + ' package.');
        }).catch(reason => {
            this.closeModal();
            alert('Problem confirming client. Make sure package is not expired or for a different carwash. If problem persists, contact your Admin.');
        })
    }

    public closeModal(): void {
        this.reset();
        $('#clientDetailModal').modal('hide');
    }

    private convertToClientData(jsonData: any): void {
        const convertedJsonData = jsonData;
        this.qrService.setClient(new Client(
            convertedJsonData.id,
            convertedJsonData.firstName,
            convertedJsonData.lastName,
            convertedJsonData.selectedVehicle,
            convertedJsonData.plateNumber,
            convertedJsonData.packageType,
            convertedJsonData.selectedPackage
            )
        );
    }
}
