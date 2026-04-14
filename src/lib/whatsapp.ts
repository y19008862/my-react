export const WHATSAPP_PHONE = '919999999999';

export const generateWhatsAppLink = (product: { id: number; name: string; price: number }) => {
  const url = `${window.location.origin}/products/${product.id}`;
  const message = `Jewelry Inquiry:\nID: ${product.id}\nItem: ${product.name}\nPrice: ₹${product.price.toLocaleString('en-IN')}\nLink: ${url}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};
