class Timer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selectorId = document.querySelector(selector);
    this.daysInfo = this.selectorId.querySelector('[data-value="days"]');
    this.hoursInfo = this.selectorId.querySelector('[data-value="hours"]');
    this.minutesInfo = this.selectorId.querySelector('[data-value="mins"]');
    this.secondsInfo = this.selectorId.querySelector('[data-value="secs"]');

    this.daysText = this.selectorId.querySelector('[data-text="days"]');
    this.hoursText = this.selectorId.querySelector('[data-text="hours"]');
    this.minutesText = this.selectorId.querySelector('[data-text="mins"]');
    this.secondsText = this.selectorId.querySelector('[data-text="secs"]');
  
    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const finalTime = this.targetDate.getTime();
      const deltaTime = finalTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.updateClockDisplay(time);
      this.updateTextDisplay(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, 0);
  }

  updateClockDisplay({ days, hours, mins, secs }) {
    this.daysInfo.textContent = `${days}`;
    this.hoursInfo.textContent = `${hours}`;
    this.minutesInfo.textContent = `${mins}`;
    this.secondsInfo.textContent = `${secs}`;
  }

  updateTextDisplay({ days, hours, mins, secs }) {
    days === '01' ? (this.daysText.textContent = 'Day') : (this.daysText.textContent = 'Days');
    hours === '01' ? (this.hoursText.textContent = 'Hour') : (this.hoursText.textContent = 'Hours');
    mins === '01' ? (this.minutesText = 'Minute') : (this.minutesText = 'Minutes');
    secs === '01' ? (this.secondsText.textContent = 'Second') : (this.secondsText.textContent = 'Seconds');
  }
}

const timer = new Timer({ selector: '#timer-1', targetDate: new Date('Jul 17, 2022') });
