# Clock App ⏰

A modern, responsive timer and stopwatch web application with beautiful visual countdown animations.

## ✨ Features

### Timer
- **Flexible time input**: Enter time in natural language (e.g., "5m", "1h 30m", "90s")
- **Quick presets**: 5m, 10m, 15m, 20m, 30m, 1h buttons for common durations
- **Visual countdown**: Circular progress ring and linear progress bar
- **No time limits**: Set any duration you want
- **Live preview**: See parsed time duration as you type
- **Notifications**: Browser notifications when timer completes

### Stopwatch
- **Precise timing**: Accurate to centiseconds (0.01s)
- **Lap functionality**: Record multiple lap times
- **Clean interface**: Easy-to-read time display
- **Lap history**: View all recorded laps with individual times

### General
- **Responsive design**: Works on desktop, tablet, and mobile
- **Dark theme**: Easy on the eyes
- **Fixed navigation**: Bottom tabs stay accessible while scrolling
- **Modern UI**: Clean, professional design with smooth animations

## 🚀 Demo

[Live Demo](https://github.com/derrickappah/Clock) 

## 📱 Screenshots
### Timer
<img src="Screenshots/timer-input-screen.jpg" alt="Timer Input Screen" width="300">
<img src="Screenshots/timer-countdown-visual.jpg" alt="Timer Countdown with Visual Progress" width="300">

### Stopwatch
<img src="Screenshots/stopwatch-with-laps.jpg" alt="Stopwatch with Lap Times" width="300">

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styles and animations
- **JavaScript (ES6+)**: Interactive functionality
- **Tailwind CSS**: Utility-first CSS framework
- **SVG**: Circular progress indicators

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/clock-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd clock-app
   ```

3. Open `index.html` in your web browser or serve it using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   ```

4. Visit `http://localhost:8000` in your browser

## 🎯 Usage

### Timer
1. Enter your desired time in the input field (e.g., "25m", "1h 30m")
2. Or click one of the preset buttons (5m, 10m, 15m, etc.)
3. Click "Start" to begin the countdown
4. Watch the visual progress ring decrease as time counts down
5. Use "Pause"/"Resume" to control the timer
6. Click "Reset" to return to the input screen

### Stopwatch
1. Click the "Stopwatch" tab at the bottom
2. Press "Start" to begin timing
3. Press "Lap" to record lap times while running
4. Press "Stop" to pause, then "Reset" to clear

## 🔧 File Structure

```
clock-app/
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS styles
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
