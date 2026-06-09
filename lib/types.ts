export interface Medication {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  withFood: boolean;
  times: string[];
  taken: boolean[];
  color: string;
}

export interface JargonTerm {
  term: string;
  plain: string;
  analogy: string;
}

export interface FollowUp {
  task: string;
  dueIn: string;
  urgency: "routine" | "important" | "urgent";
  calendarTitle: string;
}

export interface DemoResponse {
  patientName: string;
  doctorName: string;
  clinic: string;
  visitDate: string;
  diagnosis: string;
  diagnosisPlain: string;
  summary: string;
  medications: Medication[];
  jargon: JargonTerm[];
  followUps: FollowUp[];
  caregiverNote: string;
  shareId: string;
}
