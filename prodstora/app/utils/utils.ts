export function formatCurrency(amount: number): string {
    return amount
      .toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
  }

  export function calculateOriginalPrice(discountPrice: number, dropRatio: number): number {
    const originalPrice = (discountPrice / (1 - dropRatio / 100));
    return parseFloat(originalPrice.toFixed(2));
  }

  export function translateTime(lastUpdate: string): string {
    if (lastUpdate === "now") {
      return "şimdi";
    } else if (lastUpdate === "yesterday") {
      return "dün";
    } else if (lastUpdate.includes("hours ago")) {
      const hours = lastUpdate.split(" ")[0]; 
      return `${hours} saat önce`;
    } else if (lastUpdate.includes("minutes ago")) {
      const minutes = lastUpdate.split(" ")[0]; 
      return `${minutes} dakika önce`;
    }
    return lastUpdate; 
  }