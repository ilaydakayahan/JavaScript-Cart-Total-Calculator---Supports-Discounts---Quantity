
function calculateCartTotal(cartItems, discountCode = '') { // fonksiyonu tanımladık 2 parametre alıyor 
    if (!Array.isArray(cartItems)) { //cart itemin array olmalı ,değilse durumunu kontrol ediyor
    throw new Error('cartItems must be an array'); //hata atıyor,fonksiyon çlaışmayı durdurur
  }

  if (cartItems.length === 0) { //cartta item yoksa
    return { total: 0, discountApplied: 0, finalTotal: 0, items: [] }; //boş ürün listesi içeren nesne döner
  }

  
  const processedItems = cartItems.map((item) => { //map metodu her bir ürüne tek tek bakıyor processedıtems diye bir construction oluşturuyıruz
    if (!item || typeof item.price !== 'number' || item.price < 0 || !item.name) { // item null mu  price sayı mı,negatif mi item adı var mı
      throw new Error('Invalid item in cart: price and name are required'); //ücret ve isim gerekli diye hata atıyor
    }
    const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1; //item quantity varsa onu kullanıyor 0 dan buyuk mu kontrol ediyor yoksa 1 atıyor
    return {
      name: item.name, //item adı
      price: item.price, //item ücreti
      quantity, // item miktarı
      subtotal: item.price * quantity, // total fiyat = ücret* miktar
    };
  });

  const total = processedItems.reduce((sum, item) => sum + item.subtotal, 0); //reduce --> dizinin tüm elemanlarını tek bir değere indirger 
//sum ın değeri 0 itemsubtotala ekler 
  
  let discountApplied = 0; 
  if (discountCode) { //discount code girilmişsse kontrolm eder
    switch (discountCode.toUpperCase()) { //girilen kodu büyük harflere çevirir
      case 'SAVE10': //save10 girildiyse
        discountApplied = total * 0.1; //totali 0.1 ile çarpar %10 indirim
        break;
      case 'SAVE20': //save20 girildiyse
        discountApplied = total * 0.2; //%20 indirim
        break;
      case 'FREESHIP': //freeship girildiyse
        discountApplied = total >= 50 ? 5 : 0;  //toplam 50 veya daha fazlaysa 5 birim indirim yapar değilse yapmaz
        //ternary operator kullabılmış koşul ? doğruysa: yanlışsa
        break;
      default:
        discountApplied = 0;  //girilen diğer her şey için discount 0 olur
    }
  }

  const finalTotal = Math.max(total - discountApplied, 0);  //final totali hesaplarız //totalden indirimli kısmı düşeriz //mathmax negatif değerlerden kurtulmak için

  return {
    total: Number(total.toFixed(2)), //to fixed 2 , iki ondalık basamağı yuvarlar ve tekrar numbera ekler
    discountApplied: Number(discountApplied.toFixed(2)), 
    finalTotal: Number(finalTotal.toFixed(2)), 
    items: processedItems,        //olduğu giib döndürür             
  };
}
//deneme
const sepetim = [
    { name: 'Elma', price: 2.5, quantity: 2 },
    { name: 'Muz', price: 1.8, quantity: 3 },
  ];
  
  const sonuc1 = calculateCartTotal(sepetim, 'SAVE10');
  console.log('İndirimli Sepet:', sonuc1);
  
  const sonuc2 = calculateCartTotal([]);
  console.log('Boş Sepet:', sonuc2);
  
  const sonuc3 = calculateCartTotal(sepetim);
  console.log('İndirimsiz Sepet:', sonuc3);
  
  module.exports = calculateCartTotal;
