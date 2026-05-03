const listings = [
    {
        id: 1,
        title: "Esentepe'de Cadde Üzeri Sıfır Daire",
        category: "Emlak",
        type: "Satılık",
        price: 6500000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan1.png",
            "images/ilan1_2.png",
            "images/ilan1_3.png",
            "images/ilan1_4.png",
            "images/ilan1_5.png"
        ],
        details: "Esentepe Mahallesinde cadde üzerinde 2+1 sıfır daire geniş kullanım alanlı köşe bina açık cepheli.",
        property: {
            rooms: "2+1",
            size: 90,
            floor: "2. Kat",
            buildingAge: 0,
            heating: "Kombi",
            parking: true,
            elevator: true
        }
    },
    {
        id: 2,
        title: "Zübeyde Hanım Mahallesinde Ara Kat Daire",
        category: "Emlak",
        type: "Satılık",
        price: 4550000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan2.png",
            "images/ilan2_2.png",
            "images/ilan2_3.png",
            "images/ilan2_4.png",
            "images/ilan2_5.png"
        ],
        details: "Zübeyde Hanım Mahallesinde Ara Kat Masrafsız Daire.",
        property: {
            rooms: "2+1",
            size: 95,
            floor: "2. Kat",
            buildingAge: 17,
            heating: "Kombi",
            parking: true,
            elevator: false
        }
    },
    {
        id: 3,
        title: "Zübeyde Hanım Mahallesinde Balkonlu Satılık",
        category: "Emlak",
        type: "Satılık",
        price: 4400000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan3.png",
            "images/ilan3_2.png",
            "images/ilan3_3.png",
            "images/ilan3_4.png",
            "images/ilan3_5.png",
            "images/ilan3_6.png"

        ],
        details: "Zübeyde Hanım'da balkonlu, tuvaleti ve banyosu ayrı ara kat daire.",
        property: {
            rooms: "2+1",
            size: 90,
            floor: "2. Kat",
            buildingAge: 18,
            heating: "Kombi",
            parking: true,
            elevator: false
        }
    },
    {
        id: 4,
        title: "Yunus Emre'de Sıfır Asansörlü Daire",
        category: "Emlak",
        type: "Satılık",
        price: 5800000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan4.png",
            "images/ilan4_2.png",
            "images/ilan4_3.png",
            "images/ilan4_4.png",
            "images/ilan4_5.png",
            "images/ilan4_6.png"

        ],
        details: "Yunus Emre'de 2+1 Asansörlü Sıfır Satılık Daire",
        property: {
            rooms: "2+1",
            size: 85,
            floor: "4. Kat",
            buildingAge: 0,
            heating: "Kombi",
            parking: true,
            elevator: true
        }
    },
    {
        id: 5,
        title: "Gazi'de Çift Balkonlu Geniş Daire",
        category: "Emlak",
        type: "Satılık",
        price: 7200000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan5.png",
            "images/ilan5_2.png",
            "images/ilan5_3.png",
            "images/ilan5_4.png",
            "images/ilan5_5.png",
            "images/ilan5_6.png"

        ],
        details: "Çift balkonlu geniş 3+1 daire.",
        property: {
            rooms: "3+1",
            size: 130,
            floor: "1. Kat",
            buildingAge: 0,
            heating: "Kombi",
            parking: true,
            elevator: false
        }
    },
    {
        id: 6,
        title: "Esentepe'de Sıfır Geniş Daire",
        category: "Emlak",
        type: "Satılık",
        price: 6900000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan6.png",
            "images/ilan6_2.png",
            "images/ilan6_3.png",
            "images/ilan6_4.png",
            "images/ilan6_5.png",
            "images/ilan6_6.png"

        ],
        details: "Esentepe'de tek daire üzerine sıfır geniş oturmaya hazır daire.",
        property: {
            rooms: "3+1",
            size: 140,
            floor: "1. Kat",
            buildingAge: 0,
            heating: "Kombi",
            parking: true,
            elevator: false
        }
    },
    {
        id: 7,
        title: "Memura Kiralık Yüksek Giriş Daire",
        category: "Emlak",
        type: "Kiralık",
        price: 25000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan7.png",
            "images/ilan7_2.png",
            "images/ilan7_3.png",
            "images/ilan7_4.png",
            "images/ilan7_5.png"
        ],
        details: "Yeni karakol mevkiinde memura kiralık 1 yaşında daire. Bir kira bedeli emlak komisyonu, bir kira bedeli depozito alınacaktır.",
        property: {
            rooms: "2+1",
            size: 85,
            floor: "Yüksek Giriş",
            buildingAge: 1,
            heating: "Kombi",
            parking: true,
            elevator: false
        }
    },
    {
        id: 8,
        title: "Butik Sitede Ara Kat Daire",
        category: "Emlak",
        type: "Kiralık",
        price: 38000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/ilan8.png",
            "images/ilan8_2.png",
            "images/ilan8_3.png",
            "images/ilan8_4.png",
            "images/ilan8_5.png",
            "images/ilan8_6.png"

        ],
        details: "Yeni karakol mevkiinde butik site içerisinde daire. Bir kira bedeli emlak komisyonu, bir kira bedeli depozito alınacaktır.",
        property: {
            rooms: "2+1",
            size: 85,
            floor: "Yüksek Giriş",
            buildingAge: 1,
            heating: "Kombi",
            parking: true,
            elevator: true
        }
    },
    {
        id: 9,
        title: "Citroen C5 Aircross",
        category: "Oto",
        type: "Alım-Satım",
        price: 1750000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/auto1.png",
            "images/auto1_2.png",
            "images/auto1_3.png",
            "images/auto1_4.png",
            "images/auto1_5.png"
        ],
        details: "Hatasız, boyasız 50000 kilometrede temiz Aircross.",
        vehicle: {
            year: 2020,
            km: 50000,
            fuel: "Benzin",
            transmission: "Otomatik"
        }
    },
    {
        id: 10,
        title: "Range Rover Sport 2.0",
        category: "Oto",
        type: "Alım-Satım",
        price: 6000000,
        currency: "TL",
        location: {
            city: "İstanbul",
            district: "Sultangazi"
        },
        images: [
            "images/auto2.png",
            "images/auto2_2.png",
            "images/auto2_3.png",
            "images/auto2_4.png"
        ],
        details: "Hatasız, boyasız 143000 kilometrede temiz Range Rover TD4 SE.",
        vehicle: {
            year: 2019,
            km: 143000,
            fuel: "Dizel",
            transmission: "Otomatik"
        }
    }
];
