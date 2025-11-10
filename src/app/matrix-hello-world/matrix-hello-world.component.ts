import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

@Component({
  selector: 'app-matrix-hello-world',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './matrix-hello-world.component.html',
  styleUrl: './matrix-hello-world.component.scss'
})
export class MatrixHelloWorldComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private matrixChars: MatrixChar[] = [];
  private helloWorldText = 'HELLO WORLD';
  private helloWorldChars: MatrixChar[] = [];
  
  private readonly matrixCharacters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  ngOnInit() {
    this.initCanvas();
    this.createHelloWorldChars();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initCanvas() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create matrix rain characters
    const columns = Math.floor(canvas.width / 20);
    for (let i = 0; i < columns; i++) {
      this.matrixChars.push({
        char: this.getRandomChar(),
        x: i * 20,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        opacity: Math.random()
      });
    }
  }

  private createHelloWorldChars() {
    const canvas = this.canvas.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const charWidth = 30;
    const startX = centerX - (this.helloWorldText.length * charWidth) / 2;

    for (let i = 0; i < this.helloWorldText.length; i++) {
      this.helloWorldChars.push({
        char: this.helloWorldText[i],
        x: startX + i * charWidth,
        y: centerY,
        speed: 0,
        opacity: 1
      });
    }
  }

  private getRandomChar(): string {
    return this.matrixCharacters[Math.floor(Math.random() * this.matrixCharacters.length)];
  }

  private animate() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Draw matrix rain
    this.ctx.font = '16px "Courier New", monospace';
    for (let char of this.matrixChars) {
      this.ctx.fillStyle = `rgba(0, 255, 0, ${char.opacity})`;
      this.ctx.fillText(char.char, char.x, char.y);
      
      char.y += char.speed;
      char.opacity -= 0.005;
      
      if (char.y > this.canvas.nativeElement.height || char.opacity <= 0) {
        char.y = 0;
        char.opacity = 1;
        char.char = this.getRandomChar();
      }
    }

    // Draw "HELLO WORLD" text
    this.ctx.font = 'bold 36px "Courier New", monospace';
    this.ctx.fillStyle = '#00ff00';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    
    for (let char of this.helloWorldChars) {
      this.ctx.strokeText(char.char, char.x, char.y);
      this.ctx.fillText(char.char, char.x, char.y);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
