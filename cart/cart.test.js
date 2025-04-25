//TODO should return zero values and empty items for an empty cart yapıldı
//TODO should calculate total for a single item with name yapıldu
//TODO should calculate total with multiple items, quantities, and names yaopıldı
//TODO should apply 10% discount with SAVE10 code and keep item details yapıldı
//TODO should apply 20% discount with save20 code and preserve names yapıldı
//TODO should apply shipping discount with FREESHIP for total >= 50  yapıldı
//TODO should not apply shipping discount with FREESHIP for total < 50 yapıldı
//TODO should throw error for non-array input yapılfdı
//TODO should throw error for item missing name yapıldı
//TODO should throw error for invalid price in cart //yapıldı
//TODO should not allow negative final total with excessive discount yapıldı


const calculateCartTotal = require('./cart.js');

describe('calculateCartTotal', () => {
  test('should return zero values and empty items for an empty cart', () => { 
    // given  sepette ürün yok
    const cartItems = [];

    // when calculate cart totala cart itemsi gönderip resulta kaydediyoruz
    const result = calculateCartTotal(cartItems); 

    // then bekledğimiz sonuçlar, hepsinin 0 olması 
    expect(result).toEqual({
      total: 0,
      discountApplied: 0,
      finalTotal: 0,
      items: []
    });
  });

  test('should calculate total for a single item with name', () => { //sadece adı olan tek bir item içinde hesaplamalı bunu sor?

    //given ürün adını ve ücretini verdik eğer ücreti yazmazsak calculate cart totalde price değeri olduğu için hata verir
    //quantity girmedik
    const cartItems = [{name:'Kalem' ,price:15}];

    //when calculate cart totala cart itemsi gönderip resulta kaydediyoruz
    const result= calculateCartTotal(cartItems);

    //then indirim uygulanmadan toplam 15 TL olan tek ürünlü sepet sonucu dönmeli
    expect(result).toEqual({
       total: 15,
       discountApplied:0 ,
       finalTotal:15 ,
       items: [
        {
          name: 'Kalem',
          price: 15,
          quantity: 1,
          subtotal: 15
        }
      ]
    });

    });
    test('should calculate total with multiple items, quantities, and names', () => { //birden fazla item ,sayısı ve adını içermeli

        //given ürünlerin adlarını,fiyatlarını ve kaç adet olduklarını verdik
        const cartItems =  [
         { name: 'Kalem', price: 15, quantity: 2 },
         { name: 'Elma', price: 7, quantity: 3 },
         { name: 'Kitap', price: 20, quantity: 1 },
        ]
        //when calculate cart totala cart itemsi gönderip resulta kaydediyoruz
        const result= calculateCartTotal(cartItems);
    
        //then indirim uygylanmadan 71 tl dondurmeli
        expect(result).toEqual({
           total: 71,
           discountApplied:0 ,
           finalTotal:71 ,
           items: [
            {
              name: 'Kalem',
              price: 15,
              quantity: 2,
              subtotal: 30
            },
            {
                name: 'Elma',
                price: 7,
                quantity: 3,
                subtotal: 21
              },
              {
                name: 'Kitap',
                price: 20,
                quantity: 1,
                subtotal: 20
              }
          ]

        });
    });


        test('should apply 10% discount with SAVE10 code and keep item details', () => { 

            //given ürünün adını ücretini ve kaç adet olduğunu verdik
            const cartItems = [ { name:'Silgi',price:12, quantity:2 }]

            //when sepettekiler 'SAVE10' koduyla calculateCartTotal'a gönderilir
            const result=calculateCartTotal(cartItems,'SAVE10');

            //then %10 indirimle toplam 24 TL'den 21.6 TL'ye düşen sepet sonucu dönmeli

            expect(result).toEqual({

                total:24,
                discountApplied:2.4,
                finalTotal:21.6,
                items: [
                    {
                        name: 'Silgi',
                        price: 12,
                        quantity: 2,
                        subtotal: 24
                      },
                ]



            })
    
        });
    });
    test('should apply 20% discount with save20 code and preserve names', () => { //preserve name için toequalda kontrol sağlıcaz

        //given ürün adı,fiyatı ve adeti sepete verildi
        const cartItems = [ { name:'Defter',price:30, quantity:3 }]

        //when sepeti save20 kuponu ile calculatecarttotal fonksiyonuna gönderdik
        const result=calculateCartTotal(cartItems,'SAVE20');

        //then  preserve name(ürün adı koruma) yapmalı ve %20 indirimle toplam 90 TL’den 72 TL’ye düşmeli

        expect(result.items[0].name).toBe('Defter'); //preserve name durumunu kontrol ettik


        expect(result).toEqual({ //aynı şekilde tobe yazıyoruz
            total:90,
            discountApplied:18,
            finalTotal:72,
            items: [
                {
                    name: 'Defter',
                    price: 30,
                    quantity: 3,
                    subtotal: 90
                  }
            ]


        });
    });
    test('should apply shipping discount with FREESHIP for total >= 50', () => { 

        //given ürünün adı,fiyatı ve adetini verdik sepete
        const cartItems = [{name:'Masa',price:51,quantity:1}]

        //when sepeti freeship kuponuyla calculatecarttotale gönderdik

        const result=calculateCartTotal(cartItems,'FREESHIP');

        //then freeship kuponunda 51tlye 5 tl indirim yapmasını bekledik 46tl olarak bize döndü

        expect(result).toEqual({

            total:51,
            discountApplied:5,
            finalTotal:46,

            items: [{
                name:'Masa',
                price:51,
                quantity: 1,
                subtotal:51

            }
            ]



        });
    });
    test('should not apply shipping discount with FREESHIP for total < 50', () => { 

        //given ürünün adı,fiyatı ve adetini sepete gönderdik
        const cartItems = [{name:'Silgi',price:12,quantity:2}]

        //when sepeti freeship kuponuyla calculatecarttotale gönderdik

        const result=calculateCartTotal(cartItems,'FREESHIP');

        //then freeship kuponunun çalışmamasını bekliyoruz 50 tl altında olduğu için
        //24 tl olarak 0 discount ile bize dönmeli

        expect(result).toEqual({

            total:24,
            discountApplied:0,
            finalTotal:24,

            items: [{
                name:'Silgi',
                price:12,
                quantity: 2,
                subtotal:24

            }
            ]
            
            



        });
    });
    test('should throw error for non-array input', () => { 

        //given cartItems bir array yerine nesne olarak verildi (dışında köşeli parantez yok)

        const cartItems = { name:'Çakmak',price:22,quantity:1}

        //when ve then
        //fonksiyon çalıştığında sepet array olmalı diye hata döndürmesini bekliyoruz

        expect(() => calculateCartTotal(cartItems)).toThrow('cartItems must be an array');
    });




    test('should throw error for item missing name', () => {
        //given isimi vermeden ozellikleri verdik
        const cartItems = [
          { price: 10, quantity: 2 } // name yok
        ];
      //when ve then 
      //fonskiyon çalıştığında 'Invalid item in cart: price and name are required' hatası fırlatılmalı
        expect(() => calculateCartTotal(cartItems)).toThrow('Invalid item in cart: price and name are required');
      });





      test('should throw error for invalid price in cart', () => {

        //given fiyatı geçersiz olan sepetler yazdık
        const invalidCarts = [
          [{ name: 'Kalem', price: -5, quantity: 1 }],         // Negatif fiyat
          [{ name: 'Silgi', price: '10', quantity: 1 }],       // String olarak fiyat
          [{ name: 'Kitap', quantity: 1 }],                    // Fiyat eksik
        ];
        // when:  geçersiz sepetler için fonksiyon çalıştırılır
        // then: 'Invalid item in cart: price and name are required' hatası fırlatılmalı
      
        invalidCarts.forEach(cartItems => {
          expect(() => calculateCartTotal(cartItems)).toThrow('Invalid item in cart: price and name are required');
        });
      });



      test('should not allow negative final total with excessive discount', () => { // aşırı indirimle negatif nihai toplama izin verilmemelidir
        // given sepete ürünün adını,fiyatını ve adetini veridk
        const cartItems = [
          { name: 'Sticker', price: 2, quantity: 1 }
        ];
        //when
        // sahte ama büyük bir indirim kodu kullanıyoruz. bunun switch'e girmediğini ve defaultla çalıştığını biliyoruz.
        const result = calculateCartTotal(cartItems, 'SAVE1000');
      
        // then final total 0'dan küçük olmamalı, yani negatif olamaz
        expect(result.discountApplied).toBe(0); // İndirim uygulanmamalı
        expect(result.finalTotal).toBe(result.total); // Final total, total ile aynı olmalı
      });



      test('should apply valid discount and calculate correct final total', () => { //ben ekledim
        // given sepette 1 adet 2 TL'lik 'Sticker' ürünü var
        const cartItems = [
          { name: 'Sticker', price: 2, quantity: 1 }
        ];
    
        // when geçerli bir indirim kodu kullanıldığında
        const result10 = calculateCartTotal(cartItems, 'SAVE10'); // %10 indirim
        const result20 = calculateCartTotal(cartItems, 'SAVE20'); // %20 indirim
    
        // then final total doğru bir şekilde hesaplanmalı
        expect(result10.finalTotal).toBe(1.8); // %10 indirimli 2 TL'lik ürün = 1.8 TL
        expect(result20.finalTotal).toBe(1.6); // %20 indirimli 2 TL'lik ürün = 1.6 TL
    
        // indirimlerin doğru uygulandığını kontrol edebiliriz
        expect(result10.discountApplied).toBe(0.2); // %10 indirim için 0.2 TL
        expect(result20.discountApplied).toBe(0.4); // %20 indirim için 0.4 TL
    });
      
      
      

    








/*
describe('cart' , () => {

    let cart;

    beforeEach(() =>
        cart =new cart()
 )};
 test('should return zero values and empty items for an empty cart' ,() => {

    //given
    const cartItems = { total: 0, discountApplied: 0, finalTotal: 0, items: [] };

    //when
    const result =cart.cartItems(cart);

    //then 
    expect(result).toEqual({

        total:0
        discountApplied:0
        finalTotal:0 
        items: []

        //total: 0, discountApplied: 0, finalTotal: 0, items: []
    )};

))
    */
   