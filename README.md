## 🏆 Overview  
StatX is a scalable, real-time company metric visualization platform built using the **MERN stack**. Designed for high concurrency, it enables users to log in, search for companies, view detailed metrics, and access historical data in an intuitive interface.

Project Demo 🎬 - Watch Video

[![Watch the video](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

## 📋 Features  

### **Frontend**  
- Built with **React**.  
- **Features:**  
  - User-friendly interface with responsive design powered by RSUITE and custom CSS.  
  - State management with React’s `useState`, `useEffect`, and Context API.  
  - Data visualization with interactive graphs and tables for real-time metrics.  

### **Backend**  
- Built with **Node.js** and **Express**, containerized with Docker.  
- **Features:**  
  - Scalable REST API for authentication, data fetching, and real-time calculations.  
  - **Redis** caching for lightning-fast responses.  
  - **MongoDB Atlas** for scalable and secure data storage (sharded for horizontal scaling).  
  - Authentication via **Google** and **GitHub OAuth**, with JWT tokens and **2FA (Speakeasy)**.  

### **Real-Time Workflow**  
1. **Login:** Users authenticate via Google or GitHub (2FA optional).  
2. **Search:** Enter a company name or code.  
3. **Compute:** Backend processes metrics like stock prices, market share, and diversity in real time.  
4. **Visualize:** Results are displayed on interactive graphs, with history for comparisons.  


## ⚙️ Tech Stack  

| Component       | Technology        | Features                                                                                 |
|------------------|-------------------|-----------------------------------------------------------------------------------------|
| **Frontend**    | React + RSUITE    | Responsive UI, data visualization, React Router for navigation.                         |
| **Backend**     | Node.js + Express | REST API, scalable containerized deployment using Docker with Nginx.                    |
| **Database**    | MongoDB Atlas     | Sharded NoSQL database for real-time data storage and historical metrics.                |
| **Caching**     | Redis             | Improves response times for high concurrency requests.                                   |
| **Authentication** | OAuth + JWT + 2FA | Secure login with Google/GitHub, token-based authentication, and two-factor security.   |


## 🚀 Scalability Highlights  

- **Frontend:**  
  - Automatically scales on Render for high user traffic.  

- **Backend:**  
  - Dockerized environment supports multiple instances with Nginx for load balancing.  
  - Redis caching ensures minimal latency during real-time computations.  

- **Database:**  
  - MongoDB Atlas scales horizontally with sharding, providing fast and efficient queries.  


## 📈 Predictive Analysis  

- **Machine Learning:**  
  - Implemented **XGBoost Regression** for predictive analytics.  
  - Historical data used to forecast future metrics with weighted dynamic adjustments.  


## 🛠️ Developer & User Experience  

### **Developer Experience (DX)**  
- Modular, clean codebase.  
- CI/CD pipelines for seamless deployment.  
- GitHub for version control.  

### **User Experience (UX)**  
- RSUITE for responsive and elegant design.  
- Interactive graphs and tables for data comparison.  
- Robust security with 2FA and password recovery options.  

## 📂 Data Storage  

- **User Data:** Credentials and 2FA setup.  
- **Company Data:** Stock prices, market share, revenue, and diversity metrics.  
- **Normalization & Cleanup:** Duplicate removal and handling of missing fields.  
