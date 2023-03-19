import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private storage = window.localStorage;

  constructor() { }

  saveProgress(courseId: string, lectureNumber: number, progress: number): void {
    const key = `${courseId}_${lectureNumber}`;
    this.storage.setItem(key, progress.toString());
  }

  getProgress(courseId: string, lectureNumber: number): number | null {
    const key = `${courseId}_${lectureNumber}`;
    const progress = this.storage.getItem(key);
    return progress !== null ? parseFloat(progress) : null;
  }

  saveCurrentLesson(courseId: string, lectureNumber: number): void {
    const key = courseId;
    this.storage.setItem(key, lectureNumber.toString());
  }

  getCurrentLesson(courseId: string): number | null {
    const key = courseId;
    const lessonNumber = this.storage.getItem(key);
    return lessonNumber !== null ? parseFloat(lessonNumber) : null;
  }
}