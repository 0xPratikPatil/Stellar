# Stellar - Rocket Telemetry UI

## 🚀 Overview

Stellar is a real-time rocket telemetry dashboard built with **Next.js**. It captures data from a **USB serial interface** and visualizes fundamental telemetry metrics, including altitude, velocity, temperature, pressure, gyroscope, accelerometer, and more. The UI provides an intuitive interface for monitoring rocket parameters during flight.

## ✨ Features

-   📡 **Live Telemetry** – Displays real-time rocket data via USB serial.
        
-   📊 **Graphical Dashboard** – Interactive graphs for easy monitoring.
    
-   🌍 **GPS Location** – Tracks the rocket’s live position.
    
-   🎯 **Trajectory & Stage Tracking** – Monitors flight progression.
    
-   🎛 **3D Rocket Orientation** – Provides an interactive 3D view of the rocket’s attitude.
    
-   📈 **Mission Progress** – Displays mission status with progress tracking.
    
-   🔥 **Responsive UI** – Works on all screen sizes.
    

## 📸 Demo

[![Watch the video](https://raw.githubusercontent.com/0xPratikPatil/Stellar/refs/heads/main/demo/stellar.png)](https://github.com/0xPratikPatil/Stellar/blob/main/demo/stellar-demo.mp4)

## 🛠 Installation

### Prerequisites

-   Node.js & npm/yarn
    
-   USB-to-serial driver installed
    
-   RF module (e.g., LoRa) configured for telemetry
    

### Steps

```sh
# Clone the repository
git clone https://github.com/0xPratikPatil/Stellar.git
cd stellar

# Install dependencies
yarn install  # or bun install

# Start the development server
yarn dev  # or bun run dev

```

## 📌 Usage

1.  Connect your rocket’s telemetry system to the **USB port**.
    
2.  Ensure that the **RF module** (e.g., LoRa) is transmitting data.
    
3.  Run the Stellar dashboard.
    
4.  Select the correct **serial port** in settings.
    
5.  Monitor real-time telemetry data.
    

## 📊 Data Metrics

Stellar provides real-time insights into:

-   **Altitude** (m)
    
-   **Velocity** (m/s)
    
-   **Temperature** (°C)
    
-   **Pressure** (Pa)
    
-   **Gyroscope** (°/s)
    
-   **Accelerometer** (m/s²)
    
-   **3D Rocket Orientation**
    
-   **Mission Progress**
    
-   **GPS Location**
    
-   **Trajectory & Stage Details**
    

## 🏗 Tech Stack

-   **Frontend:** Next.js, React, Tailwind CSS
    
-   **Data Handling:** USB Serial Communication, RF Modules (LoRa, etc.)
    
-   **Visualization:** Recharts, Three.js (for 3D orientation)
    

## 📌 Roadmap

-   Implement cloud-based telemetry storage.
    
-   Support for multiple rockets.
    
-   Develop a mobile app version.
        
-   Configurable telemetry parser for different formats.
    
-   Additional UI customization options.
    
-   Offline mode for data analysis.
    
-   Alert notifications for anomalies.
    
-   API for external integrations.
    

## 🤝 Contributing

Contributions are welcome! To contribute:

1.  Fork the repo.
    
2.  Create a new branch (`feature-name`).
    
3.  Commit your changes.
    
4.  Open a pull request.
    

## 🛡 License

This project is licensed under the **MIT License**.

----------

Made with ❤️ by Stellar Team 🚀
