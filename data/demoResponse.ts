// This is the "AI-parsed" output — what Claude/Whisper would normally produce.
// For the demo this is hardcoded JSON. The UI renders this directly.

import { DemoResponse } from "@/lib/types";

export const DEMO_RESPONSE: DemoResponse = {
  patientName: "Mrs. Adeyemi",
  doctorName: "Dr. Okafor",
  clinic: "City Medical Centre",
  visitDate: "8 June 2026",
  diagnosis: "Hypertension with Type-2 Diabetes Mellitus",
  diagnosisPlain: "Your blood pressure is higher than normal, and your blood sugar has been running a bit high over the last three months. Both are manageable — your doctor caught this early.",
  summary:
    "Your blood pressure was recorded at 140/92 today, which is elevated. Your HbA1c (three-month blood sugar average) is 7.8%, slightly above the target of under 7%. Your doctor has adjusted your medications and wants to monitor your progress in two weeks. No need to worry — these are well-understood conditions and lifestyle changes will help significantly.",
  medications: [
    {
      name: "Amlodipine",
      dose: "5 mg",
      frequency: "Once daily",
      duration: "Ongoing — do not stop without asking your doctor",
      withFood: true,
      times: ["Morning"],
      taken: [false],
      color: "#2D6A4F",
    },
    {
      name: "Metformin",
      dose: "500 mg",
      frequency: "Twice daily",
      duration: "Ongoing — very important not to miss the evening dose",
      withFood: true,
      times: ["Breakfast", "Dinner"],
      taken: [false, false],
      color: "#1B4332",
    },
    {
      name: "Vitamin D",
      dose: "1000 IU",
      frequency: "Once daily",
      duration: "Ongoing",
      withFood: false,
      times: ["Any time"],
      taken: [false],
      color: "#4A7C59",
    },
  ],
  jargon: [
    {
      term: "Hypertension",
      plain: "High blood pressure",
      analogy:
        "Think of your blood vessels like a garden hose. Hypertension means the water is being pushed through with too much force — over time, that strains the hose walls.",
    },
    {
      term: "HbA1c",
      plain: "Your 3-month blood sugar average",
      analogy:
        "If a single blood sugar test is a snapshot photo, your HbA1c is a three-month video. It tells your doctor how your sugar levels have been behaving on average, not just today.",
    },
    {
      term: "Amlodipine",
      plain: "A blood pressure-lowering medication",
      analogy:
        "This medicine relaxes and widens your blood vessels — like widening a narrow road so traffic (your blood) flows more freely and with less pressure.",
    },
    {
      term: "Metformin",
      plain: "A diabetes medication that controls blood sugar",
      analogy:
        "Metformin helps your body use insulin more effectively. Think of it as a traffic manager that helps sugar get into your cells instead of piling up in your bloodstream.",
    },
    {
      term: "Lipid panel",
      plain: "A blood test that measures cholesterol and fats",
      analogy:
        "A lipid panel checks how much of the good and bad cholesterol is in your blood — like checking the ratio of clean oil to sludge in a car engine.",
    },
    {
      term: "Fasting blood test",
      plain: "A blood test done after not eating for 8–12 hours",
      analogy:
        "Eating affects your blood results, like eating before a weigh-in. Fasting gives the lab a clean baseline — your true numbers, not influenced by your last meal.",
    },
  ],
  followUps: [
    {
      task: "Return visit — blood pressure check",
      dueIn: "2 weeks",
      urgency: "important",
      calendarTitle: "BP follow-up with Dr. Okafor",
    },
    {
      task: "Fasting blood test (lipid panel + kidney function)",
      dueIn: "Before the 2-week visit",
      urgency: "urgent",
      calendarTitle: "Fasting blood test — CareSync reminder",
    },
    {
      task: "Daily 30-minute walk",
      dueIn: "Starting today",
      urgency: "routine",
      calendarTitle: "Daily walk — doctor's advice",
    },
    {
      task: "Reduce salt and processed foods",
      dueIn: "Starting today",
      urgency: "routine",
      calendarTitle: "Dietary change — CareSync reminder",
    },
  ],
  caregiverNote:
    "Mrs. Adeyemi was seen today for elevated blood pressure (140/92) and mildly raised blood sugar (HbA1c 7.8%). She has been prescribed Amlodipine 5mg (morning), Metformin 500mg (breakfast and dinner), and Vitamin D 1000IU daily. A fasting blood test and a follow-up visit are needed within two weeks. Please help ensure she takes her evening Metformin dose — she mentioned forgetting it. No cause for alarm. Doctor says this was caught at a manageable stage.",
  shareId: "cs-demo-2026-06-08",
};
