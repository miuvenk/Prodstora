# **Prodstora** 📱💡  
**Prodstora** is a modern product listing and detail application designed to deliver a seamless and interactive user experience. It features intuitive design, animations, and responsive layouts to make product exploration enjoyable.  

---

## **Features**  

### **Products Page**  
- **Horizontal Display with Carousel**:  
  - Products displayed in a carousel format with forward/backward buttons.  
  - Automatically transitions every 10 seconds.  
  - Discount amounts are highlighted with engaging animations for added appeal.  

- **Vertical Display with Infinite Scroll**:  
  - Products displayed in pairs for a clean layout.  
  - Automatically adapts to single-column display on smaller screens.  
  - Dynamically loads more products as the user scrolls.  
  - Displays a message when all products have been loaded.  

- **Discounted Price Calculation**:  
  - Shows the original price by calculating the difference between the discounted price and discount amount.  
  - Highlights the price drop for user convenience.  

### **Product Detail Page**  
- **Product Information**:  
  - Displays details such as:  
    - Name  
    - Badge  
    - Rating  
    - Storage Options  
    - Seller Count  
    - Price (localized for Turkish)
    - Free Shipping Status  
    - Last Update (localized for Turkish)  
  - Free shipping is visually emphasized with an animation at the corner of the product card.  

- **Comparison Feature**:  
  - A dropdown (`select box`) to explore other models for comparison.  
  - Highlights the superior product attributes:  
    - Lower price  
    - Higher rating  
    - More seller options  

- **Comparison Table**:  
  - Side-by-side product comparison.  
  - Highlights better attributes with noticeable styling.  
  - Responsive design.

### **Dark Mode**  
- Fully supports dark mode for a consistent and user-friendly experience in low-light environments.  

---

## **Tech Stack**  

### **Frontend**  
- **Remix Framework**: Built with Remix for enhanced performance and routing.  
- **React**: Interactive and dynamic components.  
- **TypeScript**: Ensuring type safety and scalability.  
- **Tailwind CSS**: For modern, responsive, and utility-first styling.  
- **Heroicons**: For visually appealing icons.  

### **API**  
- Utilized an external API to fetch product data and details.  

---

## **Setup Instructions**  

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/miuvenk/Prodstora
   cd prodstora

2. **Install Dependencies**:
   ```bash
   npm install

3. **Configure Environment Variables**:
     - Add a .env file in the project root with the following content
   ```bash
   REACT_APP_API_URL=<your-api-url>

4. **Run the Project**:
   ```bash
   npm run dev

5. **Access the Application**:
    - Open your browser and navigate to http://localhost:5173.
