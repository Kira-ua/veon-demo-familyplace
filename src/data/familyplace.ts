// Facts for the homepage. Source: veon/client.json (W-F…, products_services, contacts). Nothing invented:
// prices only where the client publishes them (W-F007), the rest "за телефоном" / "ціну уточнюйте".

export const phone = { display: "+380 (66) 604 57 97", short: "+380 66 604 57 97", href: "tel:+380666045797" };
export const email = { display: "familyplaceuzh@gmail.com", href: "mailto:familyplaceuzh@gmail.com" };
export const instagram = { href: "https://www.instagram.com/family_place_uzh/", handle: "@family_place_uzh", followers: "5 814" };
export const facebook = { href: "https://www.facebook.com/FamilyPlace.com.ua/", followers: "4 276" };

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const places = {
  centre: {
    name: "Центр розвитку і школа",
    city: "м. Ужгород",
    street: "вул. 128-ї бригади, 33а",
    hours: ["Пн–Пт 09:30–20:00", "Сб 10:00–15:00"],
    map: maps("Ужгород, вул. 128-ї бригади, 33а"),
  },
  mynai: {
    name: "Садочок №1",
    city: "с. Минай",
    street: "вул. Шевченка, 27",
    hours: ["08:30–18:00"],
    map: maps("с. Минай, вул. Шевченка, 27, Закарпатська область"),
  },
  storozhnytsia: {
    name: "Садочок №2",
    city: "с. Сторожниця",
    street: "вул. Минайська, 2",
    hours: ["08:30–18:00"],
    map: maps("с. Сторожниця, вул. Минайська, 2, Закарпатська область"),
  },
} as const;

/** Age axis: 1,5 to 15,5 years. Position of an age in percent of the track. */
export const AXIS_MIN = 1.5;
export const AXIS_SPAN = 14;
export const x = (age: number) => +(((age - AXIS_MIN) / AXIS_SPAN) * 100).toFixed(3);
export const years = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export type Span = [number, number];

/** Prices of the development centre (W-F007, products_services). */
export interface Lesson {
  name: string;
  note?: string;
  ages: string;
  spans: Span[];
  time?: string;
  single?: string;
  pass?: string;
  passNote?: string;
}

export const lessons: Lesson[] = [
  { name: "Ранній розвиток", ages: "1,6–2,2 р.", spans: [[1.6, 2.2]], time: "щодня 10:00–13:00" },
  { name: "Розвиваючі заняття та адаптація", note: "за ліцензійною програмою, затвердженою МОН", ages: "2,5–3,5 р.", spans: [[2.5, 3.5]], time: "щодня 09:30–13:00" },
  { name: "Підготовка до школи", ages: "4–6 р.", spans: [[4, 6]] },
  { name: "Англійська", note: "програма Oxford; індивідуально — 250 грн", ages: "групи від 3–4 до 13–15 р.", spans: [[3, 15]], single: "150 грн", pass: "130 грн" },
  { name: "Малювання", note: "майстер-класи 5+ щосуботи", ages: "4–7 і 8–12 р.", spans: [[4, 7], [8, 12]], single: "130 грн", pass: "110 грн" },
  { name: "Дитяча хореографія", ages: "2–7 р.", spans: [[2, 7]], single: "100 грн", pass: "90 грн" },
  { name: "Хіп-хоп", ages: "7–13 р.", spans: [[7, 13]], single: "100 грн", pass: "90 грн" },
  { name: "Карате Shidokan", ages: "4–7 і 8–12 р.", spans: [[4, 7], [8, 12]], single: "100 грн", pass: "800 грн", passNote: "на місяць" },
  { name: "Логопед і психолог", ages: "вік уточнюйте", spans: [] },
];

export const priceFilters = [
  { id: "all", label: "Усі", from: 0, to: 99 },
  { id: "small", label: "До 3,5 р.", from: 0, to: 3.5 },
  { id: "mid", label: "4–7 р.", from: 4, to: 7 },
  { id: "big", label: "8+ р.", from: 8, to: 99 },
];
